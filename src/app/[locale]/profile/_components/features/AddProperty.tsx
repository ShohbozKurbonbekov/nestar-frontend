"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import PropertyForm from "../property/PropertyForm";
import { sweetErrorHandling, sweetMixinSuccessAlert } from "@/libs/sweetAlert";
import { CREATE_PROPERTY, UPDATE_PROPERTY } from "@/apollo/user/mutation";
import { useMutation, useQuery } from "@apollo/client";
import ProfileContentHeader from "../ProfileContentHeader";
import { GET_PROPERTY } from "@/apollo/user/query";

/// ------------------------------- Component ------------------------
export default function AddProperty() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");

  // ************************ Apollo  ************************
  const [createProperty] = useMutation(CREATE_PROPERTY);
  const [updateProperty] = useMutation(UPDATE_PROPERTY);
  const { data: getPropertyData } = useQuery(GET_PROPERTY, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: propertyId,
    },
    skip: !propertyId,
  });

  // ************************ Apollo  End ************************

  const onUpdate = useCallback(
    async (value: any) => {
      if (!getPropertyData) return;
      const params = new URLSearchParams();
      params.set("tab", "myProperties");

      try {
        await updateProperty({
          variables: {
            input: { _id: getPropertyData.getProperty._id, ...value },
          },
        });

        await sweetMixinSuccessAlert(
          "This property has been updated successfully.",
        );
        router.replace(`${window.location.pathname}?${params.toString()}`);
      } catch (error: any) {
        await sweetErrorHandling(error);
      }
    },
    [updateProperty, router],
  );
  /// ------------------------------- Handlers ------------------------
  const onSubmit = useCallback(
    async (value: any) => {
      console.log("VALUES: ", value);
      const params = new URLSearchParams();
      params.set("tab", "myProperties");
      try {
        await createProperty({
          variables: {
            input: value,
          },
        });
        await sweetMixinSuccessAlert("Property Created Sucessfully");
        router.replace(`${window.location.pathname}?${params.toString()}`);
      } catch (error: any) {
        console.log("Error in onSubmit property: ", error);
        sweetErrorHandling(error);
      }
    },
    [createProperty, router],
  );
  /// ------------------------------- Render ------------------------
  return (
    <div className="h-full flex flex-col">
      <ProfileContentHeader
        subtitle="Fill in the details to create a new property listing.
"
        title="We are glad to see you again!"
      />

      <PropertyForm
        propertyData={getPropertyData?.getProperty}
        onSubmit={onSubmit}
        onUpdate={onUpdate}
      />
    </div>
  );
}
