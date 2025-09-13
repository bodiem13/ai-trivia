"use client";

import { ReactNode, useEffect, useState } from "react";
import { OpenAPI } from "../../../packages/QuestionAPI/src";

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://localhost:51071/api";
    OpenAPI.WITH_CREDENTIALS = false;

    console.log("OpenAPI.BASE initialized:", OpenAPI.BASE);
    setInitialized(true);
  }, []);

  if (!initialized) return <div>Loading...</div>; // block rendering until API is ready
  return <>{children}</>;
};
