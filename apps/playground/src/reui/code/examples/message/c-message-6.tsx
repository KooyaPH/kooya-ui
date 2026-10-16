// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
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
  MessageGroup,
  MessageHeader,
} from "../../supporting/registry/bases/radix/ui/message.tsx"

/*
 * A run from one person gets one portrait, on the last row. The earlier rows
 * still render MessageAvatar, just empty: it keeps its minimum width and holds
 * the spine that the last row sits on. Dropping the slot knocks the run off it.
 */
export default function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      {/*
        The gap inside a run belongs to MessageGroup and the gap between runs
        to this column, so the two can differ per style with nothing hardcoded.
      */}
      <MessageGroup>
        <Message>
          <MessageAvatar />
          <MessageContent>
            {/*
              Only the first row of a run carries a name. The rest inherit it,
              which is the whole reason to group them.
            */}
            <MessageHeader>Alex Johnson</MessageHeader>
            <Bubble variant="muted">
              <BubbleContent>
                I pulled the eu-west traces for 14:00 to 14:10.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>

        <Message>
          <MessageAvatar />
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                Every slow request goes through the tax service.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>

        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="/reui-assets/images/e93553df2422635515ee.jpg"
                alt="Alex Johnson"
              />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                It is a retry loop, not the database. Two retries at 400ms each.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </MessageGroup>

      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarImage
              src="/reui-assets/images/046af0b7d159f9f4fd2b.jpg"
              alt="Emma Wilson"
            />
            <AvatarFallback>EW</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble>
            <BubbleContent>
              That lines up with the 14:04 deploy. Rolling the tax client back.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  )
}
