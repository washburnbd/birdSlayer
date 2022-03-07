import { Link } from 'react-router-dom';


function Welcome() {
    return (
        <>
        <div className="home">
            <h1>Welcome to Bird Slayer!</h1>
                <br />
            <h3>Click the link below to Login or Register</h3>
                <br />
            
                <div>
                    <Link to="/login" className="btn btn-secondary me-2">Login</Link>
                    <Link to="/register" className="btn btn-secondary me-2">Register</Link>
                </div>
                
                    
        </div>
        <br />   <br /> <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </>
    )
}
export default Welcome;

