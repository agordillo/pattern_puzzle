import "./../assets/scss/MainScreen.scss";
import { useState, useRef, useEffect } from "react";

const GRID_SIZE = 3;
const DOT_RADIUS = 10;
const HIT_AREA_RADIUS = 30;

export default function MainScreen({ solvePuzzle, solved, solvedTrigger }) {
  const [pattern, setPattern] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState([]);
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const dotsRef = useRef([]);

  // Calculate lines between selected dots
  useEffect(() => {
    if (pattern.length < 2) {
      setLines([]);
      return;
    }

    const newLines = [];
    for (let i = 0; i < pattern.length - 1; i++) {
      const start = getDotCenter(pattern[i]);
      const end = getDotCenter(pattern[i + 1]);
      if (start && end) {
        newLines.push({ start, end });
      }
    }
    setLines(newLines);
  }, [pattern]);

  const getDotCenter = (index) => {
    const dot = dotsRef.current[index];
    if (!dot) return null;
    const rect = dot.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    return {
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top + rect.height / 2,
    };
  };

  const getDotIndexFromPoint = (x, y) => {
    if (!containerRef.current) return -1;
    const containerRect = containerRef.current.getBoundingClientRect();

    // Relative coordinates
    const relX = x - containerRect.left;
    const relY = y - containerRect.top;

    for (let i = 0; i < 9; i++) {
      const center = getDotCenter(i);
      if (!center) continue;
      const dist = Math.sqrt(
        Math.pow(relX - center.x, 2) + Math.pow(relY - center.y, 2)
      );
      if (dist < HIT_AREA_RADIUS) {
        return i;
      }
    }
    return -1;
  };

  const handleStart = (e) => {
    e.preventDefault(); // Prevent scroll
    setIsDrawing(true);
    setPattern([]);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    updateCurrentPos(clientX, clientY);

    const index = getDotIndexFromPoint(clientX, clientY);
    if (index !== -1) {
      setPattern([index]);
    }
  };

  const handleMove = (e) => {
    if (!isDrawing) return;
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    updateCurrentPos(clientX, clientY);

    const index = getDotIndexFromPoint(clientX, clientY);
    if (index !== -1 && !pattern.includes(index)) {
      // Check if we skipped a point in between (optional improvement, but good for simple version)
      // For now, simpler direct connection logic
      setPattern((prev) => [...prev, index]);
    }
  };

  const handleEnd = () => {
    setIsDrawing(false);
    if (pattern.length > 0) {
      console.log("Pattern:", pattern);
      if (solvePuzzle && !solved) {
        solvePuzzle(pattern);
      }
    }
  };

  const updateCurrentPos = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCurrentPos({
      x: clientX - rect.left,
      y: clientY - rect.top
    });
  };

  return (
    <div className="mainScreen">
      <div
        className="pattern-container"
        ref={containerRef}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd} // Stop if leaving area
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <div className="dots-grid">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`dot-wrapper ${pattern.includes(i) ? 'active' : ''}`}
              ref={el => dotsRef.current[i] = el}
            >
              <div className="dot" />
            </div>
          ))}
        </div>

        <svg className="pattern-lines">
          {lines.map((line, i) => (
            <line
              key={i}
              x1={line.start.x}
              y1={line.start.y}
              x2={line.end.x}
              y2={line.end.y}
              className="line"
            />
          ))}
          {isDrawing && pattern.length > 0 && (() => {
            const start = getDotCenter(pattern[pattern.length - 1]);
            if (!start) return null;
            return (
              <line
                x1={start.x}
                y1={start.y}
                x2={currentPos.x}
                y2={currentPos.y}
                className="line active-drag"
              />
            );
          })()}
        </svg>
      </div>
      {solved && <div className="success-message">Unlocked!</div>}
    </div>
  );
}
