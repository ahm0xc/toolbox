import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toProperCase(str: string) {
  return str
    .toLowerCase() // Convert the entire string to lowercase
    .split(/[\s-_]+/) // Split by spaces, hyphens, or underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(" "); // Join the words back with spaces
}
