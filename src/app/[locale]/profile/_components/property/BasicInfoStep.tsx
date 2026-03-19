// steps/BasicInfoStep.tsx
import { RHFInput } from "./RHFInput";
import { RHFSelect } from "./RHFSelect";
import { PropertyLocation, PropertyType } from "@/libs/enums/property.enum";

export const BasicInfoStep = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12">
        <RHFInput name="propertyTitle" label="Property Title" />
      </div>

      <div className="col-span-12 md:col-span-6">
        <RHFSelect
          name="propertyType"
          label="Property Type"
          options={Object.values(PropertyType)}
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <RHFSelect
          name="propertyLocation"
          label="Location"
          options={Object.values(PropertyLocation)}
        />
      </div>

      <div className="col-span-12">
        <RHFInput name="propertyAddress" label="Address" />
      </div>
    </div>
  );
};
