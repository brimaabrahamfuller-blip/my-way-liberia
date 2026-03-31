"use client";

import { requireAuth } from "@/lib/auth-utils";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useSession } from "next-auth/react";

const CAREER_PERSONAS = [
  { name: "Leader", traits: "Decisive, strategic, influencer" },
  { name: "Analyst", traits: "Detail-oriented, logical, problem solver" },
  { name: "Creative", traits: "Innovative, artistic, unconventional" },
  { name: "Supporter", traits: "Collaborative, empathetic, team player" },
  { name: "Explorer", traits: "Curious, adventurous, adaptable" }
];

export default function CareerQuiz() {
  const { data: session } = useSession();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ Leader: 0, Analyst: 0, Creative: 0, Supporter: 0, Explorer: 0 });
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "When faced with a challenge, you typically:",
      answers: [
        { text: "Take charge and lead the team", persona: "Leader" },
        { text: "Analyze all angles carefully", persona: "Analyst" },
        { text: "Think outside the box", persona: "Creative" },
        { text: "Support others' ideas", persona: "Supporter" },
        { text: "Explore different options", persona: "Explorer" }
      ]
    },
    {
      question: "Your ideal work environment includes:",
      answers: [
        { text: "Clear authority and vision", persona: "Leader" },
        { text: "Data and measurable results", persona: "Analyst" },
        { text: "Freedom and experimentation", persona: "Creative" },
        { text: "Team collaboration", persona: "Supporter" },
        { text: "Diverse experiences", persona: "Explorer" }
      ]
    },
    {
      question: "When working on projects, you focus on:",
      answers: [
        { text: "Driving results and impact", persona: "Leader" },
        { text: "Accuracy and precision", persona: "Analyst" },
        { text: "Innovation and creativity", persona: "Creative" },
        { text: "Harmony and inclusion", persona: "Supporter" },
        { text: "Learning and growth", persona: "Explorer" }
      ]
    }
  ];

  const handleAnswer = (persona: string) => {
    const newScores = { ...scores };
    (newScores as any)[persona] += 1;
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getTopPersona = () => {
    return Object.keys(scores).reduce((a, b) => 
      (scores as any)[a] > (scores as any)[b] ? a : b
    );
  };

  if (showResult) {
    const topPersona = getTopPersona();
    const personaInfo = CAREER_PERSONAS.find(p => p.name === topPersona);

    return (
      <div>
        <Navbar />
        <main className="container max-w-2xl mx-auto p-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 rounded-xl mb-8">
            <h1 className="text-3xl font-bold">Your Career Persona</h1>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-4xl font-bold text-blue-600 mb-4">{topPersona}</h2>
            <p className="text-xl text-gray-700 mb-8">{personaInfo?.traits}</p>
            
            <div className="mb-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="font-bold mb-4">Your Persona Breakdown:</h3>
              <div className="space-y-2">
                {Object.entries(scores).map(([persona, score]) => (
                  <div key={persona} className="flex justify-between items-center">
                    <span className="font-semibold">{persona}</span>
                    <div className="w-64 bg-gray-300 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${((score as number) / questions.length) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setShowResult(false);
                setCurrentQuestion(0);
                setScores({ Leader: 0, Analyst: 0, Creative: 0, Supporter: 0, Explorer: 0 });
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retake Quiz
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="container max-w-2xl mx-auto p-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 rounded-xl mb-8">
          <h1 className="text-3xl font-bold mb-2">Career Quiz</h1>
          <p>Discover your professional persona in 2 minutes</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-8">{questions[currentQuestion].question}</h2>

          <div className="space-y-3">
            {questions[currentQuestion].answers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(answer.persona)}
                className="w-full p-4 text-left border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
