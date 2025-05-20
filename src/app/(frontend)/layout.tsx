import type { Metadata } from "next";
import { GoogleAnalytics } from "./_components/analytics/GoogleAnalytics";
import { GoogleTagManager } from "./_components/analytics/GoogleTagManager";
import { PrivacyProvider } from "../(frontend)/_providers/privacy";

import "./globals.css";

import type React from "react";

import { Providers } from "./_providers/providers";

export const metadata: Metadata = {
  description: "A blank template using Payload in a Next.js app.",
  title: "Payload Blank Template",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html data-mode="light" lang="en">
      <PrivacyProvider>
        <head>
          <link
            href="https://api.github.com/repos/payloadcms/payload"
            rel="dns-prefetch"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"
            rel="stylesheet"
          />
          <link href="https://www.googletagmanager.com" rel="preconnect" />
          <link href="https://www.google-analytics.com" rel="preconnect" />
          <GoogleAnalytics />
        </head>
        <body>
          <GoogleTagManager />
          <Providers>
            <main className="relative">{children}</main>
          </Providers>
        </body>
      </PrivacyProvider>
    </html>
  );
}
