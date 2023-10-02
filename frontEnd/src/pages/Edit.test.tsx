import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Edit from './Edit';
import * as httpUtils from '../utils/http';
import {renderWithRouter} from "../testing";


jest.mock('../utils/http')

describe('Edit component', () => {
  let getMock: jest.Mock;
  let putMock: jest.Mock;

  beforeEach(() => {
    getMock = (httpUtils.get as jest.Mock) = jest.fn();
    putMock = (httpUtils.put as jest.Mock) = jest.fn()
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    await act(async () => {
      renderWithRouter(<Edit />);
    })
  });

  it('fetches daily notices on mount', async () => {
    getMock.mockResolvedValueOnce([]); // Mock empty array response
    await act(async () => {
      renderWithRouter(<Edit />);
    });
    expect(getMock).toHaveBeenCalledTimes(1);
  });

  it('displays the daily notices', async () => {
    getMock.mockResolvedValueOnce([
      { _id: '1', title: 'Title1', message: 'Message1' },
    ]);
    await act(async () => {
      renderWithRouter(<Edit />);
    });
    expect(screen.getByText(/Title1 Message1/)).toBeInTheDocument();
  });

});
