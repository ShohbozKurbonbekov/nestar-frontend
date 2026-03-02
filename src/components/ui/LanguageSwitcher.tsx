"use client";
import { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";

interface LanguageSwitcherType {
  changeLanguage: (locale: string) => void;
  language: string;
  languageOptions: { code: string; label: string; flag: string }[];
  setLanguage: (langauge: string) => void;
}
export default function LanguageSwitcher({
  languageOptions,
  language,
  setLanguage,
  changeLanguage,
}: LanguageSwitcherType) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const currentLang = languageOptions.find((l) => l.code === language);
  const open = Boolean(anchorEl);

  return (
    <div className="flex items-center">
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        disableRipple
        className="flex items-center gap-1"
        sx={{ p: 0 }}
      >
        <span className="text-lg text-white">{currentLang?.flag}</span>
        <span className="text-sm text-white">▾</span>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {languageOptions.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code);
              changeLanguage(lang.code);
              setAnchorEl(null);
            }}
          >
            <div className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
