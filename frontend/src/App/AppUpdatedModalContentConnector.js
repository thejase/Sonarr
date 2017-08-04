import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchUpdates } from 'Store/Actions/systemActions';
import AppUpdatedModalContent from './AppUpdatedModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.app.version,
    (state) => state.system.updates,
    (version, updates) => {
      const {
        isPopulated,
        error,
        items
      } = updates;

      return {
        version,
        isPopulated,
        error,
        items
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    dispatchFetchUpdates() {
      dispatch(fetchUpdates());
    },

    onSeeChangesPress() {
      window.location = `${window.Sonarr.urlBase}/system/updates`;
    }
  };
}

class AppUpdatedModalContentConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.dispatchFetchUpdates();
  }

  //
  // Render

  render() {
    const {
      dispatchFetchUpdates,
      ...otherProps
    } = this.props;

    return (
      <AppUpdatedModalContent {...otherProps} />
    );
  }
}

AppUpdatedModalContentConnector.propTypes = {
  dispatchFetchUpdates: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, createMapDispatchToProps)(AppUpdatedModalContentConnector);