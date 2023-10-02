import React from 'react';
import { screen, act } from '@testing-library/react';
import OptionChoice from './OptionChoice';
import { urlComponents } from '../shared/urlComponents';
import {renderWithRouter} from "../testing";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
}));

describe('OptionChoice component', () => {

  it('renders without crashing', async () => {
    await act(async () => {
      renderWithRouter(<OptionChoice />);
    });
  });

  it('renders the correct number of components', async () => {
    await act(async () => {
      renderWithRouter(<OptionChoice />);
    });
    await act(async () => {}); // to flush all effects and rerenders
    const numberOfComponents = Object.keys(urlComponents).length;
    const gridItems = screen.getAllByTestId('grid-item');
    expect(gridItems.length).toBe(numberOfComponents);
  });

  it('uses correct image paths and component names', async () => {
    await act(async () => {
      renderWithRouter(<OptionChoice />);
    });
    await act(async () => {}); // to flush all effects and rerenders
    Object.keys(urlComponents).forEach((key: string) => {
      const component = urlComponents[key as keyof typeof urlComponents];
      const img = screen.getByAltText(component.name);
      const paragraph = screen.getByText(component.name);
      expect(img).toBeInTheDocument();
      expect(paragraph).toBeInTheDocument();
    });
  });

  it('has correct links', async () => {
    await act(async () => {
      renderWithRouter(<OptionChoice />);
    });
    await act(async () => {}); // to flush all effects and rerenders
    Object.keys(urlComponents).forEach((key) => {
      const component = urlComponents[key as keyof typeof urlComponents];
      const link = screen.getByText(component.name).closest('a');
      expect(link?.getAttribute('href')).toBe(`/fullscreen/${key}`);
    });
  });

});
