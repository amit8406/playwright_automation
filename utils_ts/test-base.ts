import { test as baseTest } from '@playwright/test';

export interface TestDataForOrder {
  username: string;
  password: string;
  productName: string;
}

export const testDataArray: TestDataForOrder[] = [
  { username: 'amit.tiparadi1@gmail.com', password: 'amitsan785', productName: 'iphone 13 pro' },
  { username: 'amit.uxboost@gmail.com', password: '$Acceltree@785', productName: 'ZARA COAT 3' },
];

export const customTest = baseTest.extend<{ testDataForOrder: TestDataForOrder[] }>({
  testDataForOrder: testDataArray,
});