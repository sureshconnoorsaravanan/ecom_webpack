const i18next = {
  t: jest.fn((key: string, options?: any) => {
    const translations: Record<string, string> = {
      mode: 'Production Mode',
      loading: 'Loading...',
      productList: 'Product list',
      error: `Error: ${options?.error || ''}`,
      'Failed to fetch products': 'Error: Failed to fetch products',
      // Add additional translations as needed
    };
    return translations[key] || key; // Return the translation or the key itself
  }),
  use: jest.fn(() => i18next), // Mock the use method
  init: jest.fn(() => Promise.resolve()), // Mock the init method to return a resolved promise
};

export default i18next;
