import { useState } from "react"

export default function roomForm({currentSubject,refreshTables,url}){

    const [id,setId] = useState(currentSubject.id || "")
    const [roomName,setRoomName] = useState(currentSubject.main || "")

    const onSubmit = async (e) =>{

        e.preventDefault()

        const data ={
            "roomName":roomName,
        }
        const updating = Object.entries(currentSubject).length !== 0

        const link = url+"/" + ( updating ? `update_room/${id}` : "create_room" )
        const options ={
            method:(updating ? "PATCH":"POST"),
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(link,options)
        if(response.status !==201 &&response.status !==200){
            const data = await response.json()
            alert(data.message)
        }else{
            refreshTables()
        }

    }

    const onDelete = async (e) =>{
        e.preventDefault()

        const link = url+"/delete_room/" +(id)
        const options = {
            method:"DELETE"
        }
        const response = await fetch(link,options)
        if(response.status !==201 &&response.status !==200){
            const data = await response.json()
            alert(data.message)
        }else{
            refreshTables()
        }



    }

    return(
        <form>
            <label htmlFor="id">Id:</label>
            <br />
            <input className="bg-steel-blue-100 p-1 rounded-md  focus:bg-steel-blue-300 my-2 hover:cursor-not-allowed" type="input" id="id" value={currentSubject.id} disabled></input>
            <br />
            <label htmlFor="roomName">Name:</label>
            <br />
            <input className="bg-steel-blue-100 p-1 rounded-md  focus:bg-steel-blue-300 my-2" type="input" id="roomName" value={roomName} onChange={e=>{setRoomName(e.target.value)}}></input>
            <br />
            <button className="flex-initial bg-steel-blue-500  px-3 py-2 mx-2.5 my-2 text-white rounded-md hover:rounded-lg    hover:bg-steel-blue-600" type="submit" onClick={e => onSubmit(e)} >Save</button>
            <button className="flex-initial bg-steel-blue-500  px-3 py-2 mx-2.5 my-2 text-white rounded-md hover:rounded-lg    hover:bg-steel-blue-600" onClick={e => onDelete(e)}>Delete</button>
        </form>
    )
}