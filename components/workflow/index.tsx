import React from "react";
import { BsArrowRight } from "react-icons/bs";

interface Step {
    title: string;
    subtitle: string;
    icon: string;
    color: string;
}

const steps: Step[] = [
    { title: "Identifikasi", subtitle: "Wali Kelas", icon: "👤", color: "text-blue-500" },
    { title: "Asesmen", subtitle: "Guru Wali", icon: "📝", color: "text-green-500" },
    { title: "Konseling", subtitle: "Guru BK", icon: "💬", color: "text-yellow-500" },
    { title: "Evaluasi", subtitle: "Tim Kolaborasi", icon: "📊", color: "text-purple-500" },
];

export default function WorkflowSteps() {
    return (
        <section className="py-12 bg-gradient-to-br from-white to-gray-50">
            <h2 className="text-2xl text-gray-600 font-bold mb-10 ml-5">
                Alur Kerja Pendampingan
            </h2>

            <div className="flex flex-wrap justify-between items-center max-w-6xl mx-auto gap-x-8 gap-y-8">
                {steps.map((step, idx) => (
                    <React.Fragment key={idx}>
                        <div className="relative flex flex-col items-center group shrink-0">
                            {/* Icon circle with glass effect */}
                            <div className="rounded-full bg-white backdrop-blur-md shadow-xl w-24 h-24 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                <span className={`text-4xl ${step.color}`}>{step.icon}</span>
                            </div>

                            <h3 className="text-center font-semibold mt-4 text-lg">{step.title}</h3>
                            <p className="text-center text-sm text-gray-500">{step.subtitle}</p>
                        </div>

                        {/* Connecting line (auto width with flex-grow) */}
                        {idx < steps.length - 1 && (
                            <div className="hidden md:flex items-center justify-center px-2">
                                <BsArrowRight className="w-6 h-6 text-gray-400" />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}
