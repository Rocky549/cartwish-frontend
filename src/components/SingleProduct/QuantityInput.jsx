import React from "react";
import "./QuantityInput.css";

const QuantityInput = ({ quantity,  setQty, stock, cartPage, productId }) => {
  return (
    <>
      <button
        className="quantity_input_button"
        disabled={quantity <= 1}
        onClick={() => cartPage ? setQty('decrease', productId) : setQty(quantity - 1)}
      >
        -
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button
        className="quantity_input_button"
        disabled={quantity >= stock}
        onClick={() => cartPage?setQty('increase', productId) : setQty(quantity + 1)}
      >
        +
      </button>
    </>
  );
};

export default QuantityInput;
