import { CollectionGrid, Card, KooyaProvider } from "@kooyaph/ui/legacy";
export default { title: "Molecules/Collection grid" };
export const SurfaceFree = () => <KooyaProvider><CollectionGrid aria-label="Fictional collection">{["One", "Two", "Three"].map(title => <li key={title}><Card title={title}>Fictional content</Card></li>)}</CollectionGrid></KooyaProvider>;
