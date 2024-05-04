import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Home from "./pages/Container";
import RecoidContextProvider from "./recoilContextProvider";

const inter = Inter({ subsets: ["latin"] });
const drawerWidth = 240;

export const metadata: Metadata = {
  title: "Equipment Management",
  description: "An app developed by Paul and Elias",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Home>
          <div
            style={
              {
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
              }
            }
          >
            <RecoidContextProvider>{children}</RecoidContextProvider>
          </div>
        </Home>
      </body>
    </html>
  );
}
