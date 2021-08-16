import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Input, Label, Row } from 'reactstrap';
import { SIGN_IN } from '../queries';

export const LoginUser = () => {

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Message, setMessage] = useState('');
  const [Error, setError] = useState('')

  const [userLogin, {error, data, loading}] = useMutation(SIGN_IN)

  useEffect(() => {
    data && setMessage(data.userLogin);
  }, [data])

  useEffect(() => {
    error && setError(error.message);
  }, [error])

  function onSubmitForm(){
    userLogin({variables: {Email: Email, Password: Password}});
  }

  if(loading) return <p>Loading...</p>


  return (
    <div>
      <Row>
        <Col></Col>
        <Col>
          <h1>Login</h1>
          <Label className="mt-3">Email</Label>
          <Input type="email" value={Email} onChange={e=> setEmail(e.target.value)}></Input>
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
