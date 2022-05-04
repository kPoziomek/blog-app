import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import Navigation from '../Navigation';

describe('Time Components Modal', () => {
  it('Clicking button open modal', async () => {
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
    expect(baseElement).toMatchSnapshot();

    const modalTitle = await screen.findByText('Current Time is:');
    expect(modalTitle).toBeInTheDocument();
  });

  it('Time stamp', () => {
    jest.useFakeTimers();
    const today = new Date();
    const time = today.getTime();

    console.log(time);
    jest.setSystemTime(new Date('20 Aug 2020 02:12:00 GMT').getTime());
  });
});
