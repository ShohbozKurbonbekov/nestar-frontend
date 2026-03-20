import { PropertyLocation, PropertyType } from "@/libs/enums/property.enum";
import { PropertyInput } from "@/libs/types/property/property.input";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import PropertyForm from "../property/PropertyForm";
import { Typography } from "@mui/material";
import { sweetErrorHandling, sweetMixinSuccessAlert } from "@/libs/sweetAlert";
import { CREATE_PROPERTY } from "@/apollo/user/mutation";
import { useMutation } from "@apollo/client";
import { getJwtToken } from "@/libs/auth";

/// ------------------------------- Component ------------------------
export default function AddProperty() {
  const token = getJwtToken();
  const router = useRouter();
  const propertyInput = {
    propertyTitle: "",
    propertyPrice: 0,
    propertyType: PropertyType.APARTMENT,
    propertyLocation: PropertyLocation.SEOUL,
    propertyAddress: "",
    propertyBarter: false,
    propertyRent: false,
    propertyRooms: 0,
    propertyBeds: 0,
    propertySquare: 0,
    propertyDesc: "",
    propertyImages: [],
  };

  // ************************ Apollo  ************************
  const [createProperty] = useMutation(CREATE_PROPERTY);
  // ************************ Apollo  End ************************

  /// ------------------------------- Handlers ------------------------
  const onSubmit = useCallback(
    async (value: any) => {
      try {
        await createProperty({
          variables: {
            input: value,
          },
        });
        await sweetMixinSuccessAlert("Property Created Sucessfully");
        router.push(`?tab=myProperties`);
      } catch (error: any) {
        console.log("Error in onSubmit property: ", error);
        sweetErrorHandling(error);
      }
    },
    [createProperty],
  );
  /// ------------------------------- Render ------------------------
  return (
    <div className="h-full flex flex-col">
      <div className="text-slate-600 border-b text-center border-b-slate-300/80 p-4">
        <Typography variant="h6" className="">
          Fill in the details to create a new property listing.
        </Typography>
        <Typography className="body2">We are glad to see you again!</Typography>
      </div>

      <PropertyForm defaultValues={propertyInput} onSubmit={onSubmit} />
    </div>
  );
}
