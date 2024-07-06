const { Component } = React
// const Component = React.Component

class Image extends Component {
    constructor() {
        super()
        this.state = {url: ''}
    }

    setUrl(url) {
        this.state({ url })
    }
    render() {
        return (<img src={this.state.url} alt="" />)
    }
}

export default Image