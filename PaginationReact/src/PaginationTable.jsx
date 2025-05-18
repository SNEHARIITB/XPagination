import React, { useEffect, useState } from 'react';
import './style.css'; 

const PaginationTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      );
      if (!response.ok) throw new Error('Network error');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      alert('fetchDataFailed');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div id='count'>
      <h1>Employee Data Table</h1>
      <table id="table">
        <thead id="trowhead">
          <tr>
            <th className="thead">ID</th>
            <th className="thead">Name</th>
            <th className="thead">Email</th>
            <th className="thead">Role</th>
          </tr>
        </thead>
        <tbody id="tbody">
          {currentRows.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          id="prevbtn"
          onClick={handlePrev}
          
        >
          Previous
        </button>
        <span id="pageinfo">{currentPage}</span>
        <button
          id="nextbtn"
          onClick={handleNext}
          
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationTable;
