import React, { useState, useEffect } from 'react';

import './styles.css';

function UserForm(props) {
  const { onSubmit } = props;

  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;   
        
        setLatitude(latitude);
        setLongitude(longitude);
      }, (err) => {
        console.log(err);
      },
      {
        timeout: 30000
      })
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });

    setGithubUsername('');
    setTechs('');
  }


  return (
    <aside>
      <strong>Cadastrar</strong>
      <form onSubmit={handleSubmit}>
        <div className="inputBlock">
          <label htmlFor="github_username">Usuário Github</label>
          <input name="github_username" id="github_username"
            required value={github_username} onChange={e => setGithubUsername(e.target.value)} />
        </div>

        <div className="inputBlock">
          <label htmlFor="techs">Tecnologias</label>
          <input name="techs" id="techs"
            required value={techs} onChange={e => setTechs(e.target.value)} />
        </div>

        <div className="inputGroup">
          <div className="inputBlock">
            <label htmlFor="latitude">Latitude</label>
            <input type="number" name="latitude" id="latitude"
              required value={latitude}
              onChange={e => setLatitude(e.target.value)} />
          </div>

          <div className="inputBlock">
            <label htmlFor="longitude">Longitude</label>
            <input type="number" name="longitude" id="longitude"
              required value={longitude}
              onChange={e => setLongitude(e.target.value)} />
          </div>
        </div>

        <button type="submit">Salvar</button>
      </form>
    </aside>
  )
}

export default UserForm;