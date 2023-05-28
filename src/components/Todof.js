// import React, { useState } from "react";
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";


const required = (value) => {
    if (!value) {
        return (
            <div className="invalid-feedback d-block">
                This field is required!
            </div>
        );
    }
};

const vname = (value) => {
    if (value.length < 0) {
        return (
            <div className="invalid-feedback d-block">
                The username must not be empty.
            </div>
        );
    }
};

const vdate = (value) => {
    if (value.length !== null) {
        return (
            <div className="invalid-feedback d-block">
                The date should not be empty
            </div>
        );
    }
}; 


const vedate = (value) => {
    if (value.length !== null) {
        return (
            <div className="invalid-feedback d-block">
                The end date should not be empty
            </div>
        );
    }
}; 


function Todof(props) {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  const [message, setMessage] = useState("");

    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date());

    const [edate, setEDate] = useState(new Date());
    // function handleChange(e) {
    //     name = e.target.value;
    //     setName(e.target.value);
    // }

    const handleChange = (e) => {
        const name = e.target.value;
        setName(name);
      };


      const handleDateChange = (e) => {
        const date = e;
        setDate(date);
      };


      
      const handleEndDateChange = (e) => {
        const edate = e;
        setEDate(edate);
      };




    function handleSubmit(e) {
        e.preventDefault();
        form.current.validateAll();
        setSuccessful(false);
        if (checkBtn.current.context._errors.length === 0 && name.length > 0) {
            props.addTask(name, date, edate);
           
            setName("");
            setDate(new Date());
            setEDate(new Date());
            setSuccessfull(false);
            
        } else {
            setSuccessfull(true);
            console.log(successfull);
        }

    }




    // const onChangeUsername = (e) => {
    //     const username = e.target.value;
    //     setUsername(username);
    //   };
    
    //   const onChangeEmail = (e) => {
    //     const email = e.target.value;
    //     setEmail(email);
    //   };
    
    //   const onChangePassword = (e) => {
    //     const password = e.target.value;
    //     setPassword(password);
    //   };
    
    //   const handleRegister = (e) => {
    //     e.preventDefault();
    
    //     setMessage("");
    //     setSuccessful(false);
    
    //     form.current.validateAll();
    
    //     if (checkBtn.current.context._errors.length === 0) {
    //       AuthService.register(username, email, password).then(
    //         (response) => {
    //           setMessage(response.data.message);
    //           setSuccessful(true);
    //         },
    //         (error) => {
    //           const resMessage =
    //             (error.response &&
    //               error.response.data &&
    //               error.response.data.message) ||
    //             error.message ||
    //             error.toString();
    
    //           setMessage(resMessage);
    //           setSuccessful(false);
    //         }
    //       );
    //     }
    //   };
    return (
        // <form onSubmit={handleSubmit}>
        //     <div> 
        //         <div className="form-group">
        //         <h2 className="label-wrapper">
        //             <label htmlFor="new-todo-input" className="label__lg">
        //                 What needs to be done?
        //             </label>
        //         </h2>
        //         <input
        //             type="text"
        //             id="new-todo-input"
        //             className="input input__lg"
        //             name="text"
        //             autoComplete="off"
        //             value={name}
        //             onChange={handleChange}
        //             validations={[required, vname]}
        //         />
        //     </div>
        //         <div className="form-group">
        //             <h2 className="label-wrapper">
        //                 <label htmlFor="new-todo-input" className="label__lg">
        //                     Select Expiry Date
        //                 </label>
        //             </h2>
        //             <DatePicker
        //                 selected={date}
        //                 onChange={date => handleDateChange(date)}
        //                 validations={[required, vdate]}
        //             />
        //         </div>
        //         <button type="submit" className="btn btn__primary btn__lg">
        //             Add
        //         </button>
        //     </div>
        // </form>

        <div className="col-md-12">
      <div className="card card-container">

        <Form onSubmit={handleSubmit} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="name">Enter the Task Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  validations={[required, vname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Date">Start Date</label>
                <DatePicker
                        selected={date}
                        onChange={date => handleDateChange(date)}
                        validations={[required, vdate]}
                    />
              </div>

              <div className="form-group">
                <label htmlFor="Date">Enter the Expiry Date</label>
                <DatePicker
                        selected={edate}
                        onChange={edate => handleEndDateChange(edate)}
                        validations={[required, vedate]}
                    />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Submit</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
    );
}

export default Todof;