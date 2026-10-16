import { useKooyaOptions } from "@kooyaph/ui";
export function useTheme() {
  const { mode } = useKooyaOptions();
  return { theme: mode, resolvedTheme: mode };
}
