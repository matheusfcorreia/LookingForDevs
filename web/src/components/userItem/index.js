import React from 'react';
import './styles.css';

function UserItem(props) {
  const { user } = props;

  return (
    <li className="devItem">
      <header>
        <img src={user.avatar_url} alt="Matheus" />
        <div className="userInfo">
          <strong>{user.name}</strong>
          <span>{user.techs.join(', ')}</span>
        </div>
      </header>
      <p>{user.bio}</p>
      <a href={`https://github.com/${user.github_username}`}>Perfil Github</a>
    </li>
  )
};

export default UserItem