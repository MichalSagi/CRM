import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Form, Button, Select, message } from "antd";
import { SendOutlined } from "@ant-design/icons";
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

const FormActionUpdata = inject("ClientsStore")(
  observer(props => {
    const [form] = Form.useForm();
    const [clients, ] = [props.ClientsStore.clients];
    const [ownerDefult, setOwnerDefult] = useState("");
    const [eTypeDefult, setETypeDefult] = useState("");
    const [sold, setSold] = useState(0);

    useEffect(() => {
      props.ClientsStore.getClientsFromDB();
      props.ClientsStore.getOwnersList();
      props.ClientsStore.getEmailTypes();
    });

    const onFinish = values => {
      const clientToUpdate = clients.find(c => c.c_name === values.clientName);
      if (values.owner) {
        clientToUpdate.o_name = values.owner;
      }
      if (values.emailType) {
        clientToUpdate.e_type = values.emailType;
      }
      clientToUpdate.sold = sold
      props.ClientsStore.updateClient(clientToUpdate);
      success();
      onReset();
    };

    const onReset = () => {
      form.resetFields();
      setOwnerDefult("Select Owner");
      setETypeDefult("Select Email type");
    };

    const success = () => {
      message.success("Updated client");
    };

    const handleChange = value => {
      const clientToUpdate = clients.find(c => c.c_name === value);
      setOwnerDefult(clientToUpdate.o_name);
      setETypeDefult(clientToUpdate.e_type);
      setSold(clientToUpdate.sold);
    };

    const handleSold = () => {
      setSold(1);
    };

    const clientsOptins = props.ClientsStore.clients.map(c => (
      <Option key={c.c_id} value={c.c_name}>
        {c.c_name}
      </Option>
    ));

    return (
      <>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item name="clientName" label="Client name" rules={[{ required: true }]}>
            {
              <Select showSearch placeholder="Select Client" filterOption={true} onSelect={handleChange}>
                {clientsOptins}
              </Select>
            }
          </Form.Item>
          <Form.Item name="owner" label="Owner" >
            <Select placeholder={ownerDefult || "Select Owner"} allowClear>
              {props.ClientsStore.owners.map(c => (
                <Option key={c.owner_id} value={c.o_name}>
                  {c.o_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="emailType" label="Email Type">
            <Select placeholder={eTypeDefult || "Select Email type"} allowClear>
              {props.ClientsStore.emailTypes.map(c => (
                <Option key={c.et_id} value={c.e_type}>
                  {c.e_type}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="sale" label="Declare Sale!" >
            <Button htmlType="button" onClick={handleSold} >
              <SendOutlined />
            </Button>
          </Form.Item>
          <Form.Item {...tailLayout} shouldUpdate>
            <Button type="primary" htmlType="submit" style={{ margin: 10 }}>
              Update
            </Button>
            <Button htmlType="button" onClick={onReset} >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  })
);

export default FormActionUpdata;
