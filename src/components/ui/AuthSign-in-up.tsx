"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import React from "react";

interface AuthSigninupType {
  open: boolean;
  onClose: (open: boolean) => void;
}

const AuthSigninup: React.FC<AuthSigninupType> = React.memo(
  ({ onClose, open }) => {
    return (
      <Dialog
        open={open}
        onClose={() => onClose(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="text-center font-semibold">Sign In</DialogTitle>

        <DialogContent className="flex flex-col gap-4 mt-2">
          <TextField label="Email" type="email" fullWidth />
          <TextField label="Password" type="password" fullWidth />
        </DialogContent>

        <DialogActions className="px-6 pb-4">
          <Button onClick={() => onClose(false)} color="inherit">
            Cancel
          </Button>
          <Button variant="contained">Sign In</Button>
        </DialogActions>
      </Dialog>
    );
  },
);

export default AuthSigninup;
