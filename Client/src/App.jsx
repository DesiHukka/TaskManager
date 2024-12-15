import React, { useEffect, useState } from "react";
import { Layout, Button, notification, Progress, ConfigProvider } from "antd";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";
import TaskForm from "./components/TaskForm";
import TaskTable from "./components/TaskTable";
import { addTask } from "./utils/api";
import axios from "axios";

const { Header, Content, Footer } = Layout;
// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL =
  "https://my-json-server.typicode.com/DesiHukka/TaskManager";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State to manage dark mode

  // Define light and dark theme overrides
  const darkTheme = {
    token: {
      colorBgBase: "#1a1a1a", // Dark background
      colorTextBase: "#ffffff", // White text
      colorPrimary: "#1890ff", // Primary color
    },
  };

  const lightTheme = {
    token: {
      colorBgBase: "#ffffff", // Light background
      colorTextBase: "#000000", // Black text
      colorPrimary: "#1890ff", // Primary color
    },
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/tasks");
      setTasks(response.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await addTask(newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setIsAddModalVisible(false); // Close the modal after adding the task

      // Show success notification after task is added
      notification.success({
        message: "Task Added Successfully",
        description: `The task "${response.data.title}" has been added successfully!`,
      });
    } catch (error) {
      console.error("Error adding task:", error);

      // Show error notification if something goes wrong
      notification.error({
        message: "Task Addition Failed",
        description: "There was an issue adding the task. Please try again.",
      });
    }
  };

  const getCompletedTasksPercentage = () => {
    const completedTasks = tasks.filter(
      (task) => task.status === "Completed"
    ).length;
    return ((completedTasks / tasks.length) * 100).toFixed(2) || 0; // Round off to 1 decimal place
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle dark mode
  };

  return (
    <ConfigProvider theme={darkMode ? darkTheme : lightTheme}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ color: "white", fontSize: "1.5rem" }}>
          Task Management App
          <Button
            type="text"
            icon={darkMode ? <BulbFilled /> : <BulbOutlined />}
            onClick={toggleDarkMode}
            style={{
              float: "right",
              color: "white",
              fontSize: "1.5rem",
              marginLeft: "15px",
            }}
          />
        </Header>
        <Content style={{ padding: "20px" }}>
          {/* Display the progress bar */}
          <Progress
            percent={getCompletedTasksPercentage()}
            status="active"
            style={{ marginBottom: "20px" }}
            strokeColor="#52c41a"
          />
          <Button
            type="primary"
            onClick={() => setIsAddModalVisible(true)}
            style={{ marginBottom: "20px" }}
          >
            Add Task
          </Button>
          <TaskForm
            visible={isAddModalVisible}
            onSubmit={handleAddTask}
            onCancel={() => setIsAddModalVisible(false)}
          />
          <TaskTable tasks={tasks} fetchTasks={fetchTasks} />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Task Management App ©2024
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
