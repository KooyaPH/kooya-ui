// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="border-b">
        <CardTitle>Header with Border</CardTitle>
        <CardDescription>
          This is a card with a header that has a bottom border.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          The header has a border-b class applied, creating a visual separation
          between the header and content sections.
        </p>
      </CardContent>
    </Card>
  )
}
