import { render, screen } from '@testing-library/react';
import App from '../../App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const navText = screen.getByText(/Blog-App/i);
  const navUser = screen.getByText(/Hello Stranger/i);
  expect(navText).toBeInTheDocument();
  expect(navUser).toBeInTheDocument();
});
