'use client'
// ClientTextArea.tsx
import React, { useState } from 'react';

const ClientTextArea: React.FC = () => {
  const [text, setText] = useState('');
  console.log('rendering textarea @ client');
  return (
    <div className="p-4 flex flex-col min-h-screen max-h-screen">
      <div className="flex-grow mb-4 overflow-y-auto break-words">
        Preview: <span className="font-bold">{text}</span>
      </div>
      <div className="relative">
        <textarea
          className="w-full p-2 pr-16 border rounded flex-grow"
          style={{ resize: "none" }}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          className="absolute p-1 bg-blue-500 text-white rounded"
          style={{ right: '4px', bottom: '50%', transform: 'translateY(50%)' }}
          onClick={() => console.log(text)}
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default ClientTextArea;

