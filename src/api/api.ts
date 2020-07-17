import axios, { AxiosInstance } from "axios";

export class Axios {
  private static instance: AxiosInstance;

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!Axios.instance) {
      Axios.instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
      });
    }

    return Axios.instance;
  }
}
