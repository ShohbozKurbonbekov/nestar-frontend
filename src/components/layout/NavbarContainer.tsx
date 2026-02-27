"use client";
import { Button, Typography } from "@mui/material";
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
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { LANGUAGE_OPTIONS, NAVBAR_LINKS } from "@/libs/data/static-data";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import AuthSigninup from "../ui/AuthSign-in-up";
import Drawer from "@mui/material/Drawer";

const mobileLinkClasses =
  "w-full rounded-lg px-4 py-3 bg-slate-700 text-white transition-all duration-200 hover:bg-slate-800 hover:shadow-md active:scale-[0.98] capitalize";

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
    <>
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
            <span className={`text-xs  text-slate-200`}>
              Real Estate Center
            </span>
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
              Singup / Singin
            </Button>
          )}

          {/* Language Select */}
          <LanguageSwitcher
            language={language}
            languageOptions={LANGUAGE_OPTIONS}
            setLanguage={setLanguage}
          />
        </div>

        {/* Mobile Menu Toggler */}
        <div className="md:hidden flex items-center gap-2">
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
          {/* Language Select */}
          <LanguageSwitcher
            language={language}
            languageOptions={LANGUAGE_OPTIONS}
            setLanguage={setLanguage}
          />
        </div>
      </div>

      <Drawer
        open={mobileMenuOpen}
        onClose={handleCloseMobileMenu}
        sx={{
          "&": {
            width: "60%",
            height: "100%",
          },
          "& .MuiPaper-root": {
            position: "absolute",
            width: "100%",
            height: "100%",
          },
        }}
      >
        <List className="bg-black/40 h-full w-full p-3 space-y-2">
          {NAVBAR_LINKS.map((el) => (
            <ListItem
              key={el.label}
              disablePadding
              className="rounded-lg overflow-hidden"
            >
              <ListItemButton
                component={Link}
                href={el.href}
                className={mobileLinkClasses}
              >
                <Typography
                  variant="body1"
                  className="font-medium tracking-wide"
                >
                  {el.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}

          <Divider className="bg-slate-800 mt-3" />
          {!authmember && (
            <ListItem disablePadding>
              <ListItemButton
                component={Button}
                onClick={() => setSinginOpen(true)}
                className={
                  "bg-green-700 rounded-md  text-white capitalize py-3 active:scale-95 hover:bg-green-800 transition-all"
                }
              >
                <Typography className="text-base text-center w-full">
                  Signin / Singup
                </Typography>
              </ListItemButton>
            </ListItem>
          )}
          {authmember && (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  href={"/dashboard"}
                  className={`${mobileLinkClasses} relative`}
                >
                  <ListItemIcon className="text-white absolute z-10">
                    <DashboardIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography
                    variant="body1"
                    className="font-medium tracking-wide pl-7"
                  >
                    Dashboard
                  </Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  href={"/logout"}
                  className={`${mobileLinkClasses} relative`}
                >
                  <ListItemIcon className="text-white absolute z-10">
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography
                    variant="body1"
                    className="font-medium tracking-wide pl-7"
                  >
                    Logout
                  </Typography>
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>

      {/* Auth Sing-in-up */}
      <AuthSigninup onClose={setSinginOpen} open={signinOpen} />
    </>
  );
};
