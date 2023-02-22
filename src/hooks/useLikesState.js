import { useState } from 'react'

export function useLikesState(){

    const [likesList, setLikes] = useState([])

    const addLike = (rentalId) => {
        let likesListCopy = [...likesList]
        likesListCopy.push(rentalId)
        setLikes(likesListCopy)
        window.localStorage.setItem('likes', JSON.stringify(likesListCopy))
    }

    const addLikes = (multipleIds) => {
        setLikes(multipleIds)
    }
    
    const removeLike = (rentalId) => {
        if(likesList.length === 1){
            setLikes([])
            return window.localStorage.removeItem('likes')
        }
        let likesListCopy = [...likesList]
        likesListCopy.splice(likesListCopy.indexOf(rentalId), 1)
        setLikes(likesListCopy)
        window.localStorage.setItem('likes', JSON.stringify(likesListCopy))
    }

    return [addLike, addLikes, removeLike, likesList]
}