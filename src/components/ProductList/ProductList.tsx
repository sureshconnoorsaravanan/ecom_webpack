// src/components/ProductList/ProductList.tsx
import React from 'react';
import { DEFAULT_ALT_TEXT } from '../../constants/altText';
import { Product } from '../../types/productTypes';
import { useTranslation } from 'react-i18next';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { t } = useTranslation(); // Translation hook

  return (
    <div className="product-container">
      {products.map(product => (
        <div className="product-div" key={product.id}>
          <img alt={product.title || DEFAULT_ALT_TEXT} src={product.image || product.images?.[0]} />
          <span>
            {t('title')}: {product.title}{' '}
          </span>
          <span>
            {t('category')}: {product.category.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
