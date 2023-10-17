import React from 'react';

const WelcomeNote = ({ userName }) => {
  return (
    <React.Fragment>
      <h1>{`Welcome to the application ${userName ?? ''}`}!</h1>
    </React.Fragment>
  );
};

export default WelcomeNote;
