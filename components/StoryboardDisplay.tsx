import React from 'react';
import type { StoryboardScene } from '../types';
import Spinner from './Spinner';
import ImageIcon from './icons/ImageIcon';

interface StoryboardDisplayProps {
  scenes: StoryboardScene[];
  isLoading: boolean;
  loadingMessage: string;
}

const StoryboardDisplay: React.FC<StoryboardDisplayProps> = ({ scenes, isLoading, loadingMessage }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 w-full min-h-[400px] lg:min-h-[578px] flex flex-col">
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Spinner />
          <p className="mt-4 text-lg font-semibold text-cyan-400">Generating Your Vision</p>
          <p className="text-gray-400 mt-2">{loadingMessage}</p>
        </div>
      )}

      {!isLoading && scenes.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
          <ImageIcon className="w-24 h-24 mb-4" />
          <h3 className="text-xl font-bold">Your Storyboard Awaits</h3>
          <p>Enter a script and click "Generate" to see your story come to life.</p>
        </div>
      )}

      {!isLoading && scenes.length > 0 && (
        <div className="overflow-y-auto h-full pr-2 space-y-6">
          {scenes.map((scene, index) => (
            <div key={index} className="bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-700">
              <div className="aspect-w-16 aspect-h-9 bg-gray-700">
                <img src={scene.imageUrl} alt={scene.scene_description} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-300 italic">"{scene.scene_description}"</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryboardDisplay;
