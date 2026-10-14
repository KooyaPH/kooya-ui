import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarImage
          src="/reui-assets/images/e93553df2422635515ee.jpg"
          alt="Alex Johnson (away)"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="/reui-assets/images/dfed3098ae0011e5a5a3.jpg"
          alt="Sarah Chen"
        />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="/reui-assets/images/4349381d8a8476edbc4c.jpg"
          alt="Michael Rodriguez"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  )
}
