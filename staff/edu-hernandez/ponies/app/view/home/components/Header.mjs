import Component from '../../Component.mjs'
import Paragraph from '../../components/Paragraph.mjs'
import Button from '../../components/Button.mjs'

import logic from '../../../logic/index.mjs'

class Header extends Component {
    constructor() {
        super(document.createElement('header'))
        this.setClassName('header')

        var userName = new Paragraph
        userName.setClassName('header__user-name')
        this.add(userName)

        try {
            const name = logic.getUserName()

            userName.setText('Hello, ' + name + '!')
        } catch (error) {
            console.error(error.message)

            alert(error.message)
        }

        const logoutButton = new Button
        logoutButton.setClassName('logout-button')
        logoutButton.setText('Logout')
        this.add(logoutButton)

        logoutButton.onClick(function () {
            try {
                logic.logoutUser()

                location.href = '../login'
            } catch (error) {
                alert(error.message)
            }
        })
    }
}

export default Header