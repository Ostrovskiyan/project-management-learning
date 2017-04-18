import React, {Component} from 'react';
import {Button, Glyphicon} from "react-bootstrap";

class NewTaskButton extends Component {

    render() {
        return (
            <div>
                <Button bsStyle="link" className="NewTask" onClick={this.props.handleClick}>
                    <Glyphicon glyph="glyphicon glyphicon-plus" className="NewTaskPlus"/>
                    Новая задача
                </Button>
            </div>
        )
    }
}

export default NewTaskButton;