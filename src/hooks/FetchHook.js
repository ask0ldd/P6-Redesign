import { useState, useEffect } from 'react'

export function useFetch(url) {

    const [fetchedData, setFetchedData] = useState()
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)

    useEffect(() => {

        if (!url) return

        async function fetchData() {
            setError(false)
            setLoading(true)

            try{
                const response = await fetch(url)
                const data = await response.json()
                setFetchedData(data)
            }catch(error){
                console.log(error)
                setError(true)
            }finally{
                setLoading(false)
            }

        }
            
        fetchData()

    }, [url]) // url to avoid infinite loop triggered by useState uses.

return [isLoading, fetchedData, isError]
}