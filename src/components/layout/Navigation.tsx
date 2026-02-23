"use client";

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
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Agents", href: "/agents" },
  { label: "Community", href: "/community" },
  { label: "CS", href: "/cs" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="w-full bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/images/logo/platform-logo.jpg"
            alt="platform-logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-semibold">RealShoh</span>
            <span className="text-xs text-slate-300">Real Estate Center</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm transition-colors ${
                    pathname === item.href
                      ? "text-blue-400 font-medium underline"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Avatar Menu */}
          <IconButton onClick={handleMenuOpen}>
            <Avatar className="w-9 h-9" />
          </IconButton>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <IconButton onClick={() => setMobileOpen(!mobileOpen)}>
            <MenuIcon className="text-white" />
          </IconButton>
          <IconButton onClick={handleMenuOpen}>
            <Avatar className="w-8 h-8" />
          </IconButton>
        </div>
      </div>

      {/* Mobile Nav Items */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-800 px-4 pb-4">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block text-sm ${
                    pathname === item.href
                      ? "text-blue-400 font-medium"
                      : "text-slate-300"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Account Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleMenuClose} component={Link} href="/dashboard">
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
    </nav>
  );
}
