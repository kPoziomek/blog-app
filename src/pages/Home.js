import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>That feels like an existential question, don't you think?</p>
      </main>
      <nav>
        <Link to="/login">Login</Link>
      </nav>
    </>
  );
};

export default Home;
