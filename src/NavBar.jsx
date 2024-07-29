import { Link, Outlet } from "react-router-dom";

export default function CrudButtons({url}){

    return(<div className="flex flex-col ">
            <nav className='flex flex-row justify-end mb-3.5 bg-steel-blue-300'>
            <button className="flex-initial bg-steel-blue-500  px-6 py-2 mx-2.5 my-1 text-white rounded-md hover:rounded-lg    hover:bg-steel-blue-600  hover:cursor-not-allowed " onClick={() => console.log("suppliers pressed") }>notifications</button>
            <Link to="/admin/config" ><button className="flex-initial bg-steel-blue-500 pd px-6 py-2 mx-2.5 my-1 text-white rounded-md hover:rounded-lg  hover:bg-steel-blue-600 #517bbd  " onClick={() => console.log("rooms pressed") }>settings</button></Link>
            </nav>
            <Outlet  />
        </div>
    )
}