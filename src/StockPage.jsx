import { useState, useEffect} from "react"
import StockTable from "./StockTable"
import StockForm from "./StockForm"

function StockPage({url}){
    const [stock, setStock] = useState([])
    // states for form
    const [itemId,setItemId] = useState("")
    const [itemName,setItemName] = useState("")
    const [itemLevel,setItemLevel] = useState("")
    const [itemRoomName,setItemRoom] = useState("")


    useEffect(() => {fetchStock()},[])
    const onUpdate = () => {
        fetchStock()
        setItemName("")
        setItemId("")
        setItemLevel("")
        setItemRoom("")
    }
    const fetchStock = async () => {
        try{
            const res = await fetch(url+"/stock_table")
            const data = await res.json()
            setStock(data)
        }
        catch(error){
            console.log("error",error)

        }
    }

    const handleStockSubmit = async(e,updating) =>{
        e.preventDefault()

        const data ={

            itemName,
            "level":itemLevel,
            "roomName":itemRoomName
            
        }
        const link = (url)+"/"+(updating ? `update_stock/${itemId}`:"create_stock")
        const options = {
            method:(updating ? "PATCH":"POST"),
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(link,options)
        if(response.status !== 201 && response.status !==200){
            const message = await response.json()
            alert(message.message)
        }
        else{
            alert("successfull")
            onUpdate()
        }
    }


    const deleteStock = async(e) => {
        e.preventDefault()

        try{
            const options = {
                method:"DELETE"
            }
            const response = await fetch(url+`/delete_stock/${itemId}`, options)
            if(response.status ===200){
                alert("Deleated !")
            }
            else{
                console.error("failed to delete")
            }
            
        }
        catch(error){
            alert(error)
        }
        onUpdate()


    }

    function setFormItem(e){
        setItemName(e.item.itemName)
        setItemId(e.item.id)
        setItemLevel(e.item.level)
        setItemRoom(e.item.roomName)
    }

    
    return(<div className="flex flex-row justify-evenly">
        <StockTable stock = {stock} setFormItem ={setFormItem} />
        <StockForm id ={itemId} setId={setItemId} name = {itemName} setName={setItemName}
        level ={itemLevel} setLevel ={setItemLevel} roomName = {itemRoomName} setRoom={setItemRoom}
        handleStockSubmit ={handleStockSubmit} deleteStock={deleteStock} url={url} />
    </div>
    )

}

export default StockPage