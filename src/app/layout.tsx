import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Navigation-Builder",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pl">
      <body
        className={`${inter.variable} bg-bg-main flex justify-center py-[30px] px-[20px]`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
