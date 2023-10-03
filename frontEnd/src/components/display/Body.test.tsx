import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {suppressConsole} from "../../testing";
import Body from './Body';

suppressConsole();

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as unknown as typeof fetch;

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

describe('<Body />', () => {
  it('should render loading state initially', async () => {
    render(<Body />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should fetch notices data on mount', async () => {
    render(<Body />);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/dailyNotices');
    });
  });


});
