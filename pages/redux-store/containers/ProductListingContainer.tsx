import { connect } from "react-redux";
import ProductListing from "../../components/ProductListing";
import { addToCart, removeFromCart } from "../services/actions/actions";

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  addToCartHandler: (item: any) => dispatch(addToCart()),
  removeFromCartHandler: (item: any) => dispatch(removeFromCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
