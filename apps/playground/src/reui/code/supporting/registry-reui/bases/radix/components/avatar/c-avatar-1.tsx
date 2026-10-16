import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Avatar>
      <AvatarImage
        src="/reui-assets/images/4349381d8a8476edbc4c.jpg"
        alt="Michael Rodriguez"
      />
      <AvatarFallback>MR</AvatarFallback>
    </Avatar>
  )
}
