import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../utils/BaseUrl";

export default class HTTPService {
  baseUrl = "";

  constructor() {
    this.baseUrl = baseUrl;
  }

  async getToken() {
    const storedToken = await AsyncStorage.getItem("authToken");
    return storedToken || "";
  }

  async get(path: string) {
    try {
      const token = await this.getToken();
      const url = `${this.baseUrl}/${path}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async post(path: string, body: any) {
    try {
      const token = await this.getToken();
      const url = `${this.baseUrl}/${path}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  }

  async put(path: string, body: any) {
    try {
      const token = await this.getToken();
      const url = `${this.baseUrl}/${path}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error putting data:", error);
      throw error;
    }
  }

  async delete(path: string) {
    try {
      const token = await this.getToken();
      const url = `${this.baseUrl}/${path}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  }
}
