// JSX FILE EXT NEEDED
import { render, screen, renderHook, act, waitFor } from '@testing-library/react'
import Home from './Home'
import { BrowserRouter } from 'react-router-dom'
import matchers from '@testing-library/jest-dom/matchers'
import { expect, vi } from 'vitest'
import mockedDatas from '../__tests__/mockRentalDatas'

expect.extend(matchers)

const fs = require('fs')
const bodytoTestFile = () => {
  fs.writeFile('../test.txt', document.body.innerHTML, err => { if (err) { console.error(err) } })
}

// to avoid useLocation / Links issues which needs to be in a router,
// so rendering <Home/> alone can't be an option
const MockedRouter = () => { 
  return(
    <BrowserRouter>
      <Home/>
    </BrowserRouter>
  )
}

test('Home should contains the -partout et ailleurs- in its banner', async () => {

  // recreate two successive promises to mock fetch behavior
  const mockJsonPromise = Promise.resolve(mockedDatas)
  const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise })
  window.fetch = vi.fn().mockImplementation(() => mockFetchPromise)

  render(<MockedRouter />)

  // wait for the right rerender (the one triggered by fetch / rendering the articles in the gallery) before moving on
  await waitFor(() => screen.getAllByTestId('favicon'))

  const linkElement = screen.getByText(/partout et ailleurs/i);

  bodytoTestFile()
  //expect(linkElement).toBeInTheDocument();

});
