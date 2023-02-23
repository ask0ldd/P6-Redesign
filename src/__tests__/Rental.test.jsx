// !!! JSX FILE EXT NEEDED
import { render, screen, renderHook, act, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import matchers from '@testing-library/jest-dom/matchers'
import Rental from '../pages/Rental.jsx'
import { BrowserRouter } from 'react-router-dom'
import { expect, vi } from 'vitest'
import mockedDatas from './mockRentalDatas'
import React from "react";

const firstRental = {
  "id": "c67ab8a7",
  "title": "Appartement cosy",
  "cover": "locs/loc1.jpg",
  "pictures": [
    "../locs/loc1.jpg",
    "../locs/loc9.jpg",
    "../locs/loc14.jpg",
    "../locs/loc16.jpg"
  ],
  "description": "Votre maison loin de chez vous. Que vous veniez de l'autre bout du monde, ou juste de quelques stations de RER, vous vous sentirez chez vous dans notre appartement.",
  "host": {
    "name": "Nathalie Jean",
    "picture": "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-12.jpg"
  },
  "rating": "5",
  "location": "Ile de France - Paris 17e",
  "equipments": [
    "Équipements de base",
    "Micro-Ondes",
    "Douche italienne",
    "Frigo",
    "WIFI"
  ],
  "tags": [
    "Batignolle",
    "Montmartre"
  ]
}

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
      <Rental id='c67ab8a7'/>
    </BrowserRouter>
  )
}

describe('Given I am on the rental page', async () => {

  beforeEach(() => {
    // recreate two successive promises to mock fetch behavior
    const mockedJsonPromise = Promise.resolve(mockedDatas)
    const mockedFetchPromise = Promise.resolve({ json: () => mockedJsonPromise })
    window.fetch = vi.fn().mockImplementation(() => mockedFetchPromise)
  })

  test ('', async () => {

    render(<MockedRouter />)

    await waitFor( () => expect(screen.getByTestId('rentalDetails')).toBeInTheDocument())
    expect(screen.getByText(/Appartement cosy/i)).toBeInTheDocument()
    expect(screen.getByText(/Batignolle/i)).toBeInTheDocument()
    expect(screen.getByText(/Montmartre/i)).toBeInTheDocument()
    expect(screen.getByText(/Nathalie/i)).toBeInTheDocument()
    expect(screen.getByText(/Jean/i)).toBeInTheDocument()
    expect(screen.getAllByTestId('fullstar').length).toBeGreaterThanOrEqual(1)

    bodytoTestFile()

  })

})