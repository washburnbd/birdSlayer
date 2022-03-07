import hero from '../images/player-hero.png'
import shield from '../images/shield.png'
import bird1 from '../images/lvl1bird.png'
import bird2 from '../images/lvl2bird.png'
import bird3 from '../images/lvl3bird.png'
import {gsap} from 'gsap';
import {Link, useParams, useHistory} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import {getPlayerById, getRoomById,equipWeapon,equipArmor} from '../Service/api';

function NonCombatGameInterface(){

    const {playerId} = useParams();
    const history = useHistory();
    const [player, setPlayer] = useState();
    const [room, setRoom] = useState();
    const auth = useContext(AuthContext);

    function examineViewState(){
        var paragraph = document.getElementById("examineDetails");
        var btn = document.getElementById("examineBtn");
        
        if(paragraph.style.display === "none"){
            paragraph.style.display = "block";
            btn.innerHTML="Stop Examining";
            
        } else {
            paragraph.style.display = "none";
            btn.innerHTML="Examine Room";
        }
    }
    function displayInventory(){
        var paragraph = document.getElementById("theTable");
        var btn = document.getElementById("inventoryBtn");
        
        if(paragraph.style.display === "none"){
            paragraph.style.display = "block";
            btn.innerHTML="Close Inventory";
            
        } else {
            paragraph.style.display = "none";
            btn.innerHTML="Inventory";
        }
    }

    function displayMenu(){
        var paragraph = document.getElementById("menuOptions");
        var btn = document.getElementById("menuBtn");
        
        if(paragraph.style.display === "none"){
            paragraph.style.display = "block";
            btn.innerHTML="Cancel";
            
        } else {
            paragraph.style.display = "none";
            btn.innerHTML="Exit Game";
        }
    }

    function equipWeapon1(){
        equipWeapon(playerId,1,auth.user.token)
        .then(() => {
            getPlayerById(playerId,auth.user.token)
            .then(p => setPlayer(p))});
        
    }
    function equipArmor1(){
        equipArmor(playerId,1,auth.user.token)
        .then(() => {
        getPlayerById(playerId,auth.user.token)
        .then(p => setPlayer(p))});
        
    }
    function equipWeapon2(){
        equipWeapon(playerId,2,auth.user.token)
        .then(() => {
            getPlayerById(playerId,auth.user.token)
            .then(p => setPlayer(p))});
        
    }
    function equipArmor2(){
        equipArmor(playerId,2,auth.user.token)
        .then(() => {
        getPlayerById(playerId,auth.user.token)
        .then(p => setPlayer(p))});
        
    }
    function equipWeapon3(){
        equipWeapon(playerId,3,auth.user.token)
        .then(() => {
            getPlayerById(playerId,auth.user.token)
            .then(p => setPlayer(p))});
        
    }
    function equipArmor3(){
        equipArmor(playerId,3,auth.user.token)
        .then(() => {
        getPlayerById(playerId,auth.user.token)
        .then(p => setPlayer(p))});
        
    }

    var tl = gsap.timeline();
    gsap.set(".bird",{transformOrigin:"50% 50%"});
    gsap.set(".hero",{transformOrigin:"50% 50%"});
    useEffect(() => {
        getPlayerById(playerId,auth.user.token)
            .then(p => {

                setPlayer(p);
                getRoomById(p.roomsGenerated[(p.roomsGenerated.length)-1].roomId, auth.user.token)
            .then(r => {
                setRoom(r);
            })
            })
            .catch(console.log('error'));
        
        examineViewState();
        displayInventory();
        displayMenu();
        tl.to(".heroShield",{opacity:0,duration:0});
        tl.to(".enemyShield",{opacity:0,duration:0});
        tl.to(".hero",{x:-500,duration:0});
        tl.to(".bg",{opacity:1,duration:0.5});
            /*First Hop from -500 to -250 */
    tl.to(".hero",{x:-500+250*0.1/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:-500+250*0.25/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:-500+250*0.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:-500+250*1/2,y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:-500+250*1.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:-500+250*1.75/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:-500+250*1.9/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:-500+250*2/2,y:-100*0,duration:1/32,ease: 
        "none"});

        /*Second Hop from -250 to 0 */
    tl.to(".hero",{x:-500+250+250*0.1/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:-500+250+250*0.25/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:-500+250+250*0.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:-500+250+250*1/2,y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:-500+250+250*1.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:-500+250+250*1.75/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:-500+250+250*1.9/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:-500+250+250*2/2,y:-100*0,duration:1/32,ease: 
        "none"});
    },[auth])

    return (
        <div className="container-fluid d-flex h-100 flex-column">
          <div className="row flex-grow-1">
            <div className="col-xl">
                <Link to={`/combatGameInterface/${playerId}`} className="btn btn-danger" id="fightLink"> Fight </Link>
                
                <button id="examineBtn" className="btn btn-warning" onClick={examineViewState}> Examine Room </button>
                
                <button id="inventoryBtn" className="btn btn-primary" onClick={displayInventory}> Inventory </button>
                
                <button id="menuBtn" className="btn btn-secondary" onClick={displayMenu}> Quit Game </button>
                
                {player && <button id="roomBtn" disabled>Room {player.roomsGenerated.length}</button>}
            
            <img src={shield} alt="Defend" className="heroShield"/>
            <img src={hero} alt="Hero" className="hero"/>
            </div>
            <div className="col-xl" >
            <div id="menuOptions">
                <ul>
                    <li>
                        <Link to="/createOrView" className="btn btn-danger"> Quit Game and Return to Player View </Link>
                    </li>
                    <li>
                        <Link to="/login" className="btn btn-secondary"> Quit Game and Log Out </Link>
                    </li>
                    <li>
                        <Link to="/register" className="btn btn-primary"> Quit Game and Register New User </Link>
                    </li>
                </ul>
            </div>
            <div id="examineDetails">
              <p>
                  There are mountains.
                  <br/>
                  <br/>
                  There is also a murderous bird in front of you.
              </p>
            </div>
            <div id="theTable">
            <table>
            <thead>
              <tr>
                <th >Lvl</th>
                <th ></th>
                <th ></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                {player && player.inventory.weaponList.some(w => w.weaponId === 1) &&
                  <td><h5>Weapon 1</h5>
                      {(player && player.equippedWeaponId !== 1) ? <><button className="btn btn-success" onClick={equipWeapon1}>Equip</button></> : <><button className="btn btn-info" disabled>Equipped</button></>}{/*<button className="btn btn-secondary" disabled>Not Owned</button>*/}
                  </td>}
                    
                  {player && player.inventory.armorList.some(a => a.armorId === 1) &&
                  <td><h5>Armor 1</h5>
                      {(player && player.equippedArmorId !== 1) ? <><button className="btn btn-success" onClick={equipArmor1}>Equip</button></> : <><button className="btn btn-info" disabled>Equipped</button></>}
                  </td>}
              </tr>
              
              <tr>
                <th>2</th>
                {player && player.inventory.weaponList.some(w => w.weaponId === 2) &&
                  <td><h5>Weapon 2</h5>
                      {(player && player.equippedWeaponId !== 2) ? <><button className="btn btn-success" onClick={equipWeapon2}>Equip</button></> : <><button className="btn btn-info" disabled>Equipped</button></>}
                  </td>}
                  {player && player.inventory.armorList.some(a => a.armorId === 2) &&
                  <td><h5>Armor 2</h5>
                      {(player && player.equippedArmorId !== 2) ? <><button className="btn btn-success" onClick={equipArmor2}>Equip</button></> : <><button className="btn btn-info" disabled>Equipped</button></>}
                  </td>}
              </tr>
              
              <tr>
                <th>3</th>
                {player && player.inventory.weaponList.some(w => w.weaponId === 3) && 
                  <td><h5>Weapon 3</h5>
                      {(player  && player.equippedWeaponId !== 3) ? <><button className="btn btn-success" onClick={equipWeapon3}>Equip</button></> :  <><button className="btn btn-info" disabled>Equipped</button></>}
                  </td>}
                  {player && player.inventory.armorList.some(a => a.armorId === 3) &&
                  <td><h5>Armor 3</h5>
                      {(player && player.equippedArmorId !== 3 )? <><button className="btn btn-success" onClick={equipArmor3}>Equip</button></> : <><button className="btn btn-info" disabled>Equipped</button></>}
                  </td>}
              </tr>
            </tbody>
          </table>
              


            </div>
            </div>
            <div className="col-xl">

            <img src={shield} alt="Defend" className="enemyShield"/>

            {(room && room.enemyId === 3) && <img src={bird3} alt="Bird" className="bird"/>}
            {(room && room.enemyId === 2) && <img src={bird1} alt="Bird" className="bird"/>}
            {(room && room.enemyId === 1) && <img src={bird2} alt="Bird" className="bird"/>}
            </div>
            </div>
            <br/><br/><br/>
          
            
        </div>
        );
}

export default NonCombatGameInterface;