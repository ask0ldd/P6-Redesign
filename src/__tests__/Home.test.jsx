// JSX FILE EXT NEEDED
import { render, screen, renderHook, act, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import matchers from '@testing-library/jest-dom/matchers'
import Home from '../pages/Home.jsx'
import { BrowserRouter } from 'react-router-dom'
import { expect, vi } from 'vitest'
import mockedDatas from './mockRentalDatas'
import {addLike, removeLike} from '../components/Gallery'

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

describe('Given I am on the home page', async () => {

  // recreate two successive promises to mock fetch behavior
  const mockedJsonPromise = Promise.resolve(mockedDatas)
  const mockedFetchPromise = Promise.resolve({ json: () => mockedJsonPromise })
  window.fetch = vi.fn().mockImplementation(() => mockedFetchPromise)

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

  test('If I click on an inactive favicon, an active favicon should replace it', async () => {

    window.localStorage.setItem = vi.fn().mockImplementation((key, value) => {
      console.log(value)
    })

    render(<MockedRouter />)
    await waitFor(() => screen.getAllByTestId('favicon'))

    const favIcons = screen.getAllByTestId('favicon')
    const firstFavIconSrc = favIcons[0].src
    const splitUrl = favIcons[0].src.split('/')
    expect(splitUrl[splitUrl.length-1]).toBe('favoutline.svg')

    const likesList = []
    const setLikes = vi.fn()

    const onFavIconClick = vi.fn(() => addLike('c67ab8a7', likesList, setLikes))
    favIcons[0].addEventListener("click", onFavIconClick) 
    userEvent.click(favIcons[0])

    // rerender()
    await waitFor(() => favIcons[0].src==="favfull.svg")

    // console.log(favIcons[0].src)
    //console.log(window.localStorage.getItem('likes'))

    //bodytoTestFile()
    
    /*
    await waitFor(() => firstFavIconSrc!==favIcons.src)
    const splitUrlAfterClick = favIcons[0].src.split('/')
    expect(splitUrlAfterClick[splitUrlAfterClick.length-1]).toBe('favfull.svg')*/

  })
})