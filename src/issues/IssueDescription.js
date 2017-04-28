import React, {Component} from "react";

class IssueDescription extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {issue} = this.props;
        return (
            <div className="FullHeight">
                <div>
                <div>{issue.name}</div>
                <div>Добавить в папку/проект</div>
                </div>
                <div>
                    <div>
                        <input type="checkbox"/>
                    </div>
                    <div>автор: {issue.name}, {issue.creatingDate.getTime()}</div>
                </div>
                <div>Oct 10</div>
                <div>
                    Нажмите, чтобы добавить описание
                </div>
            </div>

        )
    }
}

export default IssueDescription;