"use client";

import React, { ReactNode } from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { TriviaProvider } from "./TriviaProvider";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <FluentProvider theme={webLightTheme}>
      <TriviaProvider>
        {children}
      </TriviaProvider>
    </FluentProvider>
  );
};
