import React, {Component} from "react";
import styles from "../Issues.css";
import IssueStatusDropdown from "../../components/issue-status-dropdown/IssueStatusDropdown";

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
        return (
            <IssueStatusDropdown id="issue-status-dropdown"
                                 wrapperStyle={styles.MarkSuccessWrapper}
                                 button={() => (
                                     <div onMouseEnter={this.handleShowTooltip}
                                          onMouseLeave={this.handleHideTooltip}>
                                         <div className={`${styles.IssuesStatusTooltip} ${showTooltip ? "" : styles.NotDisplayed}`}>
                                             <span>Отметить задачу как завершена</span>
                                         </div>
                                         <div className={styles.IssueStatus}/>
                                     </div>
                                 )}/>
        )
    }
}

export default DescriptionStatusDropdown;
