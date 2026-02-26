"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
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
import { LANGUAGE_OPTIONS, NAVBAR_LINKS } from "@/libs/static-data";
import LanguageSwitcher from "../ui/LanguageSwitcher";

// -------------------------- Component -----------------
export const NavbarContainer = () => {
  const authmember = false;
  const pathname = usePathname();
  const [language, setLanguage] = useState("en");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [signinOpen, setSinginOpen] = useState(false);
  const [mobileMenuEl, setMobileMenuEl] = useState<null | HTMLElement>(null);
  const mobileMenuOpen = Boolean(mobileMenuEl);

  // --------------------------  Handlers ----------------

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuEl(event.currentTarget);
  };
  const handleCloseMobileMenu = () => {
    setMobileMenuEl(null);
  };

  // -------------------------- Render -----------------
  return (
    <div className="max-w-8xl mx-auto p-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <img
          src="/images/logo/platform-logo.jpg"
          alt="platform-logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col leading-tight">
          <span className={`text-xl font-semibold text-white`}>RealShoh</span>
          <span className={`text-xs  text-slate-200`}>Real Estate Center</span>
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-5">
        <ul className="flex items-center gap-5">
          {NAVBAR_LINKS.map((item) => (
            <li key={item.href} className="relative">
              <Link href={item.href} className={`text-sm  text-slate-50`}>
                {item.label}
              </Link>
              <span
                className={`absolute bottom-0 block h-px bg-white w-0 transition-all duration-300 ease-linear  ${pathname === item.href ? "w-full " : ""}`}
              ></span>
            </li>
          ))}
        </ul>

        {/* Avatar Menu */}
        {authmember && (
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
        )}
        {!authmember && (
          <Button
            onClick={() => setSinginOpen(true)}
            className="text-white! capitalize mt-1 rounded-2xl px-3 py-2 bg-green-700"
            size="small"
            color="primary"
            variant="contained"
          >
            Singup
          </Button>
        )}

        {/* Language Select */}
        <LanguageSwitcher
          language={language}
          languageOptions={LANGUAGE_OPTIONS}
          setLanguage={setLanguage}
        />
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
            className="p-0!"
          >
            <MenuIcon className="text-white" />
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
                  width: "20ch",
                },
              },
              list: {
                "aria-labelledby": "long-button",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleCloseMobileMenu();
                setSinginOpen(true);
              }}
              component={Button}
              className="capitalize hover:bg-slate-900 hover:text-white w-full"
            >
              Singin
            </MenuItem>
            {NAVBAR_LINKS.map((option) => (
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
        {authmember && (
          <IconButton onClick={handleMenuOpen}>
            <Avatar className="w-8 h-8" />
          </IconButton>
        )}

        <LanguageSwitcher
          language={language}
          languageOptions={LANGUAGE_OPTIONS}
          setLanguage={setLanguage}
        />
      </div>

      {/* Sign In Dialog */}
      <Dialog
        open={signinOpen}
        onClose={() => setSinginOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="text-center font-semibold">Sign In</DialogTitle>

        <DialogContent className="flex flex-col gap-4 mt-2">
          <TextField label="Email" type="email" fullWidth />
          <TextField label="Password" type="password" fullWidth />
        </DialogContent>

        <DialogActions className="px-6 pb-4">
          <Button onClick={() => setSinginOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button variant="contained">Sign In</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
