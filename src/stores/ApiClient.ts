import axios, { AxiosInstance } from "axios";

const DEFAULT_API_VERSION = "v1";

export class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(
    resource: string,
    options: { apiVersion?: string; enterprise?: boolean } = {}
  ) {
    const apiVersion = options.apiVersion || DEFAULT_API_VERSION;
    let baseURL = `/api/${apiVersion}/${resource}`;

    if (options.enterprise) {
      baseURL = `/enterprise${baseURL}`;
    }

    this.axiosInstance = axios.create({ baseURL });
  }

  async get() {
    // return this.axiosInstance.get("");
    return this.axiosInstance.get("https://api.npoint.io/c0a39d00b2e850b4bee9");
  }

  async show(id: string | number) {
    return this.axiosInstance.get(`/${id}`);
  }

  async create(data: any) {
    return this.axiosInstance.post("", data);
  }

  async update(id: string | number, data: any) {
    return this.axiosInstance.patch(`/${id}`, data);
  }

  async delete(id: string | number) {
    return this.axiosInstance.delete(`/${id}`);
  }
}
