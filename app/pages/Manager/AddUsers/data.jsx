import { useState } from 'react';

const AddEmployeeForm = () => {
  const [employees, setEmployees] = useState([{ name: '', userId: '', password: '' }]);

  const handleChange = (index, e) => {
    const newEmployees = [...employees];
    newEmployees[index][e.target.name] = e.target.value;
    setEmployees(newEmployees);
  };

  const addEmployee = () => {
    setEmployees([...employees, { name: '', userId: '', password: '' }]);
  };

  const removeEmployee = (index) => {
    const newEmployees = employees.filter((_, i) => i !== index);
    setEmployees(newEmployees);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send the data to an API endpoint
    console.log('Batch Form submitted:', employees);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-black">Add Employees</h2>
        {employees.map((employee, index) => (
          <div key={index} className="mb-4 flex items-end space-x-4 border-b pb-4">
            <div className="flex-1">
              <label htmlFor={`name-${index}`} className="block text-gray-700">Name</label>
              <input
                type="text"
                id={`name-${index}`}
                name="name"
                value={employee.name}
                onChange={(e) => handleChange(index, e)}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor={`userId-${index}`} className="block text-gray-700">User ID</label>
              <input
                type="text"
                id={`userId-${index}`}
                name="userId"
                value={employee.userId}
                onChange={(e) => handleChange(index, e)}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor={`password-${index}`} className="block text-gray-700">Password</label>
              <input
                type="password"
                id={`password-${index}`}
                name="password"
                value={employee.password}
                onChange={(e) => handleChange(index, e)}
                className="mt-1 p-2 w-full border rounded"
                required
              />
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeEmployee(index)}
                className="text-red-500 hover:text-red-700 transition duration-200"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addEmployee}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 mb-4"
        >
          Add Another Employee
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Submit All Employees
        </button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
