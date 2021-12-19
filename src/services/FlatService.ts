import ResourceService from "services/ResourceService";

class FlatService extends ResourceService {
  protected resource = 'flats';
}

export default new FlatService()
