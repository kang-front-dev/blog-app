import React, { useState } from 'react';

interface IUseSnackBar {
  open: boolean;
  severity: string;
  alertMessage: string;
  handleSnackbarOpen: (
    severityState: string,
    alertMessageValue: string
  ) => void;
  handleSnackbarClose: () => void;
}

export const useSnackbar = (): IUseSnackBar => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const handleSnackbarOpen = (
    severityState: string,
    alertMessageValue: string
  ) => {
    setOpen(true);
    setSeverity(severityState);
    setAlertMessage(alertMessageValue);
  };
  const handleSnackbarClose = () => {
    setOpen(false);
  };
  return {
    open,
    severity,
    alertMessage,
    handleSnackbarOpen,
    handleSnackbarClose,
  };
};
