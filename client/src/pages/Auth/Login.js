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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import { login } from "../../api/auth";
import CustomToastContainer from "../../components/common/ToastContainer";
import { jwtDecode } from "jwt-decode";

const theme = createTheme();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await login({ email, password });
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      const { token } = res.data;
      if (token) {
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        const { role } = decodedToken;
        setTimeout(() => {
          toast.success(
            `Redirecting to ${
              role === "freelancer" ? "freelancer" : "client"
            } dashboard`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }, 1000);
        setTimeout(() => {
          if (role === "freelancer") {
            navigate("/find_jobs");
          } else if (role === "client") {
            navigate("/post_job");
          }
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.msg || "Failed to login. Please try again."
        );
      }
    }
  };

  return (
    <div>
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
                InputProps={{ style: { color: "#023246" } }}
                InputLabelProps={{ style: { color: "#023246" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#023246" },
                    "&:hover fieldset": { borderColor: "#023246" },
                    "&.Mui-focused fieldset": { borderColor: "#023246" },
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
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{ style: { color: "#023246" } }}
                InputLabelProps={{ style: { color: "#023246" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#023246" },
                    "&:hover fieldset": { borderColor: "#023246" },
                    "&.Mui-focused fieldset": { borderColor: "#023246" },
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
                  "&:hover": { backgroundColor: "#1A237E" },
                  "&:active": { backgroundColor: "#3949AB" },
                }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    to="/register"
                    variant="body2"
                    style={{ color: "#023246" }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <CustomToastContainer />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Login;
