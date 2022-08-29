import { Alert, Snackbar } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../services/redux-services/features";
import {
  hideMessage,
  IMessageState,
  showMessage,
} from "../services/redux-services/features/messageSlice";

const GlobalSnackBar = () => {
  const dispatch = useDispatch();
  const { errorMessage, toggleShowMessage, type } = useSelector<
    RootState,
    IMessageState
  >((state) => state.message);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideMessage());
  };

  useEffect(() => {
    if (errorMessage !== "") {
      dispatch(showMessage({ text: errorMessage, type }));
    }
  }, [errorMessage, dispatch, type]);

  return (
    <Snackbar
      open={toggleShowMessage}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackBar;
