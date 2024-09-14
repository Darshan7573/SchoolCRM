import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [passcode, setPasscode] = useState("0000");
    const [inputPassCode, setInputPassCode] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleCheckPasscode = () => {
        if (inputPassCode.trim() === "") {
            setMessage("Passcode is required.");
        } else if (inputPassCode === passcode) {
            navigate("/admin-sign-up");
        } else {
            setMessage("Incorrect Password. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-80">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Enter the passcode</h1>
                <input
                    type="password"
                    value={inputPassCode}
                    onChange={(e) => setInputPassCode(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter passcode"
                    required
                />
                <button
                    onClick={handleCheckPasscode}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    CHECK
                </button>
                {message && (
                    <p className="mt-4 text-center text-red-500">{message}</p>
                )}
            </div>
        </div>
    );
};

export default SignUp;
