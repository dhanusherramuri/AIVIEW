import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const InterviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const [interview, setInterview] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  // Fetch interview on mount
  useEffect(() => {
    fetchInterview();
  }, [id]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchInterview = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/interview/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load interview');
      }

      setInterview(data.interview);
      setMessages(data.interview.messages || []);

      if (data.interview.status === 'completed') {
        setCompleted(true);
        if (data.interview.feedback) {
          setEvaluation(JSON.parse(data.interview.feedback));
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!currentAnswer.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/interview/${id}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answer: currentAnswer }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit answer');
      }

      // Update messages with feedback and next question
      setMessages((prev) => [
        ...prev,
        {
          role: 'candidate',
          content: currentAnswer,
          timestamp: new Date().toISOString(),
        },
        {
          role: 'interviewer',
          content: `${data.feedback}\n\nNext Question: ${data.nextQuestion}`,
          timestamp: new Date().toISOString(),
        },
      ]);

      setCurrentAnswer('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompleteInterview = async () => {
    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/interview/${id}/complete`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to complete interview');
      }

      setEvaluation(data.evaluation);
      setCompleted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading interview...</div>
      </div>
    );
  }

  if (error && !interview) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary-600">
                AI Interview Assistant
              </h1>
              <p className="text-sm text-gray-500">
                {interview?.role} • {interview?.difficulty}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Question {interview?.currentQuestionNumber || 1}
              </span>
              {!completed && (
                <button
                  onClick={handleCompleteInterview}
                  disabled={submitting}
                  className="btn-secondary"
                >
                  End Interview
                </button>
              )}
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-secondary"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {completed && evaluation ? (
          /* Evaluation View */
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Interview Complete
            </h2>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-700">
                  Overall Score
                </span>
                <span className="text-3xl font-bold text-primary-600">
                  {evaluation.score}/100
                </span>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-gray-700">{evaluation.overallAssessment}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-700 mb-2">
                    Strengths
                  </h3>
                  <ul className="space-y-1">
                    {evaluation.strengths?.map((strength, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-orange-700 mb-2">
                    Areas for Improvement
                  </h3>
                  <ul className="space-y-1">
                    {evaluation.areasForImprovement?.map((area, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <button onClick={() => navigate('/dashboard')} className="btn-primary">
              Back to Dashboard
            </button>
          </div>
        ) : (
          /* Chat Interface */
          <div className="card">
            {/* Messages */}
            <div className="h-96 overflow-y-auto mb-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === 'candidate' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      msg.role === 'candidate'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmitAnswer} className="space-y-4">
              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows="4"
                className="input-field resize-none"
                disabled={submitting}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting || !currentAnswer.trim()}
                  className="btn-primary"
                >
                  {submitting ? 'Submitting...' : 'Submit Answer'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;