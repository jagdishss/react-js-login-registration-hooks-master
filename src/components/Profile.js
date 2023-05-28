import React, { useState, useRef, useEffect } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";


import { nanoid } from "nanoid";
import Todof from "./Todof";
import FilterButton from "./FilterButton";
import Todo from './Todo';

const API_URL = "http://localhost:3000/api/auth/";
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

const Profile = (props) => {
  const [isLoading, setLoading] = useState(true);
  const currentUser = AuthService.getCurrentUser();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const dataFetchedRef = useRef(false);
  // prevent back
  useEffect(() => {
    window.addEventListener('popstate', (e) => {
      window.history.go(1);
    });
  }, []);
  const fetchData = () => {
    axios.get(API_URL + "getTodo",)
      .then((response) => {
        console.log('Fetching data...');
        console.log(response.data);
        setLoading(false);
        response.data.forEach(element => {
          element.edate = new Date(element.edate);
          element.date = new Date(element.date);
          if (element.edate.getDay() < new Date().getDay()) {
            element.completed = true;
          }
          tasks.push(element);
        });
        setTasks(tasks);
      });
  }

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, [])

  const taskList = tasks ?
    tasks.filter(FILTER_MAP[filter])
      .map((task) => (
        <Todo
          id={task.id}
          name={task.name}
          date={task.date}
          edate={task.edate}
          comment={task.comment}
          completed={task.completed}
          key={task.id}
          toggleTaskCompleted={toggleTaskCompleted}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      )) : "";
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} tasks remaining`;

  function addTask(name, date, edate) {
    const comment = '';
    const newTask = { id: `todo-${nanoid()}`, name, date, edate, comment, completed: false };
    tasks.forEach(element => {

    });
    setTasks([...tasks, newTask]);
    const res = AuthService.saveTodo(`todo-${nanoid()}`, name, date, edate, comment, false, currentUser.username);
  }

  function toggleTaskCompleted(id) {
    const comment = '';
    const updatedTasks = tasks.map((task) => {
      // console.log(task);
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted

        return { ...task, date: new Date(), comment, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    AuthService.deleteTodo(id);
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName, newDate, newEdate, comment) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //


        return { ...task, name: newName, date: newDate, edate: newEdate, comment: comment, completed: false };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Todof addTask={addTask} />

      <div className="filters btn-group stack-exception">
        {
          filterList
        }
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default Profile;
