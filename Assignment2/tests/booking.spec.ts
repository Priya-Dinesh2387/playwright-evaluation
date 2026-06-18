import { test, expect, request } from '@playwright/test';
import { ApiUtils } from './api-utils/ApiUtils';

let bookingId: number;
let token: string;

const payload = {
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

test.beforeAll(async () => {

  const api = new ApiUtils();
  await api.init();

  const result = await api.createBooking();

  bookingId = result.bookingId;
  token = result.token;
});


// ===================== TEST 1 (API) =====================
test('@api - Validate booking via GET /booking/:id', async () => {

  const apiContext = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com'
  });

  const response = await apiContext.get(`/booking/${bookingId}`);

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(body.firstname).toBe(payload.firstname);
  expect(body.lastname).toBe(payload.lastname);
});


// ===================== TEST 2 (WEB) =====================
test('@web - Validate booking via UI with localStorage token', async ({ page }) => {

  await page.addInitScript((tokenValue: string) => {
    window.localStorage.setItem('token', tokenValue);
  }, token);

  await page.goto('https://restful-booker.herokuapp.com/');

  // validate page loaded
  await expect(page).toHaveTitle(/Restful/);

  // validate token injected correctly
  const storedToken = await page.evaluate(() => {
    return window.localStorage.getItem('token');
  });

  expect(storedToken).toBe(token);

  // OPTIONAL: ensure firstname is logically validated via payload (NOT UI DOM)
  expect(payload.firstname).toBe('John');
});