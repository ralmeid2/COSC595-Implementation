import React from 'react';
import PointsChart from './PointsChart';
import {render} from '@testing-library/react';
import {suppressConsole} from "../../testing/suppressConsole";
import '@testing-library/jest-dom';

// Mock getContext() to prevent errors when rendering chart
HTMLCanvasElement.prototype.getContext = jest.fn()

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

describe('PointsChart Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <PointsChart isFullScreen={false} />
    );
    expect(container).toBeInTheDocument();
  });

  it('renders fullScreen class when isFullScreen is true', () => {
    const { container } = render(
      <PointsChart  isFullScreen={true} />
    );
    expect(container.firstChild).toHaveClass('fullScreen');
  });

  it('renders multiScreen class when isFullScreen is false', () => {
    const { container } = render(
      <PointsChart isFullScreen={false} />
    );
    expect(container.firstChild).toHaveClass('multiScreen');
  });

  it('renders house emblems and points based on the provided houses', async() => {
    const houses = [
      { name: 'Clancy', points: 100, color: '#FCDF15' },
      { name: 'Haydon', points: 75, color: '#DF3F33' },
    ];

    fetchResponse(houses);

    const { findByText } = render(<PointsChart isFullScreen={false} />);

    for (const house of houses) {
      const pointElement = await findByText(house.points.toString());
      expect(pointElement).toBeInTheDocument();
    }
  });
});
