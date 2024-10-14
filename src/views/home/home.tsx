import React, { useEffect, useState } from "react";
import AltText from "@utils/altText.txt";
import webImage from "@assets/product_list.png";
import { useAppSelector, useAppDispatch } from '../../config/hooks';
import {getList} from "../../config/slices/productSlice"

// Define types for the product data
interface Product {
  id: number;
  title: string;
  category: string;
  image: string;
  images: string[];
}

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  // Type for product state: array of Product objects
  const [product, setProduct] = useState<Product[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false); // Type as boolean
  const { listItems, status, error } = useAppSelector((state:any) => state.product);

  // Fetching data from API
  /* const fetchData = async (): Promise<void> => {
    setIsDataLoaded(true);
    try {
      const response = await fetch(`${process.env.API_URL}/products`);
      const data = await response.json();
      console.log(data)
      const productData = process.env.NODE_ENV === 'production' ? data.products : data
      return productData.slice(0, 10)
      //setProduct(productData.slice(0, 10));
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setIsDataLoaded(false);
    }
  }; */

  useEffect(() => {
    dispatch(getList())
  }, []);
  useEffect(() => {
    
  console.log(listItems)
  }, [listItems]);
  

  // Determine the environment
  const environment = process.env.NODE_ENV === 'production' ? 'Production Mode' : 'Development Mode';

  return (
    <>
      <h3 className="centered-header">{environment}</h3>
      
      <div className="HeaderContainer">
        <h3>Product list</h3>
        <img src={webImage} alt="List of Products" />
      </div>

      <div className="ProductContainer">
        {status == "loading" ? (
          <h1>Loading...</h1>
        ) : (
          listItems.map((curr: Product) => (
            <div className="productDiv" key={curr.id}>
                <img alt={curr.title || AltText} src={curr.image || curr.images[0]} />
              <span>
                {curr.title} - {curr.category.toUpperCase()}
              </span>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Home;