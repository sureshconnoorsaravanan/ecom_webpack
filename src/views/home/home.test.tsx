import { render, screen } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Home from './home';

// Mock the necessary modules and components
jest.mock('../../store/hooks');
jest.mock('../../store/slices/productSlice', () => ({
  fetchProducts: jest.fn(),
}));
jest.mock('../../components/ProductList/ProductList', () => () => <div>Mocked ProductList</div>);
jest.mock('../../assets/product_list.png', () => 'mockedImage.png');

describe('Home Component', () => {
  const mockDispatch = jest.fn();
  const mockUseAppSelector = useAppSelector as jest.Mock;
  const mockUseAppDispatch = useAppDispatch as jest.Mock;

  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should dispatch fetchProducts on component mount', () => {
    mockUseAppSelector.mockReturnValue({ products: [], isLoading: false });
    render(<Home />);

    expect(mockDispatch).toHaveBeenCalled(); // Verify fetchProducts was dispatched
  });

  it('should display loading state when products are being fetched', () => {
    mockUseAppSelector.mockReturnValue({ products: [], isLoading: true });
    render(<Home />);

    const loadingText = screen.getByText(/loading.../i);
    expect(loadingText).toBeInTheDocument(); // Ensure loading text is displayed
  });

  it('should render ProductList component when products are loaded', () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', category: 'category1', image: 'image1.jpg', images: [] },
      { id: 2, title: 'Product 2', category: 'category2', image: 'image2.jpg', images: [] },
    ];

    mockUseAppSelector.mockReturnValue({ products: mockProducts, isLoading: false });
    render(<Home />);

    const productList = screen.getByText('Mocked ProductList');
    expect(productList).toBeInTheDocument(); // Verify ProductList is rendered
  });

  it("should display 'Production Mode' text with the correct environment", () => {
    // Test in 'DEV' environment
    process.env.NODE_ENV = 'development';
    mockUseAppSelector.mockReturnValue({ products: [], isLoading: false });
    render(<Home />);

    const headerDev = screen.getByText(/Production Mode - DEV Env/i);
    expect(headerDev).toBeInTheDocument(); // Verify DEV message is displayed

    // Test in 'PROD' environment
    process.env.NODE_ENV = 'production';
    render(<Home />);

    const headerProd = screen.getByText(/Production Mode - PROD Env/i);
    expect(headerProd).toBeInTheDocument(); // Verify PROD message is displayed
  });

  it('should display the webImage with the correct alt text', () => {
    mockUseAppSelector.mockReturnValue({ products: [], isLoading: false });
    render(<Home />);

    const imageElement = screen.getByAltText(/List of Products/i);
    expect(imageElement).toBeInTheDocument(); // Verify the image is present
    expect(imageElement).toHaveAttribute('src', 'mockedImage.png'); // Ensure correct src is used
  });
});
