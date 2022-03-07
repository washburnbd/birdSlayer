import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import {gsap} from 'gsap';
import hero from '../images/player-hero.png';
import shield from '../images/shield.png';
import bird1 from '../images/lvl1bird.png';
import bird2 from '../images/lvl2bird.png';
import bird3 from '../images/lvl3bird.png';
import AuthContext from "../context/AuthContext";

import {createBossRoom,getPlayerById, attack, defend, getRoomById, createRoom,pickUpArmor,pickUpWeapon,equipWeapon,equipArmor} from '../Service/api.js';

// player attack animation
function heroHop(tl){
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
    /* Swing and flip*/
    tl.to(".hero",{rotate:"-=30",duration:1});
    tl.to(".hero",{x:"+=50",rotate:"+=60",duration:0.3});
    tl.to(".hero",{x:"-=50",rotate:"-=30"});
    
    tl.to(".hero",{rotateY:180});
    /*First Hop Back */

    tl.to(".hero",{x:750-250*0.1/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:750-250*0.25/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:750-250*0.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:750-250*1/2,y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:750-250*1.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:750-250*1.75/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:750-250*1.9/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:750-250*2/2,y:-100*0,duration:1/32,ease: 
        "none"});

    /*Second Hop Back */

    tl.to(".hero",{x:500-250*0.1/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:500-250*0.25/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:500-250*0.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:500-250*1/2,y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:500-250*1.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:500-250*1.75/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:500-250*1.9/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:500-250*2/2,y:-100*0,duration:1/32,ease: 
        "none"});
    
    /*Third Hop Back and Flip*/

    tl.to(".hero",{x:250-250*0.1/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:250-250*0.25/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:250-250*0.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:250-250*1/2,y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:250-250*1.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".hero",{x:250-250*1.75/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:250-250*1.9/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{x:250-250*2/2,y:-100*0,duration:1/32,ease: 
        "none"});
    tl.to(".hero",{rotateY:0});

}

//bird attack animation
function birdHop(tl){
    /*First Hop From 0 to -300*/
    tl.to(".bird",{x:-300*0.1/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-300*0.25/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-300*0.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".bird",{x:-300*1/2,y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".bird",{x:-300*1.5/2,y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".bird",{x:-300*1.75/2,y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-300*1.9/2,y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-300*2/2,y:-100*0,duration:1/32,ease: 
        "none"});

    /*Second Hop From -300 to -600*/
    tl.to(".bird",{x:-300-(300*0.1/2),y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-300-(300*0.25/2),y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-300-(300*0.5/2),y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".bird",{x:-300-(300*1/2),y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".bird",{x:-300-(300*1.5/2),y:-100*0.866,duration:2/32,ease: 
            "none"});
    tl.to(".bird",{x:-300-(300*1.75/2),y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-300-(300*1.9/2),y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-300-(300*2/2),y:-100*0,duration:1/32,ease: 
        "none"});
    /*Third Hop From -600 to -900*/
    tl.to(".bird",{x:-600-(300*0.1/2),y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-600-(300*0.25/2),y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-600-(300*0.5/2),y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".bird",{x:-600-(300*1/2),y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".bird",{x:-600-(300*1.5/2),y:-100*0.866,duration:2/32,ease: 
            "none"});
    tl.to(".bird",{x:-600-(300*1.75/2),y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-600-(300*1.9/2),y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-600-(300*2/2),y:-100*0,duration:1/32,ease: "none"});

    /*Peck and flip*/
    tl.to(".bird",{rotate:"+=30",duration:1});
    tl.to(".bird",{x:"-=50",rotate:"-=60",duration:0.3})
    tl.to(".bird",{x:"+=50",rotate:"+=30"})

    tl.to(".bird",{rotateY:180});

    /*First Hop Back From -900 to -600*/
    tl.to(".bird",{x:-900-(-300*0.1/2),y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-900-(-300*0.25/2),y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-900-(-300*0.5/2),y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".bird",{x:-900-(-300*1/2),y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".bird",{x:-900-(-300*1.5/2),y:-100*0.866,duration:2/32,ease: 
            "none"});
    tl.to(".bird",{x:-900-(-300*1.75/2),y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-900-(-300*1.9/2),y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-900-(-300*2/2),y:-100*0,duration:1/32,ease: "none"});

    
    /*Second Hop From -600 to -300*/
    
    tl.to(".bird",{x:-600-(-300*0.1/2),y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-600-(-300*0.25/2),y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-600-(-300*0.5/2),y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".bird",{x:-600-(-300*1/2),y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".bird",{x:-600-(-300*1.5/2),y:-100*0.866,duration:2/32,ease: 
            "none"});
    tl.to(".bird",{x:-600-(-300*1.75/2),y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-600-(-300*1.9/2),y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-600-(-300*2/2),y:-100*0,duration:1/32,ease: 
        "none"});
    /*Third Hop From -300 to 0 and Flip*/
    
    tl.to(".bird",{x:-300-(-300*0.1/2),y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-300-(-300*0.25/2),y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-300-(-300*0.5/2),y:-100*0.866,duration:2/32,ease: 
        "none"});
    tl.to(".bird",{x:-300-(-300*1/2),y:-100,duration:2/32,ease: 
        "none"});
    tl.to(".bird",{x:-300-(-300*1.5/2),y:-100*0.866,duration:2/32,ease: 
            "none"});
    tl.to(".bird",{x:-300-(-300*1.75/2),y:-100*0.6614,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-300-(-300*1.9/2),y:-100*0.4359,duration:1/32,ease: 
        "none"});
    tl.to(".bird",{x:-300-(-300*2/2),y:-100*0,duration:1/32,ease: "none"});

    tl.to(".bird",{rotateY:0});
}

//hops to next room
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

//death animation of bird
function killBird(tl){
    tl.to(".bird",{rotateY:180,duration:0.2});
    tl.to(".bird",{rotateY:0,duration:0.2});
    tl.to(".bird",{rotateY:180,duration:0.2});

    tl.to(".bird",{scaleX:0.66,scaleY:0.66,rotateY:0,duration:0.3});
    tl.to(".bird",{scaleX:0.33, scaleY:0.33, rotateY:180,duration:0.3});
    tl.to(".bird",{scaleX:0.16, scaleY:0.16, rotateY:0,duration:0.3});
    tl.to(".bird",{scaleX:0.08, scaleY:0.08, rotateY:180,duration:0.3});
    tl.to(".bird",{scaleX:0, scaleY:0, rotateY:0,duration:0.3});

}

//death animation of player
function killPlayer(tl){
    gsap.set(".hero",{transformOrigin:"50% 100%"});
    tl.to(".hero",{rotate:-90,x:"+=250",y:"-=200"});

}

function CombatGameInterface(){

    const [player, setPlayer] = useState([]);
    const [room, setRoom] = useState();
    const [enemyMove, setEnemyMove] = useState();
    
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {playerId} = useParams();

    var tl = gsap.timeline();

    gsap.set(".bird",{transformOrigin:"50% 50%"});
    gsap.set(".hero",{transformOrigin:"50% 50%"});

    useEffect(()=>{
        getPlayerById(playerId,auth.user.token)
            .then(p => {
                setPlayer(p);
                getRoomById((p.roomsGenerated[(p.roomsGenerated.length-1)]).roomId, auth.user.token)
                    .then(r => 
                    setRoom(r)).then(()=>{tl.to(".enemyShield",{opacity:0,duration:0});
                    tl.to(".heroShield",{opacity:0,duration:0})})
            })
            .catch(console.log('error'));
            
    },[auth]);

    function birdShields(){
        tl.to(".enemyShield",{opacity:1,duration:0.5});
        tl.to(".enemyShield",{opacity:0,duration:0.5,delay:0.25})
    }
    

    const linkToNonCombat = () => {
        
        history.push(`/nonCombatGameInterface/${playerId}`);
    }

    const linkToPreBossRoom = () => {
        history.push(`/preBossRoom/${playerId}`);
    }

    
    

    
    
    function clickNext(){
        hopToNextRoom(tl);

        if(player.roomsGenerated.length <= 3){
            createRoom(playerId,auth.user.token).catch(console.log('error'));
        
        tl.to(".bg",{opacity:0,duration:0.5, onComplete: linkToNonCombat});}


        else{
            createBossRoom(playerId,auth.user.token).catch(console.log('error'));
        
        tl.to(".bg",{opacity:0,duration:0.5, onComplete: linkToPreBossRoom});

        }

        
    }
    function clickKillBird(){
        killBird(tl);
    }
    function clickKillPlayer(){
        killPlayer(tl);
    }

    function enemyMakesMove(){
        switch(enemyMove){
            case 1:
                birdHop(tl);
                break;
            case 2:
                break;
            case 0:
                killBird(tl);
                break;
        }
    }

    function attackBird(){
        
        attack(playerId, room.roomId, auth.user.token)
        .then(data => {
            heroHop(tl);
            setEnemyMove(data)
            if(data === 1){
                birdHop(tl);
            } else if ( data === 0 ){
                killBird(tl);
            } else if ( data === 2){
                birdShields();
            };

            getPlayerById(playerId, auth.user.token)
                .then(p => setPlayer(p))
                .then(
                    getRoomById(room.roomId, auth.user.token)
                .then(r => setRoom(r)))
            })
        .catch(console.log("error"))
        if(player.currentHp <= 0){
            history.push(`/defeatScreen/${playerId}`);
        }
    }

    function defendFromBird(){

        defend(playerId, room.roomId, auth.user.token)
        .then(data => {
            setEnemyMove(data);
            
            if(data === 1){
                birdHop(tl);
            } else if ( data === 0 ){
                killBird(tl);
            } else if ( data === 2){
                birdShields();
            };
            getPlayerById(playerId, auth.user.token)
                .then(p => setPlayer(p)
                    
                )
                .then(
                    getRoomById(room.roomId, auth.user.token)
                .then(r => setRoom(r)))
            })
        .catch(console.log("error"));
        
        tl.to(".heroShield",{opacity:1,duration:0.5});
        tl.to(".heroShield",{opacity:0,duration:0.5,delay:0.25});
    }

    const pickupArmorHere = () => {
        pickUpArmor(player.playerId,room.armorId,auth.user.token)
        .then(
            () => {
                getPlayerById(playerId,auth.user.token)
                .then(p => setPlayer(p))})


        .catch(console.log('error'));
        var btn = document.getElementById("armorBtn");
        btn.style.visibility = "hidden";
        
    }
    function pickupWeaponHere(){
        pickUpWeapon(playerId,room.weaponId,auth.user.token)
        .then(
            () => {
            getPlayerById(playerId,auth.user.token)
            .then(p => setPlayer(p))})

        .catch(console.log('error'));
        var btn = document.getElementById("weaponBtn");
        btn.style.visibility = "hidden";
        
    }


    return(
        <>
        {player.currentHp > 0 && <div>
        <div className="container-fluid d-flex h-100 flex-column">
      <div className="row flex-grow-1">
        <div className="col-xl">
            {player && <h5>{`Player Hp ${player.currentHp}/${player.maxHp}`}</h5>}
            {player && room && <button className="btn btn-danger" onClick={attackBird}> Attack </button>}
            
            {player && room && <button className="btn btn-warning" onClick={defendFromBird}> Defend </button>}
        <img src={shield} alt="Defend" className="heroShield"/>
        <img src={hero} alt="Hero" className="hero"/>
        </div>
        <div className="col-xl" >
          <h1></h1>
        </div>
        <div className="col-xl">
            {room && <h5>{`Bird Hp ${room.enemyHp}`}</h5>}
            {console.log(room)}
            {player && room && room.roomCleared && <button className="btn btn-success" onClick={clickNext}>Next Room</button>}
            
            {player && room  && room.roomCleared && (room.armorId > 0) && player.inventory.armorList && (player.inventory.armorList.some(a => a.armorId !== room.armorId) || player.inventory.armorList.length == 0) && <button className="btn btn-primary" id="armorBtn" onClick={pickupArmorHere}>Pickup Armor</button>}
                
            {player && room && room.roomCleared && (room.weaponId > 0) && player.inventory.weaponList && (player.inventory.weaponList.some(w => w.weaponId !== room.weaponId) || player.inventory.weaponList.length == 0) && <button className="btn btn-primary" id="weaponBtn" onClick={pickupWeaponHere}>Pickup Weapon</button>}
           <img src={shield} alt="Defend" className="enemyShield"/>
          {(room && room.enemyId === 3) && <img src={bird3} alt="Bird" className="bird"/>}
          {(room && room.enemyId === 2) && <img src={bird1} alt="Bird" className="bird"/>}
          {(room && room.enemyId === 1) && <img src={bird2} alt="Bird" className="bird"/>}
        </div>
        </div>
        <br/><br/><br/><br/><br/>
      
    </div>
    </div>}
    {player.currentHp <= 0 && <><div className="home">
            <h1>Defeat</h1>
                <br />
            <h3>You died to a bird.</h3>
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
        }
    </>
    );
}

export default CombatGameInterface;