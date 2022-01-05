import ResourceService from "services/ResourceService";

class ImageService extends ResourceService {
  protected resource = 'images';

  public store(data: object) {
    return this.axios.post(this.resource, data, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    })
  }
}

export default new ImageService()
