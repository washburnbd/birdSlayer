import {Link} from 'react-router-dom';

function VictoryScreen(){
    return(
        <>
        <div className="home">
            <h1>Victory!</h1>
                <br />
            <h3>You defeated the Big Bad Bird! (You monster)</h3>
                <br />
            
                <div>
                <div>
                    <Link to="/createOrView" className="btn btn-secondary me-2">Return to Home</Link>
                    <Link to="/login" className="btn btn-secondary me-2">Logout</Link>
                </div>
                </div>
                
                    
        </div>
        <br />   <br /> <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </>
    );
}

export default VictoryScreen;