import "./NotePart.css"
function NotePart({setpopuptoggle, popuptoggle, groupdata, setgroupnumber, groupnumber, setnoteorselected, noteorselected}){
    function noteselectednotehandle(index){
        setgroupnumber(index)
        setnoteorselected(false)
    }
    return(
        <div className="notecat-cont" style={noteorselected ? {display : "flex"} : {display:"none"}}>
            <div className="title">Pocket Notes</div>
            <button onClick={() => setpopuptoggle(!popuptoggle)}>+ Create Notes group</button>
            <div className="group-container">
                {
                    groupdata.map((group, index) => {
                        return (
                            <div className="group" style={groupnumber == index ? {backgroundColor:"#F7ECDC"}:{}} onClick={() => noteselectednotehandle(index)}>
                                <div className="groupicon">
                                    <img src={group.groupcolor} alt="" />
                                    <h3>{group.groupname.slice(0, 2).toUpperCase()}</h3>
                                </div>
                                <div className="groupname">{group.groupname}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default NotePart;