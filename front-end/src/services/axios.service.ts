import axios from "axios";
import IInvoice from "../interfaces/invoice.interface";

class AxiosService {
  private readonly service;
  private readonly path: string;
  constructor() {
    this.service = axios;
    this.path = "http://localhost:4000";
  }

  get(entity: string, filter?: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.service.get(
          `${this.path}/${entity}${
            filter ? "?filter=" + JSON.stringify(filter) : ""
          }`
        );
        resolve(result.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  post(entity: string, object: IInvoice) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.service.post(
          `${this.path}/${entity}`,
          object
        );
        resolve(result.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  delete(entity: string, id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.service.delete(
          `${this.path}/${entity}/${id}`
        );
        resolve(result.data);
      } catch (error) {
        reject(error);
      }
    });
  }
}
export default new AxiosService();
