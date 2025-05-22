'use client';

import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from "../redux/themeSlice";
import Link  from "next/link"



const Header = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);
  
    return (
      <header className="header">
        <span><Link href="/" className="nav-link" id="logo">cryptoLens</Link></span>
        <button onClick={() => dispatch(toggleTheme())}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>
    );
  };
  
  export default Header;