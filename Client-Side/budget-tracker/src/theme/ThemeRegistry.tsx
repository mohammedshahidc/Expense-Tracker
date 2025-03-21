"use client";

import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "./theme";
import createEmotionCache from "@/CreateEmotionCache";

const clientSideEmotionCache = createEmotionCache();

export default function ThemeRegistry({
  children,
  emotionCache = clientSideEmotionCache, // Accept cache from _document
}: {
  children: React.ReactNode;
  emotionCache?: EmotionCache;
}) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}