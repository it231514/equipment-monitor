"use client";
import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { keyframes } from "@emotion/react";
import { useRouter } from "next/navigation";
import "./styles.css";

const useStyles = makeStyles((theme: any) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: "linear-gradient(358deg, #f4f0f1 30%, #abd4fc 90%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    animation: `$pulse 2s infinite`,
    backgroundColor: "#fbdc00",
    textAlign: "start",
    color: "#0000008a",
  },

  "@keyframes pulse": {
    "0%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1.05)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
}));

function LandingPage() {
  const router = useRouter();
  const classes = useStyles();

  return (
    <div className="w-full min-h-[calc(100vh-64px)] back root">
      <div className="flex">
        <Container maxWidth="md" sx={{ marginTop: "10%" }}>
          <Box sx={{ my: 4, color: "white", textAlign: "start" }}>
            <Typography
              sx={{ margin: 0 }}
              variant="h2"
              component="h1"
              gutterBottom
            >
              Equipment Management Application
            </Typography>
            <Typography variant="body1" component="h3" gutterBottom>
              Manage your equipment efficiently and effortlessly
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              onClick={() => router.push("/equipment/list")}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default LandingPage;
