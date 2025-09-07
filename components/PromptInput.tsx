// Fix: Implement PromptInput component to capture user input.
import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit();
    }
  };

  return (
    <div className="my-8">
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt-input" className="block text-lg font-medium text-slate-300 mb-2">
          Cole seu prompt aqui para desconstrução
        </label>
        <textarea
          id="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ex: Aja como um pirata experiente e me conte uma história sobre encontrar um tesouro amaldiçoado..."
          className="w-full h-48 p-4 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-slate-200 resize-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="mt-4 w-full px-6 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Analisando...' : 'Desconstruir Prompt'}
        </button>
      </form>
    </div>
  );
};
