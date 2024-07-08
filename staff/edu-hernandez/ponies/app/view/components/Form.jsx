function Form({ onSubmit }) {
    console.debug('Form -> call')

    return <form className="Form" onSubmit={onsubmit}>{children}</form>
}

export default Form