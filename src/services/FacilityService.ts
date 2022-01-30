import ResourceService from "services/ResourceService";

class FlatService extends ResourceService {
    protected resource = 'facilities';
}

export default new FlatService()