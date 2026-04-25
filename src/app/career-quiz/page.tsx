"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import Link from "next/link";

type Track = 
  | "Public Administration" 
  | "Finance" 
  | "Health" 
  | "Education" 
  | "Business" 
  | "Technology";

interface Question {
  question: string;
  answers: {
    text: string;
    track: Track;
  }[];
}

const QUESTIONS: Question[] = [
  {
    question: "Q1: When you have a free afternoon, you are most likely to:",
    answers: [
      { text: "A) Organize something in your community", track: "Public Administration" },
      { text: "B) Review your personal budget or savings", track: "Finance" },
      { text: "C) Volunteer at a clinic or help a neighbor who is sick", track: "Health" },
      { text: "D) Read, study, or explain something to someone else", track: "Education" },
    ],
  },
  {
    question: "Q2: A friend asks for your help. You prefer to:",
    answers: [
      { text: "A) Help them navigate a government process or fill out official forms", track: "Public Administration" },
      { text: "B) Help them open a bank account or manage money", track: "Finance" },
      { text: "C) Help them find a doctor or access health services", track: "Health" },
      { text: "D) Teach them a new skill or tutor them", track: "Education" },
    ],
  },
  {
    question: "Q3: The kind of problem you enjoy solving most is:",
    answers: [
      { text: "A) How to make a system or institution run better", track: "Public Administration" },
      { text: "B) How to grow money or reduce financial risk", track: "Finance" },
      { text: "C) How to improve people's physical or mental wellbeing", track: "Health" },
      { text: "D) How to explain something complex in a simple way", track: "Education" },
    ],
  },
  {
    question: "Q4: You would be most proud to work for:",
    answers: [
      { text: "A) A government ministry or public institution", track: "Public Administration" },
      { text: "B) A bank, microfinance organization, or investment firm", track: "Finance" },
      { text: "C) A hospital, NGO, or public health agency", track: "Health" },
      { text: "D) A school, university, or training center", track: "Education" },
    ],
  },
  {
    question: "Q5: Which of these tools do you most enjoy using?",
    answers: [
      { text: "A) Policy documents, official reports, meeting minutes", track: "Public Administration" },
      { text: "B) Spreadsheets, financial statements, budget trackers", track: "Finance" },
      { text: "C) Medical records, health surveys, patient data", track: "Health" },
      { text: "D) Lesson plans, presentations, learning materials", track: "Education" },
    ],
  },
  {
    question: "Q6: In a group project, your natural role is:",
    answers: [
      { text: "A) The coordinator who keeps everyone aligned", track: "Public Administration" },
      { text: "B) The one managing the budget and resources", track: "Finance" },
      { text: "C) The one making sure everyone is healthy and supported", track: "Health" },
      { text: "D) The one explaining tasks and training team members", track: "Education" },
    ],
  },
  {
    question: "Q7: Your ideal work environment is:",
    answers: [
      { text: "A) A government office, council chamber, or public hall", track: "Public Administration" },
      { text: "B) A banking hall, financial firm, or trading floor", track: "Finance" },
      { text: "C) A clinic, field site, or community health center", track: "Health" },
      { text: "D) A classroom, lecture hall, or training room", track: "Education" },
    ],
  },
  {
    question: "Q8: Which of these accomplishments would mean the most to you?",
    answers: [
      { text: "A) Helping pass a policy that improved your community", track: "Public Administration" },
      { text: "B) Growing a business from nothing to profitability", track: "Business" },
      { text: "C) Helping reduce illness or suffering in a community", track: "Health" },
      { text: "D) Seeing a student you mentored succeed professionally", track: "Education" },
    ],
  },
  {
    question: "Q9: Which subject interested you most in school?",
    answers: [
      { text: "A) Civics, government, or social studies", track: "Public Administration" },
      { text: "B) Mathematics, economics, or accounting", track: "Finance" },
      { text: "C) Biology, health science, or community development", track: "Health" },
      { text: "D) English, pedagogy, or communication", track: "Education" },
    ],
  },
  {
    question: "Q10: What motivates you most at work?",
    answers: [
      { text: "A) Making systems fair and institutions accountable", track: "Public Administration" },
      { text: "B) Building wealth, financial security, and economic growth", track: "Finance" },
      { text: "C) Improving lives through care and direct service", track: "Health" },
      { text: "D) Passing on knowledge and shaping the next generation", track: "Education" },
    ],
  },
  {
    question: "Q11: Which of these careers sounds most exciting to you?",
    answers: [
      { text: "A) District Commissioner, Civil Servant, Policy Analyst", track: "Public Administration" },
      { text: "B) Banker, Accountant, Financial Analyst", track: "Finance" },
      { text: "C) Nurse, Public Health Officer, NGO Program Coordinator", track: "Health" },
      { text: "D) Teacher, School Administrator, Training Facilitator", track: "Education" },
    ],
  },
  {
    question: "Q12: What would you want your legacy to be?",
    answers: [
      { text: "A) I built institutions that worked for people", track: "Public Administration" },
      { text: "B) I created financial opportunities for my community", track: "Finance" },
      { text: "C) I helped people live longer and healthier lives", track: "Health" },
      { text: "D) I educated the next generation of Liberian leaders", track: "Education" },
    ],
  },
];

