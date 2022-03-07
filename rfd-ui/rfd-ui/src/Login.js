import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import {loginWithCredentials} from './Service/api.js';
function Login() {

    const [candidate, setCandidate] = useState({
        username: "",
        password: ""
    });
    
    const [hasError, setHasError] = useState(false);

    const history = useHistory();
    const auth = useContext(AuthContext);

    // event handlers
    const onChange = (evt) => {
        const clone = { ...candidate };
        clone[evt.target.name] = evt.target.value;
        setCandidate(clone);
    }

    const onSubmit = (evt) => {
        evt.preventDefault();
        // if (auth.login(candidate)) {
        //     history.push("/viewPlayersForUser");
        // } else {
        //     setHasError(true);
        // }
        

        loginWithCredentials(candidate.username,candidate.password)
        .then(data => {
            if(data) {
                auth.login(data.jwt_token);
                history.push('/createOrView');
            } else {
                setHasError(true);
            }
        })
        .catch(console.log('login error'));

    };

    return (
        <>
        <div class="log-form">
                <h1>Sign In</h1>
        <form onSubmit={onSubmit}>
            <div className="mb-2">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" id="username" name="username" className="form-control"
                    value={candidate.username} onChange={onChange} />
            </div>
            <div className="mb-2">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" id="password" name="password" className="form-control"
                    value={candidate.password} onChange={onChange} />
            </div>
            <div>
                <Link to="/" className="btn btn-secondary me-2">Cancel</Link>
                <button type="submit" className="btn btn-secondary">Log In</button>
            </div>
            {hasError && <div className="alert alert-danger">Bad credentials...</div>}
        </form>
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </>
    );
}

export default Login;