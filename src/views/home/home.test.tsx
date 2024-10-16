import { render, screen } from "@testing-library/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Home from "./home";
import Navbar from "../../components/navbar/navbar";
import { ThemeProvider } from "../../context/theme/themeContext"; // Adjust the path as necessary
import { fetchProducts } from "../../store/slices/productSlice";

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

  // Create a custom render function
  const renderWithProviders = (ui: JSX.Element) => {
    return render(
      <ThemeProvider>
        {ui}
      </ThemeProvider>
    );
  };

  it("should dispatch fetchProducts on component mount", () => {
    mockUseAppSelector.mockReturnValue({ products: [], isLoading: false, error: null });
    renderWithProviders(<Home />); // Use custom render function

    expect(mockDispatch).toHaveBeenCalledWith(fetchProducts()); // Verify fetchProducts was dispatched
  });

  it("should display loading state when products are being fetched", () => {
    mockUseAppSelector.mockReturnValue({ products: [], isLoading: true, error: null });
    renderWithProviders(<Home />); // Use custom render function

    const loadingText = screen.getByText(/loading.../i);
    expect(loadingText).toBeInTheDocument(); // Ensure loading text is displayed
  });

  it('should render ProductList component when products are loaded', () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', category: 'category1', image: 'image1.jpg', images: [] },
      { id: 2, title: 'Product 2', category: 'category2', image: 'image2.jpg', images: [] },
    ];

    mockUseAppSelector.mockReturnValue({ products: mockProducts, isLoading: false, error: null });
    renderWithProviders(<Home />); // Use custom render function

    const productList = screen.getByText('Mocked ProductList');
    expect(productList).toBeInTheDocument(); // Verify ProductList is rendered
  });

  it("should display error message when there is an error", () => {
    const errorMessage = "Failed to fetch products";
    
    mockUseAppSelector.mockReturnValue({ products: [], isLoading: false, error: errorMessage });
    renderWithProviders(<Home />); // Use custom render function

    const errorText = screen.getByText(`Error: ${errorMessage}`);
    expect(errorText).toBeInTheDocument(); // Ensure error message is displayed
  });

  it("should display Navbar with the correct environment", () => {
    // Test in 'DEV' environment
    process.env.NODE_ENV = "development";
    mockUseAppSelector.mockReturnValue({ products: [], isLoading: false, error: null });
    renderWithProviders(<Home />); // Use custom render function

    const headerDev = screen.getByText(/Production Mode - DEV Env/i);
    expect(headerDev).toBeInTheDocument(); // Verify DEV message is displayed

    // Test in 'PROD' environment
    process.env.NODE_ENV = "production";
    renderWithProviders(<Home />); // Use custom render function

    const headerProd = screen.getByText(/Production Mode - PROD Env/i);
    expect(headerProd).toBeInTheDocument(); // Verify PROD message is displayed
  });

  it("should display the webImage with the correct alt text", () => {
    mockUseAppSelector.mockReturnValue({ products: [], isLoading: false, error: null });
    renderWithProviders(<Home />); // Use custom render function

    const imageElement = screen.getByAltText(/List of Products/i);
    expect(imageElement).toBeInTheDocument(); // Verify the image is present
    expect(imageElement).toHaveAttribute('src', 'mockedImage.png'); // Ensure correct src is used
  });
});
