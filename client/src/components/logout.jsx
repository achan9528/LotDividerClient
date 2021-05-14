export const LogoutLink = (props) => {
    return(
        <button onClick={e=>props.setToken('')}>Logout</button>
    )
}

export default LogoutLink