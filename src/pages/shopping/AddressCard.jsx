import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import React from "react";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
}) {
  return (
    <Card
      className=" hover:border-red-300 hover: border-2 "
      onClick={() => setCurrentSelectedAddress(addressInfo)}
    >
      <CardContent className="grid gap-4 p-2">
        <Label className="flex">
          <p className="font-semibold ">Address:</p>
          {addressInfo?.address}{" "}
        </Label>
        <Label className="flex">
          <p className="font-semibold ">City: </p> {addressInfo?.city}{" "}
        </Label>
        <Label className="flex">
          {" "}
          <p className="font-semibold ">Pincode: </p> {addressInfo?.pincode}{" "}
        </Label>
        <Label className="flex">
          {" "}
          <p className="font-semibold ">Phone: </p> {addressInfo?.phone}{" "}
        </Label>
        <Label className="flex">
          {" "}
          <p className="font-semibold ">Notes:</p>
          {addressInfo?.notes}{" "}
        </Label>
      </CardContent>
      <CardFooter className="flex justify-between p-3">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button
          variant="destructive"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
