import { useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Player( { player }){
    const auth = useContext(AuthContext);

    return (
        <div className="col">
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">{`Player ${player.playerId}`}</h5>
                    {console.log(player)}

                    {/* Needs to continue from last room-- check roomsGenerate length to decide where to start */}
                    {player.roomsGenerated.length <= 1 && <Link to={`/startGamePage/${player.playerId}`} className="btn btn-success"> Start New Game </Link>}
                    {player.roomsGenerated.length > 1 && !player.bossSlain && player.currentHp > 0 && <Link to ={`/nonCombatGameInterface/${player.playerId}`} className="btn btn-success" >Continue</Link>}
                </div>
                <div className="card-footer text-center">
                    {(player.roomsGenerated.length-1) + " rooms cleared"}
                    {player.bossSlain && <p>Victory!</p>}
                    {player.currentHp <= 0 && <p>Death by Bird</p>}
                </div>
            </div>
        </div>
    );
}
export default Player;