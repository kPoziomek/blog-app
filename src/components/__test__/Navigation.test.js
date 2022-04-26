import React from 'react';
import Navigation from '../Navigation';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, prettyDOM, cleanup } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';

import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { onNoMatch: 'throwException' });

beforeAll(() => {
  mock.reset();
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
      data: {
        firstName: 'Melvina',
        lastName: 'Upton',
      },
    };
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    mock
      .onGet('/auth/me')
      .reply(200, ` ${user.data.firstName} ${user.data.lastName}`);

    axios.get('/auth/me').then(function (response) {
      console.log(response.data);
    });
  });
});

afterEach(cleanup);
