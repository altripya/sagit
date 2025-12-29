
import React, { useState, useRef, useEffect } from 'react';
import { getRealEstateAdvice } from '../services/geminiService';
import { MOCK_PROPERTIES } from '../constants';
import { Message } from '../types';

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'שלום! אני העוזר האישי של שגית פלק. איך אוכל לעזור לכם למצוא את נכס החלומות שלכם היום?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const aiResponse = await getRealEstateAdvice(input, MOCK_PROPERTIES);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[600px] sticky top-24">
      <div className="bg-slate-900 p-6 flex items-center space-x-reverse space-x-4">
        <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 7a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5z" />
          </svg>
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">עוזר נדל"ן חכם</h3>
          <p className="text-slate-400 text-xs">מופעל על ידי בינה מלאכותית</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-amber-600 text-white rounded-tr-none' 
                : 'bg-white shadow-sm border border-gray-100 text-slate-800 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-end">
            <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100 flex space-x-reverse space-x-1">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100 flex items-center space-x-reverse space-x-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="מה אתם מחפשים?"
          className="flex-1 bg-gray-100 border-none rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-amber-600 transition-all"
        />
        <button 
          onClick={handleSend}
          className="bg-slate-900 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors shrink-0"
        >
          <svg className="w-5 h-5 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AiAssistant;
