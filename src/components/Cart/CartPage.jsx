import config from "../../config.json";
import "./CartPage.css";
import remove from "../../assets/remove.png";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import { memo, useContext, useMemo, useReducer } from "react";
import UserContext from "../../Contexts/UserContext";
import CartContext from "../../Contexts/CartContext";
import checkOutApi from "../../services/OrderServices";
import { toast } from "react-toastify";
import cartReducer from "../../reducers/CartReducers";

// eslint-disable-next-line react/prop-types
const CartPage = () => {
  const user = useContext(UserContext);
  const [cart1, dispatchCart] = useReducer(cartReducer, []);
  const { cart, removeFromCart, updateCart } = useContext(CartContext);

  const subTotal = useMemo(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  }, [cart]);

  const checkout = () => {
    checkOutApi()
      .then((res) => {
        toast.success("Order Placed Successfully");
        window.location.reload();
      })
      .catch((err) => {
        toast.error("Something went wrong" + { err });
        dispatchCart({ type: "REVERT_CART", payload: { cart } });
      });
  };

  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`${config.backendURL}/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">Name: {user?.name}</p>
          <p className="user_email">Email: {user?.email}</p>
        </div>
      </div>
      <Table headings={["Items", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  setQty={updateCart}
                  stock={product.stock}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>${quantity * product.price}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Sub Total</td>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Final Total</td>
            <td>${subTotal + 5}</td>
          </tr>
        </tbody>
      </table>
      <button className="search_button checkout_button" onClick={checkout}>
        Checkout
      </button>
    </section>
  );
};

export default memo(CartPage);
