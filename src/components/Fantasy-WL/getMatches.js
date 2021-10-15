import {  NetworkStatus, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, CustomInput, FormGroup } from 'reactstrap';
import { GET_MATCHES } from '../../queries';
import Loader from '../Loader';
import Pagination from 'react-pagination-library'
import { useQueryState } from 'react-router-use-location-state';

export const GetMatches = () => {

    const history = useHistory();
    const [Data, setData] = useState([]);
    const [Error, setError] = useState('')
    const [startingsNo, setStartingsNo] = useState(0)
    const [endingsNo, setEndingsNo] = useState(0)
    const [total, setTotal] = useState(0)
    const [index, setIndex] = useState(1)
    const [list, setList] = useState([])
    const [totalPages, setTotalPages] = useState([])
    const [activePageNo, setPageNo] = useQueryState('page', 1)
    const [offset, setOffset] = useQueryState('pageSize', 10)
    const [listLength, setlistLength] = useState('10 entries')

    const { error, data, loading, fetchMore, networkStatus, previousData } = useQuery(GET_MATCHES, {
        variables: { offset: 0, limit: 10 },
        // pollInterval: 500
        notifyOnNetworkStatusChange: true,
        // fetchPolicy: 'cache-and-network'
    })

    console.log(`previousData`, previousData)
    console.log(`data`, data)
    useEffect(() => {
      if(previousData !== data){
        setData(data.getMatches);
        setTotal(data.getMatches.length)
        setTotalPages(data.getMatches)
        const userArrLength = data.getMatches.length
        const start = ((activePageNo - 1) * offset) + 1
        const end = (start - 1) + userArrLength
        setStartingsNo(start)
        setEndingsNo(end)
      }
    }, [data])

    useEffect(() => {
        error && setError(error.message);
    }, [error])

    if(loading) return <Loader />

    if(networkStatus === NetworkStatus.refetch) return console.log("Hii")

    function onPageChange(pageNo) {
        if (pageNo !== activePageNo) {
          const start = (pageNo - 1) * offset
          const limit = offset
          fetchMore({
            variables: { offset: start, limit: limit },
            updateQuery: (prevResult, { fetchMoreResult})=> {
                return fetchMoreResult
            }
          })
        //   getList(start, limit, sort, order, searchValue, paymentStatus, withdrawPaymentMethod, startDate, endDate)
        //   setLoading(true)
        }
        setPageNo(pageNo, { method: 'push' })
      }

    function onChangeLength(event) {
        let limit
        if (event.target.value.includes(5)) {
          limit = 5
        }else if (event.target.value.includes(10)) {
          limit = 10
        } else if (event.target.value.includes(20)) {
          limit = 20
        } else if (event.target.value.includes(30)) {
          limit = 30
        } else if (event.target.value.includes(40)) {
          limit = 40
        } else {
          limit = 5
        }
        const start = 0
        fetchMore({
            variables: { offset: start, limit: limit }
        })
        setlistLength(`${limit} entries`)
        setOffset(limit)
        setPageNo(1)
        // setLoading(true)
      }

    return (
        <div>
            <h2 className="text-center">Match List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Match Key</th>
                        <th>Name </th>
                        <th>Format</th>
                        <th>Venue</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {Data.map(data =>
                    <tr>
                        <td>{data.sKey}</td>
                        <td>{data.sName ? data.sName : '-'}</td>
                        <td>{data.eFormat ? data.eFormat : '-'}</td>
                        <td>{data.sVenue ? data.sVenue : '-'}</td>
                        <td>{data.eStatus ? data.eStatus : '-'}</td>
                        <td>
                            <Button className="text-center" onClick={()=> history.push('/getmatch', {id: data._id})}>View Match</Button>
                        </td>          
                    </tr>)}  
            </tbody>
        </table>
        <div className="table-footer d-flex justify-content-between align-items-center">
        <Pagination
          currentPage={activePageNo}
          totalPages={totalPages.length}
          changeCurrentPage={onPageChange}
          theme="bottom-border"
        />
        <div className="entries-selection d-flex align-items-center">
          {
            total !== 0 && <p> {`Showing ${startingsNo} to ${endingsNo} of `}<b>{`${total} entries`}</b> </p>
          }
          <FormGroup>
            <CustomInput type="select" name="customSelect" className="form-control entries-select" value={listLength} onChange={e => onChangeLength(e)}>
              <option>5 entries</option>
              <option>10 entries</option>
              <option>20 entries</option>
              <option>30 entries</option>
              <option>40 entries</option>
            </CustomInput>
          </FormGroup>
        </div>
      </div>
    </div>
    )
}