// Mock AI service for development and testing
// Used when Gemini API quota is exceeded

const mockQuestions = {
  MERN: [
    "Can you explain the difference between props and state in React?",
    "How does the virtual DOM work in React?",
    "What is the purpose of middleware in Express.js?",
    "Explain the concept of hoisting in JavaScript.",
    "How do you handle asynchronous operations in Node.js?",
    "What is the difference between SQL and NoSQL databases?",
    "Can you explain the concept of closures in JavaScript?",
    "How does React's useEffect hook work?",
    "What is the purpose of the MongoDB aggregation pipeline?",
    "Explain the concept of RESTful APIs.",
  ],
  Frontend: [
    "What is the difference between let, const, and var in JavaScript?",
    "Explain the box model in CSS.",
    "How do you optimize website performance?",
    "What are React hooks and why were they introduced?",
    "Explain event delegation in JavaScript.",
    "What is the difference between flexbox and grid?",
    "How do you handle state management in large React applications?",
    "What are progressive web apps (PWAs)?",
    "Explain the concept of responsive design.",
    "How do you ensure web accessibility?",
  ],
  Backend: [
    "What is the difference between authentication and authorization?",
    "Explain the concept of REST API.",
    "How do you handle database connections in Node.js?",
    "What is middleware in Express.js?",
    "Explain the concept of microservices.",
    "How do you secure an API?",
    "What is the difference between synchronous and asynchronous programming?",
    "Explain database indexing and its importance.",
    "What is caching and when should you use it?",
    "How do you handle errors in Node.js applications?",
  ],
  Java: [
    "What is the difference between JDK, JRE, and JVM?",
    "Explain the concept of object-oriented programming.",
    "What is the difference between abstract classes and interfaces?",
    "How does garbage collection work in Java?",
    "Explain the concept of multithreading in Java.",
    "What is the difference between String, StringBuilder, and StringBuffer?",
    "How do you handle exceptions in Java?",
    "Explain the concept of dependency injection.",
    "What are Java streams and how do they work?",
    "What is the difference between HashMap and ConcurrentHashMap?",
  ],
  DevOps: [
    "What is CI/CD and why is it important?",
    "Explain the concept of infrastructure as code.",
    "What is the difference between Docker and Kubernetes?",
    "How do you monitor application performance?",
    "What is blue-green deployment?",
    "Explain the concept of containerization.",
    "What are the benefits of using Git in DevOps?",
    "How do you handle secrets management in DevOps?",
    "What is the difference between horizontal and vertical scaling?",
    "Explain the concept of service mesh.",
  ],
  Cybersecurity: [
    "What is the difference between symmetric and asymmetric encryption?",
    "Explain the concept of zero-trust security.",
    "What are common web application vulnerabilities?",
    "How do you prevent SQL injection attacks?",
    "What is multi-factor authentication and why is it important?",
    "Explain the concept of defense in depth.",
    "What is the OWASP Top 10?",
    "How do you handle security incidents?",
    "What is the difference between vulnerability scanning and penetration testing?",
    "Explain the concept of least privilege access.",
  ],
};

const mockFeedbacks = [
  "Good answer! You've demonstrated a solid understanding of the concept. To improve, consider providing more specific examples from your experience.",
  "That's a reasonable answer. You covered the main points, but could benefit from discussing edge cases or potential limitations.",
  "Excellent response! You showed deep understanding and provided practical examples. This is exactly what we're looking for.",
  "Your answer shows basic understanding, but lacks depth. Try to explain the 'why' behind your answer, not just the 'what'.",
  "Good start! You've identified the key concept. Now try to elaborate on implementation details and real-world applications.",
  "That's correct! You've explained it clearly and concisely. Can you think of any scenarios where this approach might not work?",
  "Your answer demonstrates practical knowledge. Consider discussing trade-offs between different approaches to show more comprehensive understanding.",
  "Fair answer. You've covered the basics, but try to connect it to broader system design principles for a more complete response.",
];

const mockEvaluations = {
  MERN: {
    score: 78,
    strengths: [
      "Strong understanding of React fundamentals",
      "Good knowledge of Node.js asynchronous patterns",
      "Clear explanation of MongoDB concepts",
    ],
    areasForImprovement: [
      "Could improve knowledge of advanced state management",
      "More practice with Express middleware patterns",
      "Deeper understanding of performance optimization",
    ],
    overallFeedback:
      "You demonstrated solid full-stack knowledge with particular strength in React. Continue practicing advanced patterns and system design to reach the next level.",
  },
  Frontend: {
    score: 82,
    strengths: [
      "Excellent CSS and layout knowledge",
      "Strong React hooks understanding",
      "Good awareness of performance optimization",
    ],
    areasForImprovement: [
      "More practice with state management libraries",
      "Deeper TypeScript knowledge",
      "Advanced accessibility implementation",
    ],
    overallFeedback:
      "Strong frontend fundamentals with good practical knowledge. Focus on advanced patterns and tooling to become a more well-rounded developer.",
  },
  Backend: {
    score: 75,
    strengths: [
      "Good API design understanding",
      "Solid database knowledge",
      "Clear explanation of authentication concepts",
    ],
    areasForImprovement: [
      "More experience with microservices architecture",
      "Deeper knowledge of caching strategies",
      "Advanced error handling patterns",
    ],
    overallFeedback:
      "You have a good foundation in backend development. Focus on distributed systems and scalability patterns to advance your skills.",
  },
  Java: {
    score: 80,
    strengths: [
      "Strong OOP principles understanding",
      "Good knowledge of Java collections",
      "Clear explanation of multithreading concepts",
    ],
    areasForImprovement: [
      "More practice with modern Java features",
      "Deeper Spring framework knowledge",
      "Advanced JVM tuning understanding",
    ],
    overallFeedback:
      "Solid Java fundamentals with good object-oriented design understanding. Continue learning modern Java features and frameworks.",
  },
  DevOps: {
    score: 77,
    strengths: [
      "Good CI/CD pipeline understanding",
      "Strong containerization knowledge",
      "Clear explanation of monitoring concepts",
    ],
    areasForImprovement: [
      "More hands-on Kubernetes experience",
      "Deeper infrastructure as code knowledge",
      "Advanced security practices",
    ],
    overallFeedback:
      "Good DevOps foundation with practical tool knowledge. Focus on advanced orchestration and security to become more versatile.",
  },
  Cybersecurity: {
    score: 85,
    strengths: [
      "Excellent security fundamentals",
      "Strong understanding of common vulnerabilities",
      "Good knowledge of encryption concepts",
    ],
    areasForImprovement: [
      "More practical penetration testing experience",
      "Deeper cloud security knowledge",
      "Advanced incident response procedures",
    ],
    overallFeedback:
      "Strong security mindset with good theoretical knowledge. Continue building hands-on experience with security tools and real-world scenarios.",
  },
};

/**
 * Generates a mock first question based on role and difficulty
 */
export const generateMockFirstQuestion = async (role, difficulty) => {
  await simulateDelay();

  const roleQuestions = mockQuestions[role] || mockQuestions.MERN;
  const questionIndex = Math.floor(Math.random() * Math.min(5, roleQuestions.length));

  return {
    feedback:
      "Welcome to the interview! Let's start with this question.",
    nextQuestion: roleQuestions[questionIndex],
  };
};

/**
 * Processes a mock answer and returns feedback with next question
 */
export const processMockAnswer = async (messages, answer, role, difficulty) => {
  await simulateDelay();

  const roleQuestions = mockQuestions[role] || mockQuestions.MERN;
  const answeredQuestion = messages.find(
    (m) => m.role === "interviewer" && m.content.includes("Next Question:")
  )?.content || messages[messages.length - 2]?.content || "";

  const nextQuestionIndex = Math.floor(Math.random() * roleQuestions.length);
  const nextQuestion = roleQuestions[nextQuestionIndex];
  const feedback =
    mockFeedbacks[Math.floor(Math.random() * mockFeedbacks.length)];

  return {
    feedback: `${feedback}\n\nYour answer: "${answer.substring(0, 50)}${answer.length > 50 ? "..." : ""}"`,
    nextQuestion,
  };
};

/**
 * Generates mock final evaluation
 */
export const generateMockFinalEvaluation = async (messages, role, difficulty) => {
  await simulateDelay();

  const evaluation = mockEvaluations[role] || mockEvaluations.MERN;

  // Adjust score based on difficulty
  let adjustedScore = evaluation.score;
  if (difficulty === "Easy") adjustedScore += 10;
  if (difficulty === "Hard") adjustedScore -= 5;

  return {
    ...evaluation,
    score: Math.min(100, Math.max(0, adjustedScore)),
  };
};

/**
 * Simulates API delay
 */
const simulateDelay = () =>
  new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));