import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviewHistory();
  }, []);

  const fetchInterviewHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/interview`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setInterviews(data.interviews || []);
      }
    } catch (error) {
      console.error('Failed to fetch interview history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    return status === 'completed'
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-primary-600">
              AI Interview Assistant
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.name}!</span>
              <button
                onClick={logout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">
            Welcome to your interview preparation dashboard
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Account Info</h3>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">Name:</span> {user?.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p>
                <span className="font-medium">Member since:</span>{' '}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">Total Interviews:</span>{' '}
                {interviews.length}
              </p>
              <p>
                <span className="font-medium">Completed:</span>{' '}
                {interviews.filter((i) => i.status === 'completed').length}
              </p>
              <p>
                <span className="font-medium">In Progress:</span>{' '}
                {interviews.filter((i) => i.status === 'in-progress').length}
              </p>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Start Interview</h3>
            <p className="text-gray-600 mb-4">
              Begin a new practice interview session with AI-generated questions.
            </p>
            <Link to="/interview/setup" className="block w-full btn-primary text-center">
              Start New Interview
            </Link>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Interview History</h3>
            <p className="text-gray-600 mb-4">
              View your past interviews and track your progress over time.
            </p>
            <a href="#interview-history" className="block w-full btn-secondary text-center">
              View History
            </a>
          </div>
        </div>

        {/* Interview History */}
        <div id="interview-history" className="card">
          <h3 className="text-xl font-semibold mb-4">Previous Interviews</h3>

          {loading ? (
            <div className="text-center text-gray-600 py-8">
              Loading interview history...
            </div>
          ) : interviews.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              <p className="mb-4">No interviews yet</p>
              <Link to="/interview/setup" className="btn-primary">
                Start Your First Interview
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Role
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Difficulty
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {interviews.map((interview) => (
                    <tr key={interview._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">
                        {interview.role}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {interview.difficulty}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            interview.status
                          )}`}
                        >
                          {interview.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(interview.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          to={`/interview/${interview._id}`}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          {interview.status === 'in-progress' ? 'Resume' : 'View'}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;