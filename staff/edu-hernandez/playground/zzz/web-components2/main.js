/* </> < >< > < > CREATE CLASS (COMPONENT ->container) < > </> */
class Component {
    constructor(container) {
        this.container = container // this(-> body).container(-> component)
    }

    /* -- Create ADD METHOD -- */
    add(child) { // child it'll be the new add method, named to use in Component
        if (!(child instanceof Component)) // Validation: child is an instance of Component
            throw new TypeError('child is not a Component') // TypError: Type of file error 

        this.container.appendChild(child.container) // create child from Component
    }

    /* -- Create TEXT METHOD -- */
    setText(text) { // Text it'll be the new setText method
        if (typeof text !== 'string')
            throw new TypeError('text is not a string') // Validation when it´ll be used text method

        this.container.innerText = text
    }

    /* -- Create BACKGROUNDCOLOR METHOD -- */
    setBackgroundColor(color) { // name color expected passed as argument
        if (typeof backgroundColor !== 'string') // typeof determines type of variable
            throw new TypeError('color is not a string')

        this.container.style.backgroundColor = color
    }

    /* -- Create COLOR METHOD -- */
    setColor(color) {
        if (typeof color !== 'string')
    throw new TypeError('color is not a string')

        this.container.style.color = color

    }
}

/* </> < >< > < > ADD COMPONENTS AND ITEMS < > </> */

const view = new Component(document.body)
view.setBackgroundColor('grey') // color passed as parameter

const colorList = new Component(document.createElement('ul'))

/* -- Create List Item -- */
const redColorItem = new Component(document.createElement('li'))
redColorItem.setText('Red')
redColorItem.setColor('tomato')
colorList.add(redColorItem)

/* -- Create List Item (blue) -- */
const blueColorItem = new Component(document.createElement('li'))
blueColorItem.setText('Blue')
blueColorItem.setColor('dodgerblue')
colorList.add(blueColorItem)

/* -- Create List Item -- */
const yellowColorItem = new Component('li')
yellowColorItem.setText('Yellow')
yellowColorItem.setColor('gold')
colorList.add(yellowColorItem)

view.add(colorList) // Added to view(->body)