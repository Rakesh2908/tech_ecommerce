import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { IProduct } from "../../models/interfaces"; // Make sure you have a type for the product
import "./styles.css";

export const PurchasedItemsPage = () => {
  // Assert the type of ShopContext and handle null case
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("ShopContext is not available");
  }

  const { purchasedItems, addToCart, getCartItemCount } = context;

  return (
    <div className="purchased-items-page">
      <h1>Previously Purchased Items Page</h1>

      <div className="purchased-items">
        {purchasedItems.map((item: IProduct) => {
          const cartItemCount = getCartItemCount(item._id);
          return (
            <div key={item._id} className="item">
              <h3>{item.productName}</h3>
              <img src={item.imageURL} alt={item.productName} />
              <p>${item.price}</p>
              <button onClick={() => addToCart(item._id)}>
                Purchase Again {cartItemCount > 0 && <> ({cartItemCount})</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
