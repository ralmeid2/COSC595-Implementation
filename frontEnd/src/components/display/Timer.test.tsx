import React from 'react';
import Timer, { getCurrentPeriod } from './Timer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.useFakeTimers();

describe('Timer Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Timer isFullScreen={false} />);
    expect(container).toBeInTheDocument();
  });

  it('renders fullScreen class when isFullScreen is true', () => {
    const { container } = render(<Timer isFullScreen={true} />);
    expect(container.firstChild).toHaveClass('fullScreen');
  });

  it('renders multiScreen class when isFullScreen is false', () => {
    const { container } = render(<Timer isFullScreen={false} />);
    expect(container.firstChild).toHaveClass('multiScreen');
  });

  it('renders a <time> element (react-clock)', () => {
    const { container } = render(<Timer isFullScreen={false} />);
    expect(container.querySelector('time')).toBeInTheDocument();
    expect(container.querySelector('time')).toHaveClass('react-clock');
  })
});

describe('getCurrentPeriod function', () => {
  it('returns correct period based on the time', () => {
    jest.useFakeTimers();
    const mockedDate = new Date(2023, 9, 7, 13, 4);
    jest.setSystemTime(mockedDate);
    // From Timer.tsx:
    //    name: "Period 4",
    //                finish:{
    //                    hours:13,
    //                    minutes:5
    //                }
    expect(getCurrentPeriod()).toBe("Period 4");

    jest.useRealTimers();
  });
});
