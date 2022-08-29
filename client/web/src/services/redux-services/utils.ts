export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

export const getUsername = (firstName: string, lastName?: string) => {
  return `${firstName}${lastName ? ` ${lastName}` : ""}`;
};
