import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', course: '' });
  const [rows, setRows] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.course) {
      alert('Please fill all fields');
      return;
    }

    setRows(prevRows => [...prevRows, formData]);

    setFormData({ name: '', email: '', course: '' });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Add Student</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name} 
          onChange={handleChange} 
          className="border p-2 rounded"
        />

        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          className="border p-2 rounded"
        />

        <input 
          type="text" 
          name="course" 
          placeholder="Course" 
          value={formData.course} 
          onChange={handleChange} 
          className="border p-2 rounded"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Email</th>
            <th className="border border-gray-300 p-2 text-left">Course</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No data added yet.
              </td>
            </tr>
          )}
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td className="border border-gray-300 p-2">{row.name}</td>
              <td className="border border-gray-300 p-2">{row.email}</td>
              <td className="border border-gray-300 p-2">{row.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
