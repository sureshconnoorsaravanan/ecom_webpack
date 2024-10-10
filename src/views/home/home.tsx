import React, { useEffect, useState } from "react";
import AltText from "@utils/altText.txt";
import webImage from "@assets/product_list.png";

interface Product {
  id: number;
  title: string;
  category: string;
  image: string;
  images: string[];
}

const Home: React.FC = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  const fetchData = async (): Promise<void> => {
    setIsDataLoaded(true);
    try {
      const response = await fetch(`${process.env.API_URL}/products`);
      const data = await response.json();
      console.log(data)
      const productData = process.env.NODE_ENV === 'production' ? data.products : data
      setProduct(productData.slice(0, 10));
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setIsDataLoaded(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="HeaderContainer">
        {process.env.NODE_ENV === 'production' ? <h1>Production Mode</h1> : <h1>Development Mode</h1>}
        <h3>Product list</h3>
        <img src={webImage} alt="List of Products" />
      </div>

      <div className="ProductContainer">
        
        {isDataLoaded ? (
          <h1>Loading...</h1>
        ) : (
          product.map((curr: Product, index: number) => {
            return (
              <div className="productDiv" key={curr.id}>
                <img alt={curr.title || AltText} src={curr.image || curr.images[0]} />
                <span>
                  {curr.title} - {curr.category.toUpperCase()}
                </span>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
