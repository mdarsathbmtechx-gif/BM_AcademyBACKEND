import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const courses = [
  {
    title: "🎓 Government Exam Coaching",
    subtitle: "🏛️ TNPSC Group 2, 4, VAO, SSC, Bank & RRB Exams",
    overview:
      "Crack competitive government exams with expert coaching, current affairs updates, and mock test practice.",
    learn: [
      "Syllabus-wise coaching (Maths, GS, Tamil, GK)",
      "TNPSC Group 2, Group 4, VAO",
      "SSC CHSL, CGL, MTS",
      "Bank PO, Clerk (IBPS/SBI)",
      "RRB NTPC & Group D",
      "Daily Current Affairs + Test Series",
      "Exam Strategies + Time Management",
    ],
    duration: "6 Months (Fast-track: 3 Months)",
    outcomes: [
      "✅ Crack State & Central Govt. Exams",
      "✅ Expert Faculty Support",
      "✅ Daily/Weekly Tests",
      "✅ Free SACT Career Test & SAT Scholarship",
    ],
    faq: [
      { q: "Can I take this course online?", a: "Yes, both offline and live online batches are available." },
    ],
  },
  {
    title: "🎯 Soft Skills & Interview Prep",
    subtitle: "Job readiness & communication mastery",
    overview: "Build confidence and communication skills for job readiness.",
    learn: [
      "Resume Writing",
      "Group Discussion Practice",
      "Interview Techniques (HR + Tech)",
      "Email, Workplace Etiquette",
      "English & Tamil Mixed Training",
    ],
    duration: "3 Weeks",
    outcomes: [
      "✅ Face job interviews confidently",
      "✅ Build strong resumes and LinkedIn profiles",
      "✅ Improve speaking skills",
    ],
    faq: [
      { q: "Is this useful for college students and job seekers?", a: "Yes, this course is ideal for freshers and working professionals." },
    ],
  },
];

export default function CoursesSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
          📚 Our Popular Courses
        </h2>

        {courses.map((course, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md mb-6 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center p-6 text-left"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                <p className="text-gray-600">{course.subtitle}</p>
              </div>
              {openIndex === i ? <ChevronUp /> : <ChevronDown />}
            </button>

            {/* Content */}
            <div
              className={`px-6 pb-6 text-gray-700 transition-all duration-500 ease-in-out overflow-hidden ${
                openIndex === i ? "max-h-screen" : "max-h-0"
              }`}
            >
              {openIndex === i && (
                <>
                  <p><strong>Overview:</strong> {course.overview}</p>

                  <div>
                    <strong>What You Will Learn:</strong>
                    <ul className="list-disc ml-6">
                      {course.learn.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <p><strong>Duration:</strong> {course.duration}</p>

                  <div>
                    <strong>Outcomes:</strong>
                    <ul className="list-disc ml-6">
                      {course.outcomes.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <strong>FAQs:</strong>
                    {course.faq.map((f, idx) => (
                      <p key={idx}><b>Q:</b> {f.q} <br /> <b>A:</b> {f.a}</p>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-wrap gap-4 mt-4">
                    <button className="px-5 py-3 rounded-xl bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-500 transition">
                      📞 Talk to a Counselor
                    </button>
                    <button className="px-5 py-3 rounded-xl bg-black text-white font-semibold shadow hover:bg-gray-800 transition">
                      📝 Apply Now
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Career Test & Scholarship */}
        <div className="bg-yellow-100 rounded-2xl p-6 mt-10 text-center">
          <h3 className="text-2xl font-bold mb-4">🔧 Career Test & Scholarship Tools (Free)</h3>
          <p className="mb-3">✅ SACT – Smart Aptitude & Career Test → Get instant report + best-fit course suggestions</p>
          <button className="px-5 py-3 rounded-xl bg-black text-white font-semibold shadow hover:bg-gray-800 transition mr-3">
            Take Free Career Test
          </button>
          <button className="px-5 py-3 rounded-xl bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-500 transition">
            Apply for SAT Exam
          </button>
        </div>
      </div>
    </section>
  );
}
