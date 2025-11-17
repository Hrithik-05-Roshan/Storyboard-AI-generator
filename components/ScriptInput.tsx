import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface ScriptInputProps {
  script: string;
  onScriptChange: (script: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const ScriptInput: React.FC<ScriptInputProps> = ({ script, onScriptChange, onGenerate, isLoading }) => {
  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-lg p-4 gap-4">
      <textarea
        value={script}
        onChange={(e) => onScriptChange(e.target.value)}
        placeholder="Paste your script here...\n\nExample:\n\nSCENE START\n\nA young astronaut, EVA, drifts in space, tethered to her small ship. The Earth hangs like a giant blue marble below her. She looks awestruck.\n\nEVA\n(whispering)\nIt's... beautiful.\n\nSuddenly, a red alert flashes on her wrist display.\n\nSCENE END"
        className="w-full flex-grow bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 resize-none min-h-[300px] lg:min-h-[500px]"
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500"
      >
        <SparklesIcon />
        {isLoading ? 'Generating...' : 'Generate Storyboard'}
      </button>
    </div>
  );
};

export default ScriptInput;
