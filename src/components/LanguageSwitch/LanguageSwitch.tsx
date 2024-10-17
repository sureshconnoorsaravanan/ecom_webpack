import React, { useEffect } from 'react';
import { loadLanguage, loadDefaultLanguage } from '../../i18nLoader';
import { useAppDispatch } from '../../store/hooks';
import { setLanguage } from '../../store/slices/products/productSlice';

const LanguageSwitch: React.FC = () => {
  const dispatch = useAppDispatch();

  // Load the default language when the component mounts
  useEffect(() => {
    loadDefaultLanguage();
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    loadLanguage(selectedLanguage); // Load the selected language
    dispatch(setLanguage(selectedLanguage)); // Update the Redux state
  };

  return (
    <div className="language-switch">
      <label htmlFor="language-select">Select Language:</label>
      <select id="language-select" onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="zh">中文</option>
      </select>
    </div>
  );
};

export default LanguageSwitch;
