const view = new Component(document.body)
view.setBackgroundColor('black')
view.justifyContent('')
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