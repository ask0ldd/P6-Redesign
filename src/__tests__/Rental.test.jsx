// !!! JSX FILE EXT NEEDED
import { render, screen, renderHook, act, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import matchers from '@testing-library/jest-dom/matchers'
import Rental from '../pages/Rental.jsx'
import Page404 from '../pages/Page404.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

const MockedRouterWithWrongId = () => { 
  return(
    <BrowserRouter>
      <Routes>
          <Route path='/404' element={<Page404 />} />
          <Route path="*" element={<Rental id='xxxxxx'/>} />
      </Routes>
    </BrowserRouter>
  )
}

describe('Given I am on the rental page', async () => {

  beforeEach(async () => {
    // recreate two successive promises to mock fetch behavior
    const mockedJsonPromise = Promise.resolve(mockedDatas)
    const mockedFetchPromise = Promise.resolve({ json: () => mockedJsonPromise })
    window.fetch = vi.fn().mockImplementation(() => mockedFetchPromise)

    act(() => {
      render(<MockedRouter />)
    })
    await waitFor( () => expect(screen.getByTestId('rentalDetails')).toBeInTheDocument())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test ('When an Id is passed to the page component, all the right datas should be rendered', async () => {
    
    expect(screen.getByText(/Appartement cosy/i)).toBeInTheDocument()
    expect(screen.getByText(/Batignolle/i)).toBeInTheDocument()
    expect(screen.getByText(/Montmartre/i)).toBeInTheDocument()
    expect(screen.getByText(/Nathalie/i)).toBeInTheDocument()
    expect(screen.getByText(/Jean/i)).toBeInTheDocument()
    expect(screen.getAllByTestId('fullstar').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/Description/i)).toBeInTheDocument()
    expect(screen.getByText(/Equipements/i)).toBeInTheDocument()
    expect(screen.queryByText(/Votre maison loin de chez vous/i)).not.toBeInTheDocument()
  })

  test ('when i click on description, the collapse should open itself and show the right datas', async () => {
    expect(screen.queryByText(/Votre maison loin de chez vous/i)).not.toBeInTheDocument()
    const descCollapse = screen.queryByText(/Description/i)

    userEvent.click(descCollapse)
    await waitFor( () => expect(screen.queryByText(/Votre maison loin de chez vous/i)).toBeInTheDocument())
  })

  test ('when i click on equipements, the collapse should open itself and show the right datas', async () => {
    expect(screen.queryByText(/Équipements/i)).not.toBeInTheDocument()
    const descCollapse = screen.queryByText(/Equipements/i)

    userEvent.click(descCollapse)
    await waitFor( () => expect(screen.queryByText(/Équipements/i)).toBeInTheDocument())
  })

  test ('when i click on the right arrow and the current image isnt the last one, the next image should be displayed', async () => {
    const currentImgSrc = screen.getByTestId('slideshowImg').src
    expect('loc1.jpg' === getFilenameFromUrl(currentImgSrc)).toBeTruthy()

    const rightArrow = screen.getByTestId('slideshowRightArrow')
    userEvent.click(rightArrow)
    await waitFor( () => expect(screen.getByTestId('slideshowImg').src).not.toBe(currentImgSrc))

    const newImgSrc = screen.getByTestId('slideshowImg').src
    expect('loc9.jpg' === getFilenameFromUrl(newImgSrc)).toBeTruthy()
  })

  test ('when i click on the left arrow and the current image isnt the first one, the previous image should be displayed', async () => {
    let currentImgSrc = screen.getByTestId('slideshowImg').src
    expect('loc1.jpg' === getFilenameFromUrl(currentImgSrc)).toBeTruthy()

    const rightArrow = screen.getByTestId('slideshowRightArrow')
    const leftArrow = screen.getByTestId('slideshowLeftArrow')
    userEvent.click(rightArrow)
    await waitFor( () => expect(screen.getByTestId('slideshowImg').src).not.toBe(currentImgSrc))

    let newImgSrc = screen.getByTestId('slideshowImg').src
    expect('loc9.jpg' === getFilenameFromUrl(newImgSrc)).toBeTruthy()
    currentImgSrc = newImgSrc

    userEvent.click(leftArrow)
    await waitFor( () => expect(screen.getByTestId('slideshowImg').src).not.toBe(currentImgSrc))

    newImgSrc = screen.getByTestId('slideshowImg').src
    expect('loc1.jpg' === getFilenameFromUrl(newImgSrc)).toBeTruthy()
  })

  test ('when i click on the left arrow and the current image is the first one, the last image should be displayed', async () => {
    const currentImgSrc = screen.getByTestId('slideshowImg').src
    expect('loc1.jpg' === getFilenameFromUrl(currentImgSrc)).toBeTruthy()

    const leftArrow = screen.getByTestId('slideshowLeftArrow')
    userEvent.click(leftArrow)
    await waitFor( () => expect(screen.getByTestId('slideshowImg').src).not.toBe(currentImgSrc))

    const newImgSrc = screen.getByTestId('slideshowImg').src
    expect('loc16.jpg' === getFilenameFromUrl(newImgSrc)).toBeTruthy()
  })

  test ('when i click on the right arrow and the current image is the last one, the first image should be displayed', async () => {
    let currentImgSrc = screen.getByTestId('slideshowImg').src
    expect('loc1.jpg' === getFilenameFromUrl(currentImgSrc)).toBeTruthy()

    const leftArrow = screen.getByTestId('slideshowLeftArrow')
    const rightArrow = screen.getByTestId('slideshowRightArrow')
    userEvent.click(leftArrow)
    await waitFor( () => expect(screen.getByTestId('slideshowImg').src).not.toBe(currentImgSrc))
    
    let newImgSrc = screen.getByTestId('slideshowImg').src
    expect('loc16.jpg' === getFilenameFromUrl(newImgSrc)).toBeTruthy()
    currentImgSrc = screen.getByTestId('slideshowImg').src

    userEvent.click(rightArrow)
    await waitFor( () => expect(screen.getByTestId('slideshowImg').src).not.toBe(currentImgSrc))
    newImgSrc = screen.getByTestId('slideshowImg').src
    expect('loc1.jpg' === getFilenameFromUrl(newImgSrc)).toBeTruthy()
  })

})

test ('When a non existing Id is passed to the rental page, page 404 should be rendered', async () => {
  const mockedJsonPromise = Promise.resolve(mockedDatas)
  const mockedFetchPromise = Promise.resolve({ json: () => mockedJsonPromise })
  window.fetch = vi.fn().mockImplementation(() => mockedFetchPromise)
  act(() => {
    render(<MockedRouterWithWrongId />)
  })
  await waitFor( () => expect(screen.getByTestId('main404')).toBeInTheDocument())
  bodytoTestFile()
})

// collapse close