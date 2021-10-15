import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { GET_MATCH } from '../../queries';
import Loader from '../Loader';

export const GetMatch = ({location, client}) => {

    console.log("props", client);
    const [Data, setData] = useState([]);
    const [Error, setError] = useState('')
    const [matchID, setMatchID] = useState('')

    const { error, data, loading } = useQuery(GET_MATCH, {
        variables: { id : location.state.id },
        // pollInterval: 500
        notifyOnNetworkStatusChange: true
    })

    useEffect(() => {
        setMatchID(location.state.id)
    }, [location])

    useEffect(() => {
        if(data){
            setData(data.getMatch);
        }
    }, [data])

    useEffect(() => {
        error && setError(error.message);
    }, [error])

    if(loading) return <Loader />

    // if(networkStatus === NetworkStatus.refetch) return console.log("Hii")

    //read/write query

    // const getMatchData = client.readQuery({query: GET_MATCH, variables: { id: matchID}});

    // const matchData = {
    //     id: matchID,
    //     sName: 'name',
    //     eFormat: 'format',
    //     sSeasonKey: 'season',
    //     sVenue: 'venue',
    //     eStatus: 'status',
    //     __typename: 'match',
    //   }

    //   client.writeQuery({
    //     query: GET_MATCH,
    //     data: {
    //       getMatch: matchData
    //     }
    //   });

    // read/write fragment

    const getMatch = client.readFragment({
        id: `match:${matchID}`,
        fragment: gql`
            fragment Getmatch on getMatch{
                _id
                sName
                eFormat
                sSeasonKey
                sVenue
                eStatus
            }
        `
    })

    client.writeFragment({
        id: `match:${matchID}`,
        fragment: gql`
            fragment Getmatch on getMatch{
                sName
            }
        `,
        data: {
          sName: "nisha",
        },
      });

    return (
        <div>
            <h2 className="text-center">Match Details</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Season Key</th>
                        <th>Name </th>
                        <th>Format</th>
                        <th>Venue</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{Data.sSeasonKey}</td>
                        <td>{Data.sName}</td>
                        <td>{Data.eFormat}</td>
                        <td>{Data.sVenue}</td>
                        <td>{Data.eStatus}</td>           
                    </tr>
            </tbody>
        </table>
    
    </div>
    )
}