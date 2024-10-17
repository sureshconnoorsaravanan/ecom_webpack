import { render, screen } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Home from './home';
import { fetchProducts } from '../../store/slices/products/productSlice';

// Mock the necessary modules and components
jest.mock('../../store/hooks');
jest.mock('../../store/slices/products/productSlice', () => ({
  fetchProducts: jest.fn(),
}));
jest.mock('../../components/ProductList/ProductList', () => () => <div>Mocked ProductList</div>);
jest.mock('../../components/LanguageSwitch/LanguageSwitch', () => () => <div>Mocked LanguageSwitch</div>);
jest.mock('../../components/navbar/navbar', () => () => <div>Mocked Navbar</div>);

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
    mockUseAppSelector.mockReturnValue({ products: [], isLoading: false, error: null });
    render(<Home />);

    expect(mockDispatch).toHaveBeenCalledWith(fetchProducts()); // Verify fetchProducts was dispatched
  });

  it('should display loading state when products are being fetched', () => {
    mockUseAppSelector.mockReturnValue({ products: [], isLoading: true, error: null });
    render(<Home />);

    const loadingText = screen.getByText(/loading/i);
    expect(loadingText).toBeInTheDocument(); // Ensure loading text is displayed
  });

  it('should render ProductList component when products are loaded', () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', category: 'category1', image: 'image1.jpg', images: [] },
      { id: 2, title: 'Product 2', category: 'category2', image: 'image2.jpg', images: [] },
    ];

    mockUseAppSelector.mockReturnValue({ products: mockProducts, isLoading: false, error: null });
    render(<Home />);

    const productList = screen.getByText('Mocked ProductList');
    expect(productList).toBeInTheDocument(); // Verify ProductList is rendered
  });

  it('should display error message when there is an error', () => {
    const errorMessage = 'error'; // Adjusted to the actual text being rendered
  
    mockUseAppSelector.mockReturnValue({ products: [], isLoading: false, error: errorMessage });
    render(<Home />);
  
    const errorText = screen.getByText(/error/i); // Matching 'error' based on the DOM output
    expect(errorText).toBeInTheDocument();
  });

  it('should render Navbar and LanguageSwitch components', () => {
    mockUseAppSelector.mockReturnValue({ products: [], isLoading: false, error: null });
    render(<Home />);

    const navbar = screen.getByText('Mocked Navbar');
    expect(navbar).toBeInTheDocument(); // Verify Navbar is displayed

    const languageSwitch = screen.getByText('Mocked LanguageSwitch');
    expect(languageSwitch).toBeInTheDocument(); // Verify LanguageSwitch is displayed
  });

  it('should render the product header', () => {
    mockUseAppSelector.mockReturnValue({ products: [], isLoading: false, error: null });
    render(<Home />);

    const headerText = screen.getByRole('heading', { name: /productList/i });
expect(headerText).toBeInTheDocument();
  });
});
