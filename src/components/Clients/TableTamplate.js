import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table, Modal, Form, Input } from "antd";
import { observer, inject } from "mobx-react";
import { LoadingOutlined, CheckOutlined } from "@ant-design/icons";

const TableTemplate = inject("ClientsStore")(
  observer(props => {
    const [form] = Form.useForm();
    const clients = props.ClientsStore.clients;
    const [client, setClient] = useState({});
    const [, setDataIndex] = useState("");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      dataIndexFunction();
    });

    const showModal = value => {
      setVisible(true);
      setClient(value);
    };

    const onCreate = values => {
      const clientToUpdate = client;
      if (values.c_name) {
        clientToUpdate.c_name = values.c_name;
      }
      if (values.country) {
        clientToUpdate.country = values.country;
      }
      props.ClientsStore.updateClient(clientToUpdate);
      setVisible(false);
    };

    const handleCancel = e => {
      setVisible(false);
    };

    const columns = [
      {
        title: "Name",
        dataIndex: "c_name",
        key: "c_name"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country"
      },
      {
        title: "Owner",
        dataIndex: "o_name",
        key: "o_name"
      },
      {
        title: "First Contact",
        key: "first_contact",
        dataIndex: "first_contact"
      },
      {
        title: "Email Type",
        key: "e_type",
        dataIndex: "e_type"
      },
      {
        title: "Sold",
        key: "sold",
        dataIndex: "sold"
      }
    ];

    const dataIndexFunction = () => {
      setDataIndex(clients.map(c => c.c_id).toString());
      for (let client of clients) {
        if (client.sold === 0) {
          client.sold = "-";
        }
        if (client.sold === 1) {
          client.sold = <CheckOutlined />;
        }
        if (client.e_type === null) {
          client.e_type = "-";
        }
      }
    };

    return (
      <>
        <Table
          rowKey={record => record.c_id}
          columns={columns}
          dataSource={clients}
          onRow={column => {
            return {
              onClick: () => showModal(column)
            };
          }}
          loading={clients.length || true}
        />
        <Modal
          title={`Update Client:`}
          visible={visible}
          okText="Update"
          form={form}
          props={client}
          onOk={() => {
            form
              .validateFields()
              .then(values => {
                form.resetFields();
                onCreate(values);
              })
              .catch(info => {
                console.log("Validate Failed:", info);
              });
          }}
          onCancel={handleCancel}
          width={350}
        >
          <Form form={form} name="form_in_modal">
            <Form.Item name="c_name" label="Name">
              <Input placeholder={client.c_name} />
            </Form.Item>
            <Form.Item name="country" label="Country">
              <Input placeholder={`${client.country}`} />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  })
);

export default TableTemplate;
