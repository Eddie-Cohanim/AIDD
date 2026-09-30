const TODO_SENTINELS: ReadonlySet<string> = new Set(["TODO", "TBD"]);

export function isTodo(value: string): boolean {
  return TODO_SENTINELS.has(value);
}
