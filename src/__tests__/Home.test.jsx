// JSX FILE EXT NEEDED
import { render, screen, renderHook, act, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import matchers from '@testing-library/jest-dom/matchers'
import Home from '../pages/Home.jsx'
import { BrowserRouter } from 'react-router-dom'
import { expect, vi } from 'vitest'
import mockedDatas from './mockRentalDatas'
import { useLikesState } from '../hooks/useLikesState.js'
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

// to avoid useLocation / Links issues which needs to be in a router,
// so rendering <Home/> alone can't be an option
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
    console.log("before")
  })

  // act(() => {
  // render(<MockedRouter />)
  // })

  test('a -partout et ailleurs- banner should be displayed', async () => {

    render(<MockedRouter />)

    // wait for the right rerender before proceeding (the one triggered by fetch / rendering the articles in the gallery) before moving on
    await waitFor(() => screen.getAllByTestId('favicon'))

    expect(screen.getByText(/partout et ailleurs/i)).toBeInTheDocument()
    expect(screen.getByText(/Appartement cosy/i)).toBeInTheDocument()
    expect(screen.getByText(/Magnifique appartement proche Canal Saint Martin/i)).toBeInTheDocument()
    expect(screen.getByText(/Studio de charme - Buttes Chaumont/i)).toBeInTheDocument()

  })

  test('If rental 1 & 3 are added to favs & 2 isnt then 1 & 3 should display a fav icon while 2 should display a non fav one', async () => {

    /*const { result } = renderHook(() => useLikesState())

    const [addLike, storagetoLikesList, removeLike, likesList] = result.current*/
    
    /*await act(async () => {
      // addLike(mockedDatas[2].id)
      addLike(mockedDatas[0].id) 
    })*/

    /*console.log(likesList)
    console.log(JSON.parse(window.localStorage.getItem('likes')))*/

    render(<MockedRouter />)

    await waitFor( async () => screen.getAllByTestId('favicon'))

    const favIcons = screen.getAllByTestId('favicon')

    userEvent.click(favIcons[0])
    userEvent.click(favIcons[2])

    await waitFor( async () => expect(getFilenameFromUrl(favIcons[0].src)).toBe('favfull.svg'))
    expect(getFilenameFromUrl(favIcons[2].src)).toBe('favfull.svg')
    expect(getFilenameFromUrl(favIcons[1].src)).toBe('favoutline.svg')

    bodytoTestFile()

  })
})

/*
    const onFavIconClick = vi.fn(() => addLike('c67ab8a7'))
    favIcons[0].addEventListener("click", onFavIconClick)
    act(() => {
    userEvent.click(favIcons[0])
    })

    console.log(likesList)

*/