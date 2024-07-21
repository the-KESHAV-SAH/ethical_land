import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ProblemForm from '../problems/problemForm'; // Assuming ProblemForm is in the same directory
import { Link } from 'react-router-dom';

const Contest = () => {
  const [contest, setContest] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    problems: []
  });

  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.Auth.user);

  const handleChange = (e) => {
    setContest({
      ...contest,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contestData = {
      contestName: contest.name,
      description: contest.description,
      startDate: contest.startDate,
      endDate: contest.endDate,
      problems: contest.problems
    };
    try {
      const response = await axios.post('http://localhost:8000/api/contest', contestData, {
        withCredentials: true
      });
      setContest({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        problems: []
      });
      fetchContests();
    } catch (error) {
      console.error("Error creating contest:", error);
    }
  };

  const fetchContests = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/get-contest');
      setContests(response.data.contest);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contests:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const addProblemToContest = (problem) => {
    setContest((prevContest) => ({
      ...prevContest,
      problems: [...prevContest.problems, problem._id]
    }));
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Contest Management</h1>
          {user && user.role === 'admin' ? (
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="bg-blue-50 p-4 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Create a New Contest</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={contest.name}
                    onChange={handleChange}
                    placeholder="Contest Name"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={contest.startDate}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <textarea
                    name="description"
                    value={contest.description}
                    onChange={handleChange}
                    placeholder="Contest Description"
                    className="w-full p-2 border border-gray-300 rounded col-span-1 md:col-span-2"
                  ></textarea>
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={contest.endDate}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Create Contest
                </button>
              </form>
              <div className="bg-green-50 p-4 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Add Problems to Contest</h2>
                <ProblemForm onProblemAdd={addProblemToContest} />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Upcoming Contests</h2>
                {contests && contests.filter(c => new Date(c.startDate) > new Date()).map(contest => (
                  <div key={contest._id} className="mb-4">
                    <h3 className="text-xl font-semibold">{contest.name}</h3>
                    <p className="text-gray-600">{contest.description}</p>
                    <p className="text-gray-600">Start: {new Date(contest.startDate).toLocaleString()}</p>
                    <p className="text-gray-600">End: {new Date(contest.endDate).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Previous Contests</h2>
                <ul>
                  {contests && contests.filter(c => new Date(c.endDate) < new Date()).map(contest => (
                    <li key={contest._id} className="flex justify-between py-2 border-b last:border-b-0">
                      <span className="text-gray-800">{contest.name}</span>
                      <span className="text-gray-600">End: {new Date(contest.endDate).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="mt-8 text-center text-gray-600">
            <p>Explore more contests and challenges!</p>
            <Link to="/all-contests" className="text-blue-500 hover:underline">View All Contests</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contest;
