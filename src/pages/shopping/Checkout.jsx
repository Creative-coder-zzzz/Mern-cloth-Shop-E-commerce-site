import React from "react";
import checkout from "../../assets/images/checkout.jpg";
import Address from "./Address";
import UserCartContent from "./CartContent";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);

  console.log(cartItems);

  const totalCartAmount =
    cartItems && cartItems?.data?.items?.length > 0
      ? cartItems?.data?.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-[100vw] overflow-hidden ">
        <img
          src={checkout}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems?.data?.items && cartItems?.data?.items?.length > 0
            ? cartItems?.data?.items.map((cartItem, index) => (
                <UserCartContent cartItem={cartItem} key={index} />
              ))
            : null}
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${totalCartAmount}</span>
          </div>
          <div className="mt-4 w-full">
            <Button className="w-full">Checkout with PayPal</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
