import PropTypes from 'prop-types';
import React from 'react';
import { sizes } from 'Helpers/Props';
import Modal from 'Components/Modal/Modal';
import EditQualityProfileModalContentConnector from './EditQualityProfileModalContentConnector';

function EditQualityProfileModal({ isOpen, onModalClose, ...otherProps }) {
  return (
    <Modal
      isOpen={isOpen}
      size={sizes.EXTRA_LARGE}
      onModalClose={onModalClose}
    >
      <EditQualityProfileModalContentConnector
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

EditQualityProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default EditQualityProfileModal;
