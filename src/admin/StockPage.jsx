import { useState, useEffect} from "react"
import StockTable from "./StockTable"
import StockForm from "./stock-control/stock/StockForm"


function StockPage({url}){
    const [stock, setStock] = useState([])
    // states for form
    const [itemId,setItemId] = useState("")
    const [itemName,setItemName] = useState("")
    const [itemLevel,setItemLevel] = useState("")
    const [itemRoomName,setItemRoom] = useState("")
    const [disabled,setDisabled] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    useEffect(() => {onUpdate()},[])

    const onUpdate = () => {
        setDisabled(false)
        fetchStock()
        setItemName("")
        setItemId("")
        setItemLevel("")
        setItemRoom("")
    }
    const fetchStock = async () => {
        try{
            setIsLoading(true)
            const res = await fetch(url+"stock_table")
            const data = await res.json()
            console.log(data,stock)
            setIsLoading(false)
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
            onUpdate()
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
            onUpdate()
        }
        catch(error){
            alert(error)
        }



    }

    function setFormItem(e){
        setItemName(e.item.itemName)
        setItemId(e.item.id)
        setItemLevel(e.item.level)
        setItemRoom(e.item.roomName)
    }


    return(<div className="flex flex-row justify-evenly">
            {isLoading ? (
                <h1> ... </h1>
            ):(   <>     <StockTable stock = {stock} setFormItem ={setFormItem} />
                <StockForm id ={itemId} setId={setItemId} name = {itemName} setName={setItemName}
                                        level ={itemLevel} setLevel ={setItemLevel} roomName = {itemRoomName} setRoom={setItemRoom}
                                        handleStockSubmit ={handleStockSubmit} deleteStock={deleteStock} url={url} disabled={disabled} setDisabled={setDisabled} /></>)}

    </div>
    )

}

export default StockPage
