import { useDispatch, useSelector } from 'react-redux';

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
interface IReducerSnackBar {
  snackbarReducer: {
    open: boolean;
    severity: string;
    alertMessage: string;
  };
}

export const useSnackbar = (): IUseSnackBar => {
  const dispatch = useDispatch();
  const open = useSelector(
    (state: IReducerSnackBar) => state.snackbarReducer.open
  );
  const severity = useSelector(
    (state: IReducerSnackBar) => state.snackbarReducer.severity
  );
  const alertMessage = useSelector(
    (state: IReducerSnackBar) => state.snackbarReducer.alertMessage
  );
  const handleSnackbarOpen = (
    severityState: string,
    alertMessageValue: string
  ) => {
    dispatch({ type: 'SET_OPEN', payload: true });
    dispatch({ type: 'SET_SEVERITY', payload: severityState });
    dispatch({ type: 'SET_MESSAGE', payload: alertMessageValue });
  };
  const handleSnackbarClose = () => {
    dispatch({ type: 'SET_OPEN', payload: false });
  };
  return {
    open,
    severity,
    alertMessage,
    handleSnackbarOpen,
    handleSnackbarClose,
  };
};
