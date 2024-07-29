import { useEffect } from "react"

export default function TableElement({id,columns,items,handleTableClick,handleAdd}){
    
    return(
        <div className="flex flex-col overflow-y-auto ">{(<> <div><button className="flex-initial bg-steel-blue-500  px-3 py-1.5 mx-2.5 my-1 text-white rounded-md hover:rounded-lg    hover:bg-steel-blue-600" onClick={() => handleAdd(id)}>Add</button></div>
        <table  key={id} >

            <thead className="bg-steel-blue-500  text-slate-100 " >
                <tr>
                    {
                        columns.map(row => (
                            <th className="min-w-12" key={row[1]}> {row[0]}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                    {
                        items.map((item) =>(
                            <tr className="bg-steel-blue-200 hover:bg-steel-blue-300 hover:cursor-pointer" key={item.id} onClick={() => handleTableClick(id,item)}>
                                <td>{item.id}</td>                     
                                <td>{item.main}</td>
                            </tr>

                        )
                        )
                    }
            </tbody>
        </table></>)}
            
        </div >
    )
    
      
}

