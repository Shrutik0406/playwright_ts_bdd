import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from '@playwright/test';

export interface PWWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  baseURL: string;
  browserName: 'chromium' | 'firefox' | 'webkit';
}

class CustomWorld extends World implements PWWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  baseURL: string;
  browserName: 'chromium' | 'firefox' | 'webkit';

  constructor(options: IWorldOptions) {
    super(options);
    // ✅ App ka actual SPA path rakho
    this.baseURL = process.env.BASE_URL ?? 'https://rahulshettyacademy.com/client';
    // ✅ Default chromium for stability (Firefox me aapko protocol error aa raha tha)
    this.browserName = (process.env.BROWSER as PWWorld['browserName']) ?? 'chromium';
  }
}

setWorldConstructor(CustomWorld);