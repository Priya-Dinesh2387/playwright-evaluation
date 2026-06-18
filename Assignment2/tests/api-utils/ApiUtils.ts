import { APIRequestContext, request } from '@playwright/test';

export interface AuthResponse {
  token: string;
}

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface BookingPayload {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}

export interface CreateBookingResponse {
  bookingid: number;
  booking: BookingPayload;
}

export class ApiUtils {

  private requestContext!: APIRequestContext;

  async init(): Promise<void> {
    this.requestContext = await request.newContext({
      baseURL: 'https://restful-booker.herokuapp.com'
    });
  }

  async getToken(): Promise<string> {

    const response = await this.requestContext.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    const body: AuthResponse = await response.json();
    return body.token;
  }

  async createBooking(): Promise<{
    token: string;
    bookingId: number;
    payload: BookingPayload;
  }> {

    const payload: BookingPayload = {
      firstname: 'John',
      lastname: 'Doe',
      totalprice: 1200,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-06-17',
        checkout: '2026-06-20'
      },
      additionalneeds: 'Breakfast'
    };

    const response = await this.requestContext.post('/booking', {
      data: payload
    });

    const body: CreateBookingResponse = await response.json();
    const token: string = await this.getToken();

    return {
      token,
      bookingId: body.bookingid,
      payload
    };
  }
}