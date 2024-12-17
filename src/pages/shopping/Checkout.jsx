import React, { useState } from "react";
import checkout from "../../assets/images/checkout.jpg";
import Address from "./Address";
import UserCartContent from "./CartContent";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const { orderId, isLoading } = useSelector((state) => state.shopOrder);

  const totalCartAmount =
    cartItems?.data?.items?.reduce(
      (sum, item) =>
        sum +
        (item?.salePrice > 0 ? item.salePrice : item?.price) * item?.quantity,
      0
    ) || 0;

  function handleInitiatePayment() {
    const orderData = {
      userId: user?.id,
      cartItems: cartItems?.data?.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
      },
      totalAmount: totalCartAmount,
      paymentMethod: "razorpay",
    };

    // Dispatch Redux action to create order
    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        const { orderId, amount, currency } = data.payload;

        // Initialize Razorpay Checkout
        const options = {
          key: "rzp_test_bvgyaHLOABdgT3",
          amount: amount,
          currency: currency,
          name: "Your Store Name",
          description: "Order Payment",
          order_id: orderId,
          handler: function (response) {
            alert("Payment Successful: " + response.razorpay_payment_id);
            console.log("Payment Response: ", response);
            // Handle payment success (update backend)
            window.location.reload();
          },
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: currentSelectedAddress?.phone,
          },
          notes: {
            address: currentSelectedAddress?.address,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Order creation failed!");
      }
    });
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-[100vw] overflow-hidden">
        <img
          src={checkout}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems?.data?.items.map((cartItem, index) => (
            <UserCartContent cartItem={cartItem} key={index} />
          ))}
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">₹{totalCartAmount}</span>
          </div>
          <Button
            className="w-full mt-4"
            onClick={handleInitiatePayment}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Checkout with Razorpay"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
