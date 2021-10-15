import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Input, Label, Row } from 'reactstrap';
import { CREATE_USER } from '../queries';
// import users from '../data/users.json'


// export const CRAETE_USER = gql`
//   mutation createUser(
//     sEmail: String!
//     sFirstName: String!
//     sLastName: String!
//     sPassword: String!) {
//       createUser(
//         sEmail: $sEmail
//         sFirstName: $sFirstName
//         sLastName: $sLastName
//         sPassword: $sPassword
//       ){
//         id
//       }
//     }
// `;

export const FirstApp = () => {

  const [Email, setEmail] = useState('')
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Password, setPassword] = useState('')
  const [Message, setMessage] = useState('');
  const [Error, setError] = useState('')

  const [register, {error, data, loading}] = useMutation(CREATE_USER)

  useEffect(() => {
    data && setMessage(data.register);
  }, [data])

  useEffect(() => {
    error && setError(error.message);
  }, [error])

  function onSubmitForm(){
    register({variables: {Email: Email, FName: FirstName, LName: LastName, Password: Password}});
  }

  // const { loading, error, data } = useQuery(GET_ALL_USERS);

  if(loading) return <p>Loading...</p>


  return (
    <div>
      <Row>
        <Col></Col>
        <Col>
          <h1>Register</h1>
          <Label for="Email" className="mt-3">Email</Label>
          <Input type="email" name="Email" value={Email} onChange={e=> setEmail(e.target.value)}></Input>
          <Label for="FirstName" className="mt-3">First Name</Label>
          <Input type="text" name="FirstName" value={FirstName} onChange={e=> setFirstName(e.target.value)}></Input>
          <Label for="LastName" className="mt-3">Last Name</Label>
          <Input type="text" name="LastName" value={LastName} onChange={e=> setLastName(e.target.value)}></Input>
          <Label for="Password" className="mt-3">Password</Label>
          <Input type="password" name="Password" value={Password} onChange={e=> setPassword(e.target.value)}></Input>
          <Button className="mt-3" onClick={onSubmitForm}>Submit</Button>
          {Message && <Alert className="mt-4" color="primary">{Message}</Alert>}
          {Error && <Alert className="mt-4" color="danger">{Error}</Alert>}
        </Col>
        <Col></Col>
      </Row>
    </div>
  )
}
