const InputGroup = (props) =>{
    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <input id={props.name} name={props.name} value={props.inputValue} onChange={(e)=>{props.stateFunction(e.target.value)}}></input>
        </div>
    )
}

export default InputGroup