import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import SiriButton from './SiriButton';
import { generateResponse } from './voiceUtils';

const GREETING = "Hi, how can I help you?";

const useTypewriter = (text, speed = 5) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(true);
  useEffect(() => {
    if (!text) { setDisplayed(''); setDone(true); return; }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return { displayed, done };
};

const SiriAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orbState, setOrbState] = useState('idle');
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [typingText, setTypingText] = useState('');
  const { displayed: typedResponse, done: typingDone } = useTypewriter(typingText, 5);

  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typedResponse]);

  const handleOpen = () => {
    setIsOpen(true);
    setOrbState('idle');
    setMessages([]);
    setTextInput('');
    setTypingText('');
  };

  const handleClose = () => {
    window.speechSynthesis?.cancel();
    if (panelRef.current) {
      const prefers = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.to(panelRef.current, {
        opacity: 0, y: 16, scale: 0.97,
        duration: prefers ? 0 : 0.18,
        ease: 'power2.in',
        onComplete: () => {
          setIsOpen(false);
          setMessages([]);
          setTextInput('');
          setTypingText('');
        }
      });
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const prefers = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.fromTo(panelRef.current,
      { opacity: 0, y: 20, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: prefers ? 0 : 0.35,
        ease: 'back.out(1.4)',
        onComplete: () => {
          setTypingText(GREETING);
          setMessages([{ role: 'assistant', text: GREETING }]);
          if (inputRef.current) inputRef.current.focus();
        }
      }
    );
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape' && isOpen) handleClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    const q = textInput.trim();
    if (!q || orbState === 'processing') return;
    setTextInput('');
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setOrbState('processing');
    const answer = await generateResponse(q);
    setMessages(prev => [...prev, { role: 'assistant', text: answer }]);
    setTypingText(answer);
    setOrbState('idle');
  };

  return (
    <>
      <SiriButton onClick={handleOpen} isActive={isOpen} />

      {isOpen && (
        <div
          ref={panelRef}
          className="fixed bottom-24 right-6 z-50 flex flex-col w-96 rounded-3xl overflow-hidden shadow-2xl"
          style={{
            height: 'min(560px, 80vh)',
            background: 'rgba(15,15,20,0.95)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* Header */}
          <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex-center">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 17.93V18a1 1 0 0 0-2 0v1.93A8 8 0 0 1 4.07 13H6a1 1 0 0 0 0-2H4.07A8 8 0 0 1 11 4.07V6a1 1 0 0 0 2 0V4.07A8 8 0 0 1 19.93 11H18a1 1 0 0 0 0 2h1.93A8 8 0 0 1 13 19.93z"/></svg>
              </div>
              <div>
                <p className="text-white text-sm font-medium leading-none">Sandeep's Assistant</p>
                {orbState === 'processing'
                  ? <p className="text-purple-300 text-xs mt-0.5 animate-pulse">Thinking…</p>
                  : <p className="text-green-400 text-xs mt-0.5">Online</p>
                }
              </div>
            </div>
            <button
              onClick={handleClose}
              className="size-8 flex-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Scrollable messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
          >
            {messages.map((msg, i) => {
              const isLastAssistant = msg.role === 'assistant' && i === messages.length - 1;
              const text = isLastAssistant ? typedResponse : msg.text;
              const stillTyping = isLastAssistant && !typingDone;

              return msg.role === 'user' ? (
                <div key={i} className="bubble-in self-end max-w-[85%] bg-blue-500/20 rounded-2xl rounded-br-sm px-4 py-2.5 border border-blue-400/30">
                  <p className="text-xs text-blue-300 mb-1">You</p>
                  <p className="text-white text-sm">{msg.text}</p>
                </div>
              ) : (
                <div key={i} className="bubble-in self-start max-w-[90%] bg-white/10 rounded-2xl rounded-bl-sm px-4 py-2.5 border border-white/20">
                  <p className="text-xs text-gray-400 mb-1">Siri</p>
                  <p className="text-white text-sm leading-relaxed">
                    {text}
                    {stillTyping && <span className="inline-block w-0.5 h-4 bg-white/70 ml-0.5 align-middle animate-pulse" />}
                  </p>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="shrink-0 px-4 py-3 border-t border-white/10">
            <form onSubmit={handleTextSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Ask me anything about Sandeep…"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-white placeholder-gray-400 text-sm outline-none focus:border-blue-400/60 transition-colors"
              />
              <button
                type="submit"
                disabled={!textInput.trim() || orbState === 'processing'}
                className="size-10 flex-center rounded-full bg-blue-500 hover:bg-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                aria-label="Send"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                  <path d="M2 21L23 12 2 3v7l15 2-15 2v7z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SiriAssistant;
