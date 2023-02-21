// JSX FILE EXT NEEDED

import { render, screen } from '@testing-library/react'
import { useState } from 'react'
import Home from './Home'
import CustomRouter from '../components/CustomRouter'
import { BrowserRouter } from 'react-router-dom'
import matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'

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

test('Home should contains the -partout et ailleurs- in its banner', () => {
  
  render(<MockedRouter />);
  global.fetch = vi.fn()
  /*const { result } = renderHook(() => useFetch());
  const { result2 } = renderHook(() => useState());*/

  bodytoTestFile()

  const linkElement = screen.getByText(/partout/i);
  expect(linkElement).toBeInTheDocument();
});
