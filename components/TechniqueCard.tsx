// Fix: Implement TechniqueCard component to display analysis results.
import React from 'react';
import { PromptTechnique } from '../types';

interface TechniqueCardProps {
  technique: PromptTechnique;
}

export const TechniqueCard: React.FC<TechniqueCardProps> = ({ technique }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mb-6">
      <h3 className="text-2xl font-bold text-cyan-400 mb-2">{technique.title}</h3>
      <p className="text-slate-300 mb-4">{technique.description}</p>
      <div className="bg-slate-900 p-4 rounded-md">
        <p className="text-sm text-slate-400 mb-1 font-semibold">Exemplo do Prompt:</p>
        <blockquote className="text-slate-200 italic border-l-4 border-fuchsia-500 pl-4">
          {technique.example}
        </blockquote>
      </div>
    </div>
  );
};
