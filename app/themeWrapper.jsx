// app/ThemeWrapper.jsx
'use client';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ThemeWrapper({ children }) {
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.body.className = theme; // sets class to "light" or "dark"
  }, [theme]);

  return <>{children}</>;
}
