class Component {
    constructor(container) {
        this.container = container
    }

    add(child) {
        if (!(child instanceof Component))
            throw new TypeError('child is not a Component')

        this.container.appendChild(child.container)
    }

    setText(text) {
        if (typeoftext != 'string')
            throw new TypeError('Text is not a string')

        this.container.innerText = text
    }

    setBackgroundColor(color) {
        if(typeof color != 'string')
            throw new TypeError('color is not a string')

        this.container.style.setBackgroundColor = backgroundColor
    }
}