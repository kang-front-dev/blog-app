import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logUser } from '../api/logUser';
import { globalContext } from '../components/contexts/globalContext';
import { validateEmail } from '../utils/ValidateEmail';
export const formStyles = {
  input: {
    width: '100%',
    marginBottom: '10px',
  },
};
export default function LogPage() {
  const {
    handleAuth,
    handleSnackbarOpen,
  } = useContext(globalContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    if (validateEmail(email) && password) {
      const response = await logUser({ email: email, password: password });

      if (response.success) {
        handleAuth({
          isAuth: true,
          userName: response.userData.name,
          userEmail: response.userData.email,
        })
        localStorage.setItem('avatarImgPath', response.userData.avatarImgPath);
        localStorage.setItem('username', response.userData.name);
        localStorage.setItem('email', email);

        handleSnackbarOpen('success', 'Welcome back!');
        navigate('/');
      } else {
        handleSnackbarOpen('error', response.message);
      }
    } else if (!validateEmail(email)) {
      handleSnackbarOpen('error', 'Please enter a valid email address');
    } else {
      handleSnackbarOpen('error', 'Password required');
    }
  };
  return (
    <section>
      <form className="form__wrapper">
        <IconButton
          onClick={() => {
            navigate('/');
          }}
          style={{ position: 'absolute', top: '10px', left: '10px' }}
          className="form__btn-back"
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
          className="form__btn"
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
    </section>
  );
}
