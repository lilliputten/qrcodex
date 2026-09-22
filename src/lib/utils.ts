// Use shadcn's own implementation of the `cn` utility
// @see https://github.com/shadcn-ui/cn
// Quote: "cn is a new engine for Tailwind class merging and conflict resolution. It replaces tailwind-merge and clsx. Same APIs. Full parity. And it is 30× faster."
export { cn } from 'cn';

/* // OBSOLETE: An old customly combimed solution
 * export function cn(...inputs: ClassValue[]) {
 *   return twMerge(clsx(inputs));
 * }
 */
