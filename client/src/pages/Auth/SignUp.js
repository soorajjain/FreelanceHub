import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Avatar,
  Typography,
  Container,
  Grid,
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import validator from "validator";

import CustomToastContainer from "../../components/common/ToastContainer";
import axios from "axios";

const theme = createTheme();

const Register = () => {
  const [user_name, setName] = useState("");
  const [role, setRole] = useState("freelancer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Strong Password");
    } else {
      setErrorMessage("Is Not Strong Password");
    }
  };

  const handleSubmit = async (event) => {
    if (user_name && user_name.length < 4) {
      toast.error("Username should be more than 4 letters!!");
    }
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3002/auth/users/register",
        { user_name, role, email, password }
      );
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        toast.success("Redirecting to Login Page", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 1000);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.msg || "Failed to register. Please try again."
        );
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="h-[100vh] w-full justify-center items-center"
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
                  InputProps={{ style: { color: "#023246" } }}
                  InputLabelProps={{ style: { color: "#023246" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#023246" },
                      "&:hover fieldset": { borderColor: "#023246" },
                      "&.Mui-focused fieldset": { borderColor: "#023246" },
                    },
                    "& input:focus": {
                      outline: "none",
                      boxShadow: "none",
                      borderColor: "transparent",
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
                  InputProps={{ style: { color: "#023246" } }}
                  InputLabelProps={{ style: { color: "#023246" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#023246" },
                      "&:hover fieldset": { borderColor: "#023246" },
                      "&.Mui-focused fieldset": { borderColor: "#023246" },
                      "& input:focus": {
                        outline: "none",
                        boxShadow: "none",
                        borderColor: "transparent",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select"
                    value={role}
                    label="Role"
                    onChange={(e) => setRole(e.target.value)}
                    inputProps={{ style: { color: "#023246" } }}
                    inputlabelprops={{ style: { color: "#023246" } }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#023246" },
                        "&:hover fieldset": { borderColor: "#023246" },
                        "&.Mui-focused fieldset": { borderColor: "#023246" },
                        "& input:focus": {
                          outline: "none",
                          boxShadow: "none",
                          borderColor: "transparent",
                        },
                      },
                    }}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validate(e.target.value);
                  }}
                  InputProps={{ style: { color: "#023246", border: "0px" } }}
                  InputLabelProps={{ style: { color: "#023246" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#023246" },
                      "&:hover fieldset": { borderColor: "#023246" },
                      "&.Mui-focused fieldset": { borderColor: "#023246" },
                      "& input:focus": {
                        outline: "none",
                        boxShadow: "none",
                        borderColor: "transparent",
                      },
                    },
                  }}
                />

                {errorMessage === "" ? null : (
                  <span
                    style={{
                      margin: "10px",
                      // paddingTop : "20px",
                      fontWeight: "bold",
                      color: "#023246",
                      fontSize: "14px",
                    }}
                  >
                    {errorMessage}
                  </span>
                )}
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
                "&:hover": { backgroundColor: "#1A237E" },
                "&:active": { backgroundColor: "#3949AB" },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2" style={{ color: "#023246" }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <CustomToastContainer />
      </Container>
    </ThemeProvider>
  );
};

export default Register;
