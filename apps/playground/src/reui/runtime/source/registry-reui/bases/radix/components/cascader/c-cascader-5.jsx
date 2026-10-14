"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Cascader, CascaderContent, CascaderEmpty, CascaderList, CascaderPanel, CascaderStatus, CascaderTrigger, } from "../../../../../../../adapters/cascader.tsx";
import { CascaderItems } from "../../../../../../../adapters/cascader.tsx";
import { CascaderBreadcrumb, CascaderInput, CascaderNav, CascaderValue, } from "../../../../../../../adapters/cascader.tsx";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
/**
 * Rung to chip, in one table so the colour cannot drift from the word.
 *
 * Four bands over six rungs: who owns the call (`primary`), who sets the
 * technical direction (`info`), who ships it unattended (`success`), and who
 * still wants a reviewer on the way out (`warning`). Bands, not one variant per
 * role - a scale with six colours is a palette, not a signal.
 *
 * `pin` repeats the variant's own text colour with `!`. A highlighted row
 * repaints every descendant with `text-accent-foreground`, which would grey the
 * chip out under the pointer, so each colour is pinned back the way the
 * primitive pins its own accent count.
 */
const ROLE_BADGE = {
    Director: { variant: "primary-outline", pin: "text-primary!" },
    Lead: { variant: "primary-outline", pin: "text-primary!" },
    Principal: { variant: "info-outline", pin: "text-info-foreground!" },
    Staff: { variant: "info-outline", pin: "text-info-foreground!" },
    Senior: { variant: "success-outline", pin: "text-success-foreground!" },
    Mid: { variant: "warning-outline", pin: "text-warning-foreground!" },
};
/**
 * The role chip. Plain `outline` is `bg-transparent` in light mode, so the
 * row's highlight washed straight through it. The semantic outline variants are
 * `bg-background` - opaque against the highlight - and they carry the rung in
 * their text colour instead of spending a second element on it.
 *
 * `shrink-0` is restated here rather than left to `badgeVariants`, which
 * already carries it. Now that the chip sits inline after the name it is the
 * class that decides WHICH of the two words gives way in a narrow panel, so it
 * is spelled out on the element whose placement depends on it: the name
 * shortens to "Owen Fitzger..." and "Principal" is never clipped to "Princi".
 */
function RoleBadge({ role }) {
    const { variant, pin } = ROLE_BADGE[role];
    return (_jsx(Badge, { variant: variant, className: cn("shrink-0", pin), children: role }));
}
/** Initials are the AvatarImage fallback, not the avatar itself. */
function initials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("");
}
/**
 * One avatar for both surfaces. The panel row and the trigger show the same
 * member, so they render the same element at two sizes instead of two
 * hand-rolled circles that drift apart. `AvatarFallback` ships at `text-sm`,
 * which overflows anything under 28px, so the caller passes the text size down
 * with the box size rather than letting one change without the other.
 */
function MemberAvatar({ member, className, fallbackClassName, }) {
    return (_jsxs(Avatar, { className: className, children: [_jsx(AvatarImage, { src: member.data?.avatar, alt: member.label }), _jsx(AvatarFallback, { className: fallbackClassName, children: initials(member.label) })] }));
}
const teams = [
    {
        value: "engineering",
        label: "Engineering",
        children: [
            {
                value: "eng.ada",
                label: "Ada Whitfield",
                data: {
                    avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
                    role: "Staff",
                    status: "online",
                },
            },
            {
                value: "eng.marcus",
                label: "Marcus Bell",
                data: {
                    avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
                    role: "Senior",
                    status: "away",
                },
            },
            {
                value: "eng.priya",
                label: "Priya Raman",
                data: {
                    avatar: "/reui-assets/images/4349381d8a8476edbc4c.jpg",
                    role: "Lead",
                    status: "online",
                },
            },
        ],
    },
    {
        value: "design",
        label: "Design",
        children: [
            {
                value: "design.june",
                label: "June Okafor",
                data: {
                    avatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
                    role: "Principal",
                    status: "online",
                },
            },
            {
                value: "design.theo",
                label: "Theo Lindqvist",
                data: {
                    avatar: "/reui-assets/images/973d47055c51440af7dc.jpg",
                    role: "Mid",
                    status: "away",
                },
            },
        ],
    },
    {
        value: "product",
        label: "Product",
        children: [
            {
                value: "product.samira",
                label: "Samira Haddad",
                data: {
                    avatar: "/reui-assets/images/df73db9a2c25069a422d.jpg",
                    role: "Director",
                    status: "online",
                },
            },
            {
                value: "product.owen",
                label: "Owen Fitzgerald",
                data: {
                    avatar: "/reui-assets/images/c75592a667f30cfd44b0.jpg",
                    role: "Senior",
                    status: "away",
                },
            },
        ],
    },
    {
        value: "marketing",
        label: "Marketing",
        children: [
            {
                value: "marketing.lena",
                label: "Lena Vasquez",
                data: {
                    avatar: "/reui-assets/images/067c566cd567259bb9aa.jpg",
                    role: "Lead",
                    status: "online",
                },
            },
            {
                value: "marketing.dmitri",
                label: "Dmitri Sokolov",
                data: {
                    avatar: "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
                    role: "Mid",
                    status: "away",
                },
            },
        ],
    },
    {
        value: "sales",
        label: "Sales",
        children: [
            {
                value: "sales.nadia",
                label: "Nadia Petrova",
                data: {
                    avatar: "/reui-assets/images/a3afee2f77d259ce6a59.jpg",
                    role: "Lead",
                    status: "online",
                },
            },
            {
                value: "sales.tom",
                label: "Tom Ashworth",
                data: {
                    avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
                    role: "Mid",
                    status: "away",
                },
            },
        ],
    },
    {
        value: "support",
        label: "Support",
        children: [
            {
                value: "support.hana",
                label: "Hana Yoshida",
                data: {
                    avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
                    role: "Senior",
                    status: "online",
                },
            },
            {
                value: "support.felix",
                label: "Felix Nkemelu",
                data: {
                    avatar: "/reui-assets/images/973d47055c51440af7dc.jpg",
                    role: "Mid",
                    status: "away",
                },
            },
        ],
    },
    {
        value: "data",
        label: "Data",
        children: [
            {
                value: "data.ines",
                label: "Ines Moreau",
                data: {
                    avatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
                    role: "Senior",
                    status: "online",
                },
            },
            {
                value: "data.raj",
                label: "Raj Bhatia",
                data: {
                    avatar: "/reui-assets/images/4349381d8a8476edbc4c.jpg",
                    role: "Staff",
                    status: "away",
                },
            },
        ],
    },
];
/**
 * Flat value to member lookup. `CascaderValue` hands its render function the
 * resolved node typed as `CascaderNode<unknown>`, so the payload is read back
 * through this map rather than cast at the call site.
 */
