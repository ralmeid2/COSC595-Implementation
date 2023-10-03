import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import Options from './Options';
import {suppressConsole, fetchResponse} from "../../testing/index";

// Mock global fetch
global.fetch = jest.fn();

let container: any;

suppressConsole()

beforeEach(() => {
  (global.fetch as jest.Mock) = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ }),
    })
  );
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
})

describe('<Options />', () => {
  it('renders without crashing', () => {
    render(<Options />);
  });

  it('renders checkboxes and labels', async () => {
    let utils = render(<Options />);  // Declare and assign it here, outside act

    // If your Options component performs async operations, you'll need to wait for them to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const { getByLabelText, container } = utils;

    // Using getByLabelText
    expect(getByLabelText('Timer:')).toBeInTheDocument();
    expect(getByLabelText('Points:')).toBeInTheDocument();
    expect(getByLabelText('Events:')).toBeInTheDocument();
    expect(getByLabelText('Notices:')).toBeInTheDocument();

    // Using container.querySelector
    expect(container.querySelector('input[name="timer"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="points"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="events"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="notices"]')).toBeInTheDocument();
  });


  it('handles checkbox change events', async () => {
    // Setup
    fetchResponse({
      timer: false,
      points: false,
      events: false,
      notices: false,
      multiComponentView: false,
      broadcast: false,
      marketing: false,
      broadcastMessage: '',
    });

    const { getByLabelText } = render(<Options />);

    // Wait for any async operations in the component to complete
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    const timerCheckbox = getByLabelText('Timer:') as HTMLInputElement;

    // Check initial state
    expect(timerCheckbox.checked).toBe(false);

    // Update state
    await act(async () => {
      fireEvent.click(timerCheckbox);
      await new Promise((r) => setTimeout(r, 0));  // Wait for any state updates
    });

    // Check updated state
    expect(timerCheckbox.checked).toBe(true);
  });


  it('fetches initial options from API and fills the form', async () => {

    fetchResponse({
      timer: true,
      points: true,
      events: false,
      notices: false,
      multiComponentView: true,
      broadcast: false,
      marketing: false,
      broadcastMessage: 'Test message',
    });


    const { getByLabelText } = render(<Options />);

    await waitFor(() => {
      expect((getByLabelText('Multi Component View') as HTMLInputElement).checked).toBe(true);
      expect((getByLabelText('Timer:') as HTMLInputElement).checked).toBe(true);
      expect((getByLabelText('Points:') as HTMLInputElement).checked).toBe(true);
      expect((getByLabelText('Events:') as HTMLInputElement).checked).toBe(false);
    });
  });

  it('submits the form and shows success message', async () => {

    fetchResponse({});


    const { getByLabelText, getByText } = render(<Options />);
    const submitButton = getByText('Update Admin Options');

    await act(async () => {
      // fetch
      // fetch.mockResolvedValueOnce({ ok: true });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(getByText('Options saved successfully.')).toBeInTheDocument();
    });
  });
});
