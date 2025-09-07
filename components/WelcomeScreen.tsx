// Fix: Implement WelcomeScreen component for the initial application state.
import React from 'react';

interface WelcomeScreenProps {
  onExampleClick: (prompt: string) => void;
}

const examplePrompts = [
  "Aja como um historiador especializado na Roma Antiga. Escreva um discurso para o Senado Romano do ponto de vista de Cícero, defendendo a República contra a tirania de César. Use um tom formal e persuasivo. A saída deve ser um único bloco de texto.",
  "Estou escrevendo um roteiro para um filme de ficção científica. Preciso de 3 ideias para um dispositivo de enredo central. Para cada ideia, forneça um nome, uma breve descrição de sua função e uma possível complicação que ele introduz. Formate sua resposta como uma lista com marcadores.",
  "Explique o conceito de buracos negros para uma criança de 10 anos. Use analogias simples, como um ralo ou uma bola de boliche em um trampolim. Mantenha a explicação com menos de 150 palavras."
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onExampleClick }) => (
  <div className="text-center my-12">
    <h2 className="text-3xl font-bold text-slate-100 mb-4">Bem-vindo ao Deconstrutor de Prompts de IA</h2>
    <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-8">
      Curioso sobre o que torna um prompt de IA eficaz? Cole um prompt na caixa acima, ou experimente um dos nossos exemplos, para ver uma análise detalhada das técnicas de engenharia de prompts utilizadas.
    </p>
    <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {examplePrompts.map((prompt, index) => (
        <div key={index} className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col">
          <p className="text-slate-300 flex-grow">"{prompt}"</p>
          <button 
            onClick={() => onExampleClick(prompt)}
            className="mt-4 px-4 py-2 bg-slate-700 text-cyan-300 font-semibold rounded-md hover:bg-slate-600 transition-colors self-start"
          >
            Analisar este exemplo
          </button>
        </div>
      ))}
    </div>
  </div>
);
