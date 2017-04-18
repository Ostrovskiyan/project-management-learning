import React, {Component} from "react";
import {Form, FormControl} from "react-bootstrap";

class AddIssueInput extends Component {

    constructor(props) {
        super(props);
        this.handleFocusEnd = this.handleFocusEnd.bind(this);
    }

    componentDidMount(){
        console.log(this.issueInput);
        this.issueInput.focus();
    }

    handleFocusEnd(event) {
        this.props.handleFocusEnd(this.issueInput.value);
        event.preventDefault();
    }

    render() {
        let avatarSrc = "/images/avatars/example.jpg";
        return (
            <Form inline className="AddIssueForm">
                <img src={avatarSrc} className="AddIssueAvatar"/>
                <input type="text" className="form-control AddIssueInput" ref={(input) => {this.issueInput = input}} onBlur={this.handleFocusEnd}/>
            </Form>
        )
    }
}

export default AddIssueInput;