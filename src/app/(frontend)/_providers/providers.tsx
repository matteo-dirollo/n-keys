"use client";

import { AuthProvider } from "@/app/(frontend)/_providers/auth";
import { CartProvider } from "react-use-cart";
import { CookiesProvider } from "react-cookie";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <CookiesProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </CookiesProvider>
  );
};
