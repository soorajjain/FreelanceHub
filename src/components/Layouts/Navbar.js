import React, { useState } from "react";
import logo from "../../assets/Freelance-Hub-logo.png";
import { Link } from "react-router-dom";
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

function Navbar() {
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

  return (
    <div id="home" className="w-full bg-[#F6F6F6]">
      <nav className="Navbar max-w-[1170px] text-[#141C3A] lg:mx-auto flex justify-between py-4 sm:py-8 bg-[#F6F6F6] mx-3  bg-[#F6F6F6]">
        <div className="flex gap-10 items-center">
          <Link to="/" className="px-1">
            <img src={logo} className="sm:w-[200px] w-[150px]" alt="logo" />
          </Link>
          <a
            href="#about"
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
        </div>
        <div className="flex gap-6 items-center mx-4">
          <Link
            to="/redirect"
            className="border-[2px] border-[#023246]  hover:bg-[#023246] hover:text-[#FFFFFF] rounded-3xl md:p-2 md:px-6 p-2 px-3 hidden sm:block"
          >
            Sign Up
          </Link>
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

                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <LoginIcon fontSize="small" />
                  </ListItemIcon>
                  Sign Up
                </MenuItem>
              </Menu>
            </React.Fragment>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
