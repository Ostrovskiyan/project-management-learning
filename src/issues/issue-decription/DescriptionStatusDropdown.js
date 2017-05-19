import React, {Component} from "react";
import styles from "../Issues.css";
import IssueStatusDropdown from "../../components/issue-status-dropdown/IssueStatusDropdown";
import {issueStatuses} from "../constants/constants";

class DescriptionStatusDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showTooltip: false,
        }
    }

    handleShowTooltip = (event) => {
        event.preventDefault();
        this.setState({
            showTooltip: true,
        })
    };

    handleHideTooltip = (event) => {
        event.preventDefault();
        this.setState({
            showTooltip: false,
        })
    };

    render() {
        let {
            showTooltip
        } = this.state;
        let {
            selectedStatus,
        } = this.props;
        console.log(selectedStatus);
        return (
            <IssueStatusDropdown id="issue-status-dropdown"
                                 wrapperStyle={styles.MarkSuccessWrapper}
                                 selectedStatus={selectedStatus}
                                 button={() => (
                                     <div>
                                         <div
                                             className={`${styles.IssuesStatusTooltip} ${showTooltip ? "" : styles.NotDisplayed}`}>
                                             <span>Отметить задачу как завершена</span>
                                         </div>
                                         <div onMouseEnter={this.handleShowTooltip}
                                              onMouseLeave={this.handleHideTooltip}
                                              className={`${styles.IssueStatus} ${selectedStatus ? issueStatuses[selectedStatus].style : ""}`}/>
                                     </div>
                                 )}/>
        )
    }
}

export default DescriptionStatusDropdown;
