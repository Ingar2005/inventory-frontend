import { useEffect, useState } from "react"
import TableElement from "./TableElement"
import ItemForm from "./ItemForm"
import SuppliersForm from "./SuppliersForm"
import RoomForm from "./RoomForm"

export default function ConfigPage({url}){
    const [items,setItems]= useState([])
    const [suppliers,setSuppliers] = useState([])
    const [rooms,setRooms] = useState([])

    const [isModalOpen,setIsModalOpen] = useState(false)
    const[currentSubject,setCurrentSubject] = useState([])

    const closeModal =() =>{
        setIsModalOpen(false)
        setCurrentSubject([])
    }
    const openAddItemModal =() =>{
        if(isModalOpen ===false) setIsModalOpen("items")
    }

    useEffect(() => {
        fetchItems()
        fetchSuppliers()
        fetchRooms()
    },[currentSubject])

    const fetchItems = async() =>{
        const res = await fetch(url+"/items/data-list")
        const data = await res.json()
        setItems(data)
    }
    const fetchSuppliers = async() =>{
        const res = await fetch(url+"/suppliers/data-list")
        const data = await res.json()
        setSuppliers(data)
    }
    const fetchRooms = async() =>{
        const res = await fetch(url+"/rooms/data-list")
        const data = await res.json()
        setRooms(data)
    }

    const refreshTables =  ()=>{
        closeModal()
    }


    const handleTableClick = (id,item)=> {
        setIsModalOpen(id)
        setCurrentSubject(item)
    }
    const openAddSupplierModal = () => {
        setIsModalOpen("suppliers")
    }
    const openAddRoomModal = ()=>{
        setIsModalOpen("rooms")
    }

    return(
        <div className="flex justify-evenly my-3">

        <TableElement id= {"items"} columns={[["id","id"],["Item Name","main"]]} items={items}
         handleTableClick={handleTableClick} handleAdd={openAddItemModal}/>
         {isModalOpen ==="items" && <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <ItemForm suppliers={suppliers} currentSubject ={currentSubject}
                refreshTables={refreshTables} url={url} />
            </div>
            </div>}
        <TableElement id={"suppliers"} columns={[["id","id"],["Supplier Name", "main"]]} items ={suppliers}
        handleTableClick={handleTableClick} handleAdd={openAddSupplierModal} />
                 {isModalOpen ==="suppliers" && <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <SuppliersForm   currentSubject={currentSubject}
                refreshTables={refreshTables} url={url} />
            </div>
            </div>}
        <TableElement id={"rooms"} columns={[["id","id"],["Room Name","main"]]} items={rooms}
         handleTableClick={handleTableClick} handleAdd={openAddRoomModal} />
                 {isModalOpen ==="rooms" && <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <RoomForm currentSubject={currentSubject} refreshTables={refreshTables} url={url}  />
            </div>
            </div>}
        </div>
    )
}

