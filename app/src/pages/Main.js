import React, { useEffect, useState} from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [users, setUsers] = useState([]);
  const [techs, setTechs] = useState('');
  
  useEffect(() => {
    async function loadInitalPosition() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: false
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }
    loadInitalPosition();
  }, [])

  function handleRegionChange(region) {
    setCurrentRegion(region);
  }

  async function loadUsers() {
    const { latitude, longitude } = currentRegion;

    const resp = await api.get('/users', {
      params: {
        latitude,
        longitude,
        techs
      }
    });
    setUsers(resp.data.users);
  }

  if (!currentRegion) return null;

  return (
  <>
    <MapView 
    onRegionChangeComplete={handleRegionChange} 
    initiaRegion={currentRegion} 
    style={styles.map}>

      {users.map(user => (
        <Marker coordinate={{ 
          latitude: user.location.coordinates[0], 
          longitude: user.location.coordinates[1]}}
          key={user._id}>
        <Image style={styles.avatar} source={{ uri: user.avatar_url}}></Image>
        <Callout onPress={() => {
          navigation.navigate('Profile', { github_username: user.github_username })
        }}>
          <View style={styles.callout}>
            <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userBio}>{user.bio}</Text>
      <Text style={styles.userTechs}>{user.techs.join(', ')}</Text>
          </View>
        </Callout>
      </Marker>
      ))}
    </MapView>
    <View style={styles.searchForm}>
        <TextInput 
        style={styles.searchInput} 
        placeHolder="Buscar usuários por tecs"
        placeHolderTextColor="#999"
        autoCapitalize="words"
        autoCorrect= {false}
        value={techs}
        onChangeText={text => setTechs(text)}/>

        <TouchableOpacity onPress={loadUsers} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#fff"/>
        </TouchableOpacity>
    </View>
  </>
  )
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4 
  },
  callout: {
    width: 260
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  userBio: {
    color: '#666',
    marginTop: 5
  },
  userTechs: {
    marginTop: 5
  },
  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }
})

export default Main;
