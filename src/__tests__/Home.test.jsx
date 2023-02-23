// !!! JSX FILE EXT NEEDED
import { render, screen, renderHook, act, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import matchers from '@testing-library/jest-dom/matchers'
import Home from '../pages/Home.jsx'
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
      <Home/>
    </BrowserRouter>
  )
}

describe('Given I am on the home page', async () => {

  beforeEach(() => {
    // recreate two successive promises to mock fetch behavior
    const mockedJsonPromise = Promise.resolve(mockedDatas)
    const mockedFetchPromise = Promise.resolve({ json: () => mockedJsonPromise })
    window.fetch = vi.fn().mockImplementation(() => mockedFetchPromise)
  })

  test('Immocards should display some titles out of our mocked datas', async () => {

    render(<MockedRouter />)

    await waitFor( () => expect(screen.getByTestId('gallery').children.length).toEqual(3))

    expect(screen.getByText(/partout et ailleurs/i)).toBeInTheDocument()
    expect(screen.getByText(mockedDatas[0].title)).toBeInTheDocument()
    expect(screen.getByText(mockedDatas[1].title)).toBeInTheDocument()
    expect(screen.getByText(mockedDatas[2].title)).toBeInTheDocument()

  })

  test('If rentals 1 & 3 are added to favs, then immocards 1 & 3 should display a fav icon while 2 should display the opposite one', async () => {

    render(<MockedRouter />)

    await waitFor( () => expect(screen.getByTestId('gallery').children.length).toEqual(3))

    const favIcons = screen.getAllByTestId('favicon')

    userEvent.click(favIcons[0])
    userEvent.click(favIcons[2])

    await waitFor( () => expect(getFilenameFromUrl(favIcons[0].src)).toBe('favfull.svg'))
    expect(getFilenameFromUrl(favIcons[1].src)).toBe('favoutline.svg')
    expect(getFilenameFromUrl(favIcons[2].src)).toBe('favfull.svg')

    //bodytoTestFile()

  })
})

test('if I select <4 étoiles et plus> in the dropdown, the 3rd immocard shouldnt be displayed', async () => {

  render(<MockedRouter />)

  await waitFor( () => expect(screen.getByTestId('gallery').children.length).toEqual(3))

  const select = screen.getByTestId('select')

  userEvent.selectOptions(select, "rating:4")

  await waitFor( () => expect(screen.getByTestId('gallery').children.length).toEqual(2))
  expect(screen.getByText(mockedDatas[0].title)).toBeInTheDocument()
  expect(screen.getByText(mockedDatas[1].title)).toBeInTheDocument()
  expect(screen.queryByText(mockedDatas[2].title)).not.toBeInTheDocument() // can't use getbytext cause it throws an error when there is no match

})