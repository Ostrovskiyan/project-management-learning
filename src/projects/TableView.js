import React, {Component} from "react";
import mainStyles from "../common/Main.css";
import styles from "./Projects.css";
import ProjectMenu from "./components/ProjectMenu";
import FilterPanel from "./components/FilterPanel";
import {Table} from "react-bootstrap";
import moment from "moment";

const DATE_FORMAT = "MMM DD, YYYY";

class TableView extends Component {

    render() {
        let {
            issues,
            headerText,
            currentPath,
            selectedProjectMenuItem,
        } = this.props;

        return (
            <div
                className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.FullContent} ${styles.TableView} col-xs-5`}>
                <div className={styles.GeneralHeader}>
                    {headerText ? headerText : "Проекты"}
                </div>
                <ProjectMenu basePath={currentPath} selectedItem={selectedProjectMenuItem} floatRight/>
                <FilterPanel withShowLabel/>
                <Table className={styles.IssueTable}>
                    <thead>
                        <tr>
                            <th className={styles.Number}/>
                            <th className={styles.Heading}>
                                Заголовок <span className="caret fa-rotate-180"/>
                            </th>
                            <th className={styles.StartDate}>Начало</th>
                            <th className={styles.EndDate}>Срок выполнения</th>
                            <th className={styles.Duration}>Длительность</th>
                            <th className={styles.Status}>Статус</th>
                            <th className={styles.Executors}>Исполнители</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.ProjectRow}>
                            <td/>
                            <td>RTV</td>
                            <td>{moment().format(DATE_FORMAT)}</td>
                            <td>{moment().format(DATE_FORMAT)}</td>
                            <td>11 д.</td>
                            <td/>
                            <td/>
                        </tr>
                        <tr className={styles.IssueRow}>
                            <td>1</td>
                            <td className={styles.IssueName}>
                                <span>&#8870;</span>
                                <span className={styles.Text}>BBCMP_412</span>
                            </td>
                            <td>{moment().format(DATE_FORMAT)}</td>
                            <td>{moment().format(DATE_FORMAT)}</td>
                            <td>1 д.</td>
                            <td>Активна</td>
                            <td>johan doe</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default TableView;