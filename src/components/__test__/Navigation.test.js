import React from 'react';
import Navigation from '../Navigation';

import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, within } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import factory from './factory';
import MockAdapter from 'axios-mock-adapter';
import { instance } from '../../helpers/axiosConfig';

import userEvent from '@testing-library/user-event';

const mock = new MockAdapter(instance);

describe('should navigation renders correctly', () => {
  it('nav logo return text', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    const navLogoText = screen.getByTestId('nav-logo-text');
    expect(navLogoText).toHaveTextContent('Blog-App');
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
    expect(navGreeting).toHaveTextContent('Hello Stranger');
  });

  it('nav greetings show user', async () => {
    const user1 = await factory.attrs('User');
    localStorage.setItem('token', 'test');

    mock.onGet('auth/me').reply(200, await user1);

    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(`Hello ${user1.firstName} ${user1.lastName}`)
      ).toBeInTheDocument();
    });
  });
});

describe('should show navigation menu', () => {
  it('menu renders 4 elements', async () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    const menuBtn = screen.getByTestId('menu-element');

    userEvent.click(menuBtn);

    const list = screen.getByRole('menu');

    const { getAllByRole } = within(list);
    const items = getAllByRole('menuitem');

    expect(items.length).toBe(4);
  });
});
