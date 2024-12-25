import { useEffect, useState } from "react";
import { roomList, createRoom } from '../lib/api.ts'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showTimerInput, setShowTimerInput] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleCreateRoom = async () => {
    if (isAuthenticated) {
      setShowTimerInput(true);
      
      const token = localStorage.getItem("token");
      const userId = token;

      try {
        const response = await fetch("http://localhost:8008/rooms/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `GayPorno ${token}`,
          },
          body: JSON.stringify({
            password: "somepass", 
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const roomId = data.room_id;
          window.location.href = `/room/${roomId}`; 
        } else {
          alert("Ошибка при создании комнаты");
        }
      } catch (error) {
        console.error("Error creating room:", error);
        alert("Ошибка при создании комнаты");
      }
    } else {
      alert("Вы должны войти в аккаунт, чтобы создать комнату!");
    }
  };

  const handleGetRoomsList = async () => {
    try {
      
    } catch (error) {
      
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">BesBarmaq</h1>
        <button
            onClick={handleCreateRoom}
            className="mt-6 px-6 py-3 bg-yellow-500 text-zinc-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Создать комнату
          </button>
      </div>
      <div className="bg-gray-500 max-w-100h">
        //

      </div>
    </div>
  );
}
