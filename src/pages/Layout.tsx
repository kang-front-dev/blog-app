import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from '../components/Loading';
import Nav from '../components/Nav';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { globalContext } from '../components/contexts/globalContext';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Layout() {
  const {open,setOpen,alertMessage,severity} = useContext(globalContext)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className='global__wrapper'>
      <Nav />
      <div className="container page__content">
        <Outlet />
      </div>
      <footer className="footer">
        <p className="footer__text">© 2022 - Created by</p>
        <a href="https://github.com/kang-front-dev" target='_blank' className="footer__link" rel="noreferrer">kang</a>
      </footer>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
