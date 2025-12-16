import axios, { AxiosInstance } from "axios";
import {
  Session,
  Message,
  ApiResponse,
  FeedbackPayload,
  QuestionPayload,
} from "@/types";
import { API_BASE_URL } from "@/utils/constants";

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if exists
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Chat endpoints
  async startNewChat(): Promise<
    ApiResponse<{ sessionId: string; title: string; createdAt: string }>
  > {
    try {
      const response = await this.client.post("/chat/start");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async sendMessage(
    sessionId: string,
    question: string
  ): Promise<ApiResponse<Message>> {
    try {
      const response = await this.client.post<ApiResponse<Message>>(
        `/chat/${sessionId}/message`,
        { question } as QuestionPayload
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateFeedback(
    sessionId: string,
    messageId: number,
    feedback: "like" | "dislike"
  ): Promise<ApiResponse<Message>> {
    try {
      const response = await this.client.put<ApiResponse<Message>>(
        `/chat/${sessionId}/message/${messageId}/feedback`,
        { feedback } as FeedbackPayload
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Session endpoints
  async getAllSessions(): Promise<ApiResponse<Session[]>> {
    try {
      const response = await this.client.get<ApiResponse<Session[]>>(
        "/sessions"
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getSessionDetails(sessionId: string): Promise<ApiResponse<Session>> {
    try {
      const response = await this.client.get<ApiResponse<Session>>(
        `/sessions/${sessionId}`
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteSession(sessionId: string): Promise<ApiResponse<void>> {
    try {
      const response = await this.client.delete<ApiResponse<void>>(
        `/sessions/${sessionId}`
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    try {
      const response = await this.client.get("/health");
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return { status: "error", message: "Backend is unavailable" };
    }
  }

  private handleError<T = void>(error: unknown): ApiResponse<T> {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error:
          error.response?.data?.error || error.message || "An error occurred",
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

export const apiService = new ApiService();
