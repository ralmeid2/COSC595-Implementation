import {act, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Body from './Body';
beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn((url: string) => {
    if (url === '/api/dailyNotices') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      }) as Promise<Response>;
    }
    if (url === '/api/options') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          multiComponentView: true,
          timer: <div />,
          points: <div />,
          events: <div />,
          notices: <div />,
          broadcast: <div />,
        }),
      }) as Promise<Response>;
    }
    return Promise.reject(new Error('Unknown URL')) as Promise<Response>;
  }) as jest.MockedFunction<typeof fetch>;

});

describe('<Body />', () => {
  it('should render loading state initially', async () => {
    act(() => {
      render(<Body />);
    })
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should fetch notices data on mount', async () => {
    act(() => {
      render(<Body />);
    })
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/dailyNotices');
    });
  });
});
