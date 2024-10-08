import { useEffect, useState } from "react";
import LogTable from "./LogTable";
import {  useOutletContext } from "react-router-dom";

export default function LogPage({url}){

    const [logs,setLogs] = useState([])
    const [currentSubject,setCurrentSubject]=useState("")

    const context = useOutletContext()
    const link = url
    useEffect(()=>{fetchLog()},[])

    const fetchLog =async() =>{
        const url = link + "/logs"
        const response = await fetch(url)
        if(response.status !== 200 && response.status !== 201){
            const data = await response.json()
            alert(data.message)
        }
        const data = await response.json()
        setLogs(data)
    }

    const handleClick = async(log)=>{
        const url = `${link}/delete_log/${log.id}`

        const options ={
            method:"DELETE"
                }
        const response = await fetch(url,options)
        if(response.status !== 200 && response.status !== 201){
            const data = await response.json()
            alert(data.message)
        }
        const data = await response.json()
        fetchLog()
    }
    return(
    <LogTable logs={logs} handleClick={handleClick} />
    )
}