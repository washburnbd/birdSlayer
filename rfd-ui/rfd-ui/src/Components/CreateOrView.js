import AuthContext from '../context/AuthContext';
import {useEffect, useContext, useState} from 'react';
import {createNewPlayer,createFirstRoom,getUserById,getPlayersByUser} from '../Service/api';
import {Link,useHistory} from 'react-router-dom';
import Player from './Player';
function CreateOrView(){
    const auth = useContext(AuthContext);
    const [gameUser, setGameUser] = useState();
    const [players, setPlayers] = useState([]);
    
    const history = useHistory();

    function createPlayerAndFirstRoom(){
        createNewPlayer(gameUser.gameUserId,auth.user.token)
        .then(p => {
            
            createFirstRoom(p.playerId,auth.user.token)
            .then(
                () => {
                getPlayersByUser(auth.user.id,auth.user.token)
                .then(data1 => setPlayers(data1))
            }).catch();

            
        }).catch(console.log('error'));
        
    
    };
    
    useEffect(()=>{
        getUserById(auth.user.id)
        .then(data => {
            
            setGameUser(data);
            //
            getPlayersByUser(data.gameUserId,auth.user.token)
                .then(data1 => setPlayers(data1))
    }).catch(console.log('error'));
},[auth]);
    
    return(
        <>
        <div className="header">
            {auth && <h1>{`Player Management Screen for User: ${auth.user.username}`}</h1>}
            <br/>
            <div>
                <button onClick={createPlayerAndFirstRoom} className="btn btn-secondary me-3" id="createPlayer" >Create New Player</button>
            </div>
            <div>
                {players.length > 0 && 
                <h3>
                    Or Select an Existing Player
                </h3>}
            </div>
            <br/>
            <div>
                <Link to="/login" className="btn btn-primary"> Exit to Login Screen </Link>
            </div>
        </div> 
        <div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
            {players.length !==0 &&  players.map(p => <Player key = {p.playerId} player={p}/>)}
        </div>
        </>

        
    )
}

export default CreateOrView;