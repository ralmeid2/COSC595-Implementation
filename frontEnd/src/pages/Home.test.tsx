import {renderWithRouter} from "../testing";
import Home from "./Home";

describe('Home', () => {
  test('renders Home component without crashing', () => {
    renderWithRouter(<Home />)
  })
})
