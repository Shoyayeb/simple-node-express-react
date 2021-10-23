import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState();
  const nameRef = useRef();
  const emailRef = useRef();
  useEffect(() => {
    fetch('http://localhost:5000/data')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = e => {
    e.preventDefault()
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email }
    fetch('http://localhost:5000/data', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        const addedUser = data;
        const newUsers = [...users, addedUser];
        setUsers(newUsers)
        nameRef.current.value = ''
        emailRef.current.value = ''
      })

  }
  // console.log(users.length);
  return (
    <div className="App">
      <h2>Users: {users?.length}</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} name="name" placeholder="Name" id="name" />
        <input type="email" ref={emailRef} name="email" id="email" />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {users?.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
