import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import Navigation from '../Navigation';

describe('Time Components Modal', () => {
  it.only('Clicking button open modal', async () => {
    jest.useFakeTimers();

    const { baseElement } = render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    const button = screen.getByRole('button', { name: 'Open modal' });

    fireEvent.click(button);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    const today = new Date();
    const time = today.toTimeString();
    const modalTitle = screen.getByText(`Current Time is:`, {
      textContent: true,
    });
    const modalDescription = screen.getByText(`${time.slice(0, 8)}`, {
      textContent: true,
    });

    expect(baseElement).toMatchSnapshot();
    expect(modalTitle).toBeInTheDocument();
    expect(modalDescription).toBeInTheDocument();
  });

  it('Time stamp', () => {
    jest.useFakeTimers(2000);

    jest.setSystemTime(new Date('20 Aug 2020 02:12:00 GMT').getTime());
  });
});
