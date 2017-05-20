import React, {Component} from "react";
import DropdownInput from "../../general/dropdown-input/DropdownInput";
import {Glyphicon, OverlayTrigger, Tooltip} from "react-bootstrap";
import styles from "./Participants.css";
import SelectUser from "../select-user/SelectUser";

class Participants extends Component {

    render() {
        let {
            addDropdownId,
            participants,
            usersForAdding,
            participantDoubleClickHanlerBuilder,
            onAddParticipant,
            boxStyle,
            withoutNames,
            addParticipantBtnText
        } = this.props;

        let participantElements = participants.map(user => (
            <OverlayTrigger key={user.id} placement="top" overlay={<Tooltip id={`user-tooltip${user.id}`}>Use double click for remove this user</Tooltip>}>
                <div className={styles.Participant}
                     onDoubleClick={participantDoubleClickHanlerBuilder(user.id)}>
                    <img alt="executor" src={user.avatar}/>
                    <span>{!withoutNames ? user.name : ""}</span>
                </div>
            </OverlayTrigger>
        ));

        return (
            <div className={`${styles.Box} ${boxStyle}`}>
                {participantElements}
                <DropdownInput id={addDropdownId}
                               toggle={() => (
                                   <div className={styles.AddParticipant }>
                                       <Glyphicon glyph="glyphicon glyphicon-plus"/>
                                       <span>{participantElements.length === 0 ? addParticipantBtnText : ""}</span>
                                   </div>
                               )}
                               contentProps={{
                                   users: usersForAdding,
                               }}
                               onSubmit={onAddParticipant}
                               content={SelectUser}/>
            </div>
        )
    }
}

export default Participants;
