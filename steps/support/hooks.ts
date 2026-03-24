import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from '@playwright/test';
import type { PWWorld } from './world';

// Global default timeout for ALL steps & hooks (60s)
setDefaultTimeout(60_000);

// NOTE: Abhi ke liye Chromium rakho (Firefox me close ke time par bug trigger hota hai)
Before({ timeout: 60_000 }, async function (this: PWWorld) {
  let launcher;
  if (this.browserName === 'chromium') launcher = chromium;
  else if (this.browserName === 'webkit') launcher = webkit;
  else launcher = firefox;

  // Launch the browser
  this.browser = await launcher.launch({ headless: false });

  // If corp network throws SSL hiccups, ignoreHTTPSErrors helps
  this.context = await this.browser.newContext({
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true
  });

  this.page = await this.context.newPage();

  // 👉 IMPORTANT: yaha goto() mat karo. Navigation ko Given step me rakhenge.
});

After({ timeout: 30_000 }, async function (this: PWWorld) {
  // Firefox often throws protocol errors on close. Swallow them safely.
  try {
    await this.context?.close();
  } catch (e) {
    console.warn('Context close warning (ignored):', e);
  }
  try {
    await this.browser?.close();
  } catch (e) {
    console.warn('Browser close warning (ignored):', e);
  }
});
