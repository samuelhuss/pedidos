import React, { useEffect, useState } from 'react';

const Scoreboard = () => {
  const [time, setTime] = useState(90); // Changed value to 90 seconds

  // Timer logic and other functions...

  const resetTimer = () => {
    setTime(90); // Reset timer to 90 seconds instead of 600
  };

  return (
    <div>
      {/* your component JSX here */}
    </div>
  );
};

export default Scoreboard;