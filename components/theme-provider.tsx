"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"      // importante para Tailwind dark/light
      defaultTheme="system"  // opcional: 'light', 'dark' o 'system'
      enableSystem={true}    // permite que siga el sistema
    >
      {children}
    </NextThemesProvider>
  );
}

