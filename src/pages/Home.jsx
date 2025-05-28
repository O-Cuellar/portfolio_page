import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

//Arrow function paameter of terminal lines
const TerminalLine = ({ prompt, text, delay = 15, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[indexRef.current]);
      indexRef.current++;

      if (indexRef.current === text.length) {
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
      <style>{`
        .cursor {
          animation: blink 1s step-start 0s infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  //Arrray key/value of text
  const lines = [
    { prompt: "user@portfolio:~$", text: 'echo "name"' },
    { prompt: "->", text: "Otavio Cuellar" },
    { prompt: "user@portfolio:~$", text: "cat skills.txt" },
    { prompt: "->", text: "React.js, Python, Java, C, Linux" },
    { prompt: "user@portfolio:~$", text: "cat contato.txt" },
    { prompt: "->", text: "cuellarotavio4@gmail.com" },
    { prompt: "user@portfolio:~$", text: "./userportfolio" },
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState([]);

  //Arrow function for handle lines of terminal simulation
  const handleLineComplete = useCallback(() => {
    setCompletedLines((prev) => {
      const newLine = lines[currentLineIndex];

      if (newLine.text === "./userportfolio") {
        return [...prev, { ...newLine, isPortfolio: true }]; // flag para mostrar botão
      }

      return [...prev, newLine];
    });
    setCurrentLineIndex((prev) => prev + 1);
  }, [lines]);

  return (
    <div
      style={{
        backgroundColor: "#000000",
        color: "#33ff33",
        height: "100vh",
        width: "100vw",
        fontFamily: "'Fira Code', monospace",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
        overflowWrap: "break-word",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          maxWidth: "800px",
          width: "100%",
          padding: "2rem",
        }}
      >
        {completedLines.map((line, i) => {
          let textColor = "#33ff33"; // green for the comands

          if (
            line.text.includes("Otavio Cuellar") ||
            line.text.includes("React.js, Python, Java, C, Linux") ||
            line.text.includes("cuellarotavio4@gmail.com")
          ) {
            textColor = "#ffffff"; // white for important informations
          }

          if (line.isPortfolio) {
            return (
              <div
                key={i}
                style={{
                  fontFamily: "'Fira Code', monospace",
                  color: "#33ff33",
                  whiteSpace: "pre-wrap",
                }}
              >
                <div>
                  <span style={{ color: "#00ff00" }}>{line.prompt}</span>{" "}
                  {line.text}
                </div>
                {/*Botões em estilo terminal*/}
                <div style={{ marginTop: "1rem" }}>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <a
                      href="https://github.com/O-Cuellar"
                      target="_blank"
                      className="link-terminal"
                    >
                      <span style={{ color: "#00ff00" }}>➜</span> GitHub
                    </a>
                  </div>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <Link to="/portfolio" className="link-terminal">
                      <span style={{ color: "#00ff00" }}>➜</span> Portfolio
                    </Link>
                  </div>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <a
                      href="https://www.linkedin.com/in/ot%C3%A1vio-cuellar-0b98741b6/"
                      target="_blank"
                      className="link-terminal"
                    >
                      <span style={{ color: "#00ff00" }}>➜</span> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            );
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
              {line.text}
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
            style={{ fontFamily: "'Fira Code', monospace", color: "#00ff00" }}
          >
            user@portfolio:~$ <span className="cursor">|</span>
            <style>{`
              .cursor {
                animation: blink 1s step-start 0s infinite;
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}
