import React, { useState, useEffect } from 'react';
import MobileComponent from './MobileComponent';
import App from './App';

const MyComponent = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen size on initial render
    handleWindowSizeChange();

    // Add event listener to check screen size on window resize
    window.addEventListener('resize', handleWindowSizeChange);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= 500); // Adjust the breakpoint as needed
  };

  return (
    <div>
      {isMobile ? <MobileComponent /> : <App />}
    </div>
  );
};

export default MyComponent;
