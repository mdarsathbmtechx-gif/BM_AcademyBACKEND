import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { FiTarget } from "react-icons/fi";
import { FaFileAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const SACTBanner = () => {
    const particlesInit = async (main) => {
        await loadFull(main);
    };

    return (
        <section className="relative bg-gradient-to-r from-yellow-50/80 via-yellow-50 to-yellow-50/80 py-16 px-4 md:px-16 rounded-xl mt-12 shadow-xl overflow-hidden">

            {/* Particles Background */}
            <Particles
                id="sact-particles"
                init={particlesInit}
                options={{
                    background: { color: { value: "transparent" } },
                    fpsLimit: 60,
                    interactivity: {
                        events: {
                            onHover: { enable: true, mode: "repulse" },
                            onClick: { enable: true, mode: "push" },
                        },
                        modes: {
                            repulse: { distance: 120, duration: 0.4 },
                            push: { quantity: 4 },
                        },
                    },
                    particles: {
                        color: { value: "#FFD700" },
                        links: { enable: true, color: "#FFD700", distance: 150, opacity: 0.3, width: 1 },
                        collisions: { enable: false },
                        move: { direction: "none", enable: true, outModes: "bounce", random: true, speed: 0.8, straight: false },
                        number: { density: { enable: true, area: 800 }, value: 40 },
                        opacity: { value: 0.6 },
                        shape: { type: "circle" },
                        size: { value: { min: 2, max: 6 } },
                    },
                    detectRetina: true,
                }}
                className="absolute inset-0 -z-10"
            />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Text Section */}
                <div className="md:w-2/3" data-aos="fade-right">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-black drop-shadow-lg">
                        Free Career Guidance with <span className="text-yellow-500">SACT</span>
                    </h2>
                    <p className="text-gray-800 mb-6 text-lg md:text-xl">
                        Not sure what career suits you? Try our AI-powered <span className="font-semibold text-yellow-500">SACT Test</span>!
                    </p>
                    <ul className="space-y-3 mb-6 text-gray-700">
                        <li className="flex items-center gap-2">
                            <FiTarget className="text-black" size={18} />
                            <span>Understand your interests, strengths & best-fit careers</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaFileAlt className="text-black" size={18} />
                            <span>Get instant PDF report + scholarship info</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-600" size={18} />
                            <span>100% Free | No Course Selling | Just Career Clarity</span>
                        </li>
                    </ul>

                    <div className="flex flex-wrap gap-4">
                        <a
                            href="/sact"
                            className="bg-black hover:bg-gray-900 text-yellow-400 font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(255,221,0,0.8)] transition-all duration-300"
                        >
                            Take SACT Test Now
                        </a>
                        <a
                            href="/how-it-works"
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-[0_0_15px_rgba(0,0,0,0.4)] transition-all duration-300"
                        >
                            How It Works
                        </a>
                    </div>
                </div>

                {/* Illustration/Image Section */}
                <div className="md:w-1/3 flex justify-center items-center" data-aos="fade-left">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="Career Guidance Illustration"
                        className="w-64 md:w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>
        </section>
    );
};

export default SACTBanner;
