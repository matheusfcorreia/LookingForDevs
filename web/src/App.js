import React, { useState, useEffect } from 'react';
import api from './services/api'

import './Global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import UserItem from './components/userItem';
import UserForm from './components/userForm';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  }, []);

  useEffect(() => {
    async function loadUsers() {
      const resp = await api.get('/users');

      setUsers(resp.data.users);
    }

    loadUsers();
  }, [])

  async function handleAddUser(data) { 
    const resp = await api.post('/users', data);

    setUsers([...users, resp.data])
  }

  return (
    <div id="app">
      <UserForm onSubmit={handleAddUser}/>
      <main>
        <ul>
          {users.map(user => (
            <UserItem key={user._id} user={user}/>
          ))}
        </ul>
      </main>
    </div>
    );
}

export default App;
