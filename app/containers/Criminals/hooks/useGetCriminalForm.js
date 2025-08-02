import React, { useEffect } from 'react';
import { Col, DatePicker, Form, Select } from 'antd';
import FormWrapper from 'components/FormWrapper';
import messages from 'containers/Criminals/messages';
import { FormattedMessage } from 'react-intl';
import FormInputWrapper from 'components/FormInputWrapper';
import { rules } from 'common/rules';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const wrapperCol = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6,
};

const useGetCriminalForm = ({
  responsive = false,
  formName = 'form',
  initialValues = {},
  device,
  id,
}) => {
  const [formInstance] = Form.useForm();

  useEffect(() => {
    if (!id) {
      formInstance.resetFields(); // ✅ reset when modal is closed
    }
  }, [id, formInstance]);

  const WrappedForm = ({ ...props }) => (
    <Form
      form={formInstance}
      layout="vertical"
      responsive={responsive}
      name={formName}
      className="form-ant-items"
      {...props}
    />
  );

  WrappedForm.Item = Form.Item;

  const NameInput = () => {
    const nameInput = (
      <FormInputWrapper
        label={messages.fullName}
        rules={[
          {
            required: true,
            message: <FormattedMessage {...messages.requiredFullNameField} />,
          },
        ]}
        name="name"
        id="name"
        type="text"
        required
        placeholder={messages.fullNamePlaceHolder}
      />
    );

    return responsive ? <Col {...wrapperCol}>{nameInput}</Col> : nameInput;
  };

  const BirthPlaceInput = () => {
    const birthPlaceInput = (
      <FormInputWrapper
        label={messages.birthPlace}
        rules={[
          {
            required: true,
            message: <FormattedMessage {...messages.requiredBirthPlaceField} />,
          },
        ]}
        name="birthplace"
        id="birthplace"
        type="text"
        required
        placeholder={messages.birthPlaceHolder}
      />
    );

    return responsive ? (
      <Col {...wrapperCol}>{birthPlaceInput}</Col>
    ) : (
      birthPlaceInput
    );
  };

  const AddressInput = () => {
    const addressInput = (
      <FormInputWrapper
        label={messages.address}
        rules={[
          {
            required: true,
            message: <FormattedMessage {...messages.requiredAddressField} />,
          },
        ]}
        name="address"
        id="address"
        type="text"
        required
        placeholder={messages.addressHolder}
      />
    );

    return responsive ? (
      <Col {...wrapperCol}>{addressInput}</Col>
    ) : (
      addressInput
    );
  };

  const BirthdateInput = () => {
    const birthdateInput = (
      <Form.Item
        label={<FormattedMessage {...messages.birthDate} />}
        name="birthdate"
        rules={[
          {
            required: true,
            message: <FormattedMessage {...messages.requiredBirthDateField} />,
          },
        ]}
      >
        <DatePicker
          format="DD/MM/YYYY"
          style={{ width: '100%' }}
          placeholder="dd/MM/yyyy"
        />
      </Form.Item>
    );

    return responsive ? (
      <Col {...wrapperCol}>{birthdateInput}</Col>
    ) : (
      birthdateInput
    );
  };

  const StartExecuteDateInput = () => {
    const startDateInput = (
      <Form.Item
        label={<FormattedMessage {...messages.startExecuteDate} />}
        name="startExecuteDate"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage {...messages.requiredStartExecuteDateField} />
            ),
          },
        ]}
      >
        <DatePicker
          format="DD/MM/YYYY"
          style={{ width: '100%' }}
          placeholder="dd/MM/yyyy"
        />
      </Form.Item>
    );

    return responsive ? (
      <Col {...wrapperCol}>{startDateInput}</Col>
    ) : (
      startDateInput
    );
  };

  const EndExecuteDateInput = () => {
    const endDateInput = (
      <Form.Item
        label={<FormattedMessage {...messages.endExecuteDate} />}
        name="endExecuteDate"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage {...messages.requiredEndExecuteDateField} />
            ),
          },
        ]}
      >
        <DatePicker
          format="DD/MM/YYYY"
          style={{ width: '100%' }}
          placeholder="dd/MM/yyyy"
        />
      </Form.Item>
    );

    return responsive ? (
      <Col {...wrapperCol}>{endDateInput}</Col>
    ) : (
      endDateInput
    );
  };

  const DoneExecuteDateInput = () => {
    const doneDateInput = (
      <Form.Item
        label={<FormattedMessage {...messages.doneExecuteDate} />}
        name="doneExecuteDate"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage {...messages.requiredDoneExecuteDateField} />
            ),
          },
        ]}
      >
        <DatePicker
          format="DD/MM/YYYY"
          style={{ width: '100%' }}
          placeholder="dd/MM/yyyy"
        />
      </Form.Item>
    );

    return responsive ? (
      <Col {...wrapperCol}>{doneDateInput}</Col>
    ) : (
      doneDateInput
    );
  };

  return {
    form: formInstance,
    Form: WrappedForm,
    NameInput,
    AddressInput,
    BirthPlaceInput,
    BirthdateInput,
    StartExecuteDateInput,
    EndExecuteDateInput,
    DoneExecuteDateInput,
  };
};

export default useGetCriminalForm;
