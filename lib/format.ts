/**
 * Rounds a number to 2 decimal places for display.
 * Use wherever floating point values are shown in the app.
 */
export const round2 = (n: number) => Math.round(n * 100) / 100;
