import hero from '../images/player-hero.png'
import bird from '../images/lvl1bird.png'
import './inventory.css'
import {Link} from 'react-router-dom'
import {gsap} from 'gsap';
import {useEffect} from 'react';



function ViewInventoryNC(){
  
  useEffect(()=>{
    gsap.from(".theTable",{opacity:0,duration:1})
    
  
  },[]);
    return(
      <div className="bg">
        <div className="container-fluid d-flex h-100 flex-column">
      <div className="row flex-grow-1">
        <div className="col-xl">
        <button className="btn btn-danger" disabled> Fight </button>
            <br/>
            <button className="btn btn-warning" disabled> Examine Room </button>
            <br/>
            <button className="btn btn-primary" disabled> Inventory </button>
        <img src={hero} alt="Hero" className="hero"/>
        
        </div>
        <div className="col-xl" >
          <div className="theTable">
          <table>
            <thead>
              <tr>
                <th >Lvl</th>
                <th >Weapon</th>
                <th >Armor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                  <td><h5>Weapon 1</h5>
                      <button className="btn btn-success">Equip</button> {/*<button className="btn btn-info">Unequip</button><button className="btn btn-secondary" disabled>Not Owned</button>*/}
                  </td>
                  <td><h5>Armor 1</h5>
                      <button className="btn btn-success">Equip</button> {/*<button className="btn btn-info">Unequip</button><button className="btn btn-secondary" disabled>Not Owned</button>*/}
                  </td>
              </tr>
              
              <tr>
                <th>1</th>
                  <td><h5>Weapon 2</h5>
                      <button className="btn btn-success">Equip</button> {/*<button className="btn btn-info">Unequip</button><button className="btn btn-secondary" disabled>Not Owned</button>*/}
                  </td>
                  <td><h5>Armor 2</h5>
                      <button className="btn btn-success">Equip</button> {/*<button className="btn btn-info">Unequip</button><button className="btn btn-secondary" disabled>Not Owned</button>*/}
                  </td>
              </tr>
              
              <tr>
                <th>1</th>
                  <td><h5>Weapon 1</h5>
                      <button className="btn btn-success">Equip</button> {/*<button className="btn btn-info">Unequip</button><button className="btn btn-secondary" disabled>Not Owned</button>*/}
                  </td>
                  <td><h5>Armor 1</h5>
                      <button className="btn btn-success">Equip</button> {/*<button className="btn btn-info">Unequip</button><button className="btn btn-secondary" disabled>Not Owned</button>*/}
                  </td>
              </tr>
            </tbody>
          </table>
          <Link to="/nonCombatGameInterface" className="btn btn-danger">Cancel</Link>
          </div>
        </div>
        <div className="col-xl">
            <div>Bird Hp</div>
          <img src={bird} alt="Bird" className="bird"/>
        </div>
        </div>
        <br/><br/><br/>
      
    </div>
    </div>
    );
}

export default ViewInventoryNC;