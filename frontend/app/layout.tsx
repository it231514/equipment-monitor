import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
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
