import AdminOptions from "./AdminOptions";
import {renderWithRouter} from "../testing";

describe('AdminOptions', () => {
  test('renders AdminOptions component without crashing', () => {
    renderWithRouter(<AdminOptions />);
  });
});