const TRACK_DETAILS = {
  "Public Administration": {
    title: "Public Administration and Government",
    description: "This track suits people who want to serve in government, policy, and public institutions. You are drawn to systems, accountability, and community governance.",
    jobs: ["District Officer", "Policy Analyst", "Civil Servant"],
  },
  "Finance": {
    title: "Finance and Banking",
    description: "This track suits people who think in numbers and want to drive economic growth. You are comfortable with money, risk, and financial planning.",
    jobs: ["Bank Teller", "Accountant", "Financial Analyst"],
  },
  "Health": {
    title: "Health and Community Development",
    description: "This track suits people who want to improve lives through care and development work. You are service-driven and people-centered.",
    jobs: ["Public Health Officer", "NGO Program Coordinator", "Community Health Worker"],
  },
  "Education": {
    title: "Education and Training",
    description: "This track suits people who want to pass on knowledge and build capacity in others. You are patient, communicative, and committed to growth.",
    jobs: ["Teacher", "School Administrator", "Training Facilitator"],
  },
  "Business": {
    title: "Business and Entrepreneurship",
    description: "This track suits people who want to build something and create economic value. You are independent, resourceful, and opportunity-driven.",
    jobs: ["SME Owner", "Sales Manager", "Market Analyst"],
  },
  "Technology": {
    title: "Technology and Communications",
    description: "This track suits people who want to solve problems through digital tools and media. You are analytical, creative, and drawn to innovation.",
    jobs: ["IT Support Officer", "Telecom Field Engineer", "Digital Media Specialist"],
  },
};

export default function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<Track, number>>({
    "Public Administration": 0,
    Finance: 0,
    Health: 0,
    Education: 0,
    Business: 0,
    Technology: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (track: Track) => {
    const newScores = { ...scores };
    newScores[track] += 1;
    setScores(newScores);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResults = () => {
    const maxScore = Math.max(...Object.values(scores));
    return (Object.keys(scores) as Track[]).filter(
      (track) => scores[track] === maxScore
    );
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({
      "Public Administration": 0,
      Finance: 0,
      Health: 0,
      Education: 0,
      Business: 0,
      Technology: 0,
    });
    setShowResult(false);
  };

  const progressPercentage = Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100);

  if (showResult) {
    const results = getResults();

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container max-w-3xl mx-auto p-4 md:p-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-500 mb-2 uppercase tracking-widest">Your Result</h1>
            
            <div className="space-y-12">
              {results.map((track) => (
                <div key={track} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <h2 className="text-4xl md:text-5xl font-black text-blue-700 mb-6">
                    {TRACK_DETAILS[track].title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
                    {TRACK_DETAILS[track].description}
                  </p>
                  
                  <div className="bg-blue-50 p-6 rounded-xl mb-8 max-w-md mx-auto">
                    <h3 className="font-bold text-blue-900 mb-4 uppercase text-sm tracking-wider">Example Careers in Liberia:</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {TRACK_DETAILS[track].jobs.map((job) => (
                        <span key={job} className="bg-white px-4 py-2 rounded-full text-blue-700 font-semibold shadow-sm border border-blue-100">
                          {job}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8 border-t border-gray-100">
              <Link
                href="/jobs"
                className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Find Jobs in This Field
              </Link>
              <button
                onClick={resetQuiz}
                className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container max-w-2xl mx-auto p-4 md:p-8">
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
          {/* Progress Section */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-3">
              <div>
                <span className="text-blue-600 font-black text-3xl">{currentQuestion + 1}</span>
                <span className="text-gray-400 font-bold text-lg"> / {QUESTIONS.length}</span>
              </div>
              <span className="text-gray-500 font-bold">{progressPercentage}% Complete</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-600 to-blue-400 h-full transition-all duration-500 ease-out" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Question Section */}
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
              {QUESTIONS[currentQuestion].question}
            </h2>

            <div className="grid gap-4">
              {QUESTIONS[currentQuestion].answers.map((answer, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(answer.track)}
                  className="group relative w-full p-5 text-left border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 active:scale-[0.98]"
                >
                  <div className="flex items-center">
                    <div className="flex-1 text-lg font-medium text-gray-700 group-hover:text-blue-900">
                      {answer.text}
                    </div>
                    <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
