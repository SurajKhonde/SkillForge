import React, { useState, useEffect } from 'react';
import "../../SpecificCss/Cursor.css"

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="cursor" style={{ left: position.x, top: position.y }}>
      🪂
    </div>
  );
};

export default Cursor;
