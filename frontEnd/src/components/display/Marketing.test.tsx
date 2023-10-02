import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Marketing from './Marketing';
import {suppressConsole} from "../../testing/suppressConsole";

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

describe('<Marketing />', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should display "Loading photos..." initially', () => {
    render(<Marketing isFullScreen={false} />);
    expect(screen.getByText('Loading photos...')).toBeInTheDocument();
  });

  it('should display "No photos available." if no photos are returned', async () => {
    fetchResponse([]);
    render(<Marketing isFullScreen={false} />);
    await act(async () => {});
    await waitFor(() => {
      expect(screen.getByText('No photos available.')).toBeInTheDocument();
    });
  });

  it('should display the first photo when photos are available', async () => {
    fetchResponse([{ name: 'photo1.jpg' }, { name: 'photo2.jpg' }]);
    render(<Marketing isFullScreen={false} />);
    await act(async () => {});
    await waitFor(() => {
      expect(screen.getByAltText('Slideshow')).toBeInTheDocument();
      expect(screen.getByAltText('Slideshow')).toHaveAttribute('src', '/uploads/photo1.jpg');
    });
  });
});
