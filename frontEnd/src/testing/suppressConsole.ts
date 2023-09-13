export const suppressConsole = () => {
  // Suppress console.error (to do with the components fetching - which is not the focus of these tests)
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

// Restore console.error after all tests
  afterAll(() => {
    console.error = originalError;
  });
}
