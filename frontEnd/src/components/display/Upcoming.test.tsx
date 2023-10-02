import React from 'react';
import {act, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Upcoming from './Upcoming';

global.fetch = jest.fn();

const fetchResponse = async (events: any) => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ events }),
  });
};

describe('Upcoming', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display the event title', async () => {
    fetchResponse([])
    await act(async () => {
      render(<Upcoming isFullScreen={false} />);
    })
    expect(screen.getByText('UPCOMING EVENTS')).toBeInTheDocument();
  });

  it('should render events when available', async () => {
    const mockEvents = [
      { event: 'School Holidays', date: '2023-07-01' },
      { event: 'Christmas', date: '2023-12-25' },
    ];

    await fetchResponse(mockEvents);  // await here if fetchResponse is asynchronous

    await act(async () => {
      render(<Upcoming isFullScreen={false} />);
    });

    // Now verify if fetch has been called
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    await act(async () => {
      await waitFor(() => {
        expect(screen.getByText(/School Holidays/)).toBeInTheDocument();
        expect(screen.getByText(/\|\s*2023-07-01/)).toBeInTheDocument();
        expect(screen.getByText(/Christmas/)).toBeInTheDocument();
        expect(screen.getByText(/\|\s*2023-12-25/)).toBeInTheDocument();
      });
    });
  });


  it('should apply the fullscreen style when isFullScreen is true', async () => {
    fetchResponse([]);
    await act(async () => {
      render(<Upcoming isFullScreen={true} />);
    })

    await waitFor(() => {
      expect(screen.getByTestId('upcoming')).toHaveClass('fullScreen');
    })
  });


});
