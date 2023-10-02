import {renderWithRouter} from "../testing";
import Photo from "./Photo";

describe('Photo', () => {
  test('renders Photo component without crashing', () => {
    renderWithRouter(<Photo />)
  })
})
