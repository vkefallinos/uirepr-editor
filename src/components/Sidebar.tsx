import React, { useState } from 'react';
import { Plus, File } from 'lucide-react';

interface SidebarProps {
  files: string[];
  onFileCreate: (filename: string) => void;
  onFileSelect: (filename: string) => void;
  currentFile: string;
}

const Sidebar: React.FC<SidebarProps> = ({ files, onFileCreate, onFileSelect, currentFile }) => {
  const [newFileName, setNewFileName] = useState('');

  const handleCreateFile = () => {
    if (newFileName && !files.includes(newFileName)) {
      onFileCreate(newFileName.endsWith('.tsx') ? newFileName : `${newFileName}.tsx`);
      setNewFileName('');
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Files</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          placeholder="New file name"
          className="w-full p-2 text-black"
        />
        <button
          onClick={handleCreateFile}
          className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center"
        >
          <Plus size={16} className="mr-2" /> Create File
        </button>
      </div>
      <ul>
        {files.map((file) => (
          <li
            key={file}
            className={`cursor-pointer py-2 px-4 rounded ${
              file === currentFile ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
            onClick={() => onFileSelect(file)}
          >
            <File size={16} className="inline-block mr-2" />
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;