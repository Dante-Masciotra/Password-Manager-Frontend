import "./Dashboard.css";
import React from 'react';

export default function Dashboard() {
  return(
    <>
      <h2>Dashboard</h2>
      <table>
        <tr>
          <th>Website</th>
          <th>Password</th>
        </tr>
        <tr>
          <td>Sample Data</td>
          <td>Sample Data</td>
        </tr>
      </table>
      <button><a href="http://localhost:3000/AddPassword"> +</a></button>
    </>
  );
}