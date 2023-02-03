import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

const Home = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "/login");
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

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
