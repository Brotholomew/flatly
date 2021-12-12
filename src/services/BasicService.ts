import AxiosInstance from "services/AxiosInstance";

export default abstract class BasicService {
  protected axios = AxiosInstance;
}
