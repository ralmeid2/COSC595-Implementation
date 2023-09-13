import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from './Form';

describe('<Form />', () => {

  it('renders without crashing', () => {
    render(<Form onSubmit={() => {}}>Test</Form>);
  });

  it('renders custom error message when provided', () => {
    render(<Form onSubmit={() => {}} errorMessage="This is an error">Test</Form>);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('calls onSubmit when the form is submitted', () => {
    const mockSubmit = jest.fn();
    render(
      <Form onSubmit={mockSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.click(screen.getByText('Submit'));
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('applies custom className when provided', () => {
    const { container } = render(<Form onSubmit={() => {}} className="custom-class">Test</Form>);
    const formElement = container.firstChild;

    expect(formElement).toHaveClass('custom-class');
  });

});
