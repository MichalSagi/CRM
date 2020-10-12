import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Select, message } from "antd";
import { observer, inject } from "mobx-react";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 8
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8
  }
};

const FormActionAdd = inject("ClientsStore")(
  observer(props => {
    const [form] = Form.useForm();

    useEffect(() => {
      props.ClientsStore.getOwnersList();
      props.ClientsStore.getCountriesList();
    }, []);

    const onFinish = values => {
      props.ClientsStore.addClient(values);
      success()
      onReset();
    };

    const onReset = () => {
      form.resetFields();
    };

    const success = () => {
      message.success("Added a new client");
    };

    return (
      <>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="Enter Name" style={{ textAlign: "center" }} />
          </Form.Item>
          <Form.Item
            name="owner"
            label="Owner"
            rules={[
              {
                required: true
              }
            ]}
            shouldUpdate
          >
            <Select placeholder="Select Owner" allowClear>
              {props.ClientsStore.owners.map(c => (
                <Option key={c.owner_id} value={c.o_name}>
                  {c.o_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="Enter Country Name" style={{ textAlign: "center" }} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="Enter E-Mail" style={{ textAlign: "center" }} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ margin: 10 }} >
              Add New Client
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  })
);

export default FormActionAdd;
