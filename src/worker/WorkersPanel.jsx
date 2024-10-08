import { useEffect, useState } from "react"
import {createPortal} from 'react-dom'
import WorkerModal from "./WorkerModal"
import { useOutletContext } from "react-router-dom"

export default function WorkersPanel({url}){
    const [rooms,setRooms] = useState([])
    const [room,setRoom] =useState({})
    const roomLength = Object.entries(room).length
    const[table,setTable] = useState([])
    const [currentSubject,setCurrentSubject] = useState({})
    const [status, setStatus] = useState('');
    const [modal,setModal] =useState(false)
    const context = useOutletContext()

    useEffect(() =>{fetchRooms() },[])
    useEffect(()=>{fetchStock() },[room])
    const fetchRooms = async() =>{
        const link = url +("/rooms")
        const response = await fetch (link)
        if(response.status !== 200 && response.status !== 201){
            alert("whoops shouldnt have donw that")
        }
        const data = await response.json()
        setRooms(data)

    }

    const fetchStock = async()=>{
        if(roomLength !== 0){
            const peram  = room.id
            const link  = url +(`/stock/${peram}`)
            const response = await fetch(link)
            const data = await response.json()
            setTable(data)
        }


       }
    const tableClick = (item) => {
        setCurrentSubject(item)

    }
    const onAdd =() =>{
        setStatus("add")
        setModal(true)

    }
    const onMinus = ()=>{
        setStatus("minus")
        setModal(true)
    }
    const onSubmit = async(e) =>{
        e.preventDefault()
        const diffAmount = e.target[0].value
        const currentAmount = currentSubject.level
        var newAmount= -1
        var valid = false
        if (status ==="add"){
            newAmount =(Number(currentAmount)+Number(diffAmount))
            valid = true
        }
        else if (status === "minus"){
            newAmount = (Number(currentAmount)-Number(diffAmount))
            if(newAmount >= 0 ){
                valid = true
            }
            else{
            alert("imposible")

            }
        }
        console.log(newAmount)
        if (valid ===true){
            const data = {

                "itemName":currentSubject.itemName,
                "level":newAmount,
                "roomName":currentSubject.roomName
            }
            const link = url+`/update_stock/${currentSubject.id}`
            const options = {method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            }
            const res = await fetch(link,options)
            if (res.status !== 200 && res.status !== 201){
                const data =await res.json()
                alert(data.message)
            }
            else{


            }
        }
        onUpdate()

    }
    const onUpdate = ()=>{
        setStatus("")
        setModal(false)
        setCurrentSubject({})
        fetchStock()
    }
return(<div className="flex size-full justify-center items-center bg-steel-blue-100">
    <div className="flex justify-center items-center m-10 p-11 size-5/6 rounded-2xl bg-steel-blue-300">
    {(roomLength === 0 ? <table className="table-fixed w-full h-fit" key={"list"}>
            <tbody >
                {rooms.map(room => (<tr className="bg-slate-400 border-2 border-steel-blue-800  text-4xl hover:cursor-pointer hover:bg-steel-blue-500" onClick={() =>{setRoom(room) }} key={room.id}><th className="p-4">{room.roomName}</th></tr>))}
            </tbody>
        </table> :null)
    }
        {(roomLength !== 0 ? (<div className="size-full"><button className="flex-initial bg-steel-blue-500 pd px-6 py-2 mx-2.5 my-1 text-white rounded-md hover:rounded-lg  hover:bg-steel-blue-600 text-2xl" onClick={() => {setRoom({}); setTable([])}}>{"Back"}</button>
        <div className="flex flex-row justify-around items-center ">
        <div className="flex justify-center items-center w-5/12 h-full">
        <table className="size-4/6" key={"lol"}>
            <thead className="bg-steel-blue-500  text-slate-100 ">
                <tr className="table-fixed ">
                    <th >{"Id"}</th>
                    <th>{"Item"}</th>
                    <th>{"count"}</th>
                </tr>
            </thead>
            <tbody className="h-16">
                {table.map(item =>(
                    <tr className="bg-steel-blue-200 hover:bg-steel-blue-400 hover:cursor-pointer text-2xl" onClick={()=>tableClick(item)} key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.itemName}</td>
                        <td>{item.level}</td>
                    </tr>))}
            </tbody>
        </table>
        </div>
        <div className="flex flex-col size-1/6">
        <button className=" aspect-square text-5xl  bg-steel-blue-500  px-3 py-2 mx-2.5 my-1 text-white rounded-md hover:rounded-lg    hover:bg-steel-blue-600 disabled:bg-steel-blue-100
         disabled:text-steel-blue-400 disabled:hover:bg-steel-blue-100 disabled:hover:cursor-not-allowed " disabled={Object.entries(currentSubject).length === 0} onClick={()=>{onAdd()}}>+</button>
        <button className=" aspect-square  text-5xl bg-steel-blue-500  px-3 py-2 mx-2.5 my-1 text-white rounded-md hover:rounded-lg    hover:bg-steel-blue-600 disabled:bg-steel-blue-100
         disabled:text-steel-blue-400 disabled:hover:bg-steel-blue-100 disabled:hover:cursor-not-allowed " disabled={Object.entries(currentSubject).length === 0} onClick={()=>{onMinus()}}>-</button>
            </div>
        </div></div>):null )}
    {modal ? createPortal((<WorkerModal onClose={()=>{setModal(false)
        setCurrentSubject({})
        setStatus("")
    }} onSubmit = {onSubmit}></WorkerModal>),document.body):null}

    </div>

    </div>

    )
}