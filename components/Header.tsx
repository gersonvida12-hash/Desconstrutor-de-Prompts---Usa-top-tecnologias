import React from 'react';

export const Header: React.FC = () => (
  <header className="py-6 text-center border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
    <h1 className="text-4xl md:text-5xl font-extrabold">
      <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">
        AI Prompt Deconstructor
      </span>
    </h1>
    <p className="mt-2 text-slate-400 text-lg">
      Revelando as Mentes por Trás da Máquina
    </p>
  </header>
);