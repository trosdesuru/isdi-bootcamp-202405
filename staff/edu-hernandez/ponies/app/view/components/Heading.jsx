import './Heading.css'

function Heading({ level = 1, children, className }) {
    console.debug('Heading -> call')
    const Tag = `h${level}`

    return <Tag className="Heading--3">{children}</Tag>
}

export default Heading