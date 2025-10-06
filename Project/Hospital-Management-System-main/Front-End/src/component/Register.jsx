import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function save(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:6060/api/v1/admin/save", {
                username: username,
                password: password,
            });

            if (response.status === 200) {
                alert("Admin Registration Successful");
                setUsername("");
                setPassword("");
                navigate('/dashboard');
            } else {
                alert("Registration failed");
            }
        } catch (err) {
            console.error("Error during registration:", err);
            alert("An error occurred during registration. Please try again.");
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md">
                <form onSubmit={save} className="bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                        Admin Registration
                    </h1>
                    <div className="mb-4">
                        <label 
                            htmlFor="username" 
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="username"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label 
                            htmlFor="password" 
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;