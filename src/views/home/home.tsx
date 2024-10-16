import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/slices/productSlice";
import ProductList from "../../components/ProductList/ProductList";
import Navbar from "../../components/navbar/navbar";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  return (
    <div>
      <Navbar/>
      <div className="container">
        <h3 className="mt-4">List of products</h3>

      {isLoading ? 
        <h3 className="mt-5 text-center">Loading...</h3>
      : error ? <h1>Error: {error}</h1> : <ProductList products={products} />
        }
        </div>
    </div>
  );
};

export default Home;
