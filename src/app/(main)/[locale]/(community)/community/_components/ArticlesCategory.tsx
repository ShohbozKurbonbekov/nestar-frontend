"use client";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CampaignIcon from "@mui/icons-material/Campaign";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SortIcon from "@mui/icons-material/Sort";

import { BOARD_ARTICLES_SORTING } from "@/libs/data/static-data";
import { BoardArticleCategory } from "@/libs/enums/board-article.enum";
import React, { useState } from "react";
import { BoardArticlesInquiry } from "@/libs/types/board-article/board-article.input";
import { SetStateType } from "@/libs/types/common";
import { Direction } from "@/libs/enums/common.enum";
import { useRouter, useSearchParams } from "next/navigation";

// ------------------------------------ Feature Options ------------------------------------
const categories = [
  {
    value: BoardArticleCategory.FREE,
    label: "Free",
    icon: <NewspaperIcon fontSize="small" />,
  },
  {
    value: BoardArticleCategory.RECOMMEND,
    label: "Recommend",
    icon: <ThumbUpAltIcon fontSize="small" />,
  },
  {
    value: BoardArticleCategory.NEWS,
    label: "News",
    icon: <CampaignIcon fontSize="small" />,
  },
  {
    value: BoardArticleCategory.HUMOR,
    label: "Humor",
    icon: <EmojiEmotionsIcon fontSize="small" />,
  },
];

const sortOptions = [
  { value: BOARD_ARTICLES_SORTING[0], label: "Most Viewed" },
  { value: BOARD_ARTICLES_SORTING[2], label: "Newest" },
  { value: BOARD_ARTICLES_SORTING[1], label: "Most Liked" },
  { value: BOARD_ARTICLES_SORTING.at(-1), label: "Recently Updated" },
];

// ------------------------------------ Component ------------------------------------

interface ArticlesCategoryType {
  search: string;
  sort: string;
  category: BoardArticleCategory;
}
export default function ArticlesCategory({
  category,
  search,
  sort,
}: ArticlesCategoryType) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>(search);

  // ------------------------------------ Handlers ------------------------------------
  const onSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    params.set("page", "1");
    router.push(`/community?${params.toString()}`, {
      scroll: false,
    });
  };

  const onCategory = (value: BoardArticleCategory) => {
    const params = new URLSearchParams(searchParams);

    params.set("category", value);
    params.set("page", "1");

    router.push(`/community?${params.toString()}`, {
      scroll: false,
    });
  };

  // ------------------------------------ Render ------------------------------------
  return (
    <div className="max-w-5xl px-4 mx-auto">
      <div className="flex flex-col gap-5 border border-slate-300/80 p-8 rounded-4xl">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Chip
              key={cat.value}
              icon={cat.icon}
              label={cat.label}
              clickable
              onClick={() => {
                onCategory(cat.value);
              }}
              className={`p-3 text-sm font-medium rounded-xl transition
              ${
                category === cat.value
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          {/* Search */}
          <TextField
            fullWidth
            size="medium"
            placeholder="Search article titles..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const params = new URLSearchParams(searchParams);

                params.set("search", searchText.trim());
                params.set("page", "1");
                router.push(`/community?${params.toString()}`, {
                  scroll: false,
                });
              }
            }}
            className="bg-white"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-slate-400" />
                </InputAdornment>
              ),
              className: "rounded-2xl",
            }}
            sx={{
              ".MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#cbd5e1",
                },
              ".MuiInputBase-root.MuiOutlinedInput-root:hover  .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#94a3b8",
                },
            }}
          />

          {/* Sort */}
          <FormControl size="medium" className="min-w-50">
            <Select
              value={sort}
              size="medium"
              onChange={(e) => onSort(e.target.value)}
              startAdornment={
                <SortIcon className="mr-2 text-slate-400" fontSize="small" />
              }
              className="rounded-2xl"
              sx={{
                "&.MuiInputBase-root.MuiOutlinedInput-root.MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#cbd5e1",
                  },
                "&.MuiInputBase-root.MuiOutlinedInput-root.MuiSelect-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#94a3b8",
                  },
              }}
            >
              {sortOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
