import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Measure from 'react-measure';
import { icons, kinds, sizes } from 'Helpers/Props';
import dimensions from 'Styles/Variables/dimensions';
import Icon from 'Components/Icon';
import Button from 'Components/Link/Button';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputHelpText from 'Components/Form/FormInputHelpText';
import QualityProfileItemDragSource from './QualityProfileItemDragSource';
import QualityProfileItemDragPreview from './QualityProfileItemDragPreview';
import styles from './QualityProfileItems.css';

const ITEM_HEIGHT = parseInt(dimensions.qualityProfileItemHeight);
const ITEM_PADDING = parseInt(dimensions.qualityProfileItemDragSourcePadding);

class QualityProfileItems extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      qualitiesHeight: 0,
      qualitiesHeightEditGroups: 0
    };
  }

  //
  // Listeners

  onMeasure = ({ height }) => {
    const editGroups = this.props.editGroups;

    const {
      qualitiesHeight,
      qualitiesHeightEditGroups
    } = this.state;

    const heightState = editGroups ?
      qualitiesHeightEditGroups :
      qualitiesHeight;

    if (heightState !== height) {
      // Add the item height + padding
      const newHeight = height + ITEM_HEIGHT + (ITEM_PADDING * 2);

      if (editGroups) {
        this.setState({
          qualitiesHeightEditGroups: newHeight
        });
      } else {
        this.setState({
          qualitiesHeight: newHeight
        });
      }
    }
  }

  onToggleEditGroupsMode = () => {
    this.props.onToggleEditGroupsMode();
  }

  //
  // Render

  render() {
    const {
      editGroups,
      dropQualityIndex,
      dropPosition,
      qualityProfileItems,
      errors,
      warnings,
      ...otherProps
    } = this.props;

    const {
      qualitiesHeight,
      qualitiesHeightEditGroups
    } = this.state;

    const qualitiesMinHeight = editGroups ? qualitiesHeightEditGroups : qualitiesHeight;
    const isDragging = dropQualityIndex !== null;
    const isDraggingUp = isDragging && dropPosition === 'above';
    const isDraggingDown = isDragging && dropPosition === 'below';

    return (
      <FormGroup size={sizes.EXTRA_SMALL}>
        <FormLabel size={sizes.SMALL}>
          Qualities
        </FormLabel>

        <div>
          <FormInputHelpText
            text="Qualities higher in the list are more preferred. Only checked qualities are wanted"
          />

          {
            errors.map((error, index) => {
              return (
                <FormInputHelpText
                  key={index}
                  text={error.message}
                  isError={true}
                  isCheckInput={false}
                />
              );
            })
          }

          {
            warnings.map((warning, index) => {
              return (
                <FormInputHelpText
                  key={index}
                  text={warning.message}
                  isWarning={true}
                  isCheckInput={false}
                />
              );
            })
          }

          <Button
            className={styles.editGroupsButton}
            kind={kinds.PRIMARY}
            onPress={this.onToggleEditGroupsMode}
          >
            <div>
              <Icon
                className={styles.editGroupsButtonIcon}
                name={editGroups ? icons.REORDER : icons.GROUP}
              />

              {
                editGroups ? 'Done Editing Groups' : 'Edit Groups'
              }
            </div>
          </Button>
          <Measure
            whitelist={['height']}
            includeMargin={false}
            onMeasure={this.onMeasure}
          >
            <div
              className={styles.qualities}
              style={{ minHeight: `${qualitiesMinHeight}px` }}
            >
              {
                qualityProfileItems.map(({ id, name, allowed, quality, items }, index) => {
                  const identifier = quality ? quality.id : id;

                  return (
                    <QualityProfileItemDragSource
                      key={identifier}
                      editGroups={editGroups}
                      groupId={id}
                      qualityId={quality && quality.id}
                      name={quality ? quality.name : name}
                      allowed={allowed}
                      items={items}
                      sortIndex={index}
                      qualityIndex={`${index + 1}`}
                      isInGroup={false}
                      isDragging={isDragging}
                      isDraggingUp={isDraggingUp}
                      isDraggingDown={isDraggingDown}
                      {...otherProps}
                    />
                  );
                }).reverse()
              }

              <QualityProfileItemDragPreview />
            </div>
          </Measure>
        </div>
      </FormGroup>
    );
  }
}

QualityProfileItems.propTypes = {
  editGroups: PropTypes.bool.isRequired,
  dragQualityIndex: PropTypes.number,
  dropQualityIndex: PropTypes.number,
  dropPosition: PropTypes.string,
  qualityProfileItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  errors: PropTypes.arrayOf(PropTypes.object),
  warnings: PropTypes.arrayOf(PropTypes.object),
  onToggleEditGroupsMode: PropTypes.func.isRequired
};

QualityProfileItems.defaultProps = {
  errors: [],
  warnings: []
};

export default QualityProfileItems;
