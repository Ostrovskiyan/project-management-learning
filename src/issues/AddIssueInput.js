import React, {Component} from "react";
import {Form} from "react-bootstrap";

class AddIssueInput extends Component {

    constructor(props) {
        super(props);
        this.handleFocusEnd = this.handleFocusEnd.bind(this);
    }

    componentDidMount(){
        this.issueInput.focus();
    }

    handleFocusEnd(event) {
        this.props.handleSubmit(this.issueInput.value);
        event.preventDefault();
    }

    render() {
        return (
            <Form inline className="AddIssueForm" onSubmit={this.handleFocusEnd}>
                <img src={this.props.userAvatar} className="IssueAvatar"/>
                <input type="text" className="form-control AddIssueInput" ref={(input) => {this.issueInput = input}} onBlur={this.props.handleFocusEnd}/>
            </Form>
        )
    }
}

export default AddIssueInput;