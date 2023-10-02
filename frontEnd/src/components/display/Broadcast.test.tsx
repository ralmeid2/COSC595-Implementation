import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Broadcast from './Broadcast';
import { fetchResponse } from '../../testing';

global.fetch = jest.fn();

describe('<Broadcast />', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should display an empty message initially', () => {
    fetchResponse({ message: '' })
    const { container } = render(<Broadcast />);
    const messageDiv = container.querySelector('.bcmessage');
    expect(messageDiv).toBeInTheDocument();
    expect(messageDiv?.textContent).toBe('');
  });

  it('should fetch and display a message', async () => {
    const mockMessage = 'Test Broadcast Message';
    fetchResponse({ message: mockMessage });

    render(<Broadcast />);

    await waitFor(() => {
      expect(screen.getByText(mockMessage)).toBeInTheDocument();
    });
  });

  it('should handle fetch error gracefully', async () => {
    // Mock a failed fetch
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Fetch Error'))
    );

    render(<Broadcast />);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await waitFor(() => {
      expect(consoleSpy).toBeCalledWith(new Error('Fetch Error'));
    });

    consoleSpy.mockRestore();
  });
});
