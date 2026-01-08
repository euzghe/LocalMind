import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

export default function ChatList({ messages = [], isTyping = false, onStartNewChat }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // Smoothly scroll to bottom
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  // Show empty state when no messages exist
  if (messages.length === 0) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <div className="text-center max-w-xs">
          <p className="text-gray-500 mb-4">No chats yet. Start a new conversation!</p>
          {onStartNewChat && (
            <button
              onClick={onStartNewChat}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              New Chat
            </button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main ref={containerRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scroll-smooth">
      <div className="flex flex-col gap-4">
        {messages.map((m) => <ChatMessage key={m.id} message={m} />)}
        {isTyping && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}
      </div>
    </main>
  );
}
