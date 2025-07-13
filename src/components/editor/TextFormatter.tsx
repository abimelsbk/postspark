import React, { useState } from 'react';
import { X, Copy, Check, Download } from 'lucide-react';
import { textStyles } from '../../utils/textStyles';

interface TextFormatterProps {
  onClose: () => void;
  onInsert: (text: string) => void;
}

export const TextFormatter: React.FC<TextFormatterProps> = ({ onClose, onInsert }) => {
  const [inputText, setInputText] = useState('Transform your text with beautiful styles');
  const [copiedStyle, setCopiedStyle] = useState<string | null>(null);

  const copyToClipboard = async (text: string, styleName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStyle(styleName);
      setTimeout(() => setCopiedStyle(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedStyle(styleName);
      setTimeout(() => setCopiedStyle(null), 2000);
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white border-l border-accent-200 shadow-2xl z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-accent-200 p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Unicode Text Formatter</h3>
          <button
            onClick={onClose}
            className="p-2 text-accent-400 hover:text-accent-600 hover:bg-accent-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Input Text
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to transform..."
            rows={3}
            className="w-full px-3 py-2 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors text-sm resize-none"
          />
          <p className="text-xs text-accent-500 mt-1">
            ✨ Try: "Hello World", "Success Story", or any text you want to style
          </p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {textStyles.map((style) => {
          const transformedText = style.transform(inputText);
          return (
            <div key={style.name} className="bg-accent-50 rounded-lg p-4 hover:bg-accent-100 transition-colors border border-accent-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 text-sm">{style.name}</h4>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyToClipboard(transformedText, style.name)}
                    className="p-1.5 text-accent-500 hover:text-primary-500 hover:bg-white rounded transition-colors"
                    title="Copy to clipboard"
                  >
                    {copiedStyle === style.name ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => onInsert(transformedText)}
                    className="p-1.5 text-primary-500 hover:text-primary-600 hover:bg-white rounded transition-colors"
                    title="Insert into editor"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded border border-accent-200 p-3 min-h-[60px] flex items-center mb-3">
                <p className="text-gray-800 text-sm leading-relaxed break-all font-medium">
                  {transformedText}
                </p>
              </div>
              
              <p className="text-xs text-accent-500 leading-relaxed">
                {style.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-0 bg-white border-t border-accent-200 p-4">
        <div className="text-center">
          <p className="text-xs text-accent-500 mb-2">
            💡 Pro Tip: Copy styled text and paste directly into LinkedIn, Twitter, or any social platform!
          </p>
          <div className="flex items-center justify-center space-x-2 text-xs text-accent-400">
            <span>25+ Styles Available</span>
            <span>•</span>
            <span>Unicode Compatible</span>
          </div>
        </div>
      </div>
    </div>
  );
};