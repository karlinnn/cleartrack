"use client";

import { useState, useCallback } from "react";

const STORAGE_KEY = "ct_quote_draft";

function loadDraft<T>(fallback: T): T {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return { ...fallback, ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  return fallback;
}

function saveDraft(data: unknown) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

function clearDraft() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function useMultiStepForm<T extends Record<string, unknown>>(
  initialData: T,
  totalSteps: number,
) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<T>(() => loadDraft(initialData));

  const update = useCallback((patch: Partial<T>) => {
    setData((prev) => {
      const next = { ...prev, ...patch };
      saveDraft(next);
      return next;
    });
  }, []);

  const next = useCallback(() => setStep((s) => Math.min(s + 1, totalSteps - 1)), [totalSteps]);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);
  const goTo = useCallback((i: number) => setStep(i), []);
  const reset = useCallback(
    (fresh: T) => {
      clearDraft();
      setData(fresh);
      setStep(0);
    },
    [],
  );

  return { step, data, update, next, back, goTo, reset, clearDraft };
}
