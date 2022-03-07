import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import Register from './Components/Register';

import './App.css';
import Login from "./Login";
import AuthContext from './context/AuthContext';
import CombatGameInterface from './Components/CombatGameInterface';
import NonCombatGameInterface from './Components/NonCombatGameInterface';
import PreBossRoom from './Components/PreBossRoom';
import BossRoom from './Components/BossRoom';
import StartGamePage from './Components/StartGamePage';
import ViewInventoryNC from './Components/ViewInventoryNC';
import ExamineRoom from './Components/ExamineRoom';
import VictoryScreen from './Components/VictoryScreen';
import DefeatScreen from './Components/DefeatScreen';
// import Error from './Components/Error';
import NotFound from './Components/NotFound';
import ApiTestingAlly from './ApiTestingAlly';
import ApiTestingBrandon from './ApiTestingBrandon';
import GsapTest from './GsapTest';
import Welcome from './Components/Welcome';
import CreateOrView from './Components/CreateOrView';


const TOKEN_KEY = 'game-user-allym';


function App() {
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

   useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      login(token);
    }

    setInitialized(true);
  }, []); 

  const login = (token) => {
    console.log(token);

    localStorage.setItem(TOKEN_KEY, token);

    const tokenObj = jwt_decode(token);
    console.log(tokenObj);

    const { id, sub: username } = jwt_decode(token);

    const user = {
      id,
      username,
      token
    };

    console.log(user);

    setUser(user);

    return user;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const auth = {
    user: user ? {...user} : null,
    login,
    logout
  };

  if (!initialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={auth}>
      <Router>
       
        {/* <div>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
          <Link to={"/combatGameInterface"}>combatGameInterface</Link>
          <Link to={"/nonCombatGameInterface"}>nonCombatGameInterface</Link>
          <Link to={"/viewPlayersForUser"}>viewPlayersForUser</Link>
          <Link to={"/startGamePage"}>startGamePage</Link>
          <Link to={"/viewInventory"}>viewInventory</Link>
          <Link to={"/examineRoom"}>examineRoom</Link>
          <Link to={"/victoryScreen"}>victoryScreen</Link>
          <Link to={"/defeatScreen"}>viewInventory</Link>
          <Link to={"/error"}>Error</Link>
          <Link to={"/apiTesting"}>Test the API</Link>
          <Link to={"/gsapTest"}>GSAP TEST</Link>
        </div> */}
        <Switch>
          <Route exact path="/">
            <div className="bg">
              <Welcome/>
            </div>
          </Route>
          <Route exact path="/login">
            <div className="bg">
              <Login />
            </div>
          </Route>

          <Route exact path="/register">
            <div className="bg">
            <Register />
            </div>
          </Route>

          <Route exact path="/createOrView">
            <CreateOrView/>
          </Route>

          <Route exact path="/combatGameInterface/:playerId">
            <div className="bg">
              <CombatGameInterface />
            </div>
          </Route>

          <Route exact path="/nonCombatGameInterface/:playerId">
            <div className="bg">
              <NonCombatGameInterface />
            </div>
          </Route>
          <Route exact path="/preBossRoom/:playerId">
            <div className="bg">
              <PreBossRoom/>
            </div>
          </Route>

          <Route exact path="/bossRoom/:playerId">
            <div className="bg">
              <BossRoom/>
            </div>
          </Route>


          <Route exact path="/startGamePage/:playerId">
          <div className="bg">
            <StartGamePage />
            </div>
          </Route>

         

          <Route exact path="/examineRoom">
            <ExamineRoom />
          </Route>

          <Route exact path="/victoryScreen/:playerId">
            <div className="bg">
            <VictoryScreen />
            </div>
          </Route>

          <Route exact path="/defeatScreen/:playerId">
            <div className="bg">
            <DefeatScreen />
            </div>
          </Route>

          {/* <Route exact path="/error">
            <Error />
          </Route> */}

          <Route exact path ="/apiTestingAlly">
            <ApiTestingAlly/>
          </Route>

          <Route exact path ="/apiTestingBrandon">
            <ApiTestingBrandon/>
          </Route>

          <Route exact path="/gsapTest">
            <div className="bg">
              <GsapTest/>
            </div>
          </Route>

          <Route path="/notFound">
            <NotFound />
          </Route>

        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;