import Button from 'react-bootstrap/Button'
export const LogoutLink = (props) => {
    return(
        <Button onClick={e=>props.setToken('')}>Logout</Button>
    )
}

export default LogoutLink