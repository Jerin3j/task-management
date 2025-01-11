import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { useSelector } from "react-redux";
import { RootState } from "../../Reducer/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Define the type for a Task
interface Task {
  title: string;
  date: string;
  status: "TO-DO" | "IN-PROGRESS" | "COMPLETED";
  category: "Work" | "Personal";
}

export const Todos: React.FC = () => {
  const currentUser: any = useSelector(
    (state: RootState) => state.authUser.userDetails
  );
  console.log("log", currentUser);

  const [isAddingTask, setIsAddingTask] = useState<boolean>(false); // Toggle the Add Task form
  const [taskTitle, setTaskTitle] = useState<string>(""); // Store the input task title
  const [taskDate, setTaskDate] = useState<string>(""); // Store the input task date
  const [taskStatus, setTaskStatus] = useState<Task["status"]>("TO-DO"); // Task status dropdown
  const [taskCategory, setTaskCategory] = useState<Task["category"]>("Work"); // Task category dropdown
  const [tasks, setTasks] = useState<Task[]>([]); // Task list
  const [showOpts, setShowOpts] = useState<string | null>(null); // Task list
  console.log("newest task", tasks);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser.email) return; // Ensure the email is available

      try {
        const userTasksCollectionRef = collection(
          db,
          "tasks",
          currentUser.email,
          "userTasks"
        );

        const querySnapshot = await getDocs(userTasksCollectionRef);

        const taskQuery: any = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched taskQuery:", taskQuery);

        // Save taskQuery to state
        setTasks(taskQuery);
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    };

    fetchUserData();
  }, [currentUser.email, db]);

  // Handle Add Task
  const handleAddTask = async () => {
    if (taskTitle.trim() && taskDate.trim()) {
      try {
        const userTasksCollectionRef = collection(
          db,
          "tasks",
          currentUser.email,
          "userTasks"
        );

        // Create a new document with the task title as its ID
        const taskDocRef = doc(userTasksCollectionRef, taskTitle.trim());

        await setDoc(taskDocRef, {
          title: taskTitle.trim(),
          date: taskDate.trim(),
          status: taskStatus,
          category: taskCategory,
        });

        console.log("Task successfully added!");
        window.location.reload()
      } catch (error) {
        console.error("Error adding task:", error);
      }
    } else {
      console.error("Task title and date are required.");
    }
  };

  // Handle Cancel Task Addition
  const handleCancel = () => {
    setTaskTitle("");
    setTaskDate("");
    setTaskStatus("TO-DO");
    setTaskCategory("Work");
    setIsAddingTask(false);
  };

  const handleShowOptions = (taskId: string) => {
    setShowOpts((prev) => (prev === taskId ? null : taskId));
  };

  const handleEdit = async (taskName: string) => {
    const newTitle = prompt("Enter the new title for the task:");
    if (newTitle) {
      try {
        // Assuming taskName is the unique document ID within the "userTasks" subcollection
        const taskRef = doc(
          db,
          "tasks",
          currentUser.email,
          "userTasks",
          taskName
        );
        await updateDoc(taskRef, { title: newTitle });
        console.log(`Task ${taskName} updated successfully.`);
        alert("Task updated!");
      } catch (error) {
        console.error("Error updating task:", error);
        alert("Failed to update the task.");
      }
    }
  };

  const handleDelete = async (taskName: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const taskRef = doc(
          db,
          "tasks",
          currentUser.email,
          "userTasks",
          taskName
        ); // Replace "tasks" with your collection name
        await deleteDoc(taskRef);
        console.log(`Task ${taskName} deleted successfully.`);
        alert("Task deleted!");
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete the task.");
      }
    }
  };
  return (
    <div className="todo-box w-[95%] rounded-3xl bg-[#F1F1F1] relative p-4">
      {/* Header */}
      <div className="header w-full bg-[#FAC3FF] rounded-t-3xl flex items-center justify-between px-4 py-2">
        <h1 className="font-semibold">Todo ({tasks.length})</h1>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.9999 12.7501C17.6159 12.7501 17.2319 12.8971 16.9394 13.1896L10.9394 19.1896C10.3529 19.7761 10.3529 20.7241 10.9394 21.3106C11.5259 21.8971 12.4739 21.8971 13.0604 21.3106L18.0179 16.3531L22.9574 21.1231C23.5559 21.6976 24.5024 21.6811 25.0784 21.0856C25.6544 20.4901 25.6379 19.5391 25.0424 18.9646L19.0424 13.1716C18.7499 12.8896 18.3749 12.7501 17.9999 12.7501Z"
            fill="#0D7A0A"
          />
          <mask
            id="mask0_2038_7582"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="10"
            y="12"
            width="16"
            height="10"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.9999 12.7501C17.6159 12.7501 17.2319 12.8971 16.9394 13.1896L10.9394 19.1896C10.3529 19.7761 10.3529 20.7241 10.9394 21.3106C11.5259 21.8971 12.4739 21.8971 13.0604 21.3106L18.0179 16.3531L22.9574 21.1231C23.5559 21.6976 24.5024 21.6811 25.0784 21.0856C25.6544 20.4901 25.6379 19.5391 25.0424 18.9646L19.0424 13.1716C18.7499 12.8896 18.3749 12.7501 17.9999 12.7501Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_2038_7582)">
            <rect
              width="36"
              height="36"
              transform="matrix(1 0 0 -1 0 36)"
              fill="#3E0344"
            />
          </g>
        </svg>
      </div>

      <div className="w-full border-b border-[#0000001A]">
        <button
          onClick={() => setIsAddingTask(!isAddingTask)}
          className="add-todo pl-4 flex items-center py-1"
        >
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.25 8.68164H9.75V4.18164C9.75 3.76689 9.414 3.43164 9 3.43164C8.586 3.43164 8.25 3.76689 8.25 4.18164V8.68164H3.75C3.336 8.68164 3 9.01689 3 9.43164C3 9.84639 3.336 10.1816 3.75 10.1816H8.25V14.6816C8.25 15.0964 8.586 15.4316 9 15.4316C9.414 15.4316 9.75 15.0964 9.75 14.6816V10.1816H14.25C14.664 10.1816 15 9.84639 15 9.43164C15 9.01689 14.664 8.68164 14.25 8.68164Z"
              fill="#7B1984"
            />
            <mask
              id="mask0_2038_7499"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="3"
              y="3"
              width="12"
              height="13"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.25 8.68164H9.75V4.18164C9.75 3.76689 9.414 3.43164 9 3.43164C8.586 3.43164 8.25 3.76689 8.25 4.18164V8.68164H3.75C3.336 8.68164 3 9.01689 3 9.43164C3 9.84639 3.336 10.1816 3.75 10.1816H8.25V14.6816C8.25 15.0964 8.586 15.4316 9 15.4316C9.414 15.4316 9.75 15.0964 9.75 14.6816V10.1816H14.25C14.664 10.1816 15 9.84639 15 9.43164C15 9.01689 14.664 8.68164 14.25 8.68164Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0_2038_7499)">
              <rect y="0.431641" width="18" height="18" fill="#7B1984" />
            </g>
          </svg>
          <h1 className="text-">Add Todo</h1>
        </button>
        {/* Add Task Form */}
        {isAddingTask && (
          <div className="transition-transform duration-300 ease-in-out p-4">
            <div className="add-todo flex items-center gap-4">
              <div className="add_title flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Task Title"
                  className="px-3 py-2 bg-[#F1F1F1]"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
                <div className="btns flex item-center gap-4">
                  <button
                    onClick={handleAddTask}
                    className="rounded-2xl py-1 px-3 bg-[#7B1984] font-semibold text-white text-sm flex gap-1 items-center"
                  >
                    Add
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.05059 9.70135C2.01799 9.77996 2 9.86615 2 9.95654C2 10.134 2.06929 10.2952 2.18229 10.4146C2.18705 10.4196 2.19189 10.4246 2.1968 10.4295L4.86193 13.0946C5.12228 13.3549 5.54439 13.3549 5.80474 13.0946C6.06509 12.8343 6.06509 12.4121 5.80474 12.1518L4.27614 10.6232H10.6667C12.5076 10.6232 14 9.13081 14 7.28988V4.62321C14 4.25502 13.7015 3.95654 13.3333 3.95654C12.9651 3.95654 12.6667 4.25502 12.6667 4.62321V7.28988C12.6667 8.39448 11.7713 9.28988 10.6667 9.28988H4.27614L5.80474 7.76128C6.06509 7.50094 6.06509 7.07882 5.80474 6.81847C5.54439 6.55812 5.12228 6.55812 4.86193 6.81847L2.1968 9.4836C2.19219 9.48818 2.18765 9.49282 2.18318 9.49753C2.12524 9.5585 2.08104 9.62775 2.05059 9.70135Z"
                        fill="white"
                        fill-opacity="0.8"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleCancel}
                    className=" text-sm font-semibold uppercase bg-[#F1F1F1]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <input
                type="date"
                placeholder="add date"
                className="px-3 py-2 bg-[#F1F1F1] focus:border-none"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
              />
              <div className="todo-status-select flex gap-2 relative">
                <svg
                  className="absolute right-1 "
                  width="32"
                  height="33"
                  viewBox="0 0 32 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="16"
                    cy="16.4316"
                    r="15.5"
                    stroke="black"
                    stroke-opacity="0.2"
                  />
                  <path
                    d="M16 10.4316V22.4316M10 16.4316H22"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <select
                  className="px-3 py-2 bg-[#F1F1F1] focus:border-none z-10"
                  value={taskStatus}
                  onChange={(e) =>
                    setTaskStatus(e.target.value as Task["status"])
                  }
                >
                  <option value="TO-DO">TO-DO</option>
                  <option value="IN-PROGRESS">IN-PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>

              <select
                className="px-3 py-2 bg-[#F1F1F1] focus:border-none"
                value={taskCategory}
                onChange={(e) =>
                  setTaskCategory(e.target.value as Task["category"])
                }
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Task List */}
      <div className="tasks mt-4">
        <DndProvider backend={HTML5Backend}>
        {tasks.length === 0 ? (
          <h1 className="text-center text-gray-500">No todos available</h1>
        ) : (
          tasks.map((task, index) => (
            <div
              key={index}
              className="task flex justify-between items-center py-2 px-4 border-b"
            >
              <div className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  name="taskbox"
                  value={task.title}
                  className="cursor-pointer w-4 h-4"
                />
                <svg
                  width="21"
                  height="15"
                  viewBox="0 0 21 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.6">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.5 4.375C14.19 4.375 14.75 3.815 14.75 3.125C14.75 2.435 14.19 1.875 13.5 1.875C12.81 1.875 12.25 2.435 12.25 3.125C12.25 3.815 12.81 4.375 13.5 4.375ZM13.5 6.25C12.81 6.25 12.25 6.81 12.25 7.5C12.25 8.19 12.81 8.75 13.5 8.75C14.19 8.75 14.75 8.19 14.75 7.5C14.75 6.81 14.19 6.25 13.5 6.25ZM12.25 11.875C12.25 11.185 12.81 10.625 13.5 10.625C14.19 10.625 14.75 11.185 14.75 11.875C14.75 12.565 14.19 13.125 13.5 13.125C12.81 13.125 12.25 12.565 12.25 11.875Z"
                      fill="black"
                      fill-opacity="0.6"
                    />
                    <mask
                      id="mask0_2027_2950"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="12"
                      y="1"
                      width="3"
                      height="13"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.5 4.375C14.19 4.375 14.75 3.815 14.75 3.125C14.75 2.435 14.19 1.875 13.5 1.875C12.81 1.875 12.25 2.435 12.25 3.125C12.25 3.815 12.81 4.375 13.5 4.375ZM13.5 6.25C12.81 6.25 12.25 6.81 12.25 7.5C12.25 8.19 12.81 8.75 13.5 8.75C14.19 8.75 14.75 8.19 14.75 7.5C14.75 6.81 14.19 6.25 13.5 6.25ZM12.25 11.875C12.25 11.185 12.81 10.625 13.5 10.625C14.19 10.625 14.75 11.185 14.75 11.875C14.75 12.565 14.19 13.125 13.5 13.125C12.81 13.125 12.25 12.565 12.25 11.875Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_2027_2950)"></g>
                  </g>
                  <g opacity="0.6">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.5 4.375C8.19 4.375 8.75 3.815 8.75 3.125C8.75 2.435 8.19 1.875 7.5 1.875C6.81 1.875 6.25 2.435 6.25 3.125C6.25 3.815 6.81 4.375 7.5 4.375ZM7.5 6.25C6.81 6.25 6.25 6.81 6.25 7.5C6.25 8.19 6.81 8.75 7.5 8.75C8.19 8.75 8.75 8.19 8.75 7.5C8.75 6.81 8.19 6.25 7.5 6.25ZM6.25 11.875C6.25 11.185 6.81 10.625 7.5 10.625C8.19 10.625 8.75 11.185 8.75 11.875C8.75 12.565 8.19 13.125 7.5 13.125C6.81 13.125 6.25 12.565 6.25 11.875Z"
                      fill="black"
                      fill-opacity="0.6"
                    />
                    <mask
                      id="mask1_2027_2950"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="6"
                      y="1"
                      width="3"
                      height="13"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.5 4.375C8.19 4.375 8.75 3.815 8.75 3.125C8.75 2.435 8.19 1.875 7.5 1.875C6.81 1.875 6.25 2.435 6.25 3.125C6.25 3.815 6.81 4.375 7.5 4.375ZM7.5 6.25C6.81 6.25 6.25 6.81 6.25 7.5C6.25 8.19 6.81 8.75 7.5 8.75C8.19 8.75 8.75 8.19 8.75 7.5C8.75 6.81 8.19 6.25 7.5 6.25ZM6.25 11.875C6.25 11.185 6.81 10.625 7.5 10.625C8.19 10.625 8.75 11.185 8.75 11.875C8.75 12.565 8.19 13.125 7.5 13.125C6.81 13.125 6.25 12.565 6.25 11.875Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask1_2027_2950)"></g>
                  </g>
                </svg>

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.5795 8.00449L9.77283 13.0045C9.61616 13.2103 9.37366 13.332 9.11533 13.3337H9.10949C8.85366 13.3337 8.61199 13.2153 8.45366 13.0137L6.42699 10.4245C6.14366 10.0628 6.20699 9.53866 6.56949 9.25533C6.93116 8.97116 7.45616 9.03449 7.73949 9.39783L9.10033 11.1362L12.2537 6.99533C12.532 6.62949 13.0545 6.55783 13.422 6.83699C13.7878 7.11616 13.8587 7.63866 13.5795 8.00449ZM10.0003 1.66699C5.39783 1.66699 1.66699 5.39783 1.66699 10.0003C1.66699 14.602 5.39783 18.3337 10.0003 18.3337C14.6028 18.3337 18.3337 14.602 18.3337 10.0003C18.3337 5.39783 14.6028 1.66699 10.0003 1.66699Z"
                    fill="#A7A7A7"
                  />
                  <mask
                    id="mask0_2031_3325"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="1"
                    y="1"
                    width="18"
                    height="18"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.5795 8.00449L9.77283 13.0045C9.61616 13.2103 9.37366 13.332 9.11533 13.3337H9.10949C8.85366 13.3337 8.61199 13.2153 8.45366 13.0137L6.42699 10.4245C6.14366 10.0628 6.20699 9.53866 6.56949 9.25533C6.93116 8.97116 7.45616 9.03449 7.73949 9.39783L9.10033 11.1362L12.2537 6.99533C12.532 6.62949 13.0545 6.55783 13.422 6.83699C13.7878 7.11616 13.8587 7.63866 13.5795 8.00449ZM10.0003 1.66699C5.39783 1.66699 1.66699 5.39783 1.66699 10.0003C1.66699 14.602 5.39783 18.3337 10.0003 18.3337C14.6028 18.3337 18.3337 14.602 18.3337 10.0003C18.3337 5.39783 14.6028 1.66699 10.0003 1.66699Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0_2031_3325)"></g>
                </svg>

                <h1 className="font-semibold">{task.title}</h1>
              </div>
              <p className="text-base text-gray-500">{task.date}</p>
              <span className="px-2 py-1 bg-[#DDDADD] text-black rounded text-base">
                {task.status}
              </span>
              <span className="px-2 py-1 text-black text-base">
                {task.category}
              </span>
              <div className="opts relative">
                <svg
                  onClick={() => handleShowOptions(task.title)}
                  className="cursor-pointer"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2 7.99984C2 7.26384 2.59733 6.6665 3.33333 6.6665C4.06933 6.6665 4.66667 7.26384 4.66667 7.99984C4.66667 8.73584 4.06933 9.33317 3.33333 9.33317C2.59733 9.33317 2 8.73584 2 7.99984ZM8 6.6665C7.264 6.6665 6.66667 7.26384 6.66667 7.99984C6.66667 8.73584 7.264 9.33317 8 9.33317C8.736 9.33317 9.33333 8.73584 9.33333 7.99984C9.33333 7.26384 8.736 6.6665 8 6.6665ZM12.6667 6.6665C11.9307 6.6665 11.3333 7.26384 11.3333 7.99984C11.3333 8.73584 11.9307 9.33317 12.6667 9.33317C13.4027 9.33317 14 8.73584 14 7.99984C14 7.26384 13.4027 6.6665 12.6667 6.6665Z"
                    fill="#121212"
                  />
                  <mask
                    id="mask0_2027_3247"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="2"
                    y="6"
                    width="12"
                    height="4"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2 7.99984C2 7.26384 2.59733 6.6665 3.33333 6.6665C4.06933 6.6665 4.66667 7.26384 4.66667 7.99984C4.66667 8.73584 4.06933 9.33317 3.33333 9.33317C2.59733 9.33317 2 8.73584 2 7.99984ZM8 6.6665C7.264 6.6665 6.66667 7.26384 6.66667 7.99984C6.66667 8.73584 7.264 9.33317 8 9.33317C8.736 9.33317 9.33333 8.73584 9.33333 7.99984C9.33333 7.26384 8.736 6.6665 8 6.6665ZM12.6667 6.6665C11.9307 6.6665 11.3333 7.26384 11.3333 7.99984C11.3333 8.73584 11.9307 9.33317 12.6667 9.33317C13.4027 9.33317 14 8.73584 14 7.99984C14 7.26384 13.4027 6.6665 12.6667 6.6665Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0_2027_3247)">
                    <rect width="16" height="16" fill="#121212" />
                  </g>
                </svg>
                {showOpts == task.title && (
                  <div className="opt w-24 py-1 px-2 bg-white absolute right-0 rounded-md flex flex-col gap-1">
                    <h1
                      onClick={() => handleEdit(task.title)}
                      className="text-sm font-semibold  cursor-pointer"
                    >
                      Edit
                    </h1>
                    <h1
                      onClick={() => handleDelete(task.title)}
                      className="text-sm font-semibold cursor-pointer "
                    >
                      Delete
                    </h1>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        </DndProvider>
      </div>
    </div>
  );
};
