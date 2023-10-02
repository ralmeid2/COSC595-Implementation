import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Add from './Add';
import { post as originalPost } from '../utils/http';
import {suppressConsole, renderWithRouter} from "../testing";

jest.mock('../utils/http');
suppressConsole();
const post = originalPost as jest.MockedFunction<typeof originalPost>;

describe('Add component', () => {
  beforeEach(() => {
    post.mockClear();
  });

  it('renders without crashing', () => {
    renderWithRouter(<Add />);
  });

  it('renders form fields correctly', () => {
    const { getByPlaceholderText } = renderWithRouter(<Add />);
    expect(getByPlaceholderText('Title')).toBeInTheDocument();
    expect(getByPlaceholderText('Message')).toBeInTheDocument();
    expect(getByPlaceholderText('Start Date')).toBeInTheDocument();
    expect(getByPlaceholderText('Expiry Date')).toBeInTheDocument();
  });

  it('submits the form with user input', async () => {
    const { getByPlaceholderText, getByText } = renderWithRouter(<Add />);
    fireEvent.change(getByPlaceholderText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(getByPlaceholderText('Message'), { target: { value: 'Test Message' } });
    fireEvent.change(getByPlaceholderText('Start Date'), { target: { value: '2022-01-01' } });
    fireEvent.change(getByPlaceholderText('Expiry Date'), { target: { value: '2022-12-31' } });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => expect(post).toHaveBeenCalledTimes(1));
    expect(post).toHaveBeenCalledWith('/api/dailyNotices', {
      title: 'Test Title',
      message: 'Test Message',
      startDate: '2022-01-01',
      expiryDate: '2022-12-31'
    });
  });

  it('clears the form fields after successful submission', async () => {
    post.mockResolvedValue({});
    const { getByPlaceholderText, getByText } = renderWithRouter(<Add />);
    fireEvent.change(getByPlaceholderText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(getByPlaceholderText('Message'), { target: { value: 'Test Message' } });
    fireEvent.change(getByPlaceholderText('Start Date'), { target: { value: '2022-01-01' } });
    fireEvent.change(getByPlaceholderText('Expiry Date'), { target: { value: '2022-12-31' } });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => expect(post).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      expect((getByPlaceholderText('Title') as HTMLInputElement).value).toBe('');
      expect((getByPlaceholderText('Message') as HTMLInputElement).value).toBe('');
      expect((getByPlaceholderText('Start Date') as HTMLInputElement).value).toBe('');
      expect((getByPlaceholderText('Expiry Date') as HTMLInputElement).value).toBe('');
    });
  });
});
