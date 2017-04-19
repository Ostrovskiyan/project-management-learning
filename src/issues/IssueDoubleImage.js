import React, {Component} from "react";

class IssueDoubleImage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span className="IssueDoubleImage">
                <img className="IssueAvatar IssueDoubleImageBottom" src={this.props.bottomAvatar}/>
                <img className="IssueAvatar IssueDoubleImageTop" src={this.props.topAvatar}/>
            </span>
        )
    }
}

export default IssueDoubleImage;