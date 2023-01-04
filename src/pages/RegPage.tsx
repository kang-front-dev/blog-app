import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { regUser } from '../components/api/regUser';
import { globalContext } from '../components/contexts/globalContext';
import { validateEmail } from '../components/lib/ValidateEmail';

export const formStyles = {
  input: {
    width: '100%',
    marginBottom: '10px',
  },
};

export default function RegPage() {
  const { setUserEmail, setUserName, setIsAuth, handleSnackbarOpen } =
    useContext(globalContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleClick = async () => {
    if (name && validateEmail(email) && password.length >= 6) {
      const response = await regUser({
        name: name,
        email: email,
        password: password,
      });
      console.log(response);

      if (response.success) {
        setIsAuth(true);
        setUserName(name);
        setUserEmail(email);
        localStorage.setItem('username', name);
        localStorage.setItem('email', email);

        handleSnackbarOpen('success', 'Welcome!');
        navigate('/');
      } else {
        handleSnackbarOpen('error', response.message);
      }
    } else if (!validateEmail(email)) {
      handleSnackbarOpen('error', 'Please enter a valid email address');
    } else if (password.length < 6) {
      handleSnackbarOpen('error', 'Minimum password length is 6 characters');
    } else{
      handleSnackbarOpen('error', 'Please fill in all fields');
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
        >
          <ArrowBackIcon />
        </IconButton>
        <h3 className="form__title">Sign Up</h3>
        <TextField
          autoComplete="true"
          label="Name"
          size="small"
          style={formStyles.input}
          onInput={(e) => {
            setName((e.target as HTMLInputElement).value);
          }}
        />
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
        >
          Login
        </Button>
        <p className="form__link_block">
          <span className="form__link_text">Already have an account? </span>
          <Link className="form__link" to="/login">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
}
