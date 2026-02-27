"use client";

import Link from "next/link";
import { Typography, IconButton, Box } from "@mui/material";
import FacebookRounded from "@mui/icons-material/FacebookRounded";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";
import LinkedIn from "@mui/icons-material/LinkedIn";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-8xl mx-auto px-4 py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
          {/* Column 1 — Brand */}
          <div>
            <Typography variant="h3" className="text-white font-semibold ">
              RealShoh
            </Typography>

            <Typography
              variant="body2"
              className="mt-4 text-slate-400 leading-relaxed max-w-md"
            >
              Modern platform for buying, selling, and renting properties with
              trusted agents and verified listings.
            </Typography>

            <div className="flex gap-3 mt-6">
              <IconButton className="text-slate-300">
                <FacebookRounded />
              </IconButton>
              <IconButton className="text-slate-300">
                <Instagram />
              </IconButton>
              <IconButton className="text-slate-300">
                <Twitter />
              </IconButton>
              <IconButton className="text-slate-300">
                <LinkedIn />
              </IconButton>
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div>
            <Typography variant="body1" className="text-white font-medium">
              Explore
            </Typography>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/buy"
                  className="hover:text-white transition-colors duration-200"
                >
                  Buy Property
                </Link>
              </li>
              <li>
                <Link
                  href="/rent"
                  className="hover:text-white transition-colors duration-200"
                >
                  Rent Property
                </Link>
              </li>
              <li>
                <Link
                  href="/agents"
                  className="hover:text-white transition-colors duration-200"
                >
                  Find Agents
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-white transition-colors duration-200"
                >
                  New Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <Typography variant="body1" className="text-white font-medium">
              Company
            </Typography>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-white transition-colors duration-200"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Legal */}
          <div>
            <Typography variant="body1" className="text-white  font-medium">
              Legal
            </Typography>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="hover:text-white transition-colors duration-200"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 — Mobile App */}
          <div>
            <Typography variant="body1" className="text-white  font-medium">
              Get the App
            </Typography>

            <div className="mt-4 space-y-4">
              {/* App Store */}
              <Box className="flex items-center gap-3 border border-slate-700 rounded-xl p-3 hover:border-slate-500 transition-colors duration-200 cursor-pointer">
                <AppleIcon className="text-white" />
                <div>
                  <Typography variant="caption" className="text-slate-400">
                    Download on the
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-white font-medium leading-tight"
                  >
                    App Store
                  </Typography>
                </div>
              </Box>

              {/* Play Store */}
              <Box className="flex items-center gap-3 border border-slate-700 rounded-xl p-3 hover:border-slate-500 transition-colors duration-200 cursor-pointer">
                <AndroidIcon className="text-white" />
                <div>
                  <Typography variant="caption" className="text-slate-400">
                    Get it on
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-white font-medium leading-tight"
                  >
                    Google Play
                  </Typography>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="border-t border-slate-800 mt-12 py-6 text-sm text-slate-500">
        <div className="max-w-8xl mx-auto w-full px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Typography variant="body2">
            © {new Date().getFullYear()} RealShoh. All rights reserved.
          </Typography>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors duration-200"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
