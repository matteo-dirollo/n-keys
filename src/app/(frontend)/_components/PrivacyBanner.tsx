"use client";

import Link from "next/link";
import * as React from "react";
import { usePrivacy } from "../_providers/privacy";

export const PrivacyBanner: React.FC = () => {
  const [closeBanner, setCloseBanner] = React.useState(false);
  const [animateOut, setAnimateOut] = React.useState(false);

  const { showConsent, updateCookieConsent } = usePrivacy();

  const handleCloseBanner = () => {
    setAnimateOut(true);
  };

  React.useEffect(() => {
    if (animateOut) {
      setTimeout(() => {
        setCloseBanner(true);
      }, 300);
    }
  }, [animateOut]);

  if (!showConsent || closeBanner) {
    return null;
  }

  return (
    <div
      className={[
        "fixed z-[100] bottom-4 left-1/2 -translate-x-1/2 w-[95vw] max-w-full sm:right-6 sm:left-auto sm:translate-x-0 sm:w-max sm:max-w-[calc(theme(spacing.32)*8)] border border-border transition-transform duration-300 ease-out",
        animateOut ? "translate-y-full" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex flex-col justify-between items-center relative bg-black px-4 py-3 sm:p-6">
        <p className="m-0 text-base text-white text-left">
          We use cookies, subject to your consent, to analyze the use of our
          website and to ensure you get the best experience. Third parties with
          whom we collaborate can also install cookies in order to show you
          personalized advertisements on other websites. Read our{" "}
          <Link
            className="text-white border-b border-dotted border-current transition hover:opacity-80 hover:text-purple-600"
            href="/cookie"
            prefetch={false}
          >
            cookie policy
          </Link>{" "}
          for more information.
        </p>
        <div className="flex flex-col gap-3 mt-6 w-full sm:flex-row sm:gap-4">
          <button
            className="w-full sm:w-1/2 py-2 px-4 rounded border text-white border-white hover:border-gray-200 transition"
            onClick={() => {
              updateCookieConsent(false);
              handleCloseBanner();
            }}
          >
            Dismiss
          </button>
          <button
            className="w-full sm:w-1/2 py-2 px-4 rounded bg-white border border-white text-black hover:bg-gray-300 hover:border-gray-300 transition"
            onClick={() => {
              updateCookieConsent(true);
              handleCloseBanner();
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
