import { PropertyLocation, PropertyType } from "@/libs/enums/property.enum";
import { PropertyInput } from "@/libs/types/property/property.input";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import PropertyForm from "../property/PropertyForm";

/// ------------------------------- Component ------------------------
export default function AddProperty() {
  const [propertyInput, setPropertyInput] = useState<PropertyInput>({
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
  });
  /// ------------------------------- Handlers ------------------------
  const onSubmit = (value: any) => {
    console.log("VALUES: ", value);
  };
  /// ------------------------------- Render ------------------------
  return (
    <div className="h-full flex flex-col">
      <div className="border-b text-center border-b-slate-300/80 p-4">
        Header
      </div>
      <PropertyForm defaultValues={propertyInput} onSubmit={onSubmit} />
      <div className="flex-1 flex flex-col justify-end">
        <div className="p-4 border-t border-t-slate-300/80 text-center">
          Pagination
        </div>
      </div>
    </div>
  );
}
