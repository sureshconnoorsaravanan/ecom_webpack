import React, { useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import webImage from '../../assets/product_list.png';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../store/slices/theme/themeSlice';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(state => state.theme.currentTheme);
  const { t } = useTranslation();
  const environment = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV';

  useEffect(() => {
    document.body.className = currentTheme;
  }, [currentTheme]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <h3>
        {t('mode', { environment })}
        </h3>
        <div className="theme-toggle">
          <img src={webImage} alt={t('productList')} />
          {currentTheme === 'light' ? (
            <FaMoon onClick={handleToggle} color='black' />
          ) : (
            <FaSun onClick={handleToggle} color='white' />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
