const { Component } = React

class Footer extends Component {
    constructor() {
        super()
    }

    render() {
        return <footer className="footer">
            <button className="add_post_button">
                ＋
            </button>
        </footer>
    }
}

export default Footer