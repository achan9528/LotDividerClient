const InputGroup = (props) =>{
    const changeHandler = (e)=>{
        props.changeHandler(e.target.value);
    }
    return (
        <div>
            <label>{props.label}</label>
            <input name={props.name} onChange={(e)=>{changeHandler(e)}}></input>
        </div>
    )
}

export default InputGroup