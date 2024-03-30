import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

type Anchor = "top" | "left" | "bottom" | "right";
export default function SidDrawer() {
  const navigate = useNavigate();

  function handleClick(path: string) {
    navigate(path);
  }

  // async function getMessageData() {
  //   const mesages = await sensorApi.getMessage();
  //   setMessage(mesages);
  // }
  // async function getMessageValueData() {
  //   const mesages = await sensorApi.getMessageValue();
  //   setMessageValue(mesages);
  // }
  // async function getSensorData() {
  //   const mesages = await sensorApi.getSensor();
  //   setSensor(mesages);
  // }
  // async function getSensorTypeData() {
  //   const mesages = await sensorApi.getSensorType();
  //   setSensorType(mesages);
  // }

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() =>
                index % 2 === 0 ? handleClick("/") : handleClick("/landingPage")
              }
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider /> */}
      <List>
        {[
          { text: "Home", path: "/" },
          { text: "About", path: "/about" },
          { text: "Landing Pafe", path: "/landingPage" },
          { text: "Sensor Data", path: "/sensorData" },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleClick(item.path)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return <>{list("left")}</>;
}
