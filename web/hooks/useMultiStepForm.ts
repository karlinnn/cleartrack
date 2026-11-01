"use client";

import { useState, useCallback } from "react";
import { validateStep, QuoteData, Errors } from "@/lib/validation";

export interface UseMultiStepFormOptions {
  totalSteps: number;
  initialData?: QuoteData;
  onStepChange?: (step: number) => void;
}

export interface UseMultiStepForm {
  step: number;
  data: QuoteData;
  errors: Errors;
  setField: (key: string, value: unknown) => void;
  next: () => boolean;
  back: () => void;
  goTo: (step: number) => void;
  clearErrors: () => void;
}

export function useMultiStepForm({
  totalSteps,
  initialData = {},
  onStepChange,
}: UseMultiStepFormOptions): UseMultiStepForm {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuoteData>(initialData);
  const [errors, setErrors] = useState<Errors>({});

  const setField = useCallback((key: string, value: unknown) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const clearErrors = useCallback(() => setErrors({}), []);

  const next = useCallback((): boolean => {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return false;
    }
    setErrors({});
    if (step < totalSteps) {
      const nextStep = step + 1;
      setStep(nextStep);
      onStepChange?.(nextStep);
    }
    return true;
  }, [step, data, totalSteps, onStepChange]);

  const back = useCallback(() => {
    setErrors({});
    if (step > 1) {
      const prevStep = step - 1;
      setStep(prevStep);
      onStepChange?.(prevStep);
    }
  }, [step, onStepChange]);

  const goTo = useCallback(
    (target: number) => {
      if (target >= 1 && target <= totalSteps) {
        setErrors({});
        setStep(target);
        onStepChange?.(target);
      }
    },
    [totalSteps, onStepChange]
  );

  return { step, data, errors, setField, next, back, goTo, clearErrors };
}
