import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'

const RatingsPage = () => {
    const { id } = useParams()
    const [rating, setRating] = useState({ results: [] })
    const [movie, setMovie] = useState({ results: [] })

    console.log(rating)
    console.log(movie)


    useEffect(()=>{
        const handleMount = async()=>{
          try {
            const { data: ratingData } = await axiosReq.get(`/ratings/${id}`)
            setRating({ results: [ratingData] })
            
            const { data: movieData } = await axiosReq.get(`/movies/${ratingData.movie}`)
            setMovie({ results: [movieData] })

            
          } catch (err) {
            console.log(err)
          }
        }
    
        handleMount()
      },[id])


  return (
    <div>RatingsPage</div>
  )
}

export default RatingsPage