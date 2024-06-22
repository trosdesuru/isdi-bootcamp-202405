
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
        if (typeof text !== 'string')
            throw new TypeError('text is not a string')

        this.container.innerText = text
    }

    setBackgroundColor(color) {
        if (typeof color !== 'string')
            throw new TypeError('color is not a string')

        this.container.style.backgroundColor = color
    }

    setColor(color) {
        if (typeof color !== 'string')
            throw new TypeError('color is not a string')

        this.container.style.color = color
    }

    justifyContent(align) {
        if (typeof align !== 'string')
            throw new TypeError('align is not a string')

        this.container.style.justifyContent = align
    }

    // Added flex-direction option for each List created

    flexDirection(direction) {
        if (typeof direction !== 'string')
            throw new TypeError('direction is not a string')

        this.container.style.flexDirection; direction
    }
}

class List extends Component {
    constructor() {
        super(document.createElement('ul'))
    }

    setStyleType(style) {
        this.container.style.listStyleType = style
    }

    // Added justify Content option for each List created

}

class ListItem extends Component {
    constructor() {
        super(document.createElement('li'))
    }
}

const view = new Component(document.body)
view.setBackgroundColor('black')
view.alignItems('')
view.flexDirection('column')

const colorList = new List // new List()
colorList.setStyleType('square')

const redColorItem = new ListItem
redColorItem.setText('Red')
redColorItem.setColor('tomato')
colorList.add(redColorItem)

const blueColorItem = new ListItem
blueColorItem.setText('Blue')
blueColorItem.setColor('dodgerblue')
colorList.add(blueColorItem)

const yellowColorItem = new ListItem
yellowColorItem.setText('yellow')
yellowColorItem.setColor('gold')
colorList.add(yellowColorItem)

view.add(colorList)