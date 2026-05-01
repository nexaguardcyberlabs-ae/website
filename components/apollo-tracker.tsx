"use client";

import Script from "next/script";

type ApolloWindow = Window &
  typeof globalThis & {
    trackingFunctions?: {
      onLoad: (opts: { appId: string }) => void;
    };
  };

export default function ApolloTracker() {
  return (
    <Script
      id="apollo-tracker"
      onLoad={() => {
        (window as ApolloWindow).trackingFunctions?.onLoad({
          appId: "69f49473ce27c70015ebed16",
        });
      }}
      src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js"
      strategy="afterInteractive"
    />
  );
}
