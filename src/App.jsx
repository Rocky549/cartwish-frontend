import React, { useCallback, useEffect, useReducer, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import Routing from "./components/Routes/Routing";
import { getJwt, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartApi,
  decreaseProductApi,
  getCartApi,
  increaseProductApi,
  removeFromCartApi,
} from "./services/cartServices";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./Contexts/UserContext";
import CartContext from "./Contexts/CartContext";
import cartReducer from "./reducers/CartReducers";

setAuthToken(getJwt());
const App = () => {
  const [user, setUser] = useState(null);
  const [cart, dispatchCart] = useReducer(cartReducer, []);
  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser?.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getCart = useCallback(() => {
    getCartApi()
      .then((res) => {
        dispatchCart({ type: "GET_CART", payload: { products: res.data } });
      })
      .catch((err) => {
        alert(err)
        toast.error("Something Went Wrong" + err);
      });
  }, [user]);

  const addToCart = useCallback(
    (product, quantity) => {
      //if product already exist then ony add quantity to cart if not add product and qty both
      dispatchCart({ type: "ADD_TO_CART", payload: { product, quantity } });
      addToCartApi(product._id, quantity)
        .then((res) => {
          console.log(res.data);
          toast.success("Product Added Succesfully!");
        })
        .catch((err) => {
          console.timeLog(err);
          toast.error("Failed To Add Product " + err);
          dispatchCart({ type: "REVERT_CART", payload: { cart } });
        });
    },
    [cart]
  );

  const updateCart = useCallback(
    (type, id) => {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === id
      );
      if (type === "increase") {
        updatedCart[productIndex].quantity += 1;
        increaseProductApi(id).catch((err) => {
          toast.error("Something went wrong while increaseProductApi" + err);
          dispatchCart({ type: "REVERT_CART", payload: { cart } });
        });
      } else {
        updatedCart[productIndex].quantity -= 1;
        decreaseProductApi(id).catch((err) => {
          toast.error("Something went wrong while decreaseProductApi" + err);
          dispatchCart({ type: "REVERT_CART", payload: { cart } });
        });
      }
      dispatchCart({ type: "GET_CART", payload: { products: updatedCart } });
    },
    [cart]
  );

  const removeFromCart = (id) => {
    dispatchCart({ type: "REMOVE_CART", payload: { id } });
    removeFromCartApi(id).catch((err) => {
      toast.error("Failed To Remove Product " + err);
      dispatchCart({ type: "REVERT_CART", payload: { cart } });
    });
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);
  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart }}
      >
        <div className="app">
          <Navbar />
          <main>
            {/* <Home/> */}
            {/* <ProductsPage/> */}
            {/* <SingleProductPage /> */}
            {/* <CartPage/> */}
            {/* <MyOrderPage/> */}
            {/* <LoginPage/> */}
            {/* <SignupPage/> */}
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
