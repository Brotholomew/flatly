import ResourceService from "services/ResourceService";

class BookingService extends ResourceService {
  protected resource = 'bookings';
}

export default new BookingService()