/* </> < >< > < > CREATE CLASS (CONSTRUCTOR) < > </> */
class Component {
    constructor(container) {
        this.container = container
    }
}

/* </> < >< > < > CREATE BODY SECTION < > </> */
const view = new Component(document.body) // document.body referenced from 'chrome'
view.container.style.backgroundColor = 'black' // Background Color

/* </> < >< > < > CREATE UNORDERED LIST < > </> */
const colorList = new Component(document.createElement('ul')) // Color List created

    /* -- List Items -- */
const redColorItem = new Component(document.createElement('li'))
redColorItem.innerText = 'red' // Item List Text
redColorItem.container.style.color = 'tomato' // Color Item
colorList.container.appendChild(redColorItem.container) // Need to understand..

const blueColorItem = new Component(document.createElement('li'))
blueColorItem.innerText = 'blue'
blueColorItem.container.style.color = 'dodgerblue'
colorList.container.appendChild(blueColorItem.container)

const yellowColorItem = new Component(document.createElement('li'))
yellowColorItem.innerText = 'gold'
colorList.container.appendChild(yellowColorItem)

/* </> < >< > < >  < > </> */

view.container.appendChild(colorList.container) // 