import BasicService from "services/BasicService";

class AuthService extends BasicService {
  public logIn(data: object) {
    return this.axios.post('auth/login', data)
  }
}

export default new AuthService()
