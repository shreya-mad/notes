import "./NoteSelected.css"
import submit from "../images/submit.png"
import leftarrow from "../images/leftarrow.png"
import backgroundimg from "../images/backgroundimg.png"
import lock from "../images/lock.png"
import { useEffect, useState } from "react"
import { montharr } from "../Constant"
function NoteSelected({groupdata, groupnumber, setgroupdata, noteorselected, setnoteorselected}){    
    const[text, settext] = useState("")
    function setnote(){
        // CREATING MINUTE FORMAT
        let hour = new Date().getHours();
        let minute = new Date().getMinutes()
        let ampm = hour >= 12 ? "Pm" : "Am";
        hour = hour % 12
        hour = hour ? hour : 12;
        minute = minute < 10 ? "0" + minute : minute
        let temptime = hour + ":" + minute + " " + ampm
        // CREATING DATE FORMAT
        let date = new Date().getDate()
        let month = new Date().getMonth()
        let yyyy = new Date().getFullYear();
        let tempdate = date + " " + montharr[month] + " " + yyyy
        // SETTING NOTE IN GROUPDATA
        groupdata[groupnumber].notesarr.push({time : temptime, datemonth : tempdate, data : text})
        setgroupdata([...groupdata])
        // RESETING TEXT
        settext("")
    }
    useEffect(()=> {
        localStorage.setItem("groupdata", JSON.stringify(groupdata))
    }, [groupdata[groupnumber]?.notesarr])

    return groupnumber != null? (
        <div className="selectednote-cont" style={noteorselected ? {display:"none"}:{display:"flex"}}>
           <div className="top">
            <img src={leftarrow} alt="" onClick={()=>setnoteorselected(true)}/>
                <div className="group">
                    <div className="groupicon">
                        <img src={groupdata[groupnumber]?.groupcolor} alt="" />
                        <h3>{groupdata[groupnumber]?.groupname.slice(0, 2).toUpperCase()}</h3>
                    </div>
                    <div className="groupname">{groupdata[groupnumber]?.groupname}</div>
                </div>
           </div>
           <div className="middle">
            {
                groupdata[groupnumber].notesarr.map(note => {
                    return(
                        <div className="note">
                            <div className="notetiming">
                                <p style={{margin: '0px'}}>{note?.time}</p>
                                <p style={{margin: '0px'}}>{note?.datemonth}</p>
                            </div>
                            <div className="notedetail">
                                {note?.data}
                            </div>
                        </div>
                    )
                })
            }
           </div>
           <div className="bottom">
            <img src={submit} alt="" onClick={setnote} style={{cursor:"pointer"}}
            />
            <textarea placeholder="Enter your text here..........."
            onChange={
                (e)=>{
                    if(e.target.value.charCodeAt(0) != 10) settext(e.target.value)
                }
            
            } value={text}
            onKeyDown={(e) =>{
                    if(e.key === "Enter"){
                        setnote()
                    } 
                }
            }
            />
           </div>
        </div>
    )
    :
    (
        <div className="background-cont" style={{display:"none"}}>
            <img src={backgroundimg} alt="" />
            <h2>Pocket Notes</h2>
            <p>Send and receive messages without keeping your phone online.
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
            <div>
                <img src={lock} alt="" />
                <span>end-to-end encrypted</span>
            </div>
        </div>
    )
}

export default NoteSelected;