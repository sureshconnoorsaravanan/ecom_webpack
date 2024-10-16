import React from "react";
import { DEFAULT_ALT_TEXT } from "../../constants/altText";
import { Product } from "../../types/productTypes";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-container">
      {products.map((product) => (
        <div className="product-div" key={product.id}>
          <img 
            alt={product.title || DEFAULT_ALT_TEXT} 
            src={product.image || product.images?.[0]} 
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
