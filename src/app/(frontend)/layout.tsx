import type { Metadata } from "next";
import Head from "next/head";
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
        <Head>
          <GoogleAnalytics />
        </Head>
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
