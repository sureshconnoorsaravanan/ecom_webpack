import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProducts } from '../../store/slices/products/productSlice';
import ProductList from '../../components/ProductList/ProductList';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../../components/LanguageSwitch/LanguageSwitch';
import Navbar from '../../components/navbar/navbar';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(state => state.products);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="main-container">
      <Navbar />
      <LanguageSwitch />

      <div className="header-container">
        <h3 data-testid="product-list-header">{t('productList')}</h3>
      </div>

      {isLoading ? (
        <h1>{t('loading')}</h1>
      ) : error ? (
        <h1>{t('error')}</h1>
      ) : (
        <div className="product-list-container">
          <ProductList products={products} />
        </div>
      )}
    </div>
  );
};

export default Home;
