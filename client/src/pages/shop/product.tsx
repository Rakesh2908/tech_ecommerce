import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { IProduct } from "../../models/interfaces";

interface Props {
  product: IProduct;
}

export const Product = (props: Props) => {
  const { _id, productName, description, price, stockQuantity, imageURL } =
    props.product;

  const context = useContext(ShopContext);

  if (!context) {
    return null; // or some fallback UI
  }

  const { addToCart, getCartItemCount } = context;

  const cartItemCount = getCartItemCount ? getCartItemCount(_id) : 0;

  return (
    <div className="product">
      <img src={imageURL} alt={productName} />
      <div className="description">
        <h3>{productName}</h3>
        <p>{description}</p>
        <p> ${price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart && addToCart(_id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>

      <div className="stockQuantity">
        {stockQuantity === 0 && <h1> OUT OF STOCK</h1>}
      </div>
    </div>
  );
};
