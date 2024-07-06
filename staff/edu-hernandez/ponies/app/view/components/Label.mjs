import Component from '../Component.mjs'

class Label extends Component {
    constructor() {
        super(document.createElement('label'))
    }

    setFor(id) {
        this.container.htmlFor = id
    }

    getFor() {
        return this.props.htmlFor
    }
}

export default Label