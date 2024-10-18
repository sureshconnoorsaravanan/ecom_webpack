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
        <article
          className="product-div"
          key={product.id}
          role="region"
          aria-labelledby={`product-title-${product.id}`}
          aria-describedby={`product-category-${product.id}`}
          tabIndex={0} // Make the product container focusable for keyboard users
        >
          <img
            alt={product.title || DEFAULT_ALT_TEXT}
            src={product.image || product.images?.[0]}
            aria-labelledby={`product-title-${product.id}`}
            style={{ width: '200px', height: '200px' }} // Ensure image size is appropriate
          />
          <header>
            <h2 className="product-header" id={`product-title-${product.id}`}>
              {t('title')}: {product.title || 'Untitled Product'}
            </h2>
          </header>
          <section id={`product-category-${product.id}`}>
            <span>
              {t('category')}: {product.category?.toUpperCase() || 'Uncategorized'}
            </span>
          </section>
        </article>
      ))}
    </div>
  );
};

export default ProductList;
