import { CardActions, IconButton, KooyaProvider } from "@kooyaph/ui/legacy";
export default { title: "Molecules/Card actions" };
export const Quiet = () => (
  <KooyaProvider>
    <CardActions>
      <IconButton label="Pin" aria-pressed={false}>
        ⌖
      </IconButton>
      <IconButton label="More actions">⋮</IconButton>
      <IconButton label="Unavailable action" disabled>
        ×
      </IconButton>
    </CardActions>
  </KooyaProvider>
);
