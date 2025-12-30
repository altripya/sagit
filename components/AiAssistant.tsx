
import React, { useState, useRef, useEffect } from 'react';
import { getRealEstateAdvice } from '../services/geminiService';
import { Message, Property } from '../types';

interface AiAssistantProps {
  properties: Property[];
}

const AiAssistant: React.FC<AiAssistantProps> = ({ properties }) => {
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

    const aiResponse = await getRealEstateAdvice(input, properties);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[600px] sticky top-24">
      <div className="bg-slate-900 p-6 flex items-center space-x-reverse space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-600 shadow-lg relative shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" 
            alt="שגית פלק" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
        </div>
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">עוזר נדל"ן אישי</h3>
          <p className="text-slate-400 text-xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            שגית זמינה עבורך
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-amber-600 text-white rounded-tr-none shadow-md shadow-amber-600/10' 
                : 'bg-white shadow-sm border border-gray-100 text-slate-800 rounded-tl-none text-right'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100 flex space-x-reverse space-x-1">
              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce delay-75"></div>
              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce delay-150"></div>
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
          className="flex-1 bg-gray-100 border-none rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-amber-600 transition-all text-right"
        />
        <button 
          onClick={handleSend}
          className="bg-slate-900 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors shrink-0 shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AiAssistant;
