// Entrypoint for all providers
"use client";

import React, { ReactNode } from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { TriviaProvider } from "./TriviaProvider";
import { ApiProvider } from "./ApiProvider";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <FluentProvider theme={webLightTheme}>
        <ApiProvider>
            <TriviaProvider>
                {children}
            </TriviaProvider>
        </ApiProvider>
    </FluentProvider>
  );
};
