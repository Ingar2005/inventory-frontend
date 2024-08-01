import { Link, Outlet } from "react-router-dom";

export default function MainButton({url}){
    return(<div className="flex flex-row justify-around items-center flex-wrap p-48">
        <div className="flex aspect-square items-center justify-center">
        <button className=" min-h-64 aspect-square  bg-steel-blue-500 hover:bg-steel-blue-600 hover:cursor-not-allowed">{"Analyse"}</button>
        </div>
        <div className="flex aspect-square items-center justify-center">
        <Link to="stock"><button className=" min-h-64 aspect-square bg-steel-blue-500 hover:bg-steel-blue-600">{"Stock control"}</button></Link>

        </div>


    </div>
    )
}
