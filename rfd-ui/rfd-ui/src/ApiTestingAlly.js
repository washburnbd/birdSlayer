import {defend} from "./Service/api.js";
import {createUser} from "./Service/api.js";

function ApiTestingAlly(){
    return(
        <>
        <button onClick={() => createUser("username","P@ssw0rd!")}>Test Create User</button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button> </button>
        <button onClick={defend}>Test Defend</button>
        </>
    );
}

export default ApiTestingAlly;