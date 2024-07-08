function Button({ type, children, onClick }) {
    console.debug('Button -> call')

    return <button className="Button" type={type} onClick={onClick}>{children}</button>
}

export default Button