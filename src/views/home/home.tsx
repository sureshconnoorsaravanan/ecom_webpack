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
      <header role="banner">
        <Navbar />
        <LanguageSwitch />
      </header>

      <main role="main" className="content-container">
        <div className="header-container">
          <h1 data-testid="product-list-header" tabIndex={0} aria-label={t('productList')}>
            {t('productList')}
          </h1>
        </div>

        {isLoading ? (
          <h2 role="alert" aria-busy="true">
            {t('loading')}
          </h2>
        ) : error ? (
          <h2 role="alert" aria-live="assertive">
            {t('error')}
          </h2>
        ) : (
          <section
            className="product-list-container"
            aria-labelledby="product-list-header"
            aria-live="polite"
          >
            <ProductList products={products} />
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;
