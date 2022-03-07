
const apiUrl = "http://localhost:8080/rfd/";
//const auth = useContext(AuthContext);
// const user = useContext(UserContext)



export async function getUserById(id){
  const urlToSend = `${apiUrl}get_game_user/${id}`;
  const init = {
    method: 'GET',
    headers:{"Accept":"application/json"}};
    const response = await fetch(urlToSend,init);
    if(response.status !== 200){
      return Promise.reject(`response is not 200 CREATED response is ${response.status}`) 
    }
    return response.json();

}


export async function createUser (username, password){
    const urlToSend = `${apiUrl}create_game_user`;
    const init = {
    
      method: 'POST',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        "username": username,
        "password": password
      })
      
    }
    const response = await fetch(urlToSend, init);
    if (response.status !== 201) {
      return Promise.reject(`response is not 201 CREATED response is ${response.status}`);
    }
  
    return response.json();
}

export async function loginWithCredentials (username, password){
  const urlToSend = `${apiUrl}authenticate`;
  const init = {
  
    method: 'POST',
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      "username": username,
      "password": password
    })
    
  }
  const response = await fetch(urlToSend, init);
  if (response.status !== 201) {
    return Promise.reject(`response is not 201 CREATED response is ${response.status}`);
  }

  return response.json();
}

export async function getPlayerById (playerId, token) {

    const urlToSend = `${apiUrl}findPlayer/${playerId}`;

    const init = {
        method: 'GET',
        headers: {"Content-Type":"application/json",
          'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(urlToSend, init);

    if (response.status !== 200) {
        return Promise.reject(`response is not 200 OK response is ${response.status}`);
      }
    
      return response.json();

}

//Not working
export async function getRoomById (roomId, token) {

    const urlToSend = `${apiUrl}findRoom/${roomId}`;

    const init = {
        method: 'GET',
        headers: {"Content-Type":"application/json",
          'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(urlToSend, init);

    if (response.status !== 200) {
        return Promise.reject(`response is not 200 OK response is ${response.status}`);
      }
    
      return response.json();

}

export async function getPlayersByUser (userId, token) {

    const urlToSend = `${apiUrl}${userId}/players`;

    const init = {
        method: 'GET',
        headers: {"Content-Type":"application/json",
          'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(urlToSend, init);

    if (response.status !== 200) {
        return Promise.reject(`response is not 200 OK response is ${response.status}`);
      }
    
      return response.json();

}

export async function createNewPlayer (userId,token) {

    const urlToSend = `${apiUrl}create_player`;

    const init = {
        method: 'POST',
        headers: {"Content-Type":"application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "gameUserId": userId,
            "currentHp": 100,
            "maxHp": 100,
            "defense": 10,
            "damage": 3,
            "bossSlain": false
        })
    };

    const response = await fetch(urlToSend, init);

    if (response.status !== 201) {
        return Promise.reject(`response is not 201 CREATED response is ${response.status}`);
      }
    
      return response.json();

}

export async function createFirstRoom (playerId, token) {

    const urlToSend = `${apiUrl}create_first_room/${playerId}`;

    const init = {
        method: 'POST',
        headers: {"Content-Type":"application/json",
          'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(urlToSend, init);
  
    if (response.status !== 201) {
        return Promise.reject(`response is not 201 CREATED response is ${response.status}`);
      }
    
      return response.json();

}

export async function createRoom (playerId, token) {

    const urlToSend = `${apiUrl}create_room/${playerId}`;

    const init = {
        method: 'POST',
        headers: {"Content-Type":"application/json",
          'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(urlToSend, init);

    if (response.status !== 201) {
        return Promise.reject(`response is not 201 CREATED response is ${response.status}`);
      }
    
      return response.json();

}

export async function pickUpWeapon (playerId, weaponId, token) {

    const urlToSend = `${apiUrl}pickup_weapon/${playerId}/${weaponId}`;

    const init = {
        method: 'PUT',
        headers: {"Content-Type":"application/json",
          "Accept":"application/json",
          'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(urlToSend, init);

    if (response.status !== 200) {
        return Promise.reject(`response is not 200 OK response is ${response.status}`);
      }
    
      return response.json();

}

export async function pickUpArmor (playerId, armorId, token) {

    const urlToSend = `${apiUrl}pickup_armor/${playerId}/${armorId}`;
    console.log(urlToSend);
    const init = {
        method: 'PUT',
        headers: {"Content-Type":"application/json",
          'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(urlToSend, init);

    if (response.status !== 200) {
        return Promise.reject(`response is not 200 OK response is ${response.status}`);
      }
    
      return response.json();

}

export async function equipWeapon (playerId, weaponId, token) {

    const urlToSend = `${apiUrl}equip_weapon/${playerId}/${weaponId}`;

    const init = {
        method: 'PUT',
        headers: {"Content-Type":"application/json",
          'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(urlToSend, init);

    if (response.status !== 200) {
        return Promise.reject(`response is not 200 OK response is ${response.status}`);
      }
    
      return response.json();

}

export async function equipArmor (playerId, armorId, token) {

    const urlToSend = `${apiUrl}equip_armor/${playerId}/${armorId}`;

    const init = {
        method: 'PUT',
        headers: {"Content-Type":"application/json",
          'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(urlToSend, init);

    if (response.status !== 200) {
        return Promise.reject(`response is not 200 OK response is ${response.status}`);
      }
    
      return response.json();

}

export async function attack (playerId, roomId, token) {

    const urlToSend = `${apiUrl}attack/${roomId}/${playerId}`;

    const init = {
        method: 'PUT',
        headers: {"Content-Type":"application/json",
          'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(urlToSend, init);

    if (response.status !== 200) {
        return Promise.reject(`response is not 200 OK response is ${response.status}`);
      }
    
      return response.json();

}

export async function defend (playerId, roomId, token) {

    const urlToSend = `${apiUrl}defend/${roomId}/${playerId}`;

    const init = {
        method: 'PUT',
        headers: {"Content-Type":"application/json",
          'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(urlToSend, init);

    if (response.status !== 200) {
        return Promise.reject(`response is not 200 OK response is ${response.status}`);
      }
    
      return response.json();

}

export async function createBossRoom(playerId,token){

    const urlToSend = `${apiUrl}create_boss_room/${playerId}`;

    const init = {
      method: "POST",
      headers:{"Content-Type":"application/json",
    'Authorization': `Bearer ${token}`}
    };

    const response = await fetch(urlToSend, init);

    if (response.status !== 201) {
        return Promise.reject(`response is not 201 OK response is ${response.status}`);
      }
    
      return response.json();
}

export async function slayBoss(playerId,token){
  const urlToSend = `${apiUrl}slay_boss/${playerId}`;

    const init = {
      method: "PUT",
      headers:{"Content-Type":"application/json",
    'Authorization': `Bearer ${token}`}
    };

    const response = await fetch(urlToSend, init);

    if (response.status !== 200) {
        return Promise.reject(`response is not 200 OK response is ${response.status}`);
      }
    
      return response.json();

}



