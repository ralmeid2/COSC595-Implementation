import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import Header from './Header'; // Replace this import with your actual import
import { MemoryRouter, Route } from 'react-router-dom';

// Mock fetch
global.fetch = jest.fn();

// Helper function to resolve fetch
const fetchResponse = async (data: any) => {
  (fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    })
  );
};

// Mock react-router hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

// Suppress console.error (to do with the components fetching - which is not the focus of these tests)
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

// Restore console.error after all tests
afterAll(() => {
  console.error = originalError;
});



describe('<Header />', () => {
  it('renders without crashing', () => {
    const navigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigate);
    require('react-router-dom').useLocation.mockReturnValue({ pathname: '/' });

    render(<MemoryRouter><Header isFullScreen={true} /></MemoryRouter>);
  });

  it('fetches weather data and displays it', async () => {
    const navigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigate);
    require('react-router-dom').useLocation.mockReturnValue({ pathname: '/' });

    fetchResponse({
      current_temp: 25,
      weathercode: 1,
    });

    const { getByText } = render(<MemoryRouter><Header isFullScreen={true} /></MemoryRouter>);

    await waitFor(() => {
      expect(getByText(/25/)).toBeInTheDocument(); // Replace 25 with your weather temperature text representation
    });
  });

  it('navigates to Admin page when Admin button is clicked', () => {
    const navigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigate);
    require('react-router-dom').useLocation.mockReturnValue({ pathname: '/' });

    const { getByText } = render(<MemoryRouter><Header isFullScreen={true} /></MemoryRouter>);

    fireEvent.click(getByText('Admin'));
    expect(navigate).toHaveBeenCalledWith('/admin');
  });

  it('navigates to Home page when Home button is clicked', () => {
    const navigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigate);
    require('react-router-dom').useLocation.mockReturnValue({ pathname: '/somepath' });

    const { getByText } = render(<MemoryRouter><Header isFullScreen={true} /></MemoryRouter>);

    fireEvent.click(getByText('Home'));
    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('does not render menu options on the display route', () => {
    require('react-router-dom').useLocation.mockReturnValue({ pathname: '/display' });

    const { queryByText } = render(<MemoryRouter><Header isFullScreen={true} /></MemoryRouter>);

    expect(queryByText('Admin')).toBeNull();
    expect(queryByText('Home')).toBeNull();
  });
});
