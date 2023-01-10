import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";


function PageHeader() {
  const goToCart = () => {
    const ORDER_ID = sessionStorage.getItem("ORDER_ID")
    const ACCESS_TOKEN = sessionStorage.getItem("ACCESS_TOKEN")

    window.open(`https://ezcontacts-stage-cart.netlify.app/${ORDER_ID}?accessToken=${ACCESS_TOKEN}`)
  } 
  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand href="#home">Commerce Layer Test</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Button
                      variant="primary"
                      onClick={() => goToCart()}
                    >
                      Go To Cart
                    </Button>
      </Container>
    </Navbar>
  );
}

export default PageHeader;
