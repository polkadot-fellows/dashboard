import type { Metadata } from "next";
import LayoutClient from "./layoutClient";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Polkadot UI - Apps",
  description: "An apps page build with polkadot-ui and PAPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <LayoutClient>{children}</LayoutClient>;
}
