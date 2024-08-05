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
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: "",
    role: "freelancer",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // for error messsage of validator
  const [errors, setErrors] = useState({}); // for Whole form validation

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const newErrors = validateForm(formData);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const res = await axios.post(
          "http://localhost:3002/auth/users/register",
          formData
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
        console.log("Form submitted successfully!");
      } else {
        console.log(errors);
        toast.error(String(Object.values(newErrors)[0]));
        console.log("Form submission failed due to validation errors.");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.msg || "Failed to register. Please try again."
        );
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.user_name.trim()) {
      errors.user_name = "Username is required";
    } else if (data.user_name.length < 4) {
      errors.user_name = "Username must be at least 4 characters long";
    }

    if (data.email.trim() && !/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (data.password.length < 8 && !passwordRegex.test(data.password)) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
    }
    return errors;
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
                  name="user_name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formData.user_name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                    name="role"
                    label="Role"
                    value={formData.role}
                    onChange={handleChange}
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
                    handleChange(e);
                    validate(e.target.value);
                  }}
                  value={formData.password}
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
