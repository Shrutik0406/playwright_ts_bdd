// import { defineConfig, devices } from '@playwright/test';

// /**
//  * Read environment variables from file.
//  * https://github.com/motdotla/dotenv
//  */
// // import dotenv from 'dotenv';
// // import path from 'path';
// // dotenv.config({ path: path.resolve(__dirname, '.env') });

// /**
//  * See https://playwright.dev/docs/test-configuration.
//  */
// export default defineConfig({
//   testDir: './tests',
//   /* Run tests in files in parallel */
//     timeout : 30 * 1000,
//   expect :{
//     timeout :30 * 1000,
//   },
//   /* Run tests in files in parallel */
//  reporter : "html",

// baseURL : "https://rahulshettyacademy.com/client",

//   use: {

//     browserName : 'chromium',
//     headless : false,
//     screenshot : "on",
//     trace : "on",

//   },

//   /* Configure projects for major browsers */
 
// });

import * as dotenv from 'dotenv';

dotenv.config();


import { defineConfig } from '@playwright/test';

export default defineConfig({
   globalSetup: './global-setup.ts',
  use: {
    //workers: 1,
    //independant TC
     storageState: 'auth.json',
    baseURL: "https://rahulshettyacademy.com/",
    headless: false,
    viewport: { width: 1280, height: 720 },
     browserName : 'chromium',
    screenshot : "on",
    trace : "on",
  },
  
testIgnore: [
  "tests/example.spec.ts",
  "tests/loginAndBuyProduct.spec.ts",
  "**/steps/**",           
  "**/features/**" ,
  "e2eflow.spec.ts " 

],

    workers: 4   // enables parallel
});



