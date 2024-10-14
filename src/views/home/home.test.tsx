import { render, screen, waitFor, act } from '@testing-library/react';
import Home from './home';

// Mock the fetch function
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

// Mock environment variables
process.env.API_URL = 'https://fakestoreapi.com';
process.env.NODE_ENV = 'development';

interface Product {
  id: number;
  title: string;
  category: string;
  image: string;
  images: string[];
}

const mockProducts: Product[] = [
  { id: 1, title: 'Product 1', category: 'category1', image: 'image1.jpg', images: ['image1.jpg'] },
  { id: 2, title: 'Product 2', category: 'category2', image: 'image2.jpg', images: ['image2.jpg'] },
];

describe('Home Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockProducts),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the correct environment header', async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(screen.getByText('Production Mode - DEV Env')).toBeInTheDocument();
  });

  test('renders the product list header and image', async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(screen.getByText('Product list')).toBeInTheDocument();
    expect(screen.getByAltText('List of Products')).toBeInTheDocument();
  });

  test('displays loading state initially', async () => {
    render(<Home />);
  
    // Wait for the loading text to appear
    const loadingText = await screen.findByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });
  
  test('fetches and displays products correctly', async () => {
    await act(async () => {
      render(<Home />);
    });
    await waitFor(() => {
      expect(screen.getByText('Product 1 - CATEGORY1')).toBeInTheDocument();
      expect(screen.getByText('Product 2 - CATEGORY2')).toBeInTheDocument();
    });
  });

  test('displays product images with correct alt text', async () => {
    await act(async () => {
      render(<Home />);
    });
    await waitFor(() => {
      const productImages = screen.getAllByRole('img');
      expect(productImages).toHaveLength(3); // 2 products + 1 header image
      expect(productImages[1]).toHaveAttribute('alt', 'Product 1');
      expect(productImages[2]).toHaveAttribute('alt', 'Product 2');
    });
  });

  test('handles API error gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await act(async () => {
      render(<Home />);
    });
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch products', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  test('limits the number of displayed products to 10', async () => {
    const manyProducts: Product[] = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      title: `Product ${i + 1}`,
      category: `category${i + 1}`,
      image: `image${i + 1}.jpg`,
      images: [`image${i + 1}.jpg`],
    }));

    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(manyProducts),
    });

    await act(async () => {
      render(<Home />);
    });
    await waitFor(() => {
      const productElements = screen.getAllByText(/Product \d+/);
      expect(productElements).toHaveLength(10);
    });
  });
});