import {useContext, useEffect, useState} from 'react';
import {createRoom, pickUpArmor,pickUpWeapon, getPlayerById,getRoomById,equipWeapon,equipArmor} from '../Service/api';
import {Link, useParams,useHistory} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import {gsap} from 'gsap';
import hero from '../images/player-hero.png';
import shield from '../images/shield.png';


function hopToNextRoom(tl){
    /*First Hop from 0 to +250 */
    tl.to(".hero",{x:250*0.1/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:250*0.25/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:250*0.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:250*1/2,y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:250*1.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:250*1.75/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:250*1.9/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:250*2/2,y:-100*0,duration:1/32,ease: 
        "none"});

        /*Second Hop from 250 to +500 */
    tl.to(".hero",{x:250+250*0.1/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:250+250*0.25/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:250+250*0.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:250+250*1/2,y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:250+250*1.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:250+250*1.75/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:250+250*1.9/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:250+250*2/2,y:-100*0,duration:1/32,ease: 
        "none"});

     /*Third Hop from 500 to +750*/
     tl.to(".hero",{x:500+250*0.1/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:500+250*0.25/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:500+250*0.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:500+250*1/2,y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:500+250*1.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:500+250*1.75/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:500+250*1.9/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:500+250*2/2,y:-100*0,duration:1/32,ease: 
        "none"});
    /*Fourth Hop from 750 to +1000*/
    tl.to(".hero",{x:750+250*0.1/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:750+250*0.25/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:750+250*0.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:750+250*1/2,y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:750+250*1.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:750+250*1.75/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:750+250*1.9/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:750+250*2/2,y:-100*0,duration:1/32,ease: 
        "none"});
    /*Fifth Hop from 1000 to +1250*/
    tl.to(".hero",{x:1000+250*0.1/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:1000+250*0.25/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:1000+250*0.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:1000+250*1/2,y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:1000+250*1.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:1000+250*1.75/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:1000+250*1.9/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:1000+250*2/2,y:-100*0,duration:1/32,ease: 
        "none"});
    /*Sixth Hop from 1250 to +1500*/
    tl.to(".hero",{x:1250+250*0.1/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:1250+250*0.25/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:1250+250*0.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:1250+250*1/2,y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:1250+250*1.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:1250+250*1.75/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:1250+250*1.9/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:1250+250*2/2,y:-100*0,duration:1/32,ease: 
            "none"});
}



function StartGamePage(){
    var tl = gsap.timeline();
    gsap.set(".hero",{transformOrigin:"50% 50%"});

    const {playerId} = useParams();
    const auth = useContext(AuthContext);
    const history = useHistory();

    const [player, setPlayer] = useState();
    const [room, setRoom] = useState();
    
    useEffect(()=>{
        examineViewState();
        ponderExistence();
        displayInventory();
        displayMenu();
        tl.to(".heroShield",{opacity:0,duration:0});

        getPlayerById(playerId,auth.user.token)
            .then(p => {
                setPlayer(p);
                getRoomById((p.roomsGenerated[(p.roomsGenerated.length-1)]).roomId, auth.user.token)
                    .then(r => 
                    setRoom(r))
            })
            .catch(console.log('error'))
    },[auth]);

    const linkToNonCombat = () => history.push(`/nonCombatGameInterface/${playerId}`);


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
    
    function ponderExistence(){
        var paragraph = document.getElementById("ponderExistence");
        var btn = document.getElementById("ponderBtn");
        
        if(paragraph.style.display === "none"){
            paragraph.style.display = "block";
            btn.innerHTML="Stop Pondering";
            
        } else {
            paragraph.style.display = "none";
            btn.innerHTML="Ponder Existence";
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

    function clickNext(){
        hopToNextRoom(tl);
        
        tl.to(".bg",{opacity:0,duration:0.5, onComplete: linkToNonCombat});

        createRoom(player.playerId, auth.user.token)
        .catch(console.log("error"));
    }

    const pickupArmorHere = () => {
        pickUpArmor(player.playerId,room.armorId,auth.user.token)
        .then(
            () => {
                getPlayerById(playerId,auth.user.token)
                .then(p => setPlayer(p))})


        .catch(console.log('error'));
        
    }
    function pickupWeaponHere(){
        pickUpWeapon(playerId,room.weaponId,auth.user.token)
        .then(
            () => {
            getPlayerById(playerId,auth.user.token)
            .then(p => setPlayer(p))})

        .catch(console.log('error'));
        
    }

    
    
    function equipWeaponHere(weaponId){
        equipWeapon(playerId,weaponId,auth.user.token)
        .then(() => {
            getPlayerById(playerId,auth.user.token)
            .then(p => setPlayer(p))});
        
    }
    function equipArmorHere(armorId){
        equipArmor(playerId,armorId,auth.user.token)
        .then(() => {
        getPlayerById(playerId,auth.user.token)
        .then(p => setPlayer(p))});
        

        
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

    



    return(
        <div>
           
        <div className="container-fluid d-flex h-100 flex-column">
          <div className="row flex-grow-1">
            <div className="col-xl">
                <button id="ponderBtn" className="btn btn-danger" onClick={ponderExistence}> Ponder Existence </button>
                
                <button id="examineBtn" className="btn btn-warning" onClick={examineViewState}> Examine Room </button>
                
                <button id="inventoryBtn" className="btn btn-primary" onClick={displayInventory}> Inventory </button>
                
                {/* Would like to get the room count somehow -- will help us test that saves are working correctly */}
                <button id="menuBtn" className="btn btn-secondary" onClick={displayMenu}> Quit Game </button>

                {player && <button id="roomBtn" disabled>Room {player.roomsGenerated.length}</button>}
            <img src={shield} alt="Defense" className="heroShield" display="hidden"/>
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
                      {(player && player.equippedWeaponId !== 1) ? <><button className="btn btn-success" onClick={equipWeaponHere(1)}>Equip</button></> : <><button className="btn btn-info" disabled>Equipped</button></>}{/*<button className="btn btn-secondary" disabled>Not Owned</button>*/}
                  </td>}
                    {player && console.log(player.inventory.armorList.some(a => a.armorId === 1))}
                    {player && console.log(player)}
                  {player && player.inventory.armorList.some(a => a.armorId === 1) &&
                  <td><h5>Armor 1</h5>
                      {(player && player.equippedArmorId !== 1) ? <><button className="btn btn-success" onClick={equipArmorHere(1)}>Equip</button></> : <><button className="btn btn-info" disabled>Equipped</button></>}
                  </td>}
              </tr>
              
              <tr>
                <th>2</th>
                {player && player.inventory.weaponList.some(w => w.weaponId === 2) &&
                  <td><h5>Weapon 2</h5>
                      {(player && player.equippedWeaponId !== 2) ? <><button className="btn btn-success">Equip</button></> : <><button className="btn btn-info" disabled>Equipped</button></>}
                  </td>}
                  {player && player.inventory.armorList.some(a => a.armorId === 2) &&
                  <td><h5>Armor 2</h5>
                      {(player && player.equippedArmorId !== 2) ? <><button className="btn btn-success">Equip</button></> : <><button className="btn btn-info" disabled>Equipped</button></>}
                  </td>}
              </tr>
              
              <tr>
                <th>3</th>
                {player && player.inventory.weaponList.some(w => w.weaponId === 3) && 
                  <td><h5>Weapon 3</h5>
                      {(player  && player.equippedWeaponId !== 3) ? <><button className="btn btn-success">Equip</button></> :  <><button className="btn btn-info" disabled>Equipped</button></>}
                  </td>}
                  {player && player.inventory.armorList.some(a => a.armorId === 3) &&
                  <td><h5>Armor 3</h5>
                      {(player && player.equippedArmorId !== 3 )? <><button className="btn btn-success">Equip</button></> : <><button className="btn btn-info" disabled>Equipped</button></>}
                  </td>}
              </tr>
            </tbody>
          </table>
          </div>
            <div id="examineDetails">
              <p>
                  There are mountains.
                  <br/>
                  <br/>
                  That is all.
              </p>
              </div>
              <div id="ponderExistence">
              <p>
                  You live in a world where birds are constantly trying to murder you.
                  <br/>
                  <br/>
                  Do with that what you will.
              </p>
              </div>
            </div>
            <div className="col-xl">
                {/*nothing in this column for this room*/}
                <button className="btn btn-success" onClick={clickNext}>Next Room</button>
                <br/>
                {player && room && (room.armorId > 0) && (player.inventory.armorList.some(a => a.armorId !== room.armorId) || player.inventory.armorList.length == 0) && <button className="btn btn-primary" onClick={pickupArmorHere}>Pickup Armor</button>}
                <br/>
                {room && room.weaponId > 0 && (player.inventory.weaponList.some(w => w.weaponId !== room.weaponId) || player.inventory.weaponList.length == 0) && <button className="btn btn-primary" onClick={pickupWeaponHere}>Pickup Weapon</button>}
            </div>
            </div>
            <br/><br/><br/>
          
        </div>

        </div>
    );
}

export default StartGamePage;