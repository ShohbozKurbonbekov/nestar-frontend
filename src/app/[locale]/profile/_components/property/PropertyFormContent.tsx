"use client";

import { useState } from "react";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { BasicInfoStep } from "./BasicInfoStep";
import { DetailsStep } from "./DetailsStep";
import { MediaStep } from "./MediaStep";

const steps = ["Basic Info", "Details", "Media"];

const stepFields = [
  ["propertyTitle", "propertyType", "propertyLocation", "propertyAddress"],
  ["propertyPrice", "propertySquare", "propertyRooms", "propertyBeds"],
  ["propertyImages"],
];

interface PropertyFormContentType {
  onSubmit: (values: any) => Promise<any>;
}
export default function PropertyFormContent({ onSubmit }: any) {
  const [activeStep, setActiveStep] = useState(0);
  const {
    trigger,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger(stepFields[activeStep]);
    if (!isValid) return;

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <BasicInfoStep />;
      case 1:
        return <DetailsStep />;
      case 2:
        return <MediaStep />;
      default:
        return null;
    }
  };

  return (
    <Box className="w-full md:max-w-4xl md:mx-auto  p-4">
      {/* Stepper */}
      <Stepper
        sx={{
          "& .MuiSvgIcon-root.MuiStepIcon-root.Mui-active": {
            color: "#10B981",
          },
        }}
        activeStep={activeStep}
        className="mb-6 bg-emerald-100 py-3 px-2 rounded-md"
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      {renderStep()}

      {/* Navigation */}
      <Box className="flex justify-between mt-6">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className="capitalize"
        >
          Back
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            className="capitalize"
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
}
