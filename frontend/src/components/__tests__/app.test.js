import { render, screen, waitFor,act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import App from '../../App';
import { JSDOM } from 'jsdom';

jest.mock('axios');
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = dom.window.document;

test('renders App component', async () => {
  const mockResponse = {
    data: {
      tasks: ['Task 1', 'Task 2', 'Task 3'],
    },
  };
  axios.get.mockResolvedValue(mockResponse);

  await act(async () => {
    render(<App />);
  });
  const ele =screen.getByTestId("todo-home")
  expect(ele).toBeInTheDocument()
});

