import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import ProblemContext from './problemContext';

const FetchProblem = () => {
  const { problems } = useContext(ProblemContext);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  if (!problems || problems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h1 className="text-4xl text-gray-700">Loading...</h1>
      </div>
    );
  }

  const sortedProblems = [...problems].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name) => {
    if (!sortConfig.key || sortConfig.key !== name) return <FaSort />;
    if (sortConfig.direction === 'ascending') return <FaSortUp />;
    return <FaSortDown />;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Problem Set</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th
                className="p-4 cursor-pointer text-left text-gray-600 font-semibold border-b border-gray-300"
                onClick={() => requestSort('problemName')}
              >
                Problem Name {getSortIcon('problemName')}
              </th>
              <th
                className="p-4 cursor-pointer text-left text-gray-600 font-semibold border-b border-gray-300"
                onClick={() => requestSort('marks')}
              >
                Marks {getSortIcon('marks')}
              </th>
              <th
                className="p-4 cursor-pointer text-left text-gray-600 font-semibold border-b border-gray-300"
                onClick={() => requestSort('submissions')}
              >
                Submissions {getSortIcon('submissions')}
              </th>
              <th
                className="p-4 cursor-pointer text-left text-gray-600 font-semibold border-b border-gray-300"
                onClick={() => requestSort('difficulty')}
              >
                Difficulty {getSortIcon('difficulty')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedProblems.map((problem) => (
              <tr key={problem._id} className="hover:bg-gray-100 border-b border-gray-300">
                <td className="p-4 border-r border-gray-300">
                  <Link to={`/get-problem/${problem._id}`} className="text-black text-decoration-none hover:underline">
                    {problem.problemName}
                  </Link>
                </td>
                <td className="p-4 border-r border-gray-300">{problem.marks}</td>
                <td className="p-4 border-r border-gray-300">{problem.submissions}</td>
                <td className="p-4">
                  <span
                    className={`font-semibold ${
                      problem.difficulty === 'Easy' ? 'text-green-500' :
                      problem.difficulty === 'Medium' ? 'text-yellow-500' :
                      problem.difficulty === 'Hard' ? 'text-red-500' : ''
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FetchProblem;
