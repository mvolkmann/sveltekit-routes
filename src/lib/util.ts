import {browser} from '$app/env';

export function setCursor(cursor: string): void {
  if (browser) {
    document.documentElement.style.cursor = cursor;
  }
}
