import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logUser } from '../components/api/logUser';
import { globalContext } from '../components/contexts/globalContext';
export const formStyles = {
  input: {
    width: '100%',
    marginBottom: '10px',
  },
};
export default function LogPage() {
  const {
    setOpen,
    setSeverity,
    setAlertMessage,
    setUserEmail,
    setUserName,
    setIsAuth,
  } = useContext(globalContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOpen = (severityState: string, alertMessageValue: string) => {
    setOpen(true);
    setSeverity(severityState);
    setAlertMessage(alertMessageValue);
  };

  const handleClick = async () => {
    if (email && password) {
      const response = await logUser({ email: email, password: password });
      console.log(response, 'login response');

      if (response.success) {
        setIsAuth(true);
        setUserName(response.userData.name);
        setUserEmail(email);
        handleOpen('success', 'Welcome back!');
        navigate('/');
      } else {
        handleOpen('error', response.message);
      }
    } else {
      handleOpen('error', email ? 'Password required.' : 'Email required.');
    }
  };
  return (
    <form className="form__wrapper">
      <IconButton
        onClick={() => {
          navigate('/');
        }}
        style={{ position: 'absolute', top: '10px', left: '10px' }}
        className='form__btn-back'
      >
        <ArrowBackIcon />
      </IconButton>
      <h3 className="form__title">Sign In</h3>
      <TextField
        autoComplete="true"
        label="Email"
        size="small"
        style={formStyles.input}
        onInput={(e) => {
          setEmail((e.target as HTMLInputElement).value);
        }}
      />
      <TextField
        autoComplete="true"
        type="password"
        label="Password"
        size="small"
        style={formStyles.input}
        onInput={(e) => {
          setPassword((e.target as HTMLInputElement).value);
        }}
      />
      <Button
        variant="contained"
        disabled={false}
        onClick={() => {
          handleClick();
        }}
        className='form__btn'
      >
        Login
      </Button>
      <p className="form__link_block">
        <span className="form__link_text">Not a member? </span>
        <Link className="form__link" to="/register">
          Create an account
        </Link>
      </p>
    </form>
  );
}
