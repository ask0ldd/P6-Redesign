import { vitest } from 'vitest'
import { useFetch } from '../hooks/useFetch'
import { describe, expect, test, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import mockedDatas from './mockRentalDatas'


const firstItem = 	{
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

describe('if filter is set to any,', () => {
  test('mockeddatas should be untouched after passing through filtering', () => {
    global.fetch = vi.fn() // mocked blank function so fetch won't provide any date
    const { result } = renderHook(() => useFetch())
    const [isLoading, fetchedData, isfetchError, filteringData] = result.current
    let datas
    act(() => {
      datas = filteringData(mockedDatas , ['any', 'any'])
    })
    expect(datas).toEqual(mockedDatas);
  })
})

test('if non filtered mockeddatas item 1 = itself after treatment', () => {
  global.fetch = vi.fn()
  const { result } = renderHook(() => useFetch())
  const [isLoading, fetchedData, isfetchError, filteringData] = result.current
  let datas
  act(() => {
    datas = filteringData(mockedDatas[0] , ['any', 'any'])
  })
  expect(datas).toEqual(firstItem);
})