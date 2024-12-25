import axios from 'axios'

const API_URL = "http://localhost:8008"

export const loginUser = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password },
        
      );
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("newtokenomg", response.data.token)

      return response.data.token; 
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid username or password");
    }
  };


export const registerUser = async (
    username: string,
    password: string
  ) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        password
      });
      localStorage.setItem("token", response.data.token)
      return response.data;
    } catch (error: any) {
      console.error("Registration error:", error);
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

export const getStat = async (
    wpm: number,
    accuracy: number
    ) => {
        try {
            const response = await axios.post(`${API_URL}/set-statistics`, {
                wpm, accuracy
            });
            return response.data;
        } catch (error: any){
            console.log("Get statistics error: ", error)
            throw new Error(error.response?.data?.message || "Statistics failed")
        }
    }


export const getUserStat = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-my-statistics`);
        return response.data
    } catch (error: any) {
        console.log("Get personal statistics error: ", error)
        throw new Error (error.response?.data?.message || "Personal statistics data error")
    }
}


export const createRoom = async (token: string, password: string) => {
    try {
        const response = await axios.post(
            `${API_URL}/rooms/`,
            { password }, 
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Meow ${token}`,
                }
            }
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error creating room:", error);
        throw new Error("Ошибка при создании комнаты");
    }
};


export const roomData = async (roomId:string) => {
    try {
        const response = await axios.get(`${API_URL}/rooms/${roomId}`);
        return response.data
    } catch (error: any) {
        console.log("Get room statistics error: ", error)
        throw new Error (error.response?.data?.message || "Room statistic data error")
    }
}

export const roomsList = async () => {
    try {
        const response = await axios.get(`${API_URL}/rooms`);
        return response.data
    } catch (error: any) {
        console.log("Get room list error: ", error)
        throw new Error (error.response?.data?.message || "Room statistic data error")
    }
}