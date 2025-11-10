import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { EmployeeTypes } from "../../types/Employee";
import axios from "axios";

type ErrorsTypes = {
  firstName: string;
  lastName: string;
  email: string;
};

export default function FormEmployee() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<ErrorsTypes>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchEmployeeData = async () => {
        const { data } = await axios.get<EmployeeTypes>(
          `http://localhost:8080/api/employees/${id}`
        );

        if (data) {
          console.log(data);

          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
        }
      };

      fetchEmployeeData();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      if (id) {
        const { data } = await axios.put<EmployeeTypes>(
          `http://localhost:8080/api/employees/${id}`,
          {
            firstName,
            lastName,
            email,
          }
        );
        console.log(data);
      } else {
        const { data } = await axios.post<EmployeeTypes>(
          `http://localhost:8080/api/employees`,
          {
            firstName,
            lastName,
            email,
          }
        );
        console.log(data);
      }

      navigate("/");
    }
  };

  const validateForm = () => {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  };

  const pageTitle = () => {
    if (id) {
      return <h1 className="text-3xl font-semibold pb-5">Edit Employee</h1>;
    } else {
      return <h1 className="text-3xl font-semibold pb-5">Add Employee</h1>;
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-1/3  flex flex-col items-center border-2 border-gray-400 rounded-lg py-10">
          {pageTitle()}
          <form
            className="w-full flex flex-col px-10 gap-y-5"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-y-1">
              <label htmlFor="" className="text-lg">
                First Name:
              </label>
              <input
                type="text"
                placeholder="Enter Employee First Name"
                className={`border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 ${
                  errors.firstName ? "border-red-500" : "border-gray-400"
                }`}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <div className="text-red-500">{errors.firstName}</div>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="" className="text-lg">
                Last Name:
              </label>
              <input
                type="text"
                placeholder="Enter Employee Last Name"
                className={`border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 ${
                  errors.lastName ? "border-red-500" : "border-gray-400"
                }`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName}</span>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="" className="text-lg">
                Email:
              </label>
              <input
                type="text"
                placeholder="Enter Employee Email"
                className={`border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-400"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
