 import { useEffect, useState } from 'react';
import './App.css';
import NotePart from './components/NotePart';
import NoteSelected from './components/NoteSelected';
import color1 from "./images/color1.png"
import {colordata} from './Constant';
function App() {
  const[popuptoggle, setpopuptoggle] = useState(false)
  const[groupdata, setgroupdata] = useState(JSON.parse(localStorage.getItem("groupdata")) || [])
  const[groupname, setgroupname] = useState("")
  const[groupcolor, setgroupcolor] = useState(color1)
  const[groupnumber, setgroupnumber] = useState(null)
  const[noteorselected, setnoteorselected] = useState(true)
  let TOP_MIDDLE_TOGGLE = "top";
  function handlemiddle(){
    if(TOP_MIDDLE_TOGGLE == "create") TOP_MIDDLE_TOGGLE = "top"
    else TOP_MIDDLE_TOGGLE = "middle"
  }
  function handletop(){
    if(TOP_MIDDLE_TOGGLE == "middle") setpopuptoggle(true)
    else if(TOP_MIDDLE_TOGGLE == "top") setpopuptoggle(false)
    TOP_MIDDLE_TOGGLE = "top"
  }
  function setgroup(){
    if(groupname){
      setgroupdata([...groupdata, {groupname : groupname, groupcolor : groupcolor, notesarr : []}])
    }
    else{
      setgroupdata([...groupdata, {groupname : "New Note", groupcolor : groupcolor, notesarr : []}])
    }
    setgroupname("")
    setgroupcolor(color1)
    TOP_MIDDLE_TOGGLE = "create"
  }
  useEffect(()=>{
    localStorage.setItem("groupdata", JSON.stringify(groupdata))
  }, [groupdata])
  return (
   <div className="main-cont">
      <NotePart setpopuptoggle={setpopuptoggle} popuptoggle={popuptoggle} groupdata = {groupdata}
      setgroupnumber = {setgroupnumber} groupnumber={groupnumber} noteorselected = {noteorselected}
      setnoteorselected = {setnoteorselected}
      />
      <NoteSelected groupdata = {groupdata} groupnumber = {groupnumber} setgroupdata = {setgroupdata}
      noteorselected={noteorselected} setnoteorselected={setnoteorselected}
      />
      <div className='notesmodal-popup-cont' style={popuptoggle ? {}:{display:"none"}} onClick={handletop}>
        <div className='notesmodal-popup' onClick={handlemiddle}>
            <h2>Create New Notes group</h2>
            <div className="groupname-cont">
                <h3>Group Name</h3>
                <input type="text" placeholder="Enter your group name..."
                onChange={(e)=>setgroupname(e.target.value)}
                value={groupname}
                />
            </div>
            <div className="choosecol-cont">
                <h3>Choose colour</h3>
                {
                  colordata.map(color => {
                    return(
                      <img src={color.img} onClick={()=>setgroupcolor(color.img)}></img>
                    )
                  })
                }
            </div>
            <button onClick={setgroup}>Create</button>
        </div>
      </div>
   </div>
  );
}

export default App;
