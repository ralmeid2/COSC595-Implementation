import React from 'react';
import { render } from '@testing-library/react';
import {DisplayHorizontal} from "./index";

describe('<DisplayHorizontal />', () => {
  it('renders without crashing', async () => {
    render(<DisplayHorizontal />);
  });
});
