import React, { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Switch, Button } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const TaskForm = ({ visible, onSubmit, initialValues = {}, onCancel }) => {
  const [form] = Form.useForm(); // useForm hook to create form instance

  useEffect(() => {
    if (visible) {
      // Reset form only when modal becomes visible
      form.resetFields();
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          dueDate: initialValues.dueDate ? dayjs(initialValues.dueDate) : null,
          status: initialValues.status === "Completed",
        });
      }
    }
  }, [visible, initialValues, form]);

  const handleFinish = (values) => {
    const formattedValues = {
      ...values,
      dueDate: values.dueDate ? values.dueDate.format("YYYY-MM-DD") : null,
      status: values.status ? "Completed" : "Not Completed",
    };
    onSubmit(formattedValues);
  };

  return (
    <Modal
      title={initialValues.id ? "Edit Task" : "Add Task"}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Task Title"
          name="title"
          rules={[{ required: true, message: "Please enter the task title!" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>
        <Form.Item
          label="Priority"
          name="priority"
          rules={[{ required: true, message: "Please select the priority!" }]}
        >
          <Select placeholder="Select priority">
            <Option value="High">High</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Low">Low</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[{ required: true, message: "Please select a due date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Status" name="status" valuePropName="checked">
          <Switch
            checkedChildren="Completed"
            unCheckedChildren="Not Completed"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
