// !!! JSX FILE EXT NEEDED
import { render, screen, renderHook, act, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import matchers from '@testing-library/jest-dom/matchers'
import APropos from '../pages/APropos.jsx'
import { BrowserRouter } from 'react-router-dom'
import { expect, vi } from 'vitest'
import mockedDatas from './mockRentalDatas'
import React from "react";


expect.extend(matchers)

const fs = require('fs')
const bodytoTestFile = () => {
  fs.writeFile('../test.txt', document.body.innerHTML, err => { if (err) { console.error(err) } })
}

const getFilenameFromUrl = (url) => {
  const segments = url.split('/')
  return segments[segments.length-1]
}

// can't render Home by itself cause useLocation / Links
// needs to be rendered into a router
const MockedRouter = () => { 
  return(
    <BrowserRouter>
      <APropos/>
    </BrowserRouter>
  )
}

describe('Given I am on the APropos page', async () => {

  test('4 collapses are displayed', async () => {
    render(<MockedRouter />)

  await waitFor( () => expect(screen.getByText(/Respect/i)).toBeInTheDocument())
  expect(screen.getByText(/Fiabilité/i)).toBeInTheDocument()
  expect(screen.getByText(/Service/i)).toBeInTheDocument()
  expect(screen.getByText(/Sécurité/i)).toBeInTheDocument()
  })

})

// fav / unfav on one immocard