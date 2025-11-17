import React, { useState, useCallback } from 'react';
import { parseScriptIntoScenes, generateImageForScene } from './services/geminiService';
import type { StoryboardScene } from './types';
import ScriptInput from './components/ScriptInput';
import StoryboardDisplay from './components/StoryboardDisplay';
import Header from './components/Header';
import ErrorDisplay from './components/ErrorDisplay';

function App() {
  const [script, setScript] = useState<string>('');
  const [storyboard, setStoryboard] = useState<StoryboardScene[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerateStoryboard = useCallback(async () => {
    if (!script.trim()) {
      setError('Please enter a script before generating.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setStoryboard([]);

    try {
      setLoadingMessage('Analyzing your script and creating scene descriptions...');
      const scenes = await parseScriptIntoScenes(script);
      
      if (!scenes || scenes.length === 0) {
        setError('Could not extract any scenes from the script. Please try rewriting it.');
        setIsLoading(false);
        return;
      }

      const imageGenerationPromises = scenes.map(async (scene, index) => {
        setLoadingMessage(`Generating image for scene ${index + 1} of ${scenes.length}...`);
        const imageUrl = await generateImageForScene(scene.image_prompt);
        return {
          ...scene,
          imageUrl,
        };
      });

      const generatedStoryboard = await Promise.all(imageGenerationPromises);
      setStoryboard(generatedStoryboard);

    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate storyboard. Please try again. Details: ${errorMessage}`);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [script]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="p-4 sm:p-6 md:p-8">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-cyan-400">Your Script</h2>
            <ScriptInput
              script={script}
              onScriptChange={setScript}
              onGenerate={handleGenerateStoryboard}
              isLoading={isLoading}
            />
             {error && <ErrorDisplay message={error} />}
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-cyan-400">Generated Storyboard</h2>
            <StoryboardDisplay
              scenes={storyboard}
              isLoading={isLoading}
              loadingMessage={loadingMessage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
