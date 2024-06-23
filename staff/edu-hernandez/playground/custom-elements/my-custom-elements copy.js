
// NEW TYPE STATIC HTML ELEMENT
class HelloWorld extends HTML {
    constructor() {
        super()
    }

    connectedCallback() {
        const h1 = document.createElement('h1')

        h1.innerText = 'Hello, World'

        this.appendChild(h1)

        h1.style.backgorundColor = 'red'
    }
}

window.customElements.define('hello-world', HelloWorld)

class HelloTo extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const h1 = document.createElement('h1')

        h1.innerText = 'Hello to ' + this.innerText + '!'
        this.innerText = ''
    }
}