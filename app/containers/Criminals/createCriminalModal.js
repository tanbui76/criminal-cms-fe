import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeDeviceSelector } from 'containers/App/selectors';
import commonMessage from 'common/messages';
import useGetCriminalForm from './hooks/useGetCriminalForm';
import {
  makeClearFormFieldSelector,
  makeErrorSelector,
  makeIdSelector,
  makeInitialValuesSelector,
} from './selectors';
import messages from './messages';
import { clearFormAction, setFormValues, submitFormAction } from './action';

const stateSelector = createStructuredSelector({
  device: makeDeviceSelector(),
  errors: makeErrorSelector(),
  clearFormField: makeClearFormFieldSelector(),
  initialValues: makeInitialValuesSelector(),
  id: makeIdSelector(),
});

const CreateCriminalModal = ({ onCancel, visible }) => {
  const [width, setWidth] = useState('50%');
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 576) {
        setWidth('100%'); // mobile
      } else if (w < 992) {
        setWidth('75%'); // tablet
      } else {
        setWidth('50%'); // desktop
      }
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const intl = useIntl();
  const dispatch = useDispatch();
  const { errors, device, clearFormField, initialValues, id } =
    useSelector(stateSelector);

  const {
    Form,
    form,
    NameInput,
    AddressInput,
    BirthPlaceInput,
    BirthdateInput,
    StartExecuteDateInput,
    EndExecuteDateInput,
    DoneExecuteDateInput,
  } = useGetCriminalForm({
    formName: 'create-criminals',
    device,
    initialValues: id ? initialValues : {},
    id
  });

  useEffect(() => {
    if (id && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [id, initialValues, form]);

  const onSubmitCreateForm = async () => {
    await form.validateFields();
    const rawValues = form.getFieldsValue();

    const formattedValues = {
      ...rawValues,
      birthdate: rawValues.birthdate?.format('YYYY-MM-DD'),
      startExecuteDate: rawValues.startExecuteDate?.format('YYYY-MM-DD'),
      endExecuteDate: rawValues.endExecuteDate?.format('YYYY-MM-DD'),
      doneExecuteDate: rawValues.doneExecuteDate?.format('YYYY-MM-DD'),
    };
    dispatch(setFormValues(formattedValues));
    dispatch(submitFormAction());
  };

  const onCancelModal = () => {
    onCancel();
    form.resetFields();
  };

  useEffect(() => {
    if (clearFormField) {
      dispatch(clearFormAction());
      if (form) {
        form.resetFields();
      }
      onCancel();
    }
  }, [clearFormField]);

  useEffect(() => {
    if (errors?.length) {
      form.setFields(errors);
    }
  }, [errors]);

  return (
    <Modal
      title={intl.formatMessage(messages.addCriminal)}
      visible={visible}
      onOk={onSubmitCreateForm}
      onCancel={onCancelModal}
      okText={intl.formatMessage(commonMessage.okLabel)}
      cancelText={intl.formatMessage(commonMessage.cancel)}
      width={width}
    >
      <Form>
        <NameInput />
        <AddressInput />
        <BirthPlaceInput />
        <BirthdateInput />
        <StartExecuteDateInput />
        <EndExecuteDateInput />
        <DoneExecuteDateInput />
      </Form>
    </Modal>
  );
};

CreateCriminalModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

export default CreateCriminalModal;
