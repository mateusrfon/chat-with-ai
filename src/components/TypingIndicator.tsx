function TypingIndicator() {
  return (
    <>
      <span className="dot animate-dot1">.</span>
      <span className="dot animate-dot2">.</span>
      <span className="dot animate-dot3">.</span>

      <style>{`
        .dot {
          display: inline-block;
          font-weight: bold;
          font-size: 1.2rem;
          color: #555;
          animation: bounce 1.4s infinite ease-in-out;
        }

        .animate-dot1 { animation-delay: 0s; }
        .animate-dot2 { animation-delay: 0.2s; }
        .animate-dot3 { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  );
}

export default TypingIndicator;