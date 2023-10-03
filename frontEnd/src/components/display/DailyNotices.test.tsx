import React from 'react';
import { render, act, screen, cleanup } from '@testing-library/react';
import DailyNoticesView from './DailyNotices';
import { DailyNotice } from "../../types";

jest.useFakeTimers();

const OriginalDate = global.Date;

beforeEach(() => {
  global.Date = class extends OriginalDate {
    constructor(date: string | number | Date) {
      super();
      if (date) {
        return new OriginalDate(date);
      }
      return new OriginalDate('2022-01-10T12:01:01.001Z');
    }
  } as any;

  // Mock clientHeight
  Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
    configurable: true,
    value: 100,
  });
});

afterEach(() => {
  global.Date = OriginalDate;
  cleanup();
});

describe('<DailyNoticesView />', () => {
  it('shows loading when isLoading is true', () => {
    render(<DailyNoticesView isLoading={true} isFullScreen={false} noticesData={[]} />);
    expect(screen.getByText('Loading notices...')).toBeInTheDocument();
  });

  it('displays notices and rotates them', async () => {
    const noticesData: DailyNotice[] = [
      { startDate: '2022-01-01', expiryDate: '2022-12-31', title: 'Notice 1', message: 'Message 1', _id: '1', height: 100 },
      { startDate: '2022-01-01', expiryDate: '2022-12-31', title: 'Notice 2', message: 'Message 2', _id: '2', height: 100 },
      { startDate: '2022-01-01', expiryDate: '2022-12-31', title: 'Notice 3', message: 'Message 3', _id: '3', height: 100 },
    ];

    render(<DailyNoticesView isLoading={false} isFullScreen={false} noticesData={noticesData} />);

    // Wait for the initial measurement delay
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText('Notice 1')).toBeInTheDocument();

    // Simulate the passage of time to trigger a change in the current index
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText('Notice 2')).toBeInTheDocument();
  });

  it('applies full screen style when isFullScreen is true', () => {
    const { container } = render(<DailyNoticesView isLoading={false} isFullScreen={true} noticesData={[]} />);
    expect(container.firstChild).toHaveClass('fullScreen');
  });
});
