import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminMenu from './AdminMenu';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('<AdminMenu />', () => {
  beforeEach(() => {
    render(
      // MemoryRouter keeps track of navigation history, so we can test that the correct route is navigated to
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/admin" element={<AdminMenu />} />
        </Routes>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    mockNavigate.mockClear();
  });

  it('renders correctly', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(7);
  });

  it('navigates to /add when Add Daily Notice button is clicked', () => {
    const addButton = screen.getByText(/Add Daily Notice/i);
    fireEvent.click(addButton);
    expect(mockNavigate).toHaveBeenCalledWith('/add');
  });

  it('navigates to /photo when Add/Remove Photos button is clicked', () => {
    const photoButton = screen.getByText(/Add\/Remove Photos/i);
    fireEvent.click(photoButton);
    expect(mockNavigate).toHaveBeenCalledWith('/photo');
  });

  it('navigates to /admin-options when Display Options button is clicked', () => {
    const optionsButton = screen.getByText(/Display Options/i);
    fireEvent.click(optionsButton);
    expect(mockNavigate).toHaveBeenCalledWith('/admin-options');
  });

  it('navigates to /edit when Edit Daily Notice button is clicked', () => {
    const editButton = screen.getByText(/Edit Daily Notice/i);
    fireEvent.click(editButton);
    expect(mockNavigate).toHaveBeenCalledWith('/edit');
  });

  it('navigates to /delete when Delete Daily Notice button is clicked', () => {
    const deleteButton = screen.getByText(/Delete Daily Notice/i);
    fireEvent.click(deleteButton);
    expect(mockNavigate).toHaveBeenCalledWith('/delete');
  });

  it('navigates to / when Go To Display button is clicked', () => {
    const displayButton = screen.getByText(/Go To Main Display/i);
    fireEvent.click(displayButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
