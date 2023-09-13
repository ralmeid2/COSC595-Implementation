import React from 'react';
import PointsChart from './PointsChart';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock getContext() to prevent errors when rendering chart
HTMLCanvasElement.prototype.getContext = jest.fn()
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

  it('renders house emblems and points based on the provided houses', () => {
    const houses = [
      { name: 'Clancy', points: 100, color: '#FCDF15' },
      { name: 'Haydon', points: 75, color: '#DF3F33' },
    ];

    const { getByText } = render(
      <PointsChart isFullScreen={false} />
    );

    houses.forEach((house) => {
      expect(getByText(house.points.toString())).toBeInTheDocument();
    });
  });
});

