function Label({id, defaulValue}) {
    console.debug('Label -> call')

    return <Label className="Label" htmlFor={htmlFor}>{children}</Label>
}

export default Label