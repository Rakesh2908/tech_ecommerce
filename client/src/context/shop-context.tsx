import { ReactNode, createContext, useEffect, useState, useCallback } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import { IProduct } from "../models/interfaces";
import axios, { AxiosError } from "axios";
import { ProductErrors } from "../models/errors";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetToken } from "../hooks/useGetToken";

export interface IShopContext {
  getCartItemCount: (itemId: string) => number;
  addToCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getTotalCartAmount: () => number;
  removeFromCart: (itemId: string) => void;
  checkout: (customerID: string) => void;
  availableMoney: number;
  fetchAvailableMoney: () => void;
  purchasedItems: IProduct[];
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}


interface IErrorResponse {
  type: string;
}


export const ShopContext = createContext<IShopContext | null>(null);

export const ShopContextProvider = (props: { children: ReactNode }) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const [availableMoney, setAvailableMoney] = useState<number>(0);
  const [purchasedItems, setPurchaseItems] = useState<IProduct[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    cookies.access_token !== null
  );

  const { products, fetchProducts } = useGetProducts();
  const { headers } = useGetToken();
  const navigate = useNavigate();

  const fetchAvailableMoney = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:3001/auth/available-money/${localStorage.getItem(
        "userID"
      )}`,
      { headers }
    );
    setAvailableMoney(res.data.availableMoney);
  }, [headers]);

  const fetchPurchasedItems = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:3001/products/purchased-items/${localStorage.getItem(
        "userID"
      )}`,
      { headers }
    );

    setPurchaseItems(res.data.purchasedItems);
  }, [headers]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAvailableMoney();
      fetchPurchasedItems();
    }
  }, [isAuthenticated, fetchAvailableMoney, fetchPurchasedItems]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.clear();
      setCookies("access_token", null);
    }
  }, [isAuthenticated, setCookies]);

  const getCartItemCount = (itemId: string): number => {
    return cartItems[itemId] || 0;
  };

  const getTotalCartAmount = (): number => {
    if (products.length === 0) return 0;
  
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = products.find((product) => product["_id"] === item) as IProduct | undefined;
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo["price"];
        }
      }
    }
    return Number(totalAmount.toFixed(2));
  };
  
  
  

  const addToCart = (itemId: string) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => {
      const updatedCartItems = { ...prev };
      if (updatedCartItems[itemId] > 0) {
        updatedCartItems[itemId] -= 1;
      }
      return updatedCartItems;
    });
  };

  const updateCartItemCount = (newAmount: number, itemId: string) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = async () => {
    const body = { customerID: localStorage.getItem("userID"), cartItems };
    try {
      const res = await axios.post(
        "http://localhost:3001/products/checkout",
        body,
        { headers }
      );
      setPurchaseItems(res.data.purchasedItems);
      fetchAvailableMoney();
      fetchProducts();
      navigate("/");
    } catch (error) {
      const err = error as AxiosError<IErrorResponse>;
      let errorMessage: string = "";
      switch (err.response?.data.type) {
        case ProductErrors.NO_PRODUCT_FOUND:
          errorMessage = "No product found";
          break;
        case ProductErrors.NO_AVAILABLE_MONEY:
          errorMessage = "Not enough money";
          break;
        case ProductErrors.NOT_ENOUGH_STOCK:
          errorMessage = "Not enough stock";
          break;
        default:
          errorMessage = "Something went wrong";
      }
      alert("ERROR: " + errorMessage);
    }
  };
  
  

  const contextValue: IShopContext = {
    getCartItemCount,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
    availableMoney,
    fetchAvailableMoney,
    purchasedItems,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
