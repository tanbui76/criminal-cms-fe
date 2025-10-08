import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Select, message, Radio } from 'antd';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeDeviceSelector } from 'containers/App/selectors';
import commonMessage from 'common/messages';
import {
  makeClearFormFieldSelector,
  makeErrorSelector,
  makeIdSelector,
  makeInitialValuesSelector,
  makeProfileTypesSelector,
} from './selectors';
import messages from './messages';
import {
  clearFormAction,
  setFormValues,
  submitFormAction,
  queryProfileTypesAction,
} from './action';

const { TextArea } = Input;

const stateSelector = createStructuredSelector({
  device: makeDeviceSelector(),
  errors: makeErrorSelector(),
  clearFormField: makeClearFormFieldSelector(),
  initialValues: makeInitialValuesSelector(),
  id: makeIdSelector(),
  profileTypes: makeProfileTypesSelector(),
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
  const { errors, clearFormField, initialValues, id, profileTypes } =
    useSelector(stateSelector);

  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      dispatch(queryProfileTypesAction());
    }
  }, [visible, dispatch]);

  useEffect(() => {
    if (id && initialValues) {
      const formValues = { ...initialValues };

      if (formValues.profileTypes && Array.isArray(formValues.profileTypes)) {
        formValues.profileTypeIds = formValues.profileTypes.map(
          (item) => item.id,
        );
        delete formValues.profileTypes;
      }

      if (
        formValues.profileTypeIds &&
        Array.isArray(formValues.profileTypeIds)
      ) {
        if (
          formValues.profileTypeIds.length > 0 &&
          typeof formValues.profileTypeIds[0] === 'object'
        ) {
          formValues.profileTypeIds = formValues.profileTypeIds.map(
            (item) => item.id,
          );
        }
      }

      form.setFieldsValue(formValues);
    } else {
      form.resetFields();
    }
  }, [id, initialValues, form]);

  const onSubmitCreateForm = async () => {
    try {
      await form.validateFields();
      const rawValues = form.getFieldsValue();

      const formattedValues = {
        ...rawValues,
        gender: Boolean(parseInt(rawValues.gender)),
        birthdate: rawValues.birthdate?.format('YYYY-MM-DD'),
        startExecuteDate: rawValues.startExecuteDate?.format('YYYY-MM-DD'),
        endExecuteDate: rawValues.endExecuteDate?.format('YYYY-MM-DD'),
        doneExecuteDate: rawValues.doneExecuteDate?.format('YYYY-MM-DD'),
      };
      console.log('Form validation error:', formattedValues);

      dispatch(setFormValues(formattedValues));
      dispatch(submitFormAction());
    } catch (error) {
      console.error('Form validation error:', error);
      message.error('Vui lòng kiểm tra lại thông tin');
    }
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
      // Set validation errors to form
      form.setFields(errors);

      // Show error message
      const errorMessages = errors
        .map((error) => error.errors?.[0])
        .filter(Boolean);
      if (errorMessages.length > 0) {
        message.error(errorMessages[0]);
      }
    }
  }, [errors, form]);

  // Get results array from profileTypes object
  const profileTypesArray = profileTypes?.results || [];

  // Convert profile types to options format with safety check
  const profileTypeOptions = profileTypesArray.map((type) => ({
    value: type.id,
    label: type.name,
  }));

  // Determine modal title based on edit mode
  const modalTitle = id
    ? intl.formatMessage(messages.editCriminal)
    : intl.formatMessage(messages.addCriminal);

  return (
    <Modal
      title={modalTitle}
      visible={visible}
      onOk={onSubmitCreateForm}
      onCancel={onCancelModal}
      okText={intl.formatMessage(commonMessage.okLabel)}
      cancelText={intl.formatMessage(commonMessage.cancel)}
      width={width}
      bodyStyle={{ maxHeight: '60vh', overflowY: 'auto' }}
      style={{ top: '5vh' }}
      centered
    >
      <Form form={form} layout="vertical" initialValues={{ gender: 1 }}>
        <Form.Item
          label={intl.formatMessage(messages.fullName)}
          name="name"
          rules={[
            {
              required: true,
              message: intl.formatMessage(messages.requiredFullNameField),
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage(messages.fullNamePlaceHolder)}
            style={{ padding: '0 12px' }}
          />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage(messages.genderColumn)}
          name="gender"
          rules={[
            {
              required: true,
            },
          ]}
        >
          {/* <Input
            placeholder={intl.formatMessage(messages.challengeTimePlaceHolder)}
            style={{ padding: '0 12px' }}
          /> */}
          <Radio.Group
            name="gender"
            options={[
              { value: 1, label: 'Nam' },
              { value: 0, label: 'Nữ' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage(messages.nationColumn)}
          name="ethnicity"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage(messages.nationPlaceHolder)}
            style={{ padding: '0 12px' }}
          />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage(messages.descriptionColumn)}
          name="description"
          rules={[
            {
              required: true,
              message: intl.formatMessage(messages.requiredDescriptionField),
            },
          ]}
        >
          <TextArea
            placeholder={intl.formatMessage(messages.descriptionPlaceHolder)}
            rows={3}
            showCount
            maxLength={500}
            className="ant-input-text-area"
          />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage(messages.challengeTimeColumn)}
          name="challengeTime"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage(messages.challengeTimePlaceHolder)}
            style={{ padding: '0 12px' }}
          />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage(messages.caseNoColumn)}
          name="caseNo"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage(messages.caseNoPlaceHolder)}
            style={{ padding: '0 12px' }}
          />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage(messages.judgeNoColumn)}
          name="judgeNo"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage(messages.judgeNoPlaceHolder)}
            style={{ padding: '0 12px' }}
          />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage(messages.addressColumn)}
          name="address"
          rules={[
            {
              required: true,
              message: intl.formatMessage(messages.requiredAddressField),
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage(messages.addressHolder)}
            style={{ padding: '0 12px' }}
          />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage(messages.birthplaceColumn)}
          name="birthplace"
          rules={[
            {
              required: true,
              message: intl.formatMessage(messages.requiredBirthPlaceField),
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage(messages.birthPlaceHolder)}
            style={{ padding: '0 12px' }}
          />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage(messages.birthdateColumn)}
          name="birthdate"
          rules={[
            {
              required: true,
              message: intl.formatMessage(messages.requiredBirthDateField),
            },
          ]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage(messages.startExecuteDateColumn)}
          name="startExecuteDate"
          rules={[
            {
              required: true,
              message: intl.formatMessage(
                messages.requiredStartExecuteDateField,
              ),
            },
          ]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage(messages.endExecuteDateColumn)}
          name="endExecuteDate"
          rules={[
            {
              required: true,
              message: intl.formatMessage(messages.requiredEndExecuteDateField),
            },
          ]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage(messages.doneExecuteDate)}
          name="doneExecuteDate"
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage(messages.profileTypesColumn)}
          name="profileTypeIds"
          rules={[
            {
              required: true,
              message: intl.formatMessage(messages.requiredProfileTypesField),
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder={intl.formatMessage(messages.profileTypesPlaceHolder)}
            options={profileTypeOptions}
            loading={!profileTypesArray || profileTypesArray.length === 0}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateCriminalModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

export default CreateCriminalModal;
