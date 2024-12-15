import React, { useState } from "react";
import { Table, Space, Button, Popconfirm, notification } from "antd";
import { deleteTask, updateTask } from "../utils/api";
import TaskForm from "./TaskForm";
import dayjs from "dayjs";

const TaskTable = ({ tasks, fetchTasks }) => {
  const [editingTask, setEditingTask] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
      notification.success({ message: "Task deleted successfully!" });
    } catch (error) {
      notification.error({ message: "Failed to delete task" });
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task); // Set the task to be edited
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await updateTask(editingTask.id, updatedTask);
      fetchTasks();
      setEditingTask(null); // Close the modal after updating

      // Show success notification after task is updated
      notification.success({
        message: "Task Updated Successfully",
        description: `The task "${updatedTask.title}" has been updated successfully!`,
      });
    } catch (error) {
      notification.error({ message: "Failed to update task" });
    }
  };

  // Priority and Status color styles
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#ff4d4f"; // Red
      case "Medium":
        return "#faad14"; // Yellow
      case "Low":
        return "#52c41a"; // Green
      default:
        return "#1890ff"; // Blue (default)
    }
  };

  const getStatusColor = (status) => {
    return status === "Completed" ? "#52c41a" : "#ff4d4f"; // Green for completed, red for others
  };

  // Columns with sorting enabled
  const columns = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title), // Sort by title alphabetically
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <span style={{ color: getPriorityColor(priority) }}>{priority}</span>
      ),
      sorter: (a, b) => a.priority.localeCompare(b.priority), // Sort by priority
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
      sorter: (a, b) => (dayjs(a.dueDate).isBefore(dayjs(b.dueDate)) ? -1 : 1), // Sort by due date
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: getStatusColor(status) }}>{status}</span>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status), // Sort by status
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={tasks}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 5 }}
      />
      {editingTask && (
        <TaskForm
          visible={!!editingTask}
          initialValues={editingTask}
          onSubmit={handleUpdateTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </>
  );
};

export default TaskTable;
