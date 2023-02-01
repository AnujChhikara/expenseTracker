import React, { useState } from "react";
const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.status === "ok") {
      window.location.href = "/login";
    }
  }

  return (
    <div className="bg-gradient-to-r from-rose-100 to-teal-100 h-[100vh] w-screen flex justify-center items-center">
      <div className="border border-black rounded-xl shadow-xl shadow-gray-600 py-8 flex flex-col justify-center items-center space-y-6 px-4">
        <h1 className="text-2xl underline font-serif">Register</h1>
        <form onSubmit={registerUser} className=" flex flex-col items-center">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="border border-gray-600 p-2 rounded-md shadow-lg"
          />
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="border border-gray-600 p-2 rounded-md shadow-lg"
          />
          <br />
          <input
            value={password}
            minLength={8}
            required
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="border border-gray-600 p-2 rounded-md shadow-lg"
          />
          <br />
          <button className="bg-green-500 hover:bg-green-600 duration-700 shadow-2xl  shadow-green-400 py-3 w-28  rounded-3xl">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
