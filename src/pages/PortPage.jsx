import { useEffect, useState, useRef, useCallback } from "react";
import "./PortPage.css";

//Arrow function for manipulation of index lines
const TerminalLine = ({ prompt, text, delay = 15, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0); //

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[indexRef.current]);
      indexRef.current++;

      if (indexRef.current >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay, onComplete]);

  return (
    <div
      style={{
        fontFamily: "'Fira Code', monospace",
        color: "#33ff33",
        whiteSpace: "pre-wrap",
      }}
    >
      <span style={{ color: "#00ff00" }}>{prompt}</span> {displayedText}
      <span className="cursor">|</span>
    </div>
  );
};

export default function Portfolio() {
  const lines = [
    { prompt: "user@portfolio:~$", text: "ls" },
    { prompt: "user@portfolio:~$", text: "portfolio.txt" },
    { prompt: "user@portfolio:~$", text: "cat portfolio.txt" },
    { prompt: "->", text: "SECRET WORD" },
    {
      prompt: "-Sinopse:",
      text: "Mini-game de adivinhação de palavras, estilo programa Silvio Santos, feito para treinar habilidades front-end",
    },
    { prompt: "-Tecnologias:", text: "React.js, Vite" },
    { prompt: "-Link:", text: "https://github.com/O-Cuellar/secretword" },
    { prompt: "->", text: "COMPILADOR LEX-PASCAL" },
    {
      prompt: "-Sinopse:",
      text: "Análise léxica e separação de tokens e lexemas de um código Pascal, retornando-os",
    },
    { prompt: "-Tecnologias:", text: "Java" },
    {
      prompt: "-Link:",
      text: "https://github.com/O-Cuellar/Compilador-LexPascal",
    },
    { prompt: "->", text: "LANDING PAGE TERMINAL LINUX" },
    {
      prompt: "-Sinopse:",
      text: "Minha landing page feita para simular um terminal linux e seus comandos",
    },
    { prompt: "-Tecnologias:", text: "React.js, Vite" },
    {
      prompt: "-Link:",
      text: "https://github.com/O-Cuellar/portfolio-page/tree/main/portfolio_page",
    },
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState([]);

  const handleLineComplete = useCallback(() => {
    setCompletedLines((prev) => [...prev, lines[prev.length]]);
    setCurrentLineIndex((prev) => prev + 1);
  }, [lines]);

  return (
    <div className="show1">
      <div className="show2">
        {completedLines.map((line, i) => {
          const isLink = line.text.startsWith("http");

          let textColor = "#33ff33";

          if (
            line.text.includes("SECRET") ||
            line.text.includes("COMPILADOR") ||
            line.text.includes("LANDING") ||
            line.text.includes("Java") ||
            line.text.includes("React") ||
            line.text.includes("landing") ||
            line.text.includes("lexemas") ||
            line.text.includes("adivinhação")
          ) {
            textColor = "#ff33ff";
          } else if (line.text.includes("https")) {
            textColor = "#077535";
          }
          return (
            <div
              key={i}
              style={{
                fontFamily: "'Fira Code', monospace",
                color: textColor,
                whiteSpace: "pre-wrap",
              }}
            >
              <span style={{ color: "#00ff00" }}>{line.prompt}</span>{" "}
              {isLink ? (
                <a
                  href={line.text}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#33ff33", textDecoration: "underline" }}
                >
                  {line.text}
                </a>
              ) : (
                line.text
              )}
            </div>
          );
        })}

        {currentLineIndex < lines.length && (
          <TerminalLine
            key={currentLineIndex}
            prompt={lines[currentLineIndex].prompt}
            text={lines[currentLineIndex].text}
            delay={30}
            onComplete={handleLineComplete}
          />
        )}

        {currentLineIndex >= lines.length && (
          <div
            className="cursor"
            style={{ fontFamily: "'Fira Code', monospace", color: "#00ff00" }}
          >
            user@portfolio:~$ <span className="cursor">|</span>
          </div>
        )}
      </div>
    </div>
  );
}
