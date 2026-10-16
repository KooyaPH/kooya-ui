import type { ReactNode } from "react";
export interface WorkspaceShellProps {
  header: ReactNode;
  navigation: ReactNode;
  context?: ReactNode;
  inspector?: ReactNode;
  children: ReactNode;
  variant?: "editorial" | "governance";
  mainId?: string;
  className?: string;
}
/** Route-owned navigation and content; the library owns responsive geometry. */
export function WorkspaceShell({
  header,
  navigation,
  context,
  inspector,
  children,
  variant = "editorial",
  mainId = "workspace-content",
  className = "",
}: WorkspaceShellProps) {
  return (
    <div
      className={`ku-workspace-shell ku-workspace--${variant} ${className}`}
      data-context={!!context}
      data-inspector={!!inspector}
    >
      <a className="ku-workspace-skip" href={`#${mainId}`}>
        Skip to main content
      </a>
      <header className="ku-workspace-header">{header}</header>
      <aside
        className="ku-workspace-navigation"
        aria-label="Workspace navigation"
      >
        {navigation}
      </aside>
      {context && (
        <aside className="ku-workspace-context" aria-label="Section navigation">
          {context}
        </aside>
      )}
      <main className="ku-workspace-main" id={mainId} tabIndex={-1}>
        {children}
      </main>
      {inspector && (
        <aside className="ku-workspace-inspector" aria-label="Record details">
          {inspector}
        </aside>
      )}
    </div>
  );
}
