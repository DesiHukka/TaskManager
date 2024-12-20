# Task Management App

This is a **Task Management Application** built using React for the front end and JSON-Server as the back end. The app allows users to add, edit, delete, and view tasks with features like dark mode, task progress tracking, and priority-based sorting.

## Features

- **Add, Edit, and Delete Tasks**: Full CRUD operations for tasks.
- **Dark Mode**: Toggle between light and dark themes.
- **Task Progress Tracker**: View the percentage of completed tasks.
- **Priority and Due Date Management**: Assign priorities and due dates to tasks.
- **Real-Time Feedback**: Notifications for successful or failed operations.

---

## Steps to Set Up and Run the App Locally

### Prerequisites

1. **Node.js**: Ensure you have Node.js installed (version 16 or higher recommended).
2. **npm**: Comes with Node.js.

### Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### Install Dependencies

```bash
npm install
```

### Set Up JSON-Server

1. Install JSON-Server globally if not already installed:
   ```bash
   npm install -g json-server
   ```
2. Navigate to the `Client` directory and place your `db.json` file containing sample task data. Example `db.json`:
   ```json
   {
     "tasks": [
       {
         "id": 1,
         "title": "Sample Task",
         "priority": "Medium",
         "dueDate": "2024-12-31",
         "status": "Not Completed"
       }
     ]
   }
   ```
3. Start the JSON-Server:
   ```bash
   npx json-server db.json
   ```
   JSON-Server will now be running at `http://localhost:3000`.

### Update Axios Base URL for Local Development

1. Open `App.jsx`.
2. Update the `axios.defaults.baseURL` line to:
   ```javascript
   axios.defaults.baseURL = "http://localhost:3000";
   ```

### Start the React Application

```bash
npm start
```

The application will be available at `http://localhost:3000`.

---

## Deployment

- The React app is deployed using **Vercel**.
- The JSON-Server is deployed using **Render** with the base URL set to `https://taskmanager-gju3.onrender.com`.
- For local development, ensure the base URL points to `http://localhost:3000`.

---

## Design Choices and Assumptions

### Design Choices

1. **Ant Design**:

   - Used Ant Design for consistent UI components and design aesthetics.
   - Includes components like Table, Modal, Progress, and Notification.

2. **Dark Mode**:

   - Implemented using `ConfigProvider` with separate light and dark themes.
   - Ensures improved accessibility and user preferences.

3. **Task Progress Tracking**:

   - Displays task completion percentage using a `Progress` component.

4. **CRUD Operations**:

   - Efficiently handled with Axios for API calls and Ant Design's Modal and Table components for UI interactions.

5. **Real-Time Notifications**:

   - Provides immediate user feedback using Ant Design's `notification` component.

6. **Sorting and Filtering**:
   - Implemented sorting by title, priority, due date, and status within the task table.

### Assumptions

1. **Task Fields**:

   - Each task has the following fields: `id`, `title`, `priority`, `dueDate`, and `status`.
   - `status` is either `Completed` or `Not Completed`.

2. **Data Persistence**:

   - JSON-Server is used for local development as a mock database. For deployment, Render is used to host the JSON-Server.

3. **Error Handling**:

   - Basic error handling for API failures with descriptive notifications to the user.

4. **Pagination**:

   - Table pagination is limited to 5 tasks per page for better UX.

5. **Cross-Browser Compatibility**:
   - The app is designed to work across modern browsers.

---

## Future Enhancements

- Add user authentication for personalized task management.
- Support for recurring tasks and reminders.
- Enhanced task filtering and search capabilities.
- Integration with a full-fledged backend like Node.js with a database (e.g., MongoDB).

---

## Feedback

Feel free to open issues or suggest improvements to this project.
