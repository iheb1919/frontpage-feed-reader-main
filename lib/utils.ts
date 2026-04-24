import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function timeAgo(dateString: string) {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
  });
}
export const colorMap: Record<string, string> = {
  amber: "bg-amber-200 text-amber-700",
  blue: "bg-blue-200 text-blue-700",
  cyan: "bg-cyan-200 text-cyan-700",
  emerald: "bg-emerald-200 text-emerald-700",
  fuchsia: "bg-fuchsia-200 text-fuchsia-700",
  green: "bg-green-200 text-green-700",
  indigo: "bg-indigo-200 text-indigo-700",
  lime: "bg-lime-200 text-lime-700",
  orange: "bg-orange-200 text-orange-700",
  pink: "bg-pink-200 text-pink-700",
  purple: "bg-purple-200 text-purple-700",
  rose: "bg-rose-200 text-rose-700",
  sky: "bg-sky-200 text-sky-700",
  slate: "bg-slate-200 text-slate-700",
  stone: "bg-stone-200 text-stone-700",
  teal: "bg-teal-200 text-teal-700",
  violet: "bg-violet-200 text-violet-700",
  yellow: "bg-yellow-200 text-yellow-700",
};
export const dotColorMap: Record<string, string> = {
  amber: "bg-amber-500",
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  emerald: "bg-emerald-500",
  fuchsia: "bg-fuchsia-500",
  green: "bg-green-500",
  indigo: "bg-indigo-500",
  lime: "bg-lime-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
  purple: "bg-purple-500",
  rose: "bg-rose-500",
  sky: "bg-sky-500",
  slate: "bg-slate-500",
  stone: "bg-stone-500",
  teal: "bg-teal-500",
  violet: "bg-violet-500",
  yellow: "bg-yellow-500",
};
export function firstLetterColor(letter: string) {
  const colors = [
    "amber",
    "blue",
    "cyan",
    "emerald",
    "fuchsia",
    "green",
    "indigo",
    "lime",
    "orange",
    "pink",
    "purple",
    "rose",
    "sky",
    "slate",
    "stone",
    "teal",
    "violet",
    "yellow",
  ];

  const charCode = letter.toUpperCase().charCodeAt(0)
  const index = charCode % colors.length

  return colors[index]
}