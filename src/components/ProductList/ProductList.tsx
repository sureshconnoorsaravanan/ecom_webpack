import React from "react";
import AltText from "../utils/altText.txt";

interface Product {
  id: number;
  title: string;
  category: string;
  image: string;
  images: string[];
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-container">
      {products.map((product) => (
        <div className="product-div" key={product.id}>
          <img 
            alt={product.title || AltText} 
            src={product.image || product.images[0]} 
          />
          <span>
            {product.title} - {product.category.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductList;