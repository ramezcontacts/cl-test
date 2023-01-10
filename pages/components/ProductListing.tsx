import { getSalesChannelToken } from "@commercelayer/js-auth";
import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card, Button, Badge } from "react-bootstrap";
import PageHeader from "./PageHeader";
import { ToastContainer, toast } from "react-toastify";

// Settings for ramOrg
// const ORG_URL = "https://ramorg.commercelayer.io";
// const CLIENT_ID = "NuK4AA91mN3G17YxedGmOZD8wx8PeNTHuh0EZLILLvo";
// const SCOPE = "market:12111 stock_location:10084";

// Settings for mahesh-test
// const ORG_URL = "https://mahesh-test.commercelayer.io";
// const CLIENT_ID = "qR4VZpU0dILFdD6_o8XbKLjNoHosl1_-tnRAicCansE";
// const SCOPE = "market:11861 stock_location:9890";

// Settings for ez-contacts-stage
const ORG_URL = "https://ez-contacts-stage.commercelayer.io";
const CLIENT_ID = "QrkdoMiF7x2qv1TV68czbWqTgk2YbLHuaVrEZABl3DE";
const SCOPE = "market:12217 stock_location:10181";

function ProductListing(props: any) {
  const [accessToken, setAccessToken] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [price, setPrice] = useState<any[]>([]);
  const [firstPageURL, setFirstPageURL] = useState("");
  const [nextPageURL, setNextPageURL] = useState("");
  const [lastPageURL, setLastPageURL] = useState("");
  const [orderId, setOrderId] = useState("");

  const getAcesssToken = async () => {
    const token = await getSalesChannelToken({
      clientId: CLIENT_ID,
      endpoint: ORG_URL,
      scope: SCOPE,
    });
    if (token) {
      setAccessToken(token.accessToken);
      sessionStorage.setItem("ACCESS_TOKEN", token.accessToken);
      return token.accessToken;
    }
  };

  const fetchAllProducts = async (accessToken: any) => {
    const response = await fetch(`${ORG_URL}/api/skus?filter[q][code_in]=&include=prices`, {
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    let res = await response.json();
    setProducts(res.data);
    setPrice(res.included)
    setFirstPageURL(res.links.first);
    setLastPageURL(res.links.last);
    setNextPageURL(res.links.next);
  };

  const createAnDraftEmptyOrder = async (accessToken: any) => {
    const response = await fetch(`${ORG_URL}/api/orders`, {
      body: `{\n  "data": {\n    "type": "orders"\n    }\n}`,
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/vnd.api+json",
      },
      method: "POST",
    });
    let res = await response.json();
    setOrderId(res.data.id);
    sessionStorage.setItem("ORDER_ID", res.data.id);
  };

  useEffect(() => {
    getAcesssToken().then(async (accessToken) => {
      await fetchAllProducts(accessToken).then(async () => {
        await createAnDraftEmptyOrder(accessToken);
      });
    });
  }, []);

  const addItemToCart = async (item: any) => {
    const itemAttribute = {
      quantity: 1,
      name: item.name,
      image_url: item.image_url,
      _update_quantity: true,
      sku_code: item.code,
    };
    fetch(`${ORG_URL}/api/line_items`, {
      body: `{"data":{"type":"line_items","attributes":${JSON.stringify(
        itemAttribute
      )},"relationships":{"order":{"data":{"type":"orders","id":"${orderId}"}}}}}`,
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/vnd.api+json",
      },
      method: "POST",
    }).then(() => {
      toast.success(`Item: ${item.code} added to cart`, {
        position: "bottom-left",
      });
    });
  };
  return (
    <div>
      <PageHeader />
      <ToastContainer />

      <Container>
        <Row>
          {products.map((item) => {
            const elem = item.attributes;

            return (
              <Col sm={3} md={3} key={elem.code}>
                <Card className="mb-2">
                  <Card.Img variant="top" src={elem.image_url} />
                  <Card.Body>
                    <Badge bg="secondary">{elem.code}</Badge>
                    <Card.Title>{elem.name}</Card.Title>
                    {price.map((p) => {
                    if(p.attributes.sku_code === elem.code){
                      return (<Card.Text>Price: {p.attributes.formatted_amount}</Card.Text>)
                    }
                    })}
                    
                    <Button
                      variant="primary"
                      onClick={() => addItemToCart(elem)}
                    >
                      Add To Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default ProductListing;
