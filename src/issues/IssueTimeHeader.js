import React, {Component} from 'react';
import {Badge} from "react-bootstrap";

class IssueTimeHeader extends Component {

    render() {
        let dateLabel = this.props.startDate;
        if (this.props.endDate) {
            dateLabel += (" - " + this.props.endDate);
        }
        return (
            <div className="IssueTimeHeader">
                <span className="IssueTimeHeaderTitle">{this.props.title}</span>
                <span className="IssueTimeHeaderDates">{dateLabel}</span>
                <Badge className="IssueTimeHeaderCount" pullRight>{this.props.issueCount}</Badge>
            </div>
        )
    }
}

export default IssueTimeHeader;
