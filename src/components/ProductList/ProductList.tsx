import React, {useEffect} from 'react';
import { DEFAULT_ALT_TEXT } from '../../constants/altText';
import { Product } from '../../types/productTypes';
import { useTranslation } from 'react-i18next';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { t } = useTranslation(); // Translation hook

  useEffect(() => {
    const liveRegion = document.getElementById('product-count');
    if (liveRegion) {
      liveRegion.innerText = `${products.length} ${t('productsFound')}`;
    }
  }, [products, t]);

  return (<>
      <div 
        id="product-count" 
        aria-live="polite" 
        aria-atomic="true" 
        style={{ position: 'absolute', width: '1px', height: '1px', margin: '-1px', padding: '0', border: '0', clip: 'rect(0 0 0 0)', overflow: 'hidden' }}
      >
        {/* Dynamically update the total number of products */}
        {products.length} {t('productsFound')}
      </div>
    <div className="product-container">
      {products.map(product => (
        <div
          className="product-div"
          key={product.id}
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
            <h2 className='product-header' id={`product-title-${product.id}`}>{product.title || 'Untitled Product'}</h2>
          </header>
          <section id={`product-category-${product.id}`}>
            <span>
              {t('category')}: {product.category?.toUpperCase() || 'Uncategorized'}
            </span>
          </section>
        </div>
      ))}
    </div>

  </>
  );
};

export default ProductList;
