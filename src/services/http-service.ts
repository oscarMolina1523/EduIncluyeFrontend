import { baseUrl } from "../utils/BaseUrl";

export default class HTTPService {
  baseUrl = "";
  token = "";

  constructor() {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem("authToken") || "";
  }

  async get(path: string) {
    try {
      const url = `${this.baseUrl}/${path}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async post(path: string, body: any) {
    try {
      const url = `${this.baseUrl}/${path}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  }

  async put(path:string, body:any) {
        try {
            const url = `${this.baseUrl}/${path}`;

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token}`,
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error putting data:', error);
            throw error;
        }
    }

}
