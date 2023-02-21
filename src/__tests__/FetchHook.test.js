import { vitest } from 'vitest'
import { useFetch } from '../hooks/FetchHook'
import { describe, expect, test, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import mockedDatas from './mockRentalDatas'


const firstItem = {
  "id": "c67ab8a7",
  "title": "Appartement cosy",
  "cover": "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg",
  "pictures": [
    "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg",
    "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-2.jpg",
    "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-3.jpg",
    "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-4.jpg",
    "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-5.jpg"
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

test('if non filtered mockeddatas = itself after treatment', () => {
  global.fetch = vi.fn() // mocked blank function so fetch won't provide any date
  const { result } = renderHook(() => useFetch())
  const [isLoading, fetchedData, isfetchError, filteringData] = result.current
  let datas
  act(() => {
    datas = filteringData(mockedDatas , ['any', 'any'])
  })
  expect(datas).toEqual(mockedDatas);
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