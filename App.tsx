// Fix: Implement App component to structure the application UI and manage state.
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PromptInput } from './components/PromptInput';
import { LoadingSpinner } from './components/LoadingSpinner';
import { TechniqueCard } from './components/TechniqueCard';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AdvancedFeatures } from './components/AdvancedFeatures';
import { AnalysisResult } from './types';
import { analyzePrompt } from './services/geminiService';

function App() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>(''); // State for input text
  const [submittedPrompt, setSubmittedPrompt] = useState<string>(''); // State for the prompt that was analyzed

  const handlePromptSubmit = async (promptToSubmit: string) => {
    if (!promptToSubmit.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setSubmittedPrompt(promptToSubmit);
    
    try {
      const result = await analyzePrompt(promptToSubmit);
      setAnalysis(result);
    } catch (e) {
      if (e instanceof Error) {
        setError(`Erro na análise: ${e.message}`);
      } else {
        setError('Ocorreu um erro desconhecido. Por favor, tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
    handlePromptSubmit(examplePrompt);
  };
  
  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <PromptInput 
          prompt={prompt}
          setPrompt={setPrompt}
          onSubmit={() => handlePromptSubmit(prompt)} 
          isLoading={isLoading} 
        />
        
        <div id="analysis-section">
          {isLoading && <LoadingSpinner />}
          
          {error && (
            <div className="my-8 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
              <h2 className="font-bold text-lg mb-2">Oops! Algo deu errado.</h2>
              <p>{error}</p>
            </div>
          )}

          {analysis && !isLoading && (
            <div id="analysis-results" className="my-10">
              <div className="mb-8 p-6 bg-slate-800 rounded-lg border border-slate-700">
                <h2 className="text-2xl font-bold text-slate-100 mb-2">Prompt Analisado:</h2>
                <p className="text-slate-300 whitespace-pre-wrap font-mono bg-slate-900 p-4 rounded-md">
                  {submittedPrompt}
                </p>
              </div>
              
              <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-100 mb-2">Resumo da Estratégia</h2>
                  <p className="text-slate-300 text-lg">{analysis.summary}</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-100 mb-4">Técnicas Identificadas</h2>
                {analysis.techniques.map((tech, index) => (
                  <TechniqueCard key={index} technique={tech} />
                ))}
              </div>
            </div>
          )}
        </div>

        {!isLoading && !analysis && !error && (
          <WelcomeScreen onExampleClick={handleExampleClick} />
        )}

        <AdvancedFeatures />
      </main>
      <Footer />
    </div>
  );
}

export default App;
