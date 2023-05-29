import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";
const REDIRECT_URL = "http://localhost:3000/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const todo = (user) => {
  return axios.get(API_URL + "getTodo",);
}

console.log(todo);


const saveTodo = (id, name, date, edate, comment, completed, user) => {
  return axios
  .post(API_URL + "saveTodos", {
    id,
    name,
    date,
    edate,
    comment,
    completed,
    user,
  })
  .then((response) => {
    console.log(response.status);
    if(response.status == 200)
      return response.status;
  });
};

const updateTodo = (name, date, edate,comment, completed, user,id) => {
  return axios
  .put(API_URL + "updateTodos", {
    name,
    date,
    edate,
    comment,
    completed,
    user,
    id,
  })
  .then((response) => {
    console.log(response.status);
    if(response.status == 200)
      return response.status;
  });
};

const deleteTodo = (id) => {
  console.log("deleting id " +id)
  return axios
  .delete(API_URL + "deleteTodos/"+id)
  .then((response) => {
    console.log(response.status);
    if(response.status == 200)
      return response.status;
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    }, {
      headers: {'Access-Control-Allow-Origin': '*'}

    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  window.localStorage.clear();
  window.location.href = REDIRECT_URL + "login";
  return axios.post(API_URL + "signout").then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// const getTodo = () => {
  
//   return 
// };



const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  saveTodo,
  todo,
  updateTodo,
  deleteTodo,
}

export default AuthService;
