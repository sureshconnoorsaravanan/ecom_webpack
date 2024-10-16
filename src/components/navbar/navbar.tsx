import React from "react";
import { useTheme } from "../../context/theme/themeContext";
import { FaSun, FaMoon } from 'react-icons/fa';
import { lightTheme } from "../../theme/theme";
import webImage from "../../assets/product_list.png";

const Navbar: React.FC = () => {
    
  const { theme, toggleTheme } = useTheme();
  
  const environment = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV';

    return (
        <div className="bg-info">
            <div className="py-4 d-flex align-items-center justify-content-between container">
                <h3>Production Mode - {environment} Env</h3>
                <div>
                    <img src={webImage} width={30} height={30} alt="List of Products" className="me-3" />
                    {theme === lightTheme ? <FaMoon onClick={toggleTheme} /> : <FaSun onClick={toggleTheme} />}
                </div>
            </div>
        </div>
  );
};

export default Navbar;