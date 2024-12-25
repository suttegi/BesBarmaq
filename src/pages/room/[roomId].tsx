import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dictionary from "../../dictionary/dictionary";
import { shuffle } from "../../utils/utils";
import { motion } from "framer-motion";

enum State {
  REMAINING,
  ERROR,
  TYPED,
  SKIPPED,
}

type Part = {
  character: string;
  state: State;
};

type GameState = {
  position: number;
  sequence: Part[];
};

const alphabet = new Set(
  [...Array(26)].map((_, i) => String.fromCharCode(i + "a".charCodeAt(0)))
);
alphabet.add(" ");

const BesBarmaq = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errorPos, setErrorPos] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const router = useRouter();

  const { roomId } = router.query;

  useEffect(() => {
    const { timer } = router.query;
    if (timer) {
      setTimeLeft(Number(timer));
    }
  }, [router.query]);

  useEffect(() => {
    const words = shuffle(dictionary).slice(0, 50);
    const text = words.join(" ");
    const newGameState = {
      position: 0,
      sequence: Array.from(text).map((character: string) => ({
        character,
        state: State.REMAINING,
      })),
    };
    setGameState(newGameState);
    render(newGameState);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            clearInterval(interval!);
            endGame();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const render = (gameState: GameState) => {
    if (gameOver) return;

    const textHtml = gameState.sequence
      .map(({ character, state }: Part, idx) => {
        let cls = [];
        switch (state) {
          case State.REMAINING:
            break;
          case State.ERROR:
            cls.push("text-red-500");
            break;
          case State.TYPED:
            cls.push("text-green-500");
            break;
          case State.SKIPPED:
            cls.push("text-yellow-500");
            break;
        }
        if (idx === gameState.position) {
          cls.push("border-l-2 border-yellow-400");
        }
        return `<span class="${cls.join(" ")}">${character}</span>`;
      })
      .join("");
    const textElm = document.getElementById("text");
    if (textElm) textElm.innerHTML = textHtml;
  };

  const startGame = () => {
    setIsActive(true);
    if (!startTime) setStartTime(performance.now());
  };

  const onKeyPress = (e: KeyboardEvent) => {
    e.preventDefault();
    if (!gameState || timeLeft === 0 || gameState.position >= gameState.sequence.length) {
      window.removeEventListener("keydown", onKeyPress);
      return;
    }

    if (!isActive) startGame();

    const key = e.key.toLowerCase();
    const lastPosition = gameState.position;

    if (key === "backspace") {
      if (gameState.position > 0) {
        gameState.position--;
        gameState.sequence[gameState.position].state = State.REMAINING;
      }
    } else if (alphabet.has(key)) {
      const current = gameState.sequence[gameState.position];
      if (current.character === key) {
        current.state = State.TYPED;
        if (key === " ") {
          setWordCount((prev) => prev + 1);
        }
        gameState.position++;
      } else {
        current.state = State.ERROR;
        errorPos.add(gameState.position);
        gameState.position++;
      }
    }

    if (lastPosition !== gameState.position) {
      render(gameState);
    }

    if (gameState.position >= gameState.sequence.length) {
      endGame();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [gameState, isActive]);

  const endGame = () => {
    if (gameState && startTime) {
      const endTime = performance.now();
      const duration = (endTime - startTime) / 1000;
      const totalErrors = errorPos.size;
      const totalLetters = gameState.sequence.length;
      const calculatedWpm = wordCount / (duration / 60);
      const calculatedAccuracy = 1 - totalErrors / totalLetters;

      setWpm(Math.round(calculatedWpm));
      setAccuracy(Math.round(calculatedAccuracy * 100));
    }
    setIsActive(false);
    setGameOver(true);
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center py-6">
      <div className="w-full max-w-3xl px-4 mb-4">
        <div className="flex justify-between items-center">
          <div className="ml-4 font-mono text-3xl text-yellow-400">
            Room ID: {roomId} {/* Здесь отображаем roomId */}
          </div>
          <div className="ml-4 font-mono text-3xl text-yellow-400">{timeLeft}s</div>
        </div>
      </div>
      {gameOver ? (
        <div id="score" className="text-lg font-arial mt-6 text-yellow-400 text-center">
          <div className="text-xl text-yellow-300 mb-2">
            WPM: <span>{wpm}</span>
          </div>
          <div className="text-xl text-yellow-300">
            Accuracy: <span>{accuracy}%</span>
          </div>
        </div>
      ) : (
        <div id="game" className="text-center">
          <div id="text" className="text-xl max-w-[800px] font-mono whitespace-pre-wrap text-yellow-200"></div>
        </div>
      )}
    </div>
  );
};

export default BesBarmaq;
