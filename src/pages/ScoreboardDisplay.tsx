import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";

export function ScoreboardDisplay() {
  // Recupera os dados da localStorage
  const scoreboardData = JSON.parse(localStorage.getItem("scoreboard") || "{}");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold tracking-tighter mb-6 text-center">Placar do Acampamento</h1>

      <div className="w-full max-w-4xl bg-gray-50 p-6 rounded-xl shadow-md">
        <div className="flex justify-around">
          <Card className="w-1/3 p-6 bg-purple-100 rounded-xl shadow-md flex flex-col items-center">
            <Text className="text-xl font-semibold text-purple-800">Time Roxo</Text>
            <Text className="text-4xl font-bold text-purple-900">{scoreboardData?.teamScores?.roxo || 0}</Text>
          </Card>

          <Card className="w-1/3 p-6 bg-blue-100 rounded-xl shadow-md flex flex-col items-center">
            <Text className="text-xl font-semibold text-blue-800">Time Azul</Text>
            <Text className="text-4xl font-bold text-blue-900">{scoreboardData?.teamScores?.azul || 0}</Text>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Text className="text-4xl font-semibold text-gray-900">
            {scoreboardData?.timer
              ? `${Math.floor(scoreboardData.timer / 60)}:${String(scoreboardData.timer % 60).padStart(2, "0")}`
              : "00:00"}
          </Text>
        </div>
      </div>
    </div>
  );
}
