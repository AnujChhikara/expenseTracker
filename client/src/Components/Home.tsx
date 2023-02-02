import React from "react";
import jwt from "jsonwebtoken";
interface JwtPayload {
  name: string;
}

const Home = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return (window.location.href = "/login");
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  fetch("/api/protectedRoute", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        const decoded = jwt.verify(token, "secret123") as JwtPayload;
        console.log(decoded.name);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>You have successfully logged in and have access to this page.</p>
      <div>
        {/* Your app components */}
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
};

export default Home;
