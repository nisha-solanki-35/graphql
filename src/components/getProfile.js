import {  useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { GET_PROFILES } from '../queries';

export const GetProfiles = () => {

    const [Data, setData] = useState({});
    const [Error, setError] = useState('')

  const { error, data, loading } = useQuery(GET_PROFILES)

  useEffect(() => {
    data && setData(data.getProfiles);
  }, [data])

  useEffect(() => {
    error && setError(error.message);
  }, [error])

  if(loading) return <p>Loading...</p>


  return (
    <div>
        <table>
          <h1 className="text-center">Get Profiles</h1>
          <tr>
              <td>Email</td>
              <td>{Data.sEmail}</td>
          </tr>
          <tr>
              <td>FirstName</td>
              <td>{Data.sFirstName}</td>
          </tr>
          <tr>
              <td>LastName</td>
              <td>{Data.sLastName}</td>
          </tr> 
        </table>
    </div>
  )
}
