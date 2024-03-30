"use client";
import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

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

function ContactPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            You can reach us at contact@equipmentmanager.com or call us at
            123-456-7890.
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default ContactPage;
