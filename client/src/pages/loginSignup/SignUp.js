import * as React from "react";
import { useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import showToast from "./showToast";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const defaultTheme = createTheme();

export default function SignUp() {
  const [user_name, setName] = useState("");
  const [role, setRole] = useState("freelancer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  console.log(user_name, role, email, password);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3002/api/auth/register", {
        user_name,
        role,
        email,
        password,
      })
      .then((res) => {
        showToast(res.data.code);
        console.log(res);
        if (res.data.code === "400") {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full bg-[#F6F6F6] h-screen flex justify-center items-center">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" className="" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#141C3A" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
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
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    inputprops={{
                      style: { color: "#023246" },
                    }}
                    inputlabelprops={{
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
                  >
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      label="Role"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <MenuItem value={"client"}>Client</MenuItem>
                      <MenuItem value={"freelancer"}>Freelancer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
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
                </Grid>
              </Grid>
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
                Sign Up
              </Button>
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
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Already have an account? Sign in
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
