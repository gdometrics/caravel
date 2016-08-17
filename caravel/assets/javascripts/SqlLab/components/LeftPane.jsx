import React from 'react';
import { Alert, Button, Label } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import QueryLink from './QueryLink';

import 'react-select/dist/react-select.css';

const LeftPane = (props) => {
  let queryElements;
  if (props.workspaceQueries.length > 0) {
    queryElements = props.workspaceQueries.map((q) => <QueryLink query={q} />);
  } else {
    queryElements = (
      <Alert bsStyle="info">
        Use the save button on the SQL editor to save a query into this section for
        future reference
      </Alert>
    );
  }
  return (
    <div className="panel panel-default LeftPane">
      <div className="panel-heading">
        <h6 className="m-r-10">
          <i className="fa fa-flask" />
          SQL Lab <Label bsStyle="danger">ALPHA</Label>
        </h6>
      </div>
      <div className="panel-body">
        <div>
          <h6>
            <span className="fa-stack">
              <i className="fa fa-database fa-stack-lg"></i>
              <i className="fa fa-search fa-stack-1x"></i>
            </span> Saved Queries
          </h6>
          <div>
            {queryElements}
          </div>
          <hr />
          <Button onClick={props.actions.resetState.bind(this)}>
            Reset State
          </Button>
          <Button
            onClick={props.actions.addAlert.bind(this, {
              msg: 'This info alert is a demo alert',
              bsStyle: 'info',
            })}
          >
            Add Alert
          </Button>
        </div>
      </div>
    </div>
  );
};

LeftPane.propTypes = {
  workspaceQueries: React.PropTypes.array,
  actions: React.PropTypes.object,
};

LeftPane.defaultProps = {
  workspaceQueries: [],
};

function mapStateToProps(state) {
  return {
    workspaceQueries: state.workspaceQueries,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftPane);
