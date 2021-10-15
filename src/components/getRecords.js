import {  useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { GET_RECORDS } from '../queries';

export const GetRecords = () => {

    const [Data, setData] = useState({});
    const [Error, setError] = useState('')

  const { error, data, loading } = useQuery(GET_RECORDS)

  useEffect(() => {
    data && setData(data.GetRecords);
  }, [data])

  useEffect(() => {
    error && setError(error.message);
  }, [error])

  if(loading) return <p>Loading...</p>


  return (
    <div>
        <table>
          <h1 className="text-center">Get Records</h1>
         
        </table>
    </div>
  )
}
