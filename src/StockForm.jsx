import { useEffect, useState } from "react"
import DataList from "./DataList"
import { Link } from "react-router-dom";

function StockForm({name,setName,id,setId,level,setLevel,roomName,setRoom,handleStockSubmit,deleteStock,url}){

    const [itemList,setItemList]= useState([])
    const [roomList,setRoomList] = useState([])
    const [disabled,setDisabled] = useState(false);
    useEffect(()=>{
        fetchItems()
        fetchRooms()
    },[])
    function setLevelFun(e){
        e = Number(e)
        if(isNaN(e) == false){
            setLevel(e)
        }
        else{
            alert("Only Numbers")
        }
    }
    const fetchRooms = async() => {
        try{
            const link =url+"/rooms/data-list"
            const res = await fetch(link)
            const data = await res.json()
            setRoomList(data)
        }
        catch(error){
            console.log("error",error)

        }
    }
    const fetchItems = async() =>{        
        try{
            const link = url+"/items/data-list"
            const res = await fetch(link)
            const data = await res.json()
            setItemList(data)
        }
        catch(error){
            console.log("error",error)

        }
    }
    return(
        <form>
            <div className="flex justify-center">
                <button className="flex-initial bg-steel-blue-500  px-3 py-2  text-white rounded-md hover:rounded-lg    hover:bg-steel-blue-600 #517bbd" disabled={disabled} onClick={(e)=> {setDisabled(true);deleteStock(e)}}>Delete Stock</button>
            </div>
            <br></br>
            <label htmlFor="stockId">Id :</label>
            <br></br>
            <input className="bg-steel-blue-100 p-1 rounded-md  focus:bg-steel-blue-300 my-2" type="input"  name = "stockId" value={id} disabled></input>
            <br></br>
            <label htmlFor="itemName">Item:</label>
            <br></br>
            <input className="bg-steel-blue-100 p-1 rounded-md  focus:bg-steel-blue-300 my-2" id="itemName" list="items-list"type="input" name="itemName" value={name} onChange={e=>setName(e.target.value)}></input><br></br>
            <DataList id ={"items-list"} list ={itemList} />

            <label htmlFor="level">Current Stock:</label>
            <br></br>
            <input className="bg-steel-blue-100 p-1 rounded-md  focus:bg-steel-blue-300 my-2" type="Number" name="level" value={level} onChange={e=> setLevelFun(e.target.value)}></input> <br></br>
            <label htmlFor="room">room:</label>
            <br></br>
            <input className="bg-steel-blue-100 p-1 rounded-md  focus:bg-steel-blue-300 my-2" name="room" list="rooms-list"value={roomName} onChange={e => setRoom(e.target.value)}></input>
            <DataList id = {"rooms-list"} list={roomList}/>
            {/* VALIDATE DURING SUBMITION */}
            <br></br>
            <button  className="flex-initial bg-steel-blue-500  px-3 py-2 mx-2.5 my-1 text-white rounded-md hover:rounded-lg    hover:bg-steel-blue-600 #517bbd" disabled={disabled} onClick={e=> {setDisabled(true); handleStockSubmit(e,false)}}>Add Stock</button>
            <button className="flex-initial bg-steel-blue-500  px-3 py-2 mx-2.5 my-1 text-white rounded-md hover:rounded-lg    hover:bg-steel-blue-600 " disabled={disabled} onClick={e => {setDisabled(true);handleStockSubmit(e,true)}}>Update Stock</button>
            <Link to="config" ><button className="flex-initial bg-steel-blue-500 pd px-6 py-2 mx-2.5 my-1 text-white rounded-md hover:rounded-lg  hover:bg-steel-blue-600 #517bbd  " >Config</button></Link>

        </form>
    )
}

export default StockForm
