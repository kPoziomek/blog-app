import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import Navigation from '../Navigation';

describe('Time Components Modal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('17 May 2022 09:00:00'));
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  it('Clicking button open modal', async () => {
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

    const modalTitle = screen.getByText(`Current Time is:`);
    const modalDescription = screen.getByText(`${time.slice(0, 8)}`);

    expect(baseElement).toMatchSnapshot();
    expect(modalTitle).toBeInTheDocument();
    expect(modalDescription).toBeInTheDocument();
  });

  it('Time stamp', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    const button = screen.queryByRole('button', { name: /open modal/i });

    fireEvent.click(button);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    const today = new Date();
    const time = today.toTimeString();
    const timer = screen.queryByText(`${time.slice(0, 8)}`);

    expect(timer).toBeInTheDocument();
  });
});
