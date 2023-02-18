import { useState, useEffect } from 'react'

export function useFetch(url, filter) {

    const [fetchedData, setFetchedData] = useState()
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)


    const filteringData = (datas) => {
        console.log(datas)
        if(filter[0] === "any" && filter[1] === "any") return datas
        if(filter[0] === "rating") return datas.filter(data => data[filter[0]] === filter[1])
        if(filter[0] === "tags") return datas.filter(data => data[filter[0]].includes(filter[1]))
        if(filter[0] === "location") 
        {
            if (filter[1] === "Paris") return datas.filter(data => data[filter[0]].includes(filter[1]))
            if (filter[1] === "HorsParis") return datas.filter(data => data[filter[0]].includes(filter[1]) === false)
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
                // setFetchedData(datas)
                const filteredDatas = filteringData(datas)
                filter === false ? setFetchedData(datas) : setFetchedData(filteredDatas)
            }catch(error){
                console.log(error)
                setError(true)
            }finally{
                setLoading(false)
            }

        }
            
        fetchData()

    }, [url, filter]) // url to avoid infinite loop triggered by useState uses.

return [isLoading, fetchedData, isError]
}