const STORAGE_KEY = 'bookings';

export const bookingService = {
  saveBooking(booking) {
    const existingBookings = this.getBookings();
    const updatedBookings = [...existingBookings, booking];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
  },

  getBookings() {
    const bookingsJson = localStorage.getItem(STORAGE_KEY);
    return bookingsJson ? JSON.parse(bookingsJson) : [];
  },

  deleteBooking(bookingId) {
    const existingBookings = this.getBookings();
    const updatedBookings = existingBookings.filter(booking => booking.id !== bookingId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
  },

  getBooking(bookingId) {
    const bookings = this.getBookings();
    return bookings.find(booking => booking.id === bookingId);
  }
};
