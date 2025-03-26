import React from "react";
import logo from "../../Logos/Logo 2.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ brandName, routes, action }) {
  const [openNav, setOpenNav] = React.useState(false);

  // Close mobile nav when window resizes to desktop size
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // Build the navigation list items
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path, icon, href, target }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
          {href ? (
            <a
              href={href}
              target={target}
              className="flex items-center gap-1 p-1 font-bold"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </a>
          ) : (
            <Link
              to={path}
              target={target}
              className="flex items-center gap-1 p-1 font-bold"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </Link>
          )}
        </Typography>
      ))}
    </ul>
  );

  return (
    <MTNavbar color="transparent" className="p-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Brand Title with dark gray 50% opacity box */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
          <div className="bg-gray-800 bg-opacity-50 rounded px-2 py-1">
            <Typography className="cursor-pointer font-bold text-white">
              {brandName}
            </Typography>
          </div>
        </Link>
        {/* Desktop Navigation links wrapped in one long dark gray 50% opacity box */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="bg-gray-800 bg-opacity-50 rounded-full px-4 py-2">
            {navList}
          </div>
          {/* <Link to="src\pages\Resources.jsx">
            <Button variant="gradient" size="sm">
              Resources
            </Button>
          </Link> */}
        </div>
        {/* Mobile Navigation toggle button */}
        <IconButton
          variant="filled"  // This is a filled button
          size="sm" 
          color="white"
          className="ml-auto bg-gray-800 p-2 rounded hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-600 lg:hidden" // This is a dark gray button
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      {/* Mobile navigation container */}
      <MobileNav
        className="rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900"
        open={openNav}
      >
        {navList}
      </MobileNav>
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: "CampusConnect",
  action: (
    <a
      href="https://www.creative-tim.com/product/material-tailwind-kit-react"
      target="_blank"
    >
      <Button variant="gradient" size="sm" fullWidth>
        free download
      </Button>
    </a>
  ),
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
