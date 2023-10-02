import React from 'react';
import { render, act, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Slideshow from './Slideshow';
import {suppressConsole} from "../../testing/suppressConsole";

// Mock fetch
global.fetch = jest.fn();

const fetchResponse = async (data: any) => {
  (fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    })
  );
};

suppressConsole();

describe('Slideshow Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render "Loading photos..." while fetching', () => {
    act(() => {
      render(<Slideshow isFullScreen={false} />);
    });
    expect(screen.getByText('Loading photos...')).toBeInTheDocument();
  });

  it('renders fullScreen class when isFullScreen is true', async () => {
    // Need to mock received photos else it just returns "No photos available."
    fetchResponse([{ name: 'photo1' }, { name: 'photo2' }]);

    render(<Slideshow isFullScreen={true} />);

    // Wait for fetch to resolve and component to re-render
    await waitFor(() => expect(screen.queryByText('Loading photos...')).toBeNull());
    await waitFor(() => expect(screen.queryByText('No photos available.')).toBeNull());

    // Now isLoading should be false and the slideshow div should be in the DOM
    expect(screen.getByTestId('slideshow')).toHaveClass('fullScreen');
  });

  it('should render "No photos available." if no photos are fetched', async () => {
    fetchResponse([]);
    act(() => {
      render(<Slideshow isFullScreen={false} />);
    });

    await waitFor(() => {
      expect(screen.getByText('No photos available.')).toBeInTheDocument();
    });
  });

  it('should cycle through photos every 10 seconds', async () => {
    const photos = [
      { name: 'photo1.jpg' },
      { name: 'photo2.jpg' },
      { name: 'photo3.jpg' },
    ];

    fetchResponse(photos);
    act(() => {
      render(<Slideshow isFullScreen={false} />);
    });

    await waitFor(() => {
      expect(screen.getByAltText('Slideshow')).toBeInTheDocument();
    });

    expect(screen.getByAltText('Slideshow')).toHaveAttribute('src', '/uploads/photo1.jpg');

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    await waitFor(() => {
      expect(screen.getByAltText('Slideshow')).toHaveAttribute('src', '/uploads/photo2.jpg');
    });

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    await waitFor(() => {
      expect(screen.getByAltText('Slideshow')).toHaveAttribute('src', '/uploads/photo3.jpg');
    });

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    await waitFor(() => {
      expect(screen.getByAltText('Slideshow')).toHaveAttribute('src', '/uploads/photo1.jpg');
    });
  });
});
