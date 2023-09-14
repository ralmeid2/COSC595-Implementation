import React from 'react';
import {render, act, screen, cleanup, within} from '@testing-library/react';
import PointsChart from './PointsChart';
import { suppressConsole } from "../testing/suppressConsole";

// Mock fetch
global.fetch = jest.fn();

// Mock response data
const mockData: any = [
  { name: "Clancy", points: 150, color: "red" },
  { name: "Haydon", points: 100, color: "green" },
];

HTMLCanvasElement.prototype.getContext = jest.fn()

// Helper function to resolve fetch
const fetchResponse = async () => {
  (fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData),
    })
  );
};

suppressConsole();

afterEach(cleanup);

describe('<PointsChart />', () => {

  it('renders without crashing', () => {
    render(<PointsChart isFullScreen={false} />);
  });

  it('renders a canvas', () => {
    const {container} = render(<PointsChart isFullScreen={false} />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('renders correctly when isFullScreen is true', () => {
    render(<PointsChart isFullScreen={true} />);
    // Add specific assertions here to check if fullscreen render is as expected
  });

  it('renders correctly when isFullScreen is false', () => {
    render(<PointsChart isFullScreen={false} />);
  });

  it('fetches and displays house data', async () => {
    await act(async () => {
      fetchResponse();
      render(<PointsChart isFullScreen={false} />);
    });

    const clancyImage = await screen.findByAltText('Clancy');
    const clancyDiv = clancyImage.closest('div');

    // Checks that the '150' text is within the same div as the 'Clancy' image
    if (clancyDiv) {
      const { getByText } = within(clancyDiv);
      expect(getByText('150')).toBeInTheDocument();
    } else {
      fail('Clancy div not found');
    }

    const haydonImage = await screen.findByAltText('Haydon');
    const haydonDiv = haydonImage.closest('div');

    // Checks that the '100' text is within the same div as the 'Haydon' image
    if (haydonDiv) {
      const { getByText } = within(haydonDiv);
      expect(getByText('100')).toBeInTheDocument();
    } else {
      fail('Haydon div not found');
    }
  });

});
