import React, {Component} from "react";
import {Badge} from "react-bootstrap";

class IssueTimeHeader extends Component {

    render() {
        let dateLabel;
        if(this.props.startDate) {
            dateLabel = this.props.startDate;
            if (this.props.endDate) {
                dateLabel += (" - " + this.props.endDate);
            }
            dateLabel = <span className="IssueTimeHeaderDates">{dateLabel}</span>;
        }
        return (
            <div className={`IssueTimeHeader ${this.props.className}`}>
                {this.props.icon}
                <span className="IssueTimeHeaderTitle">{this.props.title}</span>
                {dateLabel}
                <Badge className="IssueTimeHeaderCount" pullRight>{this.props.issueCount}</Badge>
            </div>
        )
    }
}

export default IssueTimeHeader;
