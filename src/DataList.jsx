
export default function DataList({id,list}){


    return(
        <datalist id={id}>
            {list.map((a) => (
                <option key={a.id}>{a.main}</option>
            ))}
        </datalist>
    )
}
