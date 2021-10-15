import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Alert, Button, Col, Input, Label, Row } from 'reactstrap';
import { LOG_IN } from '../../queries';

export const Login = () => {

  const history = useHistory();
  const [MobNum, setMobNum] = useState('')
  const [Password, setPassword] = useState('')
  const [Message, setMessage] = useState('');
  const [Error, setError] = useState('')

  const [userLogin, {error, data, loading}] = useMutation(LOG_IN)

  useEffect(() => {
    if(data) {
      // setMessage(data.userLogin);
      localStorage.setItem("gql_token", data.userLogin);
      history.push('/getmatches');
    }
  }, [data])

  useEffect(() => {
    error && setError(error.message);
  }, [error])

  function onSubmitForm(){
    if(MobNum && Password){
      userLogin({variables: {MobNum: MobNum, Password: Password}});
    }
  }

  if(loading) return <p>Loading...</p>


  return (
    <div>
      <Row>
        <Col></Col>
        <Col>
          <h1>Login</h1>
          <Label className="mt-3">Mobile Number</Label>
          <Input type="email" value={MobNum} onChange={e=> setMobNum(e.target.value)}></Input>
          <Label className="mt-3">Password</Label>
          <Input type="password" value={Password} onChange={e=> setPassword(e.target.value)}></Input>
          <Button className="mt-3" onClick={onSubmitForm}>Submit</Button>
          {Message && <Alert className="mt-4" color="primary">{Message}</Alert>}
          {Error && <Alert className="mt-4" color="danger">{Error}</Alert>}
        </Col>
        <Col></Col>
      </Row>
    </div>
  )
}
