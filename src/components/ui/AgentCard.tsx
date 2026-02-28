"use client";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import VerifiedIcon from "@mui/icons-material/Verified";
import Image from "next/image";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import { useState } from "react";
import { FavoriteBorder } from "@mui/icons-material";
import Link from "next/link";

interface AgentCardType {
  agentFeaturedTag?: React.ReactNode;
  agentLink: string;
}
export default function AgentCard({
  agentFeaturedTag,
  agentLink,
}: AgentCardType) {
  const [liked, setLiked] = useState<boolean>(false);
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="w-full"
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 20,
        mass: 0.8,
      }}
    >
      <Card className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 bg-white">
        {/* Image Section */}
        <Box className="relative w-full aspect-square overflow-hidden">
          <Image
            src={"/agent.jpg"}
            alt={"agent"}
            className="w-full h-full object-cover"
            fill={true}
            loading="lazy"
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          {/* Ranking Badge */}
          {agentFeaturedTag && agentFeaturedTag}

          {/* Bottom Info Over Image */}
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center gap-2">
              <Typography variant="h6">Daniel</Typography>
              <VerifiedIcon fontSize="small" className="text-blue-400" />
            </div>
            <Typography
              variant="body2"
              className="opacity-80 gap-1 flex flex-items"
            >
              <LocationPinIcon fontSize="small" className="text-blue-400" />

              {"Seoul kwangido"}
            </Typography>
          </div>
        </Box>

        {/* Content Section */}
        <CardContent className="p-6 space-y-5">
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <HomeWorkIcon fontSize="small" />
              <Typography variant="subtitle1" className="font-semibold">
                20
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                Properties
              </Typography>
            </div>

            <Divider orientation="vertical" flexItem />

            <div className="flex flex-col items-center">
              <VisibilityIcon fontSize="small" />
              <Typography variant="subtitle1">100</Typography>
              <Typography variant="caption" className="text-gray-500">
                Views
              </Typography>
            </div>

            <Divider orientation="vertical" flexItem />

            <div className="flex flex-col items-center">
              <motion.div
                whileTap={{ scale: 1.25 }}
                onClick={() => setLiked((prev) => !prev)}
              >
                {liked ? (
                  <FavoriteIcon
                    fontSize="small"
                    className="text-red-500 cursor-pointer"
                  />
                ) : (
                  <FavoriteBorder
                    fontSize="small"
                    className="text-red-500 cursor-pointer"
                  />
                )}
              </motion.div>
              <Typography variant="subtitle1">300 </Typography>
              <Typography variant="caption" className="text-gray-500">
                Likes
              </Typography>
            </div>
          </div>

          {/* Visit Button */}
          <Button
            variant="outlined"
            size="small"
            fullWidth
            className="rounded-lg py-2 group relative overflow-hidden hover:border-0"
          >
            <Link
              href={agentLink}
              className="group-hover:text-white capitalize relative z-10"
            >
              View Profile
            </Link>
            <span className="absolute inset-0 bg-green-500  -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 rounded-md duration-500 ease-in-out"></span>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
