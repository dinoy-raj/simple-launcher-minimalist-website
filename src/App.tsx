import React from 'react';
import ParticleBackground from './components/ParticleBackground';
import TextRotator from './components/TextRotator';

function App() {
  return (
    <div className="min-h-screen text-white flex flex-col relative">
      <ParticleBackground />
      {/* Header */}
      <header className="flex justify-between items-center p-6 animate-fade-in-up animate-delay-0">
        <h1 className="text-white text-lg font-normal">
          Simple Launcher - The Minimalist Launcher
        </h1>
        <a
          href="https://linktr.ee/simple.launcher"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 text-sm hover:text-white transition-colors"
        >
          Future Roadmap
        </a>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* App Icon */}
        <img
          src="/favicon.svg"
          alt="Simple Launcher - Minimalist Launcher App Icon"
          className="w-24 h-24 mb-12 shadow-lg rounded-3xl bg-white p-2 animate-fade-in-up animate-delay-100 transition-all duration-300 hover:rounded-full"
        />

        {/* Main Heading */}
        <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight max-w-4xl animate-fade-in-up animate-delay-200">
          Best
          <TextRotator />
          <br />
          launcher made for android
          <br />
          ever
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed animate-fade-in-up animate-delay-300">
          Distraction-free, <strong>minimalist launcher</strong> designed to help you reduce screen time and boost focus.
          The best launcher for productivity, offering a minimalist interface without compromising simplicity.
        </p>

        {/* Google Play Button */}
        <a
          href="https://play.google.com/store/apps/details?id=com.dino.simple&pcampaignid=web_share"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-transparent border-2 border-gray-600 hover:border-white rounded-2xl px-6 py-3 transition-all duration-300 hover:bg-white hover:text-black group animate-fade-in-up animate-delay-400 hover:rounded-full"
        >
          <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
          </svg>
          <div className="text-left">
            <div className="text-xs text-gray-400 group-hover:text-gray-600">GET IT ON</div>
            <div className="text-lg font-semibold">Google Play</div>
          </div>
        </a>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-500 text-sm animate-fade-in-up animate-delay-500">
        Built with ❤️ by{" "}
        <a
          href="https://linktr.ee/dinoyraj"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-medium hover:underline hover:text-gray-300 transition-colors"
        >
          Dinoy
        </a>
      </footer>
    </div>
  );
}

export default App;
