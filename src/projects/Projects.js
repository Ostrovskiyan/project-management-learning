import React, {Component} from "react";
import mainStyles from "../common/Main.css";
import {Route, Switch} from "react-router-dom";

class Projects extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return  <Switch>
            {["/projects", "/projects/add"].map(path =>
                <Route exact
                       path={path}
                       key={path}
                 render={props =>
                     <div className={mainStyles.FullHeight}>
                         <div className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.FullContent} col-xs-5`}>
                             Projects
                         </div>
                     </div>
                 }/>)
            }
            <Route exact path="/projects/:id"
                   render={props =>
                        <div className={mainStyles.FullHeight}>
                           <div className={`${mainStyles.FullHeight} ${mainStyles.Content} ${mainStyles.FullContent} col-xs-5`}>
                               Projects
                           </div>
                       </div>
                   }/>
        </Switch>;
    }
}

export default Projects;