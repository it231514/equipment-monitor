"use client";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import HomeIcon from "@mui/icons-material/Home";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Menu, MenuItem } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Login, Register } from "../dto/auth.dto";
import authApi from "../service/auth";
import "../style/Home.css";
// import useTranslation from "next-translate/useTranslation";

const drawerWidth = 240;

interface Props {
  children?: React.ReactNode;
  // any props that come into the component
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  overflow: "hidden",
  // padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  // transition: theme.transitions.create(["margin", "width"], {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.leavingScreen,
  // }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    // transition: theme.transitions.create(["margin", "width"], {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ children, ...props }: Props) {
  const intialRegister: Register = {};
  const register: Register = {};
  const initialLogin: Login = {};
  const login: Login = {};
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isTabLogin, setIsTabLogin] = useState(true);
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const [registrationValues, setRegistrationValues] = useState(register);
  const [loginValues, setLoginValues] = useState(login);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const addToRefs = (el: HTMLInputElement) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (path: string) => {
    router.push(path);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function openPopup() {
    throw new Error("Function not implemented.");
  }

  const clearInputFields = () => {
    inputRefs.current.forEach((input) => {
      if (input) input.value = "";
    });
  };

  const openLoginTab = (isTabLogin: boolean) => {
    setIsTabLogin(isTabLogin);
  };

  const handleRegistrationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setRegistrationValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRegistrationSubmit = () => {
    console.log(registrationValues);
    if (registrationValues.repeatPassword) {
      delete registrationValues.repeatPassword;
    }
    authApi.register(registrationValues).then((response) => {
      console.log(response);
    });
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleLoginSubmit = () => {
    console.log(loginValues);
    authApi.login(loginValues).then((response) => {
      console.log(response);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      authApi
        .getUserData()
        .then((response) => {
          // setUserState(true);
        })
        .catch((error) => {
          // alert("Error: " + error);
        });
    }
  });
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {auth && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Equipment Management
          </Typography>
          {/* <h1>{t("title")}</h1> */}
          {auth ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    window.location.reload();
                    router.push("/");
                  }}
                >
                  Logout
                </MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setIsLoginPressed(true)}
              color="inherit"
            >
              Login
            </Button>
          )}
        </Toolbar>
        <div
          id="idDialogLogin"
          className="dialog"
          style={{ display: isLoginPressed ? "block" : "none" }}
        >
          <form
            method="post"
            onSubmit={(event) => {
              event.preventDefault();
            }}
            className="dialog-content animateDialog"
          >
            <span
              onClick={() => {
                setIsLoginPressed(false);
                openLoginTab(true);
                setLoginValues(initialLogin);
                setRegistrationValues(intialRegister);
                clearInputFields();
              }}
              className="closeDialog"
            >
              &times;
            </span>
            <div className="tab">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  openLoginTab(true);
                  setLoginValues(initialLogin);
                  setRegistrationValues(intialRegister);
                  clearInputFields();
                }}
                className={isTabLogin ? "active tablinks" : "tablinks"}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  openLoginTab(false);
                  setLoginValues(initialLogin);
                  setRegistrationValues(intialRegister);
                  clearInputFields();
                }}
                className={!isTabLogin ? "active tablinks" : "tablinks"}
              >
                Register
              </Button>
            </div>

            {isTabLogin ? (
              <div
                id="login"
                className="tabcontent"
                style={{ display: "block" }}
              >
                {/* <!-- Login Tab --> */}
                <div className="loginContainer">
                  <div className="dialogContainer">
                    <label htmlFor="email">
                      <b>Email</b>
                    </label>
                    <input
                      ref={addToRefs}
                      type="email"
                      onChange={handleLoginChange}
                      placeholder="Enter Email"
                      name="email"
                      required
                    />
                    <label htmlFor="password">
                      <b>Password</b>
                    </label>
                    <input
                      ref={addToRefs}
                      onChange={handleLoginChange}
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      required
                    />
                    <button
                      className="loginButton"
                      onClick={() => handleLoginSubmit()}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                id="register"
                className="tabcontent"
                style={{ display: "block" }}
              >
                {/* <!-- Register Tab --> */}
                <div className="loginContainer">
                  <div className="dialogContainer">
                    <label htmlFor="firstName">
                      <b>First Name</b>
                    </label>
                    <input
                      onChange={handleRegistrationChange}
                      type="text"
                      placeholder="Enter First Name"
                      name="firstName"
                      required
                    />
                    <label htmlFor="lastName">
                      <b>Last Name</b>
                    </label>
                    <input
                      onChange={handleRegistrationChange}
                      type="text"
                      placeholder="Enter Last Name"
                      name="lastName"
                      required
                    />
                    <label htmlFor="email">
                      <b>E-Mail adress</b>
                    </label>
                    <input
                      onChange={handleRegistrationChange}
                      type="email"
                      placeholder="Enter E-Mail"
                      name="email"
                      required
                    />
                    <label htmlFor="password">
                      <b>Password</b>
                    </label>
                    <input
                      onChange={handleRegistrationChange}
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      required
                    />
                    <label htmlFor="repeatPassword">
                      <b>Repeat Password</b>
                    </label>
                    <input
                      onChange={handleRegistrationChange}
                      type="password"
                      placeholder="Repeat Password"
                      name="repeatPassword"
                      required
                    />
                    <button
                      className="loginButton"
                      onClick={() => handleRegistrationSubmit()}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* <SidDrawer></SidDrawer> */}
        <List>
          {[
            { text: "Home", path: "/", icon: <HomeIcon></HomeIcon> },
            {
              text: "About",
              path: "/about",
              icon: <HelpCenterIcon></HelpCenterIcon>,
            },
            // {
            //   text: "Contact",
            //   path: "/contact",
            //   icon: <ContactMailIcon></ContactMailIcon>,
            // },
            // {
            //   text: "Sensors",
            //   path: "/sensor",
            //   icon: <SensorsIcon></SensorsIcon>,
            // },
            // {
            //   text: "Sensor Type",
            //   path: "/sensor/sensorType",
            //   icon: <TypeSpecimenIcon></TypeSpecimenIcon>,
            // },
            // {
            //   text: "Messages",
            //   path: "/sensor/message",
            //   icon: <InboxIcon></InboxIcon>,
            // },
            // {
            //   text: "Message Values",
            //   path: "/sensor/message/messageValue",
            //   icon: <MessageIcon></MessageIcon>,
            // },
            // {
            //   text: "Sensor Data",
            //   path: "/sensor/sensorData",
            //   icon: <AutoGraphIcon></AutoGraphIcon>,
            // },
            {
              text: "Equipment",
              path: "/equipment/list",
              icon: <HomeRepairServiceIcon></HomeRepairServiceIcon>,
            },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleListItemClick(item.path)}>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main
        open={open}
        style={{
          backgroundImage: "linear-gradient(358deg, #f4f0f1 30%, #eef6fe 90%)",
        }}
      >
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
