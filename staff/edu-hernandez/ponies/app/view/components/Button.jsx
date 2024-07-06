const { Component } = React
// const Component = React.Component

class Button extends Component {
    constructor() {
        super()

        this.state = {}
    }

    handleOnClick() {
        this.props.onClicked();
    }

    render() {
        return <button
            onClick={this.handleOnClick.bind(this)}
            type={this.props.type}
            className={this.props.className}>
            {this.props.text}
        </button>
    }
}

export default Button