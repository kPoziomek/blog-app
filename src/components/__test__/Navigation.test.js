import React from 'react';
import Navigation from '../Navigation';

import { BrowserRouter } from 'react-router-dom';
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import MockAdapter from 'axios-mock-adapter';
import AxiosConfig from '../../helpers/axiosConfig';
import ApiProvider from '../../contexts/ApiProvider';
import { act } from 'react-dom/test-utils';
const api = new AxiosConfig();

const mock = new MockAdapter(api.instance, {
  onNoMatch: 'throwException',
});

describe('should navigation renders correctly', () => {
  it('nav logo return text', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    const navLogoText = screen.getByTestId('nav-logo-text');
    expect(navLogoText.textContent).toBe('Blog-App');
  });

  it('display logo .png', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    const displayedImage = screen.getByAltText('logos');
    expect(displayedImage).toHaveAttribute('src', 'logo512.png');
  });

  it('nav greetings show Stranger', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    const navGreeting = screen.getByTestId('greeting-text');
    expect(navGreeting.textContent).toBe('Hello Stranger');
  });

  it('nav greetings show user', async () => {
    const user = {
      firstName: 'Kris',
      lastName: 'Auer',
    };
    act(() => {
      localStorage.setItem('token', 'test');
    });
    render(
      <BrowserRouter>
        <ApiProvider axiosConfig={api}>
          <Navigation />
        </ApiProvider>
      </BrowserRouter>
    );

    act(() => {
      mock.onGet(/\/auth\/me/).reply(200, user);
    });
    const navGreeting = await screen.findByText(
      `Hello ${user.firstName} ${user.lastName}`
    );
    expect(navGreeting).toBeInTheDocument();
  });
});

describe('should show navigation menu', () => {
  it('menu renders 4 elements', async () => {
    const user = {
      firstName: 'Kris',
      lastName: 'Auer',
    };

    act(() => {
      localStorage.setItem('token', 'test');
    });
    render(
      <BrowserRouter>
        <ApiProvider axiosConfig={api}>
          <Navigation />
        </ApiProvider>
      </BrowserRouter>
    );

    act(() => {
      mock.onGet(/\/auth\/me/).reply(200, user);
    });
    const menuBtn = screen.getByRole('button');
    fireEvent.click(menuBtn);

    const list = screen.getByRole('menu');

    const { getAllByRole } = within(list);
    const items = getAllByRole('menuitem');

    await waitFor(() => {
      expect(
        screen.getByText(`Hello ${user.firstName} ${user.lastName}`)
      ).toBeInTheDocument();
    });

    expect(items.length).toBe(4);
  });
});

afterEach(cleanup);
