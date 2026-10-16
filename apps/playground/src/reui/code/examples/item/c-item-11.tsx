// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Badge } from "../../../adapters/structured.tsx"

import { Button } from "../../../adapters/controls.tsx"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col">
      <ItemGroup>
        <Item variant="outline" size="xs">
          <ItemMedia variant="icon">
            <IconPlaceholder
              lucide="DatabaseIcon"
              tabler="IconDatabase"
              hugeicons="DatabaseIcon"
              phosphor="DatabaseIcon"
              remixicon="RiDatabase2Line"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Database</ItemTitle>
            <ItemDescription>
              Sync records from your data warehouse
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="success-light" size="sm">
              Connected
            </Badge>
          </ItemActions>
        </Item>
        <Item variant="outline" size="xs">
          <ItemMedia variant="icon">
            <IconPlaceholder
              lucide="WebhookIcon"
              tabler="IconWebhook"
              hugeicons="WebhookIcon"
              phosphor="WebhooksLogoIcon"
              remixicon="RiWebhookLine"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Webhooks</ItemTitle>
            <ItemDescription>
              Push realtime events to your endpoints
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="success-light" size="sm">
              Connected
            </Badge>
          </ItemActions>
        </Item>
        <Item variant="outline" size="xs">
          <ItemMedia variant="icon">
            <IconPlaceholder
              lucide="CodeIcon"
              tabler="IconCode"
              hugeicons="CodeIcon"
              phosphor="CodeIcon"
              remixicon="RiCodeLine"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>API access</ItemTitle>
            <ItemDescription>
              Build custom integrations with the REST API
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  )
}
