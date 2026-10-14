// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "../../supporting/registry/bases/radix/ui/attachment.tsx"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import { Bubble, BubbleContent } from "../../supporting/registry/bases/radix/ui/bubble.tsx"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "../../supporting/registry/bases/radix/ui/message.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

/*
 * Requested at 448 square because the image variant crops to a square anyway.
 * A wide frame would pay for bytes that never reach a pixel.
 */
const HERO_ARTWORK =
  "/reui-assets/images/3acf433051cfc0ba518a.jpg"

/*
 * An Attachment is a first-class child of MessageContent. It brings its own
 * border and per-style radius, and an end-aligned row pulls it to the end as
 * it pulls the bubble, so there is no panel to hand-roll.
 */
export default function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarImage
              src="/reui-assets/images/dfed3098ae0011e5a5a3.jpg"
              alt="Sarah Chen"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          {/*
            The tile is 120px wide by default, and a plain w-full beats that:
            the style sheets sit in the base layer, utilities in the utilities
            layer, and layer order outranks specificity.
          */}
          <Attachment orientation="vertical" className="w-full max-w-56">
            <AttachmentMedia variant="image">
              <img
                src={HERO_ARTWORK}
                alt="Gradient artwork for the release banner"
                width={448}
                height={448}
                loading="lazy"
                decoding="async"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>hero-gradient.png</AttachmentTitle>
              <AttachmentDescription>PNG, 212 KB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <Bubble>
            <BubbleContent>
              Here is the new release banner. Can you send the palette over?
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>

      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage
              src="/reui-assets/images/4349381d8a8476edbc4c.jpg"
              alt="Michael Rodriguez"
            />
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>Exported, one row per token.</BubbleContent>
          </Bubble>
          <Attachment>
            <AttachmentMedia>
              <IconPlaceholder
                lucide="FileSpreadsheetIcon"
                tabler="IconFileSpreadsheet"
                hugeicons="GoogleSheetIcon"
                phosphor="FileTextIcon"
                remixicon="RiFileTextLine"
                aria-hidden="true"
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>palette-tokens.csv</AttachmentTitle>
              <AttachmentDescription>CSV, 184 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              {/*
                The label names the file. A thread of identical download glyphs
                is otherwise a list of buttons all called "Download".
              */}
              <AttachmentAction
                type="button"
                variant="secondary"
                size="icon-sm"
                aria-label="Download palette-tokens.csv"
                title="Download"
              >
                <IconPlaceholder
                  lucide="DownloadIcon"
                  tabler="IconDownload"
                  hugeicons="Download01Icon"
                  phosphor="DownloadSimpleIcon"
                  remixicon="RiDownloadLine"
                  aria-hidden="true"
                />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </MessageContent>
      </Message>
    </div>
  )
}
