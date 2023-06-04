import { render, screen,act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = dom.window.document;

test('renders App component', async () => {

  await act(async () => {
    render(<App />);
  });
  const ele =screen.getByTestId("todo1")
  expect(ele).toBeInTheDocument()
});

