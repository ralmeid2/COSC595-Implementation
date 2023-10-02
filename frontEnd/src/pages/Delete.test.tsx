import { render, fireEvent } from '@testing-library/react'
import Delete from './Delete'
import * as httpUtils from '../utils/http'
import {renderWithRouter, suppressConsole} from "../testing";

jest.mock('../utils/http')
suppressConsole();

describe('Delete component', () => {
  let getMock: jest.Mock, delMock: jest.Mock

  beforeEach(() => {
    getMock = jest.fn()
    delMock = jest.fn()
    ;(httpUtils.get as jest.Mock) = getMock
    ;(httpUtils.del as jest.Mock) = delMock
  })

  it('renders without crashing', () => {
    renderWithRouter(<Delete />)
  })

  it('renders header', () => {
    const { getByText } = renderWithRouter(<Delete />)
    expect(getByText('Please Click on an Item to Delete it')).toBeInTheDocument()
  })

  it('fetches daily notices on mount', () => {
    renderWithRouter(<Delete />)
    expect(getMock).toHaveBeenCalledTimes(1)
  })

  it('deletes a notice when clicked', async () => {
    getMock.mockResolvedValueOnce([
      { _id: '1', title: 'Test Notice', message: 'Test Message' }
    ])

    // Due to the `alert` we need to mock confirming it
    window.confirm = jest.fn(() => true)

    const { findByText } = renderWithRouter(<Delete />)
    const notice = await findByText('Test Notice Test Message')

    fireEvent.click(notice)

    expect(delMock).toHaveBeenCalledTimes(1)
  })
})
