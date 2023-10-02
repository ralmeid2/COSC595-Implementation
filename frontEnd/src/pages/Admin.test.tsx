import Admin from './Admin';
import {renderWithRouter} from "../testing";

describe('Admin component', () => {
  it('renders without crashing', () => {
    renderWithRouter(<Admin />);
  });
});
