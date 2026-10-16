/** Official identity colors. Semantic status text uses contrast-qualified roles. */
export const kooyaBrand = {
  paper: "#f2eee3",
  ink: "#13120f",
  lime: "#d7f20f",
  green: "#314300",
  yellow: "#f4b701",
  blue: "#1d46d9",
  red: "#ef3e2f",
} as const;

/** Consumers serve these font assets locally; the provider makes no requests. */
export const kooyaTypography = {
  interface: '"DM Sans Variable", "DM Sans", system-ui, sans-serif',
  display: '"Syncopate", "DM Sans", system-ui, sans-serif',
} as const;
