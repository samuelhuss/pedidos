import { useState, useEffect, useRef, FC } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Settings, Play, Pause, RotateCcw, Plus, Minus } from "lucide-react";
interface AnimatedScoreProps {
  score: number;
  color: string;
}

const AnimatedScore: FC<AnimatedScoreProps> = ({ score, color }) => {
  return (
    <motion.div
      key={score}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="text-[200px] md:text-[280px] lg:text-[320px] font-bold text-black leading-none tracking-tighter"
      style={{ color }} // Define a cor dinamicamente
    >
      {score}
    </motion.div>
  );
};


interface Team {
  name: string;
  score: number;
}

interface TimerInput {
  minutes: number;
  seconds: number;
}

export const Scoreboard: FC = () => {
  const [teamA, setTeamA] = useState<Team>({
    name: "Sharks",
    score: 0,
  });

  const [teamB, setTeamB] = useState<Team>({
    name: "Panthers",
    score: 0,
  });

  const [time, setTime] = useState<number>(600);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [timerInput, setTimerInput] = useState<TimerInput>({
    minutes: Math.floor(time / 60),
    seconds: time % 60,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Timer functions
  const startTimer = () => {
    if (!isRunning && time > 0) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRunning(false);
    setTime(600);
    setTimerInput({
      minutes: 10,
      seconds: 0,
    });
  };

  const applyTimerSettings = () => {
    const newTimeInSeconds = timerInput.minutes * 60 + timerInput.seconds;
    setTime(newTimeInSeconds);
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setTimerInput({
      minutes: Math.floor(time / 60),
      seconds: time % 60,
    });
  }, [time]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-full bg-black rounded-xl shadow-md overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="p-4 text-center border-b border-gray-200">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            RESILIENCE
          </h1>
        </div>

        {/* Main Scoreboard */}
        <div className="flex flex-col md:flex-row">
          {/* Team A */}
          <div className="flex-1 p-6 text-center border-b md:border-b-0 md:border-r border-gray-200">
            <h2 className="text-xl md:text-2xl font-medium text-white mb-2">
              {teamA.name}
            </h2>
            <AnimatedScore score={teamA.score} color="#2d69ef" />
          </div>

          {/* Center Timer Section */}
          <div className="p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
            <div className="text-4xl md:text-5xl font-mono font-bold text-white mb-4">
              {formatTime(time)}
            </div>

            {/* Timer Controls */}
            <div className="flex space-x-2 mb-4">
              {!isRunning ? (
                <Button
                  variant="default"
                  size="icon"
                  onClick={startTimer}
                  className="border-gray-300 hover:bg-gray-100 text-white"
                >
                  <Play className="h-5 w-5" />
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="icon"
                  onClick={pauseTimer}
                  className="border-gray-300 hover:bg-gray-100 text-white"
                >
                  <Pause className="h-5 w-5" />
                </Button>
              )}
              <Button
                variant="default"
                size="icon"
                onClick={resetTimer}
                className="border-gray-300 hover:bg-gray-100 text-white"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>

            {/* Settings Button */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="border-gray-300 hover:bg-gray-100 text-white"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-white">
                <DialogHeader>
                  <DialogTitle>Controle </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {/* Team Names */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block text-gray-700">
                        Time A
                      </label>
                      <Input
                        value={teamA.name}
                        onChange={(e) =>
                          setTeamA({ ...teamA, name: e.target.value })
                        }
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block text-gray-700">
                      Time B
                      </label>
                      <Input
                        value={teamB.name}
                        onChange={(e) =>
                          setTeamB({ ...teamB, name: e.target.value })
                        }
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  {/* Timer Settings */}
                  <div>
                    <label className="text-sm font-medium mb-1 block text-gray-700">
                      Timer (MM:SS)
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        min="0"
                        max="99"
                        value={timerInput.minutes}
                        onChange={(e) =>
                          setTimerInput({
                            ...timerInput,
                            minutes: Number.parseInt(e.target.value) || 0,
                          })
                        }
                        className="border-gray-300"
                      />
                      <span className="flex items-center">:</span>
                      <Input
                        type="number"
                        min="0"
                        max="59"
                        value={timerInput.seconds}
                        onChange={(e) =>
                          setTimerInput({
                            ...timerInput,
                            seconds: Number.parseInt(e.target.value) || 0,
                          })
                        }
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  {/* Score Controls */}
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {/* Team A Score Controls */}
                    <div className="border border-gray-200 rounded-lg p-3">
                      <h3 className="font-medium text-gray-800 mb-2">
                        {teamA.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            setTeamA({
                              ...teamA,
                              score: Math.max(0, teamA.score - 50),
                            })
                          }
                          className="border-gray-300"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-xl font-bold">{teamA.score}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            setTeamA({ ...teamA, score: teamA.score + 50 })
                          }
                          className="border-gray-300"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Team B Score Controls */}
                    <div className="border border-gray-200 rounded-lg p-3">
                      <h3 className="font-medium text-gray-800 mb-2">
                        {teamB.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            setTeamB({
                              ...teamB,
                              score: Math.max(0, teamB.score - 50),
                            })
                          }
                          className="border-gray-300"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-xl font-bold">{teamB.score}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            setTeamB({ ...teamB, score: teamB.score + 50 })
                          }
                          className="border-gray-300"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <Button
                    onClick={applyTimerSettings}
                    className="w-full mt-2 bg-black hover:bg-gray-800 text-white"
                  >
                    Aplicar mudanças
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Team B */}
          <div className="flex-1 p-6 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white mb-2">
              {teamB.name}
            </h2>
            <AnimatedScore score={teamB.score} color="#9333ea" />
          </div>
        </div>
      </div>
    </div>
  );
}
