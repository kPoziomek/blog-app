import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <main>
        <h2>Welcome to the login page!</h2>
        <p>You can login, I believe in you.</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
};

export default Login;
