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
import axios from "axios";

const Navbar = () => {
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);
  const [user, setUser] = useState([]);
  const [id, setId] = useState(null);

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

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3002/auth/users/${id}`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.log("clientprofile" + error);
    }
  };

  // navbar setup for role based starts here
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // console.log(decodedToken);
        if (decodedToken.role) {
          setRole(decodedToken.role);
          setName(decodedToken.name);
          setId(decodedToken.id);
          // console.log("role : " + decodedToken.role);
        }
      } catch (error) {
        console.error("Invalid token");
      }
    }
  });

  useEffect(() => {
    fetchUser();
  }, [id]);

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

  const handleOpenProfileById = (id) => {
    navigate(`/user/profile/${id}`);
  };

  return (
    <div id="home" className="w-full bg-[#F6F6F6] h-[100px] z-50 fixed">
      <nav className="Navbar max-w-[1170px] text-[#141C3A] lg:mx-auto flex justify-between py-4 lg:py-8 bg-[#F6F6F6] mx-3 h-[100px]">
        <div className="flex gap-10 items-center">
          {role === "client" ? (
            <>
              <Link to="/client/freelancers" className="px-1">
                <img src={logo} className="lg:w-[200px] w-[150px]" alt="logo" />
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
                to="/client/applications/"
                className="hidden text-black hover:text-[#023246] md:block"
              >
                Applications
              </Link>
              <Link
                to="/client/projects/"
                className="hidden text-black hover:text-[#023246] md:block"
              >
                Projects
              </Link>
            </>
          ) : role === "freelancer" ? (
            <>
              <Link to="/freelancer/findJobs" className="px-1">
                <img src={logo} className="lg:w-[200px] w-[150px]" alt="logo" />
              </Link>
              <Link
                to="/freelancer/findJobs"
                className="hidden text-black hover:text-[#023246] md:block"
              >
                Find Jobs
              </Link>
              <Link
                to="/freelancer/applications"
                className="hidden text-black hover:text-[#023246] md:block"
              >
                Applications
              </Link>
              <Link
                to="/freelancer/project"
                className="hidden text-black hover:text-[#023246] md:block"
              >
                Project
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="px-1">
                <img src={logo} className="lg:w-[200px] w-[150px]" alt="logo" />
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

        <div className="relative gap-6 items-center mx-4 hidden lg:flex">
          {role ? (
            <>
              <div
                onClick={() => handleOpenProfileById(id)}
                className="ml-[-35px] md:p-2 md:px-6 p-2 px-3 lg:flex gap-2 items-center cursor-pointer "
              >
                <span className="hidden lg:block">
                  Hello <span className="font-black">{name}</span> 👋
                </span>

                <img
                  className="h-12 w-12 object-cover border rounded-full"
                  src={
                    user &&
                    Array.isArray(user.profile_image) &&
                    user.profile_image.length > 0
                      ? `http://localhost:3002/${user.profile_image}`
                      : profile
                  }
                  alt="Profile"
                />
              </div>
              <button
                className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A]
              active:text-[#141C3A] active:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center hidden lg:block"
                onClick={handleLogoutClick}
              >
                Logout
              </button>

              {showConfirmLogout && (
                <div className="absolute top-36 right-2 w-full h-full flex items-center justify-center text-[#023246] bg-opacity-50 z-60">
                  <div className=" bg-white p-6 rounded-lg shadow-lg z-50">
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
              to="/login"
              className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A]
              active:text-[#141C3A] active:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center hidden lg:block"
            >
              Sign In
            </Link>
          )}
        </div>

        <div className="lg:hidden">
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div className="relative flex items-center">
                {role ? (
                  <>
                    <div
                      onClick={() => handleOpenProfileById(id)}
                      className="ml-[-35px] md:p-2 md:px-6 p-2 px-3 lg:flex gap-2 items-center cursor-pointer "
                    >
                      <span className="hidden lg:block">
                        Hello <span className="font-black">{name}</span> 👋
                      </span>

                      <img
                        className="h-12 w-12 object-cover border rounded-full"
                        src={
                          user &&
                          Array.isArray(user.profile_image) &&
                          user.profile_image.length > 0
                            ? `http://localhost:3002/${user.profile_image}`
                            : profile
                        }
                        alt="Profile"
                      />
                    </div>
                    <button
                      className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A]
              active:text-[#141C3A] active:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center hidden lg:block"
                      onClick={handleLogoutClick}
                    >
                      Logout
                    </button>

                    {showConfirmLogout && (
                      <div className="absolute top-36 right-2 w-full h-full flex items-center justify-center text-[#023246] bg-opacity-50 z-60">
                        <div className=" bg-white p-6 rounded-lg shadow-lg z-50">
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
                    to="/login"
                    className="text-white bg-[#141C3A] border focus:ring-4 focus:outline-none hover:border-[#141C3A]
              active:text-[#141C3A] active:bg-[#ffffff] font-medium rounded-lg text-sm px-5 py-2.5 text-center hidden lg:block"
                  >
                    Sign In
                  </Link>
                )}
              </div>

              <IconButton
                onClick={handleClick}
                size="small"
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
                  <Link to="/client/freelancers">
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <InfoIcon fontSize="small" />
                      </ListItemIcon>
                      Freelancers
                    </MenuItem>
                  </Link>

                  <Divider />

                  <Link to="/client/postJob">
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <InfoIcon fontSize="small" />
                      </ListItemIcon>
                      Post Job
                    </MenuItem>
                  </Link>
                  <Divider />

                  <Link to="/client/applications">
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <InfoIcon fontSize="small" />
                      </ListItemIcon>
                      Applications
                    </MenuItem>
                  </Link>

                  <Divider />

                  <Link to="/client/projects/">
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
                  <Link to="/freelancer/findJobs">
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <InfoIcon fontSize="small" />
                      </ListItemIcon>
                      Find Jobs
                    </MenuItem>
                  </Link>

                  <Divider />

                  <Link to="/freelancer/applications">
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <InfoIcon fontSize="small" />
                      </ListItemIcon>
                      Applications
                    </MenuItem>
                  </Link>
                  <Divider />

                  <Link to="/freelancer/projects">
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <InfoIcon fontSize="small" />
                      </ListItemIcon>
                      Projects
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
                      <div className="absolute z-1 top-44 right-6 w-full h-full flex items-center justify-center text-[#023246] bg-opacity-50">
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
                  <Link to="/login">
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <LoginIcon fontSize="small" />
                      </ListItemIcon>
                      Sign In
                    </MenuItem>
                  </Link>
                )}
              </div>
            </Menu>
          </React.Fragment>
        </div>
      </nav>
      <div className="border-t-[1px] border-t-[#605d5d] bg-[#F6F6F6]"></div>
    </div>
  );
};

export default Navbar;
