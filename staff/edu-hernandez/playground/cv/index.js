/* </></></> CREATE BODY </></></> */
const view = document.getElementById('body')

/* </></></> CREATE HEADER </></></> */
const header = document.createElement('header') // named created from HTML
header.className = 'header' // className to use in CSS
document.body.appendChild(header) // Inherit from HTML properties 'header'

/* --header elements-- */
    /* -fader- */
const fader = docuemnt.createElement('div')
fader.className = 'fader'
docuemnt.body.appendChild(fader)

    /* -div- */
const userName = document.createElementNS('p')
header.appendChild(userName)



/* </></></> CREATE MAIN </></></> */
const main = document.createElement('main')

/* </></></> CREATE FOOTER </></></> */
const footer = document.getElementsByClassName('footer')