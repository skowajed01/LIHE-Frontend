import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

const ModelPopUpConfirm = ({ isopen, setpopup }) => {
  const DeleteCountry = () => {
    console.log("deleted");
    setpopup(!isopen);
  };
  return (
    <>
      <Dialog open={isopen} fullWidth maxWidth={"sm"}>
        <DialogTitle>
          <Typography variant="h3">Delete Country</Typography>
        </DialogTitle>
        <DialogContent>Do You Want To Delete This Country</DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => DeleteCountry()}
          >
            Ok
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setpopup(!isopen)}
          >
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModelPopUpConfirm;
