import { useEffect, useRef, useState } from "react"
import DataList from "./DataList"

export default  function ItemForm({suppliers,currentSubject,refreshTables,url}){

    const [id,setId] = useState("")
    const [itemName,setItemName] = useState("")
    const [catagory,setCatagory] = useState("")
    const [supplier,setSupplierName] = useState("")
    const [incidentLevel,setincidentLevel] = useState("")
    useEffect(()=>{
        if(currentSubject ){
            setId(currentSubject.id)
            setItemName(currentSubject.main)
            setCatagory(currentSubject.catagory)
            setSupplierName(currentSubject.supplier)
            setincidentLevel(currentSubject.incidet)
        }
        
    },[])

    const onSubmit = async(e) => {
        e.preventDefault()
        const data ={
            "itemName":itemName,
            "catagory":catagory,
            "supplier":supplier,
            "incidentLevel":incidentLevel
        }
        const updating = Object.entries(currentSubject).length !== 0

        const link = url+"/" + ( updating ? `update_item/${id}` : "create_item" )
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
            
            const link = `${url}/delete_item/${id}`
            const options ={
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
        <form onSubmit={e => onSubmit(e)}>
            <label htmlFor="id">Id:</label><br></br>
            <input className="bg-steel-blue-100 p-1 rounded-md  focus:bg-steel-blue-300 my-2 hover:cursor-not-allowed" type="input" id="id"value={id} disabled></input>
            <br></br>
            <label htmlFor="itemName">Item Name:</label>
            <br></br>
            <input className="bg-steel-blue-100 p-1 rounded-md  focus:bg-steel-blue-300 my-2" type="input" id="itemName"  value={itemName} onChange={e => setItemName(e.target.value)} ></input>
            <br></br>
            <label htmlFor="catagory">Catagory:</label>
            <br></br>
            <input className="bg-steel-blue-100 p-1 rounded-md  focus:bg-steel-blue-300 my-2 disabled:cursor-not-allowed" type="input" id="catagory" list="catagoryList" value={catagory}  disabled></input>
            {/* <DataList id = {"catagoryList"} list={catagories}/> */}

            <br></br>
            <label htmlFor="supplier">Supplier:</label>
            <br></br>
            <input className="bg-steel-blue-100 p-1 rounded-md  focus:bg-steel-blue-300 my-2" type="input" id="supplier" list="supplierList" value={supplier} onChange={e => setSupplierName(e.target.value)} ></input>
            <DataList id = {"supplierList"} list={suppliers}/>
            <br></br>
            
            <label htmlFor="incidentLevel">Incident Level:</label>
            <br></br>
            <input className="bg-steel-blue-100 p-1 rounded-md  focus:bg-steel-blue-300 my-2" type="Number" id="incidentLevel" value={incidentLevel} onChange={e => setincidentLevel(e.target.value)} ></input>
            <br></br>
            <button className="flex-initial bg-steel-blue-500  px-3 py-2 mx-2.5 my-2 text-white rounded-md hover:rounded-lg    hover:bg-steel-blue-600" >Save</button>
            <button className="flex-initial bg-steel-blue-500  px-3 py-2 mx-2.5 my-2 text-white rounded-md hover:rounded-lg    hover:bg-steel-blue-600" onClick={e => onDelete(e)}>Delete</button>
        </form>

    )
}