import React, { useEffect, useState } from "react";
import logo from "../../assets/Freelance-Hub-logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Hamburger from "hamburger-react";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { jwtDecode } from "jwt-decode";
import profile from "../../assets/profile.png";

const Navbar = () => {
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);

  const navigate = useNavigate();
  const handleScroll = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // menu bar for small screen
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!isOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  // navbar setup for role based starts here
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        if (decodedToken.role) {
          setRole(decodedToken.role);
          setName(decodedToken.name);
          console.log("role : " + decodedToken.role);
        }
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleLogout = () => {
    setShowConfirmLogout(false);
    localStorage.removeItem("token");
    // const token = localStorage.getItem("token");
    // console.log("logout : " + token);
    setRole(null);
    navigate("/");
  };

  const handleLogoutClick = () => {
    setShowConfirmLogout(true);
  };

  const handleCancelLogout = () => {
    setShowConfirmLogout(false);
  };

  return (
    <div id="home" className="w-full bg-[#F6F6F6]">
      <nav className="Navbar max-w-[1170px] text-[#141C3A] lg:mx-auto flex justify-between py-4 sm:py-8 bg-[#F6F6F6] mx-3 ">
        <div className="flex gap-10 items-center">
          {role === "client" ? (
            <>
              <Link to="/client/freelancers" className="px-1">
                <img src={logo} className="sm:w-[200px] w-[150px]" alt="logo" />
              </Link>
              <Link
                to="/client/freelancers"
                className="hidden text-black hover:text-[#023246] md:block"
              >
                Freelancers
              </Link>
              <Link
                to="/client/postJob"
                className="hidden text-black hover:text-[#023246] md:block"
              >
                Post Job
              </Link>
              <Link
                to="/client/projects"
                className="hidden text-black hover:text-[#023246] md:block"
              >
                Projects
              </Link>
            </>
          ) : role === "freelancer" ? (
            <>
              <Link to="/findJobs" className="px-1">
                <img src={logo} className="sm:w-[200px] w-[150px]" alt="logo" />
              </Link>
              <Link
                to="/freelancer/findJobs"
                className="hidden text-black hover:text-[#023246] md:block"
              >
                Find Jobs
              </Link>
              <Link
                to="/freelancer/freelancerProject"
                className="hidden text-black hover:text-[#023246] md:block"
              >
                Project
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="px-1">
                <img src={logo} className="sm:w-[200px] w-[150px]" alt="logo" />
              </Link>
              <a
                href="#how-it-works"
                onClick={handleScroll}
                className="hidden text-black hover:text-[#023246] md:block"
              >
                How Freelance Hub works
              </a>
              <a
                href="#about"
                onClick={handleScroll}
                className="hidden text-black hover:text-[#023246] md:block"
              >
                About Us
              </a>
            </>
          )}
        </div>

        <div className="relative flex gap-6 items-center mx-4">
          {role ? (
            <>
              <span className="hidden lg:block">
                Hello <span>{name}</span> 👋👋
              </span>
              <Link className="ml-[-35px] md:p-2 md:px-6 p-2 px-3 hidden lg:block">
                <img
                  className="h-14 w-14 border rounded-full"
                  src={profile}
                  alt="Profile"
                />
              </Link>
              <button
                className="border-[2px] border-[#023246] hover:bg-[#023246] hover:text-[#FFFFFF] rounded-3xl md:p-2 md:px-6 p-2 px-3 hidden sm:block"
                onClick={handleLogoutClick}
              >
                Logout
              </button>

              {showConfirmLogout && (
                <div className="absolute top-36 right-2 w-full h-full flex items-center justify-center text-[#023246] bg-opacity-50">
                  <div className=" bg-white p-6 rounded-lg shadow-lg">
                    <p>Are you sure you want to logout?</p>
                    <div className="flex gap-4 mt-4">
                      <button
                        className="bg-[#023246] text-white  px-4 py-2 rounded"
                        onClick={handleLogout}
                      >
                        Yes, Logout
                      </button>
                      <button
                        className="bg-[#023246] text-white px-4 py-2 rounded"
                        onClick={handleCancelLogout}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/register"
              className="border-[2px] border-[#023246] hover:bg-[#023246] hover:text-[#FFFFFF] rounded-3xl md:p-2 md:px-6 p-2 px-3 hidden sm:block"
            >
              Sign Up
            </Link>
          )}
        </div>

        <div className="sm:hidden">
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Hamburger size={25} toggled={isOpen} toggle={setOpen} />
              </IconButton>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {role === "client" ? (
                <>
                  <Link to="/freelancers">
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <InfoIcon fontSize="small" />
                      </ListItemIcon>
                      Freelancers
                    </MenuItem>
                  </Link>

                  <Divider />

                  <Link to="/postJob">
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <InfoIcon fontSize="small" />
                      </ListItemIcon>
                      Post Job
                    </MenuItem>
                  </Link>
                  <Divider />

                  <Link to="/clientProject">
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <InfoIcon fontSize="small" />
                      </ListItemIcon>
                      Project
                    </MenuItem>
                  </Link>
                  <Divider />
                </>
              ) : role === "freelancer" ? (
                <>
                  <Link to="/findJobs">
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <InfoIcon fontSize="small" />
                      </ListItemIcon>
                      Find Jobs
                    </MenuItem>
                  </Link>

                  <Divider />

                  <Link to="/freelancerProject">
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <InfoIcon fontSize="small" />
                      </ListItemIcon>
                      Project
                    </MenuItem>
                  </Link>
                  <Divider />
                </>
              ) : (
                <>
                  <a href="#how-it-works" onClick={handleScroll}>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <QuestionMarkIcon fontSize="small" />
                      </ListItemIcon>
                      How FH works
                    </MenuItem>
                  </a>
                  <Divider />

                  <a href="#about" onClick={handleScroll}>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <InfoIcon fontSize="small" />
                      </ListItemIcon>
                      About
                    </MenuItem>
                  </a>
                </>
              )}

              <Divider />
              <div>
                {role ? (
                  <>
                    <button onClick={handleLogoutClick}>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <LoginIcon fontSize="small" />
                        </ListItemIcon>
                        Log out
                      </MenuItem>
                    </button>
                    {showConfirmLogout && (
                      <div className="absolute top-44 right-6 w-full h-full flex items-center justify-center text-[#023246] bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                          <p>Are you sure you want to logout?</p>
                          <div className="flex gap-4 mt-4">
                            <button
                              className="bg-[#023246] text-white px-4 py-2 rounded"
                              onClick={handleLogout}
                            >
                              Yes, Logout
                            </button>
                            <button
                              className="bg-[#023246] text-white px-4 py-2 rounded"
                              onClick={handleCancelLogout}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link to="/register">
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <LoginIcon fontSize="small" />
                      </ListItemIcon>
                      Sign Up
                    </MenuItem>
                  </Link>
                )}
              </div>
            </Menu>
          </React.Fragment>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
