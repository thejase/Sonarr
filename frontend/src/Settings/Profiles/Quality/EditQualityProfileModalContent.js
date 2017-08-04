import PropTypes from 'prop-types';
import React from 'react';
import { inputTypes, kinds, sizes } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import SpinnerErrorButton from 'Components/Link/SpinnerErrorButton';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import QualityProfileItems from './QualityProfileItems';
import styles from './EditQualityProfileModalContent.css';

function EditQualityProfileModalContent(props) {
  const {
    editGroups,
    isFetching,
    error,
    isSaving,
    saveError,
    qualities,
    item,
    isInUse,
    onInputChange,
    onCutoffChange,
    onSavePress,
    onModalClose,
    onDeleteQualityProfilePress,
    ...otherProps
  } = props;

  const {
    id,
    name,
    cutoff,
    items
  } = item;

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>
        {id ? 'Edit Quality Profile' : 'Add Quality Profile'}
      </ModalHeader>

      <ModalBody>
        {
          isFetching &&
            <LoadingIndicator />
        }

        {
          !isFetching && !!error &&
            <div>Unable to add a new quality profile, please try again.</div>
        }

        {
          !isFetching && !error &&
            <Form
              {...otherProps}
            >
              <div className={styles.formGroupsContainer}>
                <div className={styles.formGroupWrapper}>
                  <FormGroup size={sizes.EXTRA_SMALL}>
                    <FormLabel size={sizes.small}>
                      Name
                    </FormLabel>

                    <FormInputGroup
                      type={inputTypes.TEXT}
                      name="name"
                      {...name}
                      onChange={onInputChange}
                    />
                  </FormGroup>

                  <FormGroup size={sizes.EXTRA_SMALL}>
                    <FormLabel size={sizes.small}>
                      Cutoff
                    </FormLabel>

                    <FormInputGroup
                      type={inputTypes.SELECT}
                      name="cutoff"
                      {...cutoff}
                      values={qualities}
                      helpText="Once this quality is reached Sonarr will no longer download episodes"
                      onChange={onCutoffChange}
                    />
                  </FormGroup>
                </div>

                <div className={styles.formGroupWrapper}>
                  <QualityProfileItems
                    editGroups={editGroups}
                    qualityProfileItems={items.value}
                    errors={items.errors}
                    warnings={items.warnings}
                    {...otherProps}
                  />
                </div>
              </div>
            </Form>

        }
      </ModalBody>

      <ModalFooter>
        {
          id &&
            <div
              className={styles.deleteButtonContainer}
              title={isInUse && 'Can\'t delete a quality profile that is attached to a series'}
            >
              <Button
                kind={kinds.DANGER}
                isDisabled={isInUse}
                onPress={onDeleteQualityProfilePress}
              >
                Delete
              </Button>
            </div>
        }

        <Button
          onPress={onModalClose}
        >
          Cancel
        </Button>

        <SpinnerErrorButton
          isSpinning={isSaving}
          error={saveError}
          onPress={onSavePress}
        >
          Save
        </SpinnerErrorButton>
      </ModalFooter>
    </ModalContent>
  );
}

EditQualityProfileModalContent.propTypes = {
  editGroups: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  qualities: PropTypes.arrayOf(PropTypes.object).isRequired,
  item: PropTypes.object.isRequired,
  isInUse: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCutoffChange: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onDeleteQualityProfilePress: PropTypes.func
};

export default EditQualityProfileModalContent;