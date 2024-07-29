
export default function WorkerModal({onClose, onSubmit}){
    return(
        <div className="modal">

            <div className="modal-content">
            <span className="close text-5xl" onClick={onClose}>&times;</span>
                <form onSubmit={(e) => onSubmit(e)}>
                    <input className="bg-steel-blue-100 p-3 rounded-md  focus:bg-steel-blue-300 my-2" key={"input"} type="Number"></input>
                    <button className="flex-initial bg-steel-blue-500 pd px-6 py-2 mx-2.5 my-1 text-white rounded-md hover:rounded-lg  hover:bg-steel-blue-600 text-2xl" >save</button>

                </form>
            </div>

        </div>
    )
}