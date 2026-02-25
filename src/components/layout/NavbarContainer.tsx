"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

// ---------------------------  Navbar Data ------------------
const navItems = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Agents", href: "/agents" },
  { label: "Community", href: "/community" },
  { label: "CS", href: "/CS" },
];

// -------------------------- Component -----------------
interface NavbarContainerType {
  navLinksClass: string;
  logoSubtitleClass: string;
  toggleBtnClass: string;
  navLinkActiveClass: string;
}
export const NavbarContainer = ({
  logoSubtitleClass,
  navLinksClass,
  toggleBtnClass,
  navLinkActiveClass,
}: NavbarContainerType) => {
  const pathname = usePathname();

  // --------------------------  Authenticated Part ----------------
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // -------------------------- Mobile Toggler --------------
  const [mobileMenuEl, setMobileMenuEl] = useState<null | HTMLElement>(null);
  const mobileMenuOpen = Boolean(mobileMenuEl);
  const handleMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuEl(event.currentTarget);
  };
  const handleCloseMobileMenu = () => {
    setMobileMenuEl(null);
  };

  // -------------------------- Render -----------------
  return (
    <div className="max-w-8xl mx-auto px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <img
          src="/images/logo/platform-logo.jpg"
          alt="platform-logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col leading-tight">
          <span className={`text-xl font-semibold ${navLinksClass}`}>
            RealShoh
          </span>
          <span className={`text-xs  ${logoSubtitleClass}`}>
            Real Estate Center
          </span>
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.href} className="relative">
              <Link href={item.href} className={`text-sm  ${navLinksClass}`}>
                {item.label}
              </Link>
              <span
                className={`absolute bottom-0 block h-px ${navLinkActiveClass} w-0 transition-all duration-300 ease-linear  ${pathname === item.href ? "w-full " : ""}`}
              ></span>
            </li>
          ))}
        </ul>

        {/* Avatar Menu */}
        <div>
          <IconButton onClick={handleMenuOpen}>
            <Avatar className="w-9 h-9" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              href="/dashboard"
            >
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Dashboard
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-2">
        <div>
          <IconButton
            aria-label="more"
            id="mobile-menu"
            aria-controls={mobileMenuOpen ? "long-menu" : undefined}
            aria-expanded={mobileMenuOpen ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleMobileMenu}
          >
            <MenuIcon className={toggleBtnClass} />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={mobileMenuEl}
            open={mobileMenuOpen}
            onClose={handleCloseMobileMenu}
            slotProps={{
              paper: {
                style: {
                  maxHeight: 48 * 7,
                  width: "30ch",
                },
              },
              list: {
                "aria-labelledby": "long-button",
              },
            }}
          >
            {navItems.map((option) => (
              <MenuItem
                onClick={handleCloseMobileMenu}
                component={Link}
                href={option.href}
                className={`${pathname === option.href ? "bg-slate-700 text-white" : ""}`}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <IconButton onClick={handleMenuOpen}>
          <Avatar className="w-8 h-8" />
        </IconButton>
      </div>
    </div>
  );
};
