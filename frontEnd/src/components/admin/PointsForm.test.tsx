import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PointsForm from './PointsForm';
import {suppressConsole} from "../../testing/suppressConsole";

global.fetch = jest.fn();
suppressConsole();
const fetchResponse = async (data: any) => {
  (fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    })
  );
};

describe('<PointsForm />', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('renders without crashing', () => {
    render(<PointsForm />);
    // expect(screen.getByText('Update House Points')).toBeInTheDocument();
    // Because both submit and the h1 have the same text, we need to use a role
    expect(screen.getByRole('heading', { name: /Update House Points/i })).toBeInTheDocument();

  });

  it('fetches house points and displays them', async () => {

    fetchResponse([{ name: 'Clancy', points: 150, color: 'red' }])

    render(<PointsForm />);
    await act(async () => {}); // wait for async operations to complete before continuing

    expect(screen.getByDisplayValue('150')).toBeInTheDocument();
  });

  it('should be able to change points', async () => {
    fetchResponse([{ name: 'Clancy', points: 150, color: 'red' }])
    render(<PointsForm />);
    await act(async () => {}); // wait for async operations to complete before continuing

    const input = screen.getByDisplayValue('150');

    fireEvent.change(input, { target: { value: '160' } });
    expect(input).toHaveValue('160');
  });

  it('submits the form and shows a success message', async () => {
    fetchResponse([]);

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
      })
    );

    render(<PointsForm />);

    const submitButton = screen.getByRole('button', { name: /Update House Points/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('House Points saved successfully.')).toBeInTheDocument();
    });
  });
});
