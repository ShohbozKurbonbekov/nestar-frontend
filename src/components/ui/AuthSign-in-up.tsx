"use client";
import CancelIcon from "@mui/icons-material/Cancel";
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
  IconButton,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  LoginFormInputs,
  LoginFormValues,
  loginSchema,
  SignupFormInputs,
  SignupFormValues,
  signupSchema,
} from "@/libs/zod-schema/auth";
import React from "react";
import { useRouter } from "next/navigation";
import { logIn, signUp } from "@/libs/auth";
import { sweetMixinErrorAlert } from "@/libs/sweetAlert";
const borderStyle = {
  "& .mui-1pzfmz2-MuiInputBase-input-MuiOutlinedInput-input": {
    padding: "0",
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
    const router = useRouter();
    const [mode, setMode] = useState<"login" | "signup">("login");

    // Separate forms for full type safety
    const loginForm = useForm<LoginFormInputs>({
      resolver: zodResolver(loginSchema),
    });

    const signupForm = useForm<SignupFormInputs>({
      resolver: zodResolver(signupSchema),
      defaultValues: {
        role: "",
      },
    });

    const handleLogin = async (data: LoginFormValues) => {
      try {
        await logIn(data.memberNick, data.memberPassword);
        onClose(false);
        router.push(`/`);
        loginForm.reset();
      } catch (error: any) {
        console.log("Error in AuthSigninup: ", error);
        onClose(false);
        await sweetMixinErrorAlert(error.message);
      }
    };

    const handleSignup = async (data: SignupFormValues) => {
      try {
        await signUp(
          data.memberNick,
          data.memberPassword,
          data.memberPhone,
          data.role,
        );
        onClose(false);
        signupForm.reset();

        router.push("/");
      } catch (error: any) {
        onClose(false);
        await sweetMixinErrorAlert(error.message);
      }
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
        maxWidth="sm"
        fullWidth
      >
        <DialogContent className="flex flex-col gap-4 mt-2 items-start ">
          <IconButton
            className="p-0 self-end"
            onClick={() => {
              loginForm.reset();
              signupForm.reset();
              onClose(false);
            }}
          >
            <CancelIcon className="text-slate-400" />
          </IconButton>
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
                      className="cursor-pointer font-semibold  hover:underline capitalize text-blue-400"
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

                  <FormControl error={!!signupForm.formState.errors.role}>
                    <FormLabel sx={{ fontSize: "0.85rem" }}>
                      Select Member Type
                    </FormLabel>

                    <Controller
                      name="role"
                      control={signupForm.control}
                      render={({ field }) => (
                        <RadioGroup row {...field}>
                          <FormControlLabel
                            value="USER"
                            control={<Radio />}
                            label="Signup as User"
                            sx={{
                              "& .MuiTypography-root": {
                                fontSize: "0.8rem",
                                color: "rgba(0,0,0,0.7)",
                              },
                            }}
                          />
                          <FormControlLabel
                            value="AGENT"
                            control={<Radio />}
                            label="Signup as Agent"
                            sx={{
                              "& .MuiTypography-root": {
                                fontSize: "0.8rem",
                                color: "rgba(0,0,0,0.7)",
                              },
                            }}
                          />
                        </RadioGroup>
                      )}
                    />

                    <FormHelperText>
                      {signupForm.formState.errors.role?.message}
                    </FormHelperText>
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
