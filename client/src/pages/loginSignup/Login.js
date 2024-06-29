import * as React from "react";
import { jwtDecode } from "jwt-decode";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import showToast from "./showToast";
import axios from "axios";

const defaultTheme = createTheme();

export default function LoginJobGiver() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3002/api/auth/login", { email, password })
      .then((res) => {
        showToast(res.data.code);

        if (res.data.code === "400") {
          const { token } = res.data;
          //   console.log(token);

          if (token) {
            // Save token to localStorage or state
            localStorage.setItem("token", token);

            // Decode token to get user role
            const decoded = jwtDecode(token);
            // console.log(decoded);
            const { role } = decoded;
            // console.log(role);

            // Navigate based on role
            if (role === "freelancer") {
              navigate("/find_jobs");
            } else if (role === "client") {
              navigate("/post_job");
            }
          }
        }

        //   setTimeout(() => {
        //     navigate("/find_freelancers");
        //   }, 1000);
      })
      .catch((err) => {
        console.log(err);
        showToast("500");
      });
  };
  return (
    <div className="w-full bg-[#F6F6F6] h-screen flex justify-center items-center">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#023246" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  style: { color: "#023246" },
                }}
                InputLabelProps={{
                  style: { color: "#023246" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#023246",
                    },
                    "&:hover fieldset": {
                      borderColor: "#023246",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#023246",
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputProps={{
                  style: { color: "#023246" },
                }}
                InputLabelProps={{
                  style: { color: "#023246" },
                }}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#023246",
                    },
                    "&:hover fieldset": {
                      borderColor: "#023246",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#023246",
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#141C3A",
                  "&:hover": {
                    backgroundColor: "#1A237E", // Set your desired hover color here
                  },
                  "&:active": {
                    backgroundColor: "#3949AB", // Set your desired active color here
                  },
                }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link
                    to="/register"
                    variant="body2"
                    sx={{ color: "#023246" }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </Container>
      </ThemeProvider>
    </div>
  );
}
