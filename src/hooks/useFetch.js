import { useState, useEffect } from 'react'
import React from 'react'

export function useFetch(url, filter, setResults) {

    const [fetchedData, setFetchedData] = useState()
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)


    const filteringData = (datas, filter) => {
        if(filter[0] === "any" && filter[1] === "any") return datas
        switch(filter[0])
        {
            case 'rating': return datas.filter(data => data[filter[0]] === filter[1])
            case 'tags' : return datas.filter(data => data[filter[0]].includes(filter[1]))
            case 'location' :
                if (filter[1] === "Paris") return datas.filter(data => data[filter[0]].includes(filter[1]))
                if (filter[1] === "HorsParis") return datas.filter(data => !data[filter[0]].includes("Paris"))
        }
        return undefined
    }

    useEffect(() => {

        if (!url) return

        async function fetchData() {
            setError(false)
            setLoading(true)

            try{
                const response = await fetch(url)
                const datas = await response.json()
                const filteredDatas = filteringData(datas, filter)
                if(filter === false)
                {
                    if(setResults) setResults(datas.length)
                    setFetchedData(datas)
                } else {
                    if(setResults) setResults(filteredDatas.length)
                    setFetchedData(filteredDatas)
                }
            }catch(error){
                console.log(error)
                setError(true)
            }finally{
                setLoading(false)
            }

        }
            
        fetchData()

    }, [url, filter]) // url to avoid infinite loop triggered by useState uses.

return [isLoading, fetchedData, isError, filteringData] // returning filteringData only for testing purposes
}