import { Link } from "react-router-dom";

export default function StockHome({url}){
    return(<div className="flex flex-row justify-around items-center flex-wrap p-48">
        <div className="flex aspect-square items-center justify-center" >        <Link to="live"><button className=" min-h-64 aspect-square bg-steel-blue-500 hover:bg-steel-blue-600">{"stock"}</button></Link>
</div>
        <div className="flex aspect-square items-center justify-center" >        <Link to="logs"><button className=" min-h-64 aspect-square bg-steel-blue-500 hover:bg-steel-blue-600">{"logs"}</button></Link>
</div>
        </div>
    )
}