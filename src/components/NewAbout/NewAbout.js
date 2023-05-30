import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const NewAbout = () => {
    const value = useQuery('unique-name',async ()=>{
        return axios.get("http://localhost:4000/College");
    })
    const {data} = value;
  return (
    <>  
    {
        data?.data.map((each,index)=>(
            <div data-testid='each-data' key={index}>{each.Name}</div>
        ))
    }
    </>
  )
}

export default NewAbout
