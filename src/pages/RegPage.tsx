import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button/Button';

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { regUser } from '../components/api/regUser';
import { globalContext } from '../components/contexts/globalContext';

export const formStyles = {
  input: {
    width: '100%',
    marginBottom: '10px',
  },
};

export default function RegPage() {
  const { setOpen, setSeverity, setAlertMessage } = useContext(globalContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleOpen = (severityState: string, alertMessageValue: string) => {
    setOpen(true);
    setSeverity(severityState);
    setAlertMessage(alertMessageValue);
  };

  const handleClick = async () => {
    if (name && email && password) {
      const response = await regUser({
        name: name,
        email: email,
        password: password,
      });
      console.log(response);
      
      if (response.success) {
        handleOpen('success', 'Welcome!');
        navigate('/')
      } else {
        handleOpen('error', response.message);
      }
    } else {
      handleOpen(
        'error',
        name && email ? 'Password required.' : 'Please fill in the form fields.'
      );
    }
  };
  return (
    <form className="form__wrapper">
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
  );
}
