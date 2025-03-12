import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import { TrainerProvider } from "@/providers/trainer";
import { UserProvider } from "@/providers/userlogin";
import { ClientProvider } from "@/providers/client";

import { FoodProvider } from "@/providers/food-items";
import { MealProvider } from "@/providers/meal-plans";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const fitnessColors = {
  token: {
    colorPrimary: "#04d407",
    colorInfo: "#04d407",
    colorBgSpotlight: "#b3eb24",
    colorTextBase: "#ffffff",
    colorBgBase: "#151516",
    colorBgContainer: "#151516",
    colorBorder: "#a1bf54",
    colorBgElevated: "#e1e4eb",
    colorBorderSecondary: "#bbbbbb",
    colorTextQuaternary: "#ffffff",
    colorTextTertiary: "#ffffff",
    colorTextSecondary: "#ffffff",
    colorText: "#ffffff",
  },
  components: {
    Dropdown: {
      colorText: "rgb(0,0,0)",
      colorTextDisabled: "rgba(0,0,0,0.25)",
      colorTextDescription: "rgba(124,124,124,0.45)",
    },
    Select: {
      colorText: "rgba(255,255,255,0.85)",
      colorTextDisabled: "rgba(245,239,239,0.63)",
      colorBgContainer: "rgb(0,0,0)",
      colorTextQuaternary: "rgb(160,217,17)",
      colorTextPlaceholder: "rgba(255,255,255,0.93)",
      colorBgElevated: "rgb(67,68,66)",
      optionSelectedBg: "rgb(133,134,135)",
      optionActiveBg: "rgba(0,0,0,0.24)",
    },
    Alert: {
      colorTextHeading: "rgb(0,0,0)",
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConfigProvider theme={fitnessColors}>
      <MealProvider>
        <TrainerProvider>
          <ClientProvider>
            <UserProvider>
              <FoodProvider>
                <html lang="en">
                  <body
                    className={`${geistSans.variable} ${geistMono.variable}`}
                  >
                    {children}
                  </body>
                </html>
              </FoodProvider>
            </UserProvider>
          </ClientProvider>
        </TrainerProvider>{" "}
      </MealProvider>
    </ConfigProvider>
  );
}
