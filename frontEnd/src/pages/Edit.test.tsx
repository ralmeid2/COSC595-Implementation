import React from 'react';
import { fireEvent, act, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Edit from './Edit';
import * as httpUtils from '../utils/http';
import {renderWithRouter, suppressConsole} from "../testing";
import {get, put} from "../utils/http";


jest.mock('../utils/http')

suppressConsole();

describe('Edit component', () => {
  let getMock: jest.Mock;
  let putMock: jest.Mock;
  window.confirm = jest.fn(() => true);

  beforeEach(() => {
    getMock = (httpUtils.get as jest.Mock) = jest.fn();
    putMock = (httpUtils.put as jest.Mock) = jest.fn()
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    await act(async () => {
      renderWithRouter(<Edit />);
    })
  });

  it('fetches daily notices on mount', async () => {
    getMock.mockResolvedValueOnce([]); // Mock empty array response
    await act(async () => {
      renderWithRouter(<Edit />);
    });
    expect(getMock).toHaveBeenCalledTimes(1);
  });

  it('displays the daily notices', async () => {
    getMock.mockResolvedValueOnce([
      { _id: '1', title: 'Title1', message: 'Message1' },
    ]);
    await act(async () => {
      renderWithRouter(<Edit />);
    });
    expect(screen.getByText(/Title1 Message1/)).toBeInTheDocument();
  });

  it('renders input form when an item is selected', async () => {
    // Mock window.confirm
    window.confirm = jest.fn(() => true);

    // Mock the initial API call and individual item API call
    const mockGet = get as jest.MockedFunction<typeof get>;
    mockGet.mockResolvedValueOnce([{ _id: '1', title: 'Title1', message: 'Message1' }]);
    mockGet.mockResolvedValueOnce([{ _id: '1', title: 'Title1', message: 'Message1' }]);

    // Render the component
    renderWithRouter(<Edit />);

    // Wait for the component to initially load data
    await waitFor(() => {
      expect(screen.getByText(/Please Click on an Item to Edit it/)).toBeInTheDocument();
    });

    // Wait for the item to appear
    await waitFor(() => {
      expect(screen.getByText(/Title1 Message1/)).toBeInTheDocument();
    })

    // Click on the item
    fireEvent.click(screen.getByText(/Title1 Message1/));

    // Wait for the form to appear and check its inputs
    await waitFor(() => {
      const titleInput = screen.getByPlaceholderText('Title') as HTMLInputElement;
      const messageInput = screen.getByPlaceholderText('Message') as HTMLInputElement;
      expect(titleInput.value).toBe('Title1');
      expect(messageInput.value).toBe('Message1');
    });
  });


  it('submits the form correctly', async () => {
    // Mock window.confirm
    window.confirm = jest.fn(() => true);
    const mockGet = get as jest.MockedFunction<typeof get>;
    const putMock = put as jest.MockedFunction<typeof put>;

    mockGet.mockResolvedValueOnce([{ _id: '1', title: 'Title1', message: 'Message1' }]);
    mockGet.mockResolvedValueOnce([{ _id: '1', title: 'Title1', message: 'Message1' }]);
    putMock.mockResolvedValueOnce({});

    renderWithRouter(<Edit />);

    await waitFor(() => {
      expect(screen.getByText(/Please Click on an Item to Edit it/)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Title1 Message1/)).toBeInTheDocument();
    })

    fireEvent.click(screen.getByText(/Title1 Message1/));

    await waitFor(() => {
      const titleInput = screen.getByPlaceholderText('Title') as HTMLInputElement;
      expect(titleInput).toBeInTheDocument();
    });

    // Fill out and submit the form
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Title' }});
    fireEvent.change(screen.getByPlaceholderText('Message'), { target: { value: 'New Message' }});
    fireEvent.change(screen.getByPlaceholderText('Start Date'), { target: { value: '2023-10-01' }});
    fireEvent.change(screen.getByPlaceholderText('Expiry Date'), { target: { value: '2023-10-10' }});

    await waitFor(() => {
      expect(screen.getByText('Submit')).not.toBeDisabled();
    })

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(putMock).toHaveBeenCalledWith(
        '/api/dailyNotices/',
        expect.objectContaining({
          title: 'New Title',
          message: 'New Message',
          startDate: '2023-10-01',
          expiryDate: '2023-10-10'
        })
      );
    });
  });

  it('disables the Submit button when any form field is empty', async () => {
    // Mock window.confirm
    window.confirm = jest.fn(() => true);
    const mockGet = get as jest.MockedFunction<typeof get>;

    mockGet.mockResolvedValueOnce([{ _id: '1', title: 'Title1', message: 'Message1' }]);
    mockGet.mockResolvedValueOnce([{ _id: '1', title: 'Title1', message: 'Message1' }]);

    renderWithRouter(<Edit />);

    await waitFor(() => {
      expect(screen.getByText(/Please Click on an Item to Edit it/)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Title1 Message1/)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Title1 Message1/));

    await waitFor(() => {
      const titleInput = screen.getByPlaceholderText('Title') as HTMLInputElement;
      expect(titleInput).toBeInTheDocument();
    });

    // Initially, Submit should be disabled
    expect(screen.getByText('Submit')).toBeDisabled();

    // Fill out only some fields
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Title' }});
    fireEvent.change(screen.getByPlaceholderText('Message'), { target: { value: 'New Message' }});

    // Submit should still be disabled
    expect(screen.getByText('Submit')).toBeDisabled();
  });



});
