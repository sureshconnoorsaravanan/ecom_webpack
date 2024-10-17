import { render, screen } from '@testing-library/react';
import ProductList from '../../components/ProductList/ProductList';
import { DEFAULT_ALT_TEXT } from '../../constants/altText';

describe('ProductList Component', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Product 1',
      category: 'category1',
      image: 'image1.jpg',
      images: ['image1.jpg', 'image2.jpg'],
    },
    {
      id: 2,
      title: 'Product 2',
      category: 'category2',
      image: '',
      images: ['image3.jpg', 'image4.jpg'],
    },
  ];

  // Test: rendering product items
  it('should render all products passed via props', () => {
    render(<ProductList products={mockProducts} />);
    const productTitles = screen.getAllByText(/Product/i);
    expect(productTitles).toHaveLength(2); // Verify that both products are rendered
  });

  // Test for rendering title and category in uppercase
  it('should display product title and category in uppercase', () => {
    render(<ProductList products={mockProducts} />);
    const firstProductTitle = screen.getByText(/Product 1/i);
    const firstProductCategory = screen.getByText(/CATEGORY1/i);
    const secondProductTitle = screen.getByText(/Product 2/i);
    const secondProductCategory = screen.getByText(/CATEGORY2/i);
    expect(firstProductTitle).toBeInTheDocument();
    expect(firstProductCategory).toBeInTheDocument();
    expect(secondProductTitle).toBeInTheDocument();
    expect(secondProductCategory).toBeInTheDocument();
  });

  // Test for using the 'image' property
  it('should use the `image` property if available', () => {
    render(<ProductList products={mockProducts} />);
    const firstProductImage = screen.getByAltText('Product 1');
    expect(firstProductImage).toHaveAttribute('src', 'image1.jpg');
  });

  // Test for using the first image from 'images[]' if 'image' is empty
  it('should fallback to the first image from `images[]` if `image` is empty', () => {
    render(<ProductList products={mockProducts} />);
    const secondProductImage = screen.getByAltText('Product 2');
    expect(secondProductImage).toHaveAttribute('src', 'image3.jpg');
  });

  // Test for alt text using product title when available
  it('should render alt text with product title when available', () => {
    render(<ProductList products={mockProducts} />);
    const firstProductImage = screen.getByAltText('Product 1');
    expect(firstProductImage).toBeInTheDocument();
  });

  // Test for using fallback alt text when title is missing
  it('should render alt text with fallback from AltText when title is missing', () => {
    const productsWithoutTitle = [
      { id: 3, title: '', category: 'category3', image: '', images: ['image5.jpg'] },
    ];
    render(<ProductList products={productsWithoutTitle} />);
    const fallbackAltText = screen.getByAltText(DEFAULT_ALT_TEXT); // Testing fallback alt text
    expect(fallbackAltText).toBeInTheDocument();
  });

  // Handling an empty product list
  it('should render nothing when the product list is empty', () => {
    render(<ProductList products={[]} />);
    expect(screen.queryByText(/Product/i)).not.toBeInTheDocument(); // Ensure nothing is rendered
  });
});
