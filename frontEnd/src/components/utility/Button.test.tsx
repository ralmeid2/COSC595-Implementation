import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button component', () => {
  // Test for rendering the button
  it('renders correctly', () => {
    render(<Button />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  // Test for button click
  it('fires onClick event when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} />);
    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // Test for disabled button
  it('does not fire onClick event when disabled', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} disabled />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();

    userEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  // Test for custom props like
  it('should spread extra props on the button', () => {
    render(<Button aria-label="test-button" />);
    const buttonElement = screen.getByLabelText('test-button');

    expect(buttonElement).toBeInTheDocument();
  });
});
