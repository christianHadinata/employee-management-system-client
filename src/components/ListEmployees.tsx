import axios from "axios";
import React, { useEffect, useState } from "react";
import type { EmployeeTypes } from "../../types/Employee";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export default function ListEmployees() {
  const [employees, setEmployees] = useState<EmployeeTypes[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [employeeToDeleteId, setEmployeeToDeleteId] = useState<number | null>(
    null
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeesData = async () => {
      const { data } = await axios.get<EmployeeTypes[]>(
        `http://localhost:8080/api/employees`
      );

      if (data) {
        setEmployees(data);
      }
    };

    fetchEmployeesData();
  }, []);

  const openDeleteModal = (id: number) => {
    setEmployeeToDeleteId(id);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setEmployeeToDeleteId(null);
  };

  const confirmDelete = async () => {
    if (employeeToDeleteId === null) return;

    try {
      const { data } = await axios.delete<string>(
        `http://localhost:8080/api/employees/${employeeToDeleteId}`
      );

      if (data) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== employeeToDeleteId)
        );
      }

      console.log(`Employee ID ${employeeToDeleteId} berhasil dihapus.`);
    } catch (error) {
      console.error("Gagal menghapus karyawan:", error);
    } finally {
      closeDeleteModal();
    }
  };

  // const handleDelete = async (id: number) => {
  //   const { data } = await axios.delete<string>(
  //     `http://localhost:8080/api/employees/${id}`
  //   );

  //   if (data) {
  //     employees.filter((employee) => employee.id !== id);
  //   }
  // };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-10">List Employees</h1>
        <div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md mb-2 cursor-pointer hover:bg-blue-800"
            onClick={() => navigate("/add-employee")}
          >
            + Add Employee
          </button>
          <table className="border-2 border-black border-collapse">
            <thead>
              <tr>
                <th className="border border-black px-8 py-2">Employee Id</th>
                <th className="border border-black px-8 py-2">First Name</th>
                <th className="border border-black px-8 py-2">Last Name</th>
                <th className="border border-black px-8 py-2">Email</th>
                <th className="border border-black px-8 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                return (
                  <tr key={employee.id}>
                    <td className="border border-black px-8 py-2">
                      {employee.id}
                    </td>
                    <td className="border border-black px-8 py-2">
                      {employee.firstName}
                    </td>
                    <td className="border border-black px-8 py-2">
                      {employee.lastName}
                    </td>
                    <td className="border border-black px-8 py-2">
                      {employee.email}
                    </td>
                    <td className="border border-black px-8 py-2">
                      <div className="flex gap-x-5">
                        <button
                          className="bg-blue-600 px-4 py-2 rounded-md text-white cursor-pointer hover:bg-blue-800"
                          onClick={() =>
                            navigate(`/edit-employee/${employee.id}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 px-4 py-2 rounded-md text-white cursor-pointer hover:bg-red-800"
                          onClick={() => openDeleteModal(employee.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteConfirmationModal
        show={showModal}
        employeeId={employeeToDeleteId}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </>
  );
}
