import React, {Component} from "react";
import styles from "../Projects.css";
import IssueStatusDropdown from "../../components/issue-status-dropdown/IssueStatusDropdown";
import {connect} from "react-redux";
import {filterIssuesByExecutor, filterIssuesByStatus} from "../../actions/filters";
import {issueStatuses} from "../../issues/constants/constants";
import DropdownInput from "../../general/dropdown-input/DropdownInput";
import SelectUser from "../../components/select-user/SelectUser";
import {byId} from "../../util/filters";

const EMPTY_ID = "EMPTY_ID";

class FilterPanel extends Component {

    handleStatusFilterChange = (status) => {
        this.props.dispatch(filterIssuesByStatus(status))
    };

    handleUserFilterChange = (userId) => {
        if(userId !== EMPTY_ID) {
            this.props.dispatch(filterIssuesByExecutor(userId))
        } else {
            this.props.dispatch(filterIssuesByExecutor(undefined))
        }
    };

    render() {
        let {
            withShowLabel,
            withoutExecutorFilter,
            statusFilter,
            users,
            executorFilter,
        } = this.props;

        let executorName = executorFilter ? byId(users, executorFilter).name : "Все";

        users = [...users, {
            id: EMPTY_ID,
            name: "Все",
            isEmpty: true,
        }];

        return (
            <div className={styles.FilterHeader}>
                {
                    withShowLabel ?
                        <div className={styles.FilterShowLabel}>
                            ПОКАЗАТЬ
                        </div>
                        : null

                }
                <IssueStatusDropdown id="filter-status-dropdown"
                                     wrapperStyle={styles.FilterDropdown}
                                     onSelect={this.handleStatusFilterChange}
                                     selectedStatus={statusFilter}
                                     withEmptyStatus={statusFilter}
                                     emptyStatusText={"Любой"}
                                     button={() => (
                                         <div className={styles.FilterText}>
                                             СТАТУС: {statusFilter ? issueStatuses[statusFilter].text : "Любой"}
                                         </div>
                                     )}/>
                {
                    withoutExecutorFilter ? null :
                        <DropdownInput className={styles.FilterDropdown}
                                       id="user-filter"
                                       toggle={() => (
                                           <div className={styles.FilterText}>
                                               ИСПОЛНИТЕЛЬ: {executorName}
                                           </div>
                                       )}
                                       contentProps={{
                                           users: users,
                                       }}
                                       onSubmit={this.handleUserFilterChange}
                                       selectedId={executorFilter || EMPTY_ID}
                                       content={SelectUser}/>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        statusFilter: state.filters.issueStatusFilterProjectView,
        executorFilter: state.filters.issueExecutorFilterProjectView,
    };
}

export default connect(mapStateToProps)(FilterPanel);