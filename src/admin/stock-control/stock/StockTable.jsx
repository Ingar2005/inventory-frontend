import {useEffect} from "react";

function StockTable({stock,setFormItem}){

    return(
        <div className="overflow-y-auto">
        <table className="">
            <thead className="bg-steel-blue-500  text-slate-100 ">
                <tr>
                    <th className="min-w-12">Id</th>
                    <th className="min-w-32">Item Name</th>
                    <th className="min-w-12">Current Level</th>
                </tr>
            </thead>
            <tbody>
                {
                    stock.map((item) => (
                        <tr className="bg-steel-blue-200 hover:bg-steel-blue-300 " key = {item.id} onClick={() => setFormItem({item})}>

                        <td className="">{item.id}</td>
                        <td>{item.itemName}</td>
                        <td>{item.level}</td>

                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    )
}

export default StockTable

