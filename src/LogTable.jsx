export default function LogTable({logs ,handleClick}){
    const findDiff = (after,before) =>{
        const diff = after-before
        const absDiff = Math.abs(diff)

        return (absDiff)
    }
    return(
        <table className="mx-3 overflow-scroll max-h-full">
            <thead className="bg-steel-blue-500  text-slate-100" >
                <tr >
                    <th>id</th>
                    <th>Item</th>
                    <th>Date Time</th>
                    <th>Before</th>
                    <th>After</th>
                    <th>Change</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {logs.map(log =>{
                    
                    const pos = ()=>{
                        var pos = NaN
                        const diff = log.amountAfter-log.amountBefore
                        if(diff < 0){
                            pos = false
                        }
                        else if(diff>0){
                            pos = true
                        }
                        return pos
                    }
                    return(<tr className="bg-steel-blue-200 hover:bg-steel-blue-300 "   key={log.id}>
                    <td>{log.id}</td>
                    <td className="font-bold">{log.itemName}</td>
                    <td>{log.dateTime}</td>
                    <td>{log.amountBefore}</td>
                    <td>{log.amountAfter}</td>
                    <td className= {"bg-steel-blue-300 font-bold "+(pos()==true ? 'text-green-600':'text-red-600')} >{findDiff(log.amountAfter,log.amountBefore)}</td>
                    <td className="flex justify-center items-center"><button className=" bg-steel-blue-500  px-6 py-2 mx-2.5 my-1
                     text-white rounded-md hover:rounded-lg    hover:bg-steel-blue-600 #517bbd" onClick={() => {this.disabled = true;  handleClick(log)}}>Delete</button></td>
                </tr>)})}
            </tbody>
        </table>
    )
}