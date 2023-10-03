import React from 'react';
import { render, screen } from '@testing-library/react';
import OptionDisplay from './OptionDisplay';
import fetchMock from 'jest-fetch-mock';
import {suppressConsole} from "../testing/suppressConsole";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockResponse(JSON.stringify({})); // We don't care about fetch responses in this suite
});

suppressConsole()

// Test for different child components based on pageId
describe('Child Component Rendering', () => {
  const mockUseParams = require('react-router-dom').useParams;

  it('renders DailyNoticesView component when pageId is notices', async () => {
    mockUseParams.mockReturnValue({ pageId: 'notices' });

    render(<OptionDisplay />);

    // Before the component has finished loading, it should display a loading message
    expect(await screen.findByText('Loading notices...')).toBeInTheDocument();

    // After the component has finished loading, it should display the notices
    expect(await screen.findByText('Today\'s Notices')).toBeInTheDocument()
  });

  it('renders Timer component when pageId is timer', () => {
    mockUseParams.mockReturnValue({ pageId: 'timer' });

    const { container } = render(<OptionDisplay />);

    const clockElement = container.querySelector('.react-clock');

    expect(clockElement).toBeInTheDocument();
  });

  it('renders PointsChart component when pageId is points', async () => {
    mockUseParams.mockReturnValue({ pageId: 'points' });

    render(<OptionDisplay />);

    expect(await screen.findByText('House Points')).toBeInTheDocument(); // not ok
  });

  it('renders Events component when pageId is events', async () => {
    mockUseParams.mockReturnValue({ pageId: 'events' });

    render(<OptionDisplay />);

    expect(await screen.findByText('UPCOMING EVENTS')).toBeInTheDocument();
  });

  it('renders Slideshow component when pageId is slideshow', async () => {
    mockUseParams.mockReturnValue({ pageId: 'slideshow' });

    render(<OptionDisplay />);

    expect(await screen.findByText('Loading photos...')).toBeInTheDocument();

    /** Commented out as Jest cannot load images TODO: mock a loaded image? */
    // const slideshowElement = screen.getByAltText('Slideshow')
    //
    // expect(slideshowElement).toBeInTheDocument();
    // expect(slideshowElement).toHaveAttribute('src', /\/uploads\//);
  });

});

// Test for the 'Component not found' fallback
it('renders "Component not found" when pageId is invalid', async () => {
  const mockUseParams = require('react-router-dom').useParams;
  mockUseParams.mockReturnValue({ pageId: 'invalid' });

  render(<OptionDisplay />);

  expect(await screen.findByText('Component not found')).toBeInTheDocument();
});
