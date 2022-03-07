import {createNewPlayer, defend, attack, getRoomById, pickUpWeapon, pickUpArmor, equipWeapon, equipArmor} from "./Service/api.js";
import {createUser, createRoom, loginWithCredentials, createFirstRoom, getPlayersByUser, getPlayerById} from "./Service/api.js";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnYW1lIiwic3ViIjoidXNlcm5hbWUiLCJpZCI6MiwiZXhwIjoxNjM2NTEzMDMzfQ.XZa13YdY47WX8LsURtcy6_MIf4h2FiidCl83JOYF8LI"

function ApiTestingBrandon(){
    return(
        <>
        <button onClick={() => createUser("username","P@ssw0rd!")}>Test Create User</button>
        <button onClick={() => loginWithCredentials("username", "P@ssw0rd!")}>Test Login</button>
        <button onClick={() => createNewPlayer(2, token)}>Create Player</button>
        <button onClick={() => createFirstRoom(1, token)}>Create First Room</button>
        <button onClick={() => createRoom(1, token)}>Create Room For Player</button>
        <button onClick={() => getPlayersByUser(2, token)}>Get Players By User</button>
        <button onClick={() => getPlayerById(1, token)}>Get Player By Id</button>
        <button onClick={() => getRoomById(2, token)}>Get Room By Id</button>
        <button onClick={() => pickUpWeapon(1, 1, token)}>Pick Up Weapon</button>
        <button onClick={() => pickUpArmor(1, 1, token)}>Pick Up Armor</button>
        <button onClick={() => equipWeapon(1, 1, token)}>Equip Weapon</button>
        <button onClick={() => equipArmor(1, 1, token)}>Equip Armor</button>
        <button onClick={() => attack(1, 2, token)}>Attack</button>
        <button onClick={() => defend(1, 2, token)}>Defend</button>
        </>
    );
}

export default ApiTestingBrandon;