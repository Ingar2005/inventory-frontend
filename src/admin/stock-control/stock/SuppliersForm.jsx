import { useEffect, useState } from "react"

export default function SuppliersForm({currentSubject,refreshTables,url}){

    const [id,setId] = useState(currentSubject.id||"")
    const [supplierName,setSupplierName] = useState(currentSubject.main || "")
    const [supplierNumber,setSupplierNumber] = useState(currentSubject.supplierContactNum || "")
    const [supplierLead,setSupplierLead] = useState(currentSubject.lead || "")
    const [supplierDaysDeliver,setSupplierDaysDeliver] = useState(currentSubject.daysDeliver || [""])


    const onSubmit = async (e) =>{
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)
        const data ={
            "supplierName":supplierName,
            "supplierNumber":supplierNumber,
            "lead": supplierLead,
            "daysDeliver": supplierDaysDeliver



        }
        const updating = Object.entries(currentSubject).length !== 0
        const link = url+"/" + (updating ? `update_supplier/${id}` : "create_supplier")
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

    const onDelete =async(e)=>{
        var valid =  true
        e.preventDefault()
        if(id ){
            const dependency = await fetch((url+"/link_supplier/" +(id)))
            const list =  await dependency.json()
            if(Object.entries(list).length !== 0 && confirm("The suppliers for existing items will be replaced with generic \n"+list.map(item =>(item.itemName +("\n"))) )){
                valid = true
            }
            else if (Object.entries(list).length !== 0  ){
                valid = false
            }
            if (valid){
                e.preventDefault()
                const link = url+"/delete_supplier/"+(id)
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


        }
    }
    return(
        <form method="post" onSubmit={e => onSubmit(e)}>
            <label htmlFor="id">Id:</label>
            <br />
            <input className="bg-steel-blue-100 p-1 rounded-md  focus:bg-steel-blue-300 my-2 hover:cursor-not-allowed" type="input" id="id" value={id} disabled></input>
            <br />
            <label htmlFor="supplierName">Name:</label>
            <br />
            <input className="bg-steel-blue-100 p-1 rounded-md  focus:bg-steel-blue-300 my-2" type="input" value={supplierName} onChange={e => setSupplierName(e.target.value)} id="supplierName"></input>
            <br />
            <label htmlFor="supplierNumber">Number:</label>
            <br />
            <input className="bg-steel-blue-100 p-1 rounded-md  focus:bg-steel-blue-300 my-2" type="input" value={supplierNumber} onChange={e => setSupplierNumber(e.target.value)} id="supplierNumber"></input>
            <br />
            <label htmlFor="supplierLead" >Lead:</label>
            <br />
            <input className="bg-steel-blue-100 p-1 rounded-md  focus:bg-steel-blue-300 my-2" type="Number" value={supplierLead} onChange={e => setSupplierLead(e.target.value)} id="supplierLead"></input>
            <br />
            <label htmlFor="supplierDaysDeliver">Days Deliver:</label>
            <br />
            <select className="bg-steel-blue-100 disabled:cursor-not-allowed min-w-28" id="supplierDaysDeliver" disabled onChange={e => {
                const options =[...e.target.selectedOptions]
                const values = options.map(option => option.value)
                setSupplierDaysDeliver(values)
            }} defaultValue={supplierDaysDeliver} multiple={true}>
                <option  value={"monday"}  >Monday</option>
                <option value={"tuesday"}>Tuesday</option>
                <option value={"wenesday"}>Wenesday</option>
                <option value={"thursday"}>Thursday</option>
                <option value={"friday"}>Friday</option>
                <option value={"sataday"}>Sataday</option>
                <option value={"sunday"}>Sunday</option>
            </select>
            <br />
            <button className="flex-initial bg-steel-blue-500  px-3 py-2 mx-2.5 my-2 text-white rounded-md hover:rounded-lg    hover:bg-steel-blue-600" type="submit ">Save</button>
            <button className="flex-initial bg-steel-blue-500  px-3 py-2 mx-2.5 my-2 text-white rounded-md hover:rounded-lg    hover:bg-steel-blue-600" onClick={(e) => onDelete(e)}>Delete</button>
        </form>
    )
}