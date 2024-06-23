
// NEW TYPE STATIC HTML ELEMENT
class HelloWorld extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const h1 = document.createElement('h1')

        h1.innerText = 'Hello, World'
        this.innerText = ''

        this.appendChild(h1)

        h1.style.backgroundColor = 'DarkSalmon'
        h1.style.color = 'White'
    }
}

window.customElements.define('hello-world', HelloWorld)

class HelloTo extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const h1 = document.createElement('h1')

        h1.innerText = 'Hello ' + this.innerText + '!'
        this.innerText = ''

        h1.style.backgroundColor = 'orange'
        
        this.appendChild(h1)

    }
}

window.customElements.define('hello-to', HelloTo)

class HelloTo2 extends HTMLElement {
    constructor() {
        super()
    }


    connectedcallback() {
        const h1 = document.createElement('h1')

        const name = this.getAttribute('name')

        h1.innerText = `Hello, ${name}!`

        this.appendChild(h1)
    }
}

window.customElements.define('hello-to2', HelloTo2)