import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {gsap} from 'gsap';
import hero from '../images/player-hero.png';
import bossbird from '../images/bossbird.png';
import shield from '../images/shield.png';

import AuthContext from "../context/AuthContext";
import {slayBoss,getPlayerById, attack, defend, getRoomById, createRoom,pickUpArmor,pickUpWeapon,equipWeapon,equipArmor} from '../Service/api.js';

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


function BossRoom(){

    

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
                    setRoom(r))
            })
            .catch(console.log('error'));
            tl.to(".heroShield",{opacity:0,duration:0});
            tl.to(".enemyShield",{opacity:0,duration:0});
    },[auth]);

    const linkToVictory = () => {
        
        history.push(`/victoryScreen/${playerId}`);
    }

    function clickNext(){
        hopToNextRoom(tl);

        tl.to(".bg",{opacity:0,duration:0.5, onComplete: linkToVictory});
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
            } else if (data === 2){
                tl.to(".enemyShield",{opacity:1,duration:0.5});
                tl.to(".enemyShield",{opacity:0,duration:0.5,delay:0.25});
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
                slayBoss();
            } else if (data === 2){
                tl.to(".enemyShield",{opacity:1,duration:0.5});
                tl.to(".enemyShield",{opacity:0,duration:0.5,delay:0.25});
            };
            getPlayerById(playerId, auth.user.token)
                .then(p => setPlayer(p))
                .then(
                    getRoomById(room.roomId, auth.user.token)
                .then(r => setRoom(r)))
            })
        .catch(console.log("error"));
        if(player.currentHp <= 0){
            history.push(`/defeatScreen/${playerId}`);
        };
        tl.to(".heroShield",{opacity:1,duration:0.5});
        tl.to(".heroShield",{opacity:0,duration:0.5,delay:0.25});
    }

    return(
        <div className="container-fluid d-flex h-100 flex-column">
      <div className="row flex-grow-1">
        <div className="col-xl">
            {player && <h5>{`Player Hp ${player.currentHp}/${player.maxHp}`}</h5>}
            {player && room && <button className="btn btn-danger" onClick={attackBird}> Attack </button>}
            
            {player && room && <button className="btn btn-warning" onClick={defendFromBird}> Defend </button>}
            <img src={shield} alt="defend" className="heroShield"/>
        <img src={hero} alt="Hero" className="hero"/>
        </div>
        <div className="col-xl" >
          <h1></h1>
        </div>
        <div className="col-xl">
            {room && <h5>{`Bird Hp ${room.enemyHp}`}</h5>}
            
            {player && room && room.roomCleared && <button className="btn btn-success" onClick={clickNext}>Claim Victory</button>}
            
            <img src={shield} alt="Defend" className="enemyShield"/>
          <img src={bossbird} alt="Bird" className="bird"/>
        </div>
        </div>
        <br/><br/><br/>
      
    </div>
    );

    

}

export default BossRoom;