import React from 'react';
import {render, screen, fireEvent, act, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import PhotoUploader from './PhotoUploader';
import {suppressConsole, fetchResponse} from "../../testing";

suppressConsole();

global.fetch = jest.fn();

describe('<PhotoUploader />', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    (fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
        ok: true,
      })
    );
  });


  it('renders without crashing', () => {
    const { container } = render(<PhotoUploader />);
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('should be able to select a file', () => {
    render(<PhotoUploader />);
    const fileInput = screen.getByLabelText('File');
    const file = new File(['image-content'], 'image.jpg', { type: 'image/jpeg' });

    fireEvent.change(fileInput, { target: { files: [file] } });
    expect((fileInput as HTMLInputElement).files?.[0]).toEqual(file);
  });


  it('should be able to change the category', () => {
    render(<PhotoUploader />);
    const categorySelect = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(categorySelect, { target: { value: 'slideshow' } });

    expect(categorySelect.value).toBe('slideshow');
  });

  it('should be able to upload a file', async () => {
    // Mock the fetch call
    fetchResponse({ ok: true, json: () => Promise.resolve({}) })

    render(<PhotoUploader />);
    const fileInput = screen.getByLabelText('File');
    const uploadButton = screen.getByText('Upload');

    const file = new File(['image-content'], 'image.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });


  it('should be able to delete an existing photo', async () => {
    const existingPhotos = [
      { name: 'image1.jpg', url: 'url1', category: 'marketing' },
    ];

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(existingPhotos),
      })
    );

    window.confirm = jest.fn(() => true);
    render(<PhotoUploader />);

    await act(async () => {});

    const deleteButton = screen.getByText('X');
    fireEvent.click(deleteButton);

    await act(async () => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });
});
