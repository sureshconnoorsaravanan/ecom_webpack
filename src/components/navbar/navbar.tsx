import React, { useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import webImage from '@assets/product_list.png';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../store/slices/theme/themeSlice';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { t } = useTranslation(); // Initialize translation
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(state => state.theme.currentTheme);

  const environment = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV';

  useEffect(() => {
    document.body.className = currentTheme;
  }, [currentTheme]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

    return (
        <div className="bg-info">
        <div className="py-4 d-flex align-items-center justify-content-between container">
            <h1 id="environment-heading">Production Mode - {environment} Env</h1>
            <div>
            <img 
                src={webImage} 
                width={30} 
                height={30} 
                alt="List of Products" 
                className="me-3" 
                aria-hidden="true" // If the image is decorative and doesn't convey any essential information
            />
            <button 
                onClick={handleToggle} 
                aria-label={currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                className="theme-toggle-btn"
                aria-pressed={currentTheme === 'dark'} // Indicates the current state of the button for screen readers
            >
                {currentTheme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
            </div>
        </div>
        </div>

    );
};

export default Navbar;
