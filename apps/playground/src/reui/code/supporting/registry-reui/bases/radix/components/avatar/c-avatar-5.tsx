import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-4">
        <AvatarImage
          src="/reui-assets/images/4349381d8a8476edbc4c.jpg"
          alt="Michael Rodriguez"
        />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <Avatar className="size-8">
        <AvatarImage
          src="/reui-assets/images/4349381d8a8476edbc4c.jpg"
          alt="Michael Rodriguez"
        />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarImage
          src="/reui-assets/images/4349381d8a8476edbc4c.jpg"
          alt="Michael Rodriguez"
        />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <Avatar className="size-16">
        <AvatarImage
          src="/reui-assets/images/4349381d8a8476edbc4c.jpg"
          alt="Michael Rodriguez"
        />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
    </div>
  )
}
