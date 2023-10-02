import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Message from './Message';

describe('<Message />', () => {
  it('should render an info message', () => {
    render(<Message variant="info" message="This is an info message" />);
    const element = screen.getByText(/This is an info message Testing/i);
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('info');
  });

  it('should render a success message', () => {
    render(<Message variant="success" message="This is a success message" />);
    const element = screen.getByText(/This is a success message Testing/i);
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('success');
  });

  it('should render a warning message', () => {
    render(<Message variant="warning" message="This is a warning message" />);
    const element = screen.getByText(/This is a warning message Testing/i);
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('warning');
  });

  it('should render an error message', () => {
    render(<Message variant="error" message="This is an error message" />);
    const element = screen.getByText(/This is an error message Testing/i);
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('error');
  });
});
