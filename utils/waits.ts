// utils/waits.ts
import { Page, Locator, expect, APIResponse, Response } from '@playwright/test';

export class Waits {
  /**
   * Acts like an "implicit wait" by setting default timeouts for all Playwright actions on this page.
   * Recommended: 10_000 – 30_000 depending on AUT slowness.
   */
  static setImplicitTimeouts(page: Page, actionMs = 10_000, navigationMs = 30_000): void {
    page.setDefaultTimeout(actionMs);
    page.setDefaultNavigationTimeout(navigationMs);
  }

  /** Explicit wait: ensure locator is visible within timeout */
  static async visible(locator: Locator, timeout = 10_000): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }

  /** Explicit wait: ensure locator is hidden/detached within timeout */
  static async hidden(locator: Locator, timeout = 10_000): Promise<void> {
    await expect(locator).toBeHidden({ timeout });
  }

  /** Explicit wait: ensure locator is enabled and visible => "clickable" */
  static async clickable(locator: Locator, timeout = 10_000): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
    await expect(locator).toBeEnabled({ timeout });
  }

  /** Explicit wait: ensure locator contains given text (partial match ok) */
  static async hasText(locator: Locator, text: string | RegExp, timeout = 10_000): Promise<void> {
    await expect(locator).toHaveText(text as any, { timeout });
  }

  /** Explicit wait: wait until input/field has given value */
  static async hasValue(locator: Locator, value: string | RegExp, timeout = 10_000): Promise<void> {
    await expect(locator).toHaveValue(value as any, { timeout });
  }

  /** Explicit wait: wait for URL to match substring or regex */
  static async urlContains(page: Page, expected: string | RegExp, timeout = 10_000): Promise<void> {
    if (typeof expected === 'string') {
      await expect(page).toHaveURL(new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), { timeout });
    } else {
      await expect(page).toHaveURL(expected, { timeout });
    }
  }

  /** Explicit wait: wait for a specific network response URL & optional predicate */
  static async responseUrl(
    page: Page,
    urlSubstringOrRegex: string | RegExp,
    timeout = 15_000,
    predicate?: (resp: Response) => boolean | Promise<boolean>
  ): Promise<Response> {
    const matcher =
      typeof urlSubstringOrRegex === 'string'
        ? (u: string) => u.includes(urlSubstringOrRegex)
        : (u: string) => urlSubstringOrRegex.test(u);

    return page.waitForResponse(async (resp) => {
      if (!matcher(resp.url())) return false;
      if (predicate) return await predicate(resp);
      return resp.ok();
    }, { timeout });
  }

  /** Explicit: wait until network is relatively idle */
  static async networkIdle(page: Page, timeout = 10_000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /** Explicit: generic sleep (use sparingly) */
  static async sleep(ms: number): Promise<void> {
    await new Promise((r) => setTimeout(r, ms));
  }

  /** Explicit: wait for dropdown options to be loaded (example helper) */
  static async optionsLoaded(locator: Locator, minCount = 1, timeout = 10_000): Promise<void> {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const count = await locator.count();
      if (count >= minCount) return;
      await this.sleep(200);
    }
    throw new Error(`Timeout after ${timeout}ms while waiting for options to load (minCount=${minCount}).`);
  }

  /** Retry-until helper (poll a condition until it returns truthy) */
  static async retryUntil<T>(
    fn: () => Promise<T>,
    predicate: (val: T) => boolean,
    timeout = 10_000,
    interval = 250
  ): Promise<T> {
    const start = Date.now();
    let last: T;
    do {
      last = await fn();
      if (predicate(last)) return last;
      await this.sleep(interval);
    } while (Date.now() - start < timeout);
    throw new Error(`retryUntil: condition not met within ${timeout}ms`);
  }

  /** Explicit: Wait for toast/snackbar text (example for apps with toasts) */
  static async toastHasText(page: Page, text: string | RegExp, timeout = 10_000): Promise<void> {
    const toast = page.locator('[role="alert"], .toast, .snackbar, .mat-snack-bar-container');
    await this.visible(toast, timeout);
    await this.hasText(toast, text, timeout);
  }

  /** Explicit: wait for element to stop moving (avoid click interception) */
  static async stablePosition(locator: Locator, samples = 3, gapMs = 100, timeout = 10_000): Promise<void> {
    const start = Date.now();
    let prevBox: { x: number; y: number; width: number; height: number } | undefined;
    let stableCount = 0;

    while (Date.now() - start < timeout) {
      const box = await locator.boundingBox();
      if (!box) { await this.sleep(gapMs); continue; }
      if (prevBox && box.x === prevBox.x && box.y === prevBox.y && box.width === prevBox.width && box.height === prevBox.height) {
        stableCount++;
        if (stableCount >= samples) return;
      } else {
        stableCount = 0;
      }
      prevBox = box ?? undefined;
      await this.sleep(gapMs);
    }
    throw new Error(`stablePosition: element did not stabilize within ${timeout}ms`);
  }
}