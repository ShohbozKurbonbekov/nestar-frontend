// steps/DetailsStep.tsx

import { RHFInput } from "./RHFInput";
import { RHFNumberInput } from "./RHFNumberInput";
import { RHFRadio } from "./RHFRadio";

export const DetailsStep = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 md:col-span-6">
        <RHFNumberInput name="propertyPrice" label="Price" />
      </div>

      <div className="col-span-12 md:col-span-6">
        <RHFNumberInput name="propertySquare" label="Square (m²)" />
      </div>

      <div className="col-span-12 md:col-span-4">
        <RHFNumberInput name="propertyRooms" label="Rooms" />
      </div>

      <div className="col-span-12 md:col-span-4">
        <RHFNumberInput name="propertyBeds" label="Beds" />
      </div>

      <div className="col-span-12 md:col-span-6">
        <RHFRadio
          name="propertyRent"
          label="For Rent"
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false },
          ]}
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <RHFRadio
          name="propertyBarter"
          label="Barter"
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false },
          ]}
        />
      </div>

      <div className="col-span-12">
        <RHFInput name="propertyDesc" label="Description" multiline rows={4} />
      </div>
    </div>
  );
};
