import React, {Component} from "react";
import styles from "./AddIssue.css";
import {connect} from "react-redux";
import AddIssueInput from "./AddIssueInput";
import ImmediateInput from "../../general/immediate-input/ImmediateInput";
import {createIssue} from "../../actions/issues";

class AddIssue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked || false
        };
    }

    handleAddIssue = (issueName) => {
        let {
            token,
            dispatch,
        } = this.props;
        dispatch(createIssue(issueName, token));
    };

    render() {
        let {
            avatar,
            activeStyle,
            inactiveStyle,
        } = this.props;
        return <ImmediateInput activeComponent={AddIssueInput}
                               activeProps={{
                                   userAvatar: avatar,
                                   formStyle: activeStyle || "",
                               }}
                               inactiveStyle={`${styles.NewTask} ${inactiveStyle || ""}`}
                               glyphStyle={styles.NewTaskPlus}
                               onSubmit={this.handleAddIssue}
                               text="Новая задача"/>;
    }
}

function mapStateToProps(state) {
    return {
        avatar: state.profile.user.avatar,
        token: state.profile.token,
    };
}

export default connect(mapStateToProps)(AddIssue);