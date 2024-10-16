import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProducts } from '../../store/slices/productSlice';
import ProductList from '../../components/ProductList/ProductList';
import webImage from '../../assets/product_list.png';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const environment = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV';

  return (
    <div className="home">
      <h3 className="centered-header">Production Mode - {environment} Env</h3>

      <div className="header-container">
        <h3>Product list</h3>
        <img src={webImage} alt="List of Products" />
      </div>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error: {error}</h1>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default Home;
