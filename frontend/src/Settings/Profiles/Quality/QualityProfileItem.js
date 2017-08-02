import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { icons } from 'Helpers/Props';
import Icon from 'Components/Icon';
import IconButton from 'Components/Link/IconButton';
import CheckInput from 'Components/Form/CheckInput';
import styles from './QualityProfileItem.css';

class QualityProfileItem extends Component {

  //
  // Listeners

  onAllowedChange = ({ value }) => {
    const {
      qualityId,
      onQualityProfileItemAllowedChange
    } = this.props;

    onQualityProfileItemAllowedChange(qualityId, value);
  }

  onCreateGroupPress = () => {
    const {
      qualityId,
      onCreateGroupPress
    } = this.props;

    onCreateGroupPress(qualityId);
  }

  //
  // Render

  render() {
    const {
      editGroups,
      groupId,
      name,
      allowed,
      isDragging,
      connectDragSource
    } = this.props;

    return (
      <div
        className={classNames(
          styles.qualityProfileItem,
          isDragging && styles.isDragging,
        )}
      >
        <label
          className={styles.qualityNameContainer}
        >
          {
            editGroups && !groupId &&
              <IconButton
                className={styles.createGroupButton}
                name={icons.GROUP}
                title="Group"
                onPress={this.onCreateGroupPress}
              />
          }

          {
            !editGroups &&
              <CheckInput
                className={styles.checkInput}
                containerClassName={styles.checkInputContainer}
                name={name}
                value={allowed}
                isDisabled={!!groupId}
                onChange={this.onAllowedChange}
              />
          }

          <div className={!!groupId && styles.qualityName}>
            {name}
          </div>
        </label>

        {
          connectDragSource(
            <div className={styles.dragHandle}>
              <Icon
                className={styles.dragIcon}
                title="Create group"
                name={icons.REORDER}
              />
            </div>
            )
        }
      </div>
    );
  }
}

QualityProfileItem.propTypes = {
  editGroups: PropTypes.bool,
  groupId: PropTypes.number,
  qualityId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  allowed: PropTypes.bool.isRequired,
  sortIndex: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isInGroup: PropTypes.bool,
  connectDragSource: PropTypes.func,
  onCreateGroupPress: PropTypes.func,
  onQualityProfileItemAllowedChange: PropTypes.func
};

QualityProfileItem.defaultProps = {
  // The drag preview will not connect the drag handle.
  connectDragSource: (node) => node
};

export default QualityProfileItem;
