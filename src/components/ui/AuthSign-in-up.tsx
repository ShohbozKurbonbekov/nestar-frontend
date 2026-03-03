"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Tabs,
  Tab,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  DialogTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  LoginFormValues,
  loginSchema,
  SignupFormValues,
  signupSchema,
} from "@/libs/zod-schema/auth";
import React from "react";

const borderStyle = {
  "& .mui-1pzfmz2-MuiInputBase-input-MuiOutlinedInput-input": {
    padding: "15px  50px 15px",
  },
  "& .mui-18p5xg2-MuiNotchedOutlined-root-MuiOutlinedInput-notchedOutline": {
    border: "2px solid #CBD5E1CC",
    borderRadius: "10px",
  },
  "& .mui-8cmb7g-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#CBD5E1CC",
    },
};

// -------------------- Input Styles -----------------

// -------------------- Component -----------------
interface AuthSigninupType {
  open: boolean;
  onClose: (open: boolean) => void;
}

const AuthSigninup: React.FC<AuthSigninupType> = React.memo(
  ({ onClose, open }) => {
    const [mode, setMode] = useState<"login" | "signup">("login");

    // Separate forms for full type safety
    const loginForm = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
    });

    const signupForm = useForm<SignupFormValues>({
      resolver: zodResolver(signupSchema),
      defaultValues: {
        role: "USER",
      },
    });

    const handleLogin = (data: LoginFormValues) => {
      console.log("login", data);
      loginForm.reset();
    };

    const handleSignup = (data: SignupFormValues) => {
      console.log("signup", data);
      signupForm.reset();
    };

    const switchMode = () => {
      loginForm.reset();
      signupForm.reset();
      setMode((prev) => (prev === "login" ? "signup" : "login"));
    };

    // -------------------- Render -----------------
    return (
      <Dialog
        open={open}
        onClose={() => onClose(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent className="flex flex-col gap-4 mt-2">
          <div className="w-full px-6 py-4">
            <Tabs
              value={mode}
              onChange={(_, value) => setMode(value)}
              centered
              textColor="primary"
              className="mb-6"
            >
              <Tab value="login" label="Login" />
              <Tab value="signup" label="Signup" />
            </Tabs>

            <AnimatePresence mode="wait">
              {mode === "login" && (
                <motion.form
                  key="login"
                  onSubmit={loginForm.handleSubmit(handleLogin)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5"
                >
                  <TextField
                    placeholder="Nickname"
                    fullWidth
                    {...loginForm.register("memberNick")}
                    error={!!loginForm.formState.errors.memberNick}
                    helperText={loginForm.formState.errors.memberNick?.message}
                    sx={borderStyle}
                  />

                  <TextField
                    placeholder="Password"
                    type="password"
                    fullWidth
                    {...loginForm.register("memberPassword")}
                    error={!!loginForm.formState.errors.memberPassword}
                    helperText={
                      loginForm.formState.errors.memberPassword?.message
                    }
                    sx={borderStyle}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="medium"
                    className="mt-2 rounded-xl py-3 font-semibold shadow-lg capitalize"
                  >
                    Login
                  </Button>
                  <div className="text-center text-sm text-gray-500">
                    Not account yet?{" "}
                    <span
                      onClick={switchMode}
                      className="cursor-pointer font-semibold text-black hover:underline"
                    >
                      Signup
                    </span>
                  </div>
                </motion.form>
              )}

              {mode === "signup" && (
                <motion.form
                  key="signup"
                  onSubmit={signupForm.handleSubmit(handleSignup)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5"
                >
                  <TextField
                    placeholder="Nickname"
                    fullWidth
                    {...signupForm.register("memberNick")}
                    error={!!signupForm.formState.errors.memberNick}
                    helperText={signupForm.formState.errors.memberNick?.message}
                    sx={borderStyle}
                  />

                  <TextField
                    placeholder="Password"
                    type="password"
                    fullWidth
                    {...signupForm.register("memberPassword")}
                    error={!!signupForm.formState.errors.memberPassword}
                    helperText={
                      signupForm.formState.errors.memberPassword?.message
                    }
                    sx={borderStyle}
                  />

                  <TextField
                    placeholder="Phone"
                    fullWidth
                    {...signupForm.register("memberPhone")}
                    error={!!signupForm.formState.errors.memberPhone}
                    helperText={
                      signupForm.formState.errors.memberPhone?.message
                    }
                    sx={borderStyle}
                  />

                  <FormControl>
                    <RadioGroup row {...signupForm.register("role")}>
                      <FormControlLabel
                        value="USER"
                        control={<Radio />}
                        label="Signup as User"
                      />
                      <FormControlLabel
                        value="AGENT"
                        control={<Radio />}
                        label="Signup as Agent"
                      />
                    </RadioGroup>
                  </FormControl>

                  <Button
                    type="submit"
                    variant="contained"
                    size="medium"
                    className="mt-2 rounded-xl py-3 font-semibold capitalize"
                  >
                    Create Account
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <span
                      onClick={switchMode}
                      className="cursor-pointer font-semibold text-black hover:underline"
                    >
                      Login
                    </span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
);

export default AuthSigninup;