const membersByValue = new Map(teams
    .flatMap((team) => team.children ?? [])
    .map((member) => [member.value, member]));
/**
 * `renderLabel` replaces only the label block, so avatars and role badges drop
 * in while the count, chevron and selected check keep working. Use `renderItem`
 * instead when the row shares nothing with the default.
 *
 * `CascaderValue` takes a render function for the same reason one level up: the
 * trigger has to name a person, and a name without a face is the one thing an
 * assignee field cannot afford. It replaces the WHOLE display, placeholder
 * included, so the empty state is spelled out here rather than passed as a
 * `placeholder` prop that would never be reached.
 *
 * Neither surface carries an alignment class. Both rows are already flex with
 * `items-center`, and both keep the avatar box under the label's line box - 20px
 * against 20px in the trigger, 24px in the wider panel row - so the circle and
 * the name share one centre line instead of the taller of the two dragging the
 * row around it.
 *
 * The role chip sits INLINE, straight after the name, and the name is the only
 * thing in the row that truncates.
 *
 * It used to trail the row, where it read as misplaced for a reason that has
 * nothing to do with the chip: a selectable leaf reserves an inline-end gutter
 * for the check mark, so the chip stopped a full gutter short of the panel edge
 * and lined up with nothing - not the edge, not the name it qualifies. Bound to
 * the name instead, "who, and at what rung" is one phrase read in one pass, and
 * the chip is out of reach of a gutter whose width is a different number in
 * every style.
 *
 * Below the name was the other option and was not taken. It would double every
 * row's height to carry one word, and a second line in a row that already has
 * an avatar reads as a description - a job title, a team, an email - rather
 * than as a chip qualifying the name above it.
 *
 * The mechanics are one class: the name is `min-w-0 truncate` and NOT `flex-1`.
 * A growing name would push the chip back to the trailing edge and take the
 * problem with it; a name sized to its own content leaves the slack AFTER the
 * chip, which is where the check gutter already is. Nothing else moved - the
 * check still marks the selected member on its own column, and the trigger
 * still names them with a face.
 *
 * The chip is a SEMANTIC outline variant, one per seniority band. Plain
 * `outline` is `bg-transparent` in light mode, so the row's highlight washed
 * straight through it, while `primary-outline` and its siblings are
 * `bg-background` - a real fill against the highlight - and spend their colour
 * on the rung rather than on decoration. See `ROLE_BADGE` for the mapping and
 * for why every one of them pins its text colour back.
 */
export default function Pattern() {
    const [value, setValue] = useState("");
    return (_jsx("div", { className: "flex w-full justify-center p-4", children: _jsxs(Cascader, { items: teams, value: value, onValueChange: setValue, renderLabel: (node, state) => state.branch ? (_jsx("span", { className: "w-full truncate text-start font-medium", children: node.label })) : (_jsxs("span", { className: "flex w-full min-w-0 items-center gap-2", children: [_jsxs("span", { className: "relative shrink-0", children: [_jsx(MemberAvatar, { member: node, className: "size-6", fallbackClassName: "text-[10px]" }), _jsx("span", { "aria-hidden": "true", className: `ring-popover absolute -end-0.5 -bottom-0.5 size-2 rounded-full ring-2 ${node.data?.status === "online"
                                    ? "bg-success"
                                    : "bg-muted-foreground/40"}` })] }), _jsx("span", { className: "min-w-0 truncate text-start", children: node.label }), node.data ? _jsx(RoleBadge, { role: node.data.role }) : null] })), children: [_jsx(CascaderTrigger, { "aria-label": "Assignee", render: _jsx(Button, { variant: "outline", className: "w-72 justify-between gap-2 font-normal" }), children: _jsx(CascaderValue, { className: "gap-2", children: (selected) => {
                            const node = selected[0];
                            if (!node) {
                                return (_jsx("span", { className: "text-muted-foreground truncate", children: "Assign to someone" }));
                            }
                            const member = membersByValue.get(node.value);
                            return (_jsxs(_Fragment, { children: [member ? (_jsx(MemberAvatar, { member: member, className: "size-5", fallbackClassName: "text-[9px]" })) : null, _jsx("span", { className: "truncate", children: node.label })] }));
                        } }) }), _jsx(CascaderContent, { className: "w-80", children: _jsxs(CascaderPanel, { children: [_jsx(CascaderNav, { children: _jsx(CascaderInput, {}) }), _jsx(CascaderBreadcrumb, {}), _jsx(CascaderEmpty, {}), _jsx(CascaderList, { children: _jsx(CascaderItems, {}) }), _jsx(CascaderStatus, {})] }) })] }) }));
}
