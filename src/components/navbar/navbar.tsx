import React, { useEffect } from "react";
import { FaSun, FaMoon } from 'react-icons/fa';
import webImage from "@assets/product_list.png";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleTheme } from "../../store/slices/theme/themeSlice";

const Navbar: React.FC = () => {
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
                <h3>Production Mode - {environment} Env</h3>
                <div>
                    <img src={webImage} width={30} height={30} alt="List of Products" className="me-3" />
                    {currentTheme === 'light' ? <FaMoon onClick={handleToggle} /> : <FaSun onClick={handleToggle} />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
