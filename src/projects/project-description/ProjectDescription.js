import React, {Component} from "react";
import mainStyles from "../../common/Main.css";
import styles from "../Projects.css";
import DescriptionHeader from "../../components/description-header/DescriptionHeader";

class ProjectDescription extends Component {

    render() {
        let {
            project,
        } = this.props;

        return (
            <div className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.HalfContent} ${mainStyles.WithoutOverflow} ${styles.ProjectDescription} col-xs-5`}>
                <DescriptionHeader headerText={project.name} headerStyle={styles.ProjectDescriptionHeader}/>
            </div>
        );
    }
}

export default ProjectDescription;