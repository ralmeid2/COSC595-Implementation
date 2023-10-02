import { render, screen, waitFor, act } from '@testing-library/react';
import React from 'react';
import WallOfFame from './WallOfFame';
import '@testing-library/jest-dom/extend-expect';
import {suppressConsole, fetchResponse} from "../../testing";

global.fetch = jest.fn();

suppressConsole();

describe('WallOfFame', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('shows loading initially', () => {
    render(<WallOfFame isFullScreen={false} />);
    expect(screen.getByText('Loading photos...')).toBeInTheDocument();
  });

  it('shows "No photos available." when no photos are present', async () => {
    fetchResponse([]);

    render(<WallOfFame isFullScreen={false} />);
    await waitFor(() => expect(screen.getByText('No photos available.')).toBeInTheDocument());
  });

  it('renders fullScreen class when isFullScreen is true', async () => {
    fetchResponse([{ name: 'photo1' }, { name: 'photo2' }]);

    render(<WallOfFame isFullScreen={true} />);
    await waitFor(() => expect(screen.queryByText('Loading photos...')).toBeNull());
    await waitFor(() => expect(screen.queryByText('No photos available.')).toBeNull());

    expect(screen.getByAltText('WallOfFame')).toHaveAttribute('src', '/uploads/photo1');
  });

  it('rotates photos every 10 seconds', async () => {
    jest.useFakeTimers();
    fetchResponse([{ name: 'photo1' }, { name: 'photo2' }]);

    render(<WallOfFame isFullScreen={false} />);
    await waitFor(() => expect(screen.queryByText('Loading photos...')).toBeNull());
    await waitFor(() => expect(screen.queryByText('No photos available.')).toBeNull());

    expect(screen.getByAltText('WallOfFame')).toHaveAttribute('src', '/uploads/photo1');

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByAltText('WallOfFame')).toHaveAttribute('src', '/uploads/photo2');
    jest.useRealTimers();
  });
});
