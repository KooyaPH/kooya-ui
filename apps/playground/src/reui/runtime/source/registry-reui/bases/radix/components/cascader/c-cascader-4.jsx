"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Cascader, CascaderContent, CascaderEmpty, CascaderList, CascaderPanel, CascaderStatus, CascaderTrigger, } from "../../../../../../../adapters/cascader.tsx";
import { CascaderAction, CascaderFooter, CascaderSubmenu, CascaderSubmenuContent, CascaderSubmenuTrigger, useCascaderSubmenu, } from "../../../../../../../adapters/cascader.tsx";
import { CascaderGroup, CascaderItems, CascaderLabel, CascaderSeparator, } from "../../../../../../../adapters/cascader.tsx";
import { CascaderBreadcrumb, CascaderInput, CascaderNav, CascaderValue, } from "../../../../../../../adapters/cascader.tsx";
import { Dropbox } from "../../../../../components/ui/svgs/dropbox.jsx";
import { GithubDark } from "../../../../../components/ui/svgs/githubDark.jsx";
import { GithubLight } from "../../../../../components/ui/svgs/githubLight.jsx";
import { GoogleDrive } from "../../../../../components/ui/svgs/googleDrive.jsx";
import { Redis } from "../../../../../components/ui/svgs/redis.jsx";
import { Slack } from "../../../../../components/ui/svgs/slack.jsx";
import { Stripe } from "../../../../../components/ui/svgs/stripe.jsx";
import { Supabase } from "../../../../../components/ui/svgs/supabase.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
/* -------------------------------------------------------------------------- */
/*                                Group icons                                 */
/* -------------------------------------------------------------------------- */
/**
 * A property picker is read by TYPE before it is read by name, so the icon
 * column is where the type belongs.
 *
 * Each group carries the subject it collects and each leaf carries the shape of
 * the value behind it: text for a title, a person for an owner, a calendar for
 * a due date, a flag for a status, a card for a plan. Every icon is declared
 * once here and referenced below, so the data stays a list of properties rather
 * than a wall of JSX.
 */
const basicsIcon = (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File01Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", className: "size-4" }));
const peopleIcon = (_jsx(IconPlaceholder, { lucide: "UsersIcon", tabler: "IconUsers", hugeicons: "UserGroupIcon", phosphor: "UsersIcon", remixicon: "RiGroupLine", className: "size-4" }));
const datesIcon = (_jsx(IconPlaceholder, { lucide: "CalendarDaysIcon", tabler: "IconCalendarWeek", hugeicons: "Calendar03Icon", phosphor: "CalendarDotsIcon", remixicon: "RiCalendarLine", className: "size-4" }));
const workflowIcon = (_jsx(IconPlaceholder, { lucide: "RouteIcon", tabler: "IconRoute", hugeicons: "Route01Icon", phosphor: "PathIcon", remixicon: "RiRouteLine", className: "size-4" }));
const metricsIcon = (_jsx(IconPlaceholder, { lucide: "BarChart3Icon", tabler: "IconChartBar", hugeicons: "BarChartIcon", phosphor: "ChartBarIcon", remixicon: "RiBarChartLine", className: "size-4" }));
const linksIcon = (_jsx(IconPlaceholder, { lucide: "LinkIcon", tabler: "IconLink", hugeicons: "Link01Icon", phosphor: "LinkIcon", remixicon: "RiLinkM", className: "size-4" }));
const billingIcon = (_jsx(IconPlaceholder, { lucide: "CreditCardIcon", tabler: "IconCreditCard", hugeicons: "CreditCardIcon", phosphor: "CreditCardIcon", remixicon: "RiBankCardLine", className: "size-4" }));
/* -------------------------------------------------------------------------- */
/*                              Property icons                                */
/* -------------------------------------------------------------------------- */
const textIcon = (_jsx(IconPlaceholder, { lucide: "TypeIcon", tabler: "IconLetterCase", hugeicons: "TextIcon", phosphor: "TextAaIcon", remixicon: "RiText", className: "size-4" }));
const longTextIcon = (_jsx(IconPlaceholder, { lucide: "AlignLeftIcon", tabler: "IconAlignLeft", hugeicons: "TextAlignLeftIcon", phosphor: "TextAlignLeftIcon", remixicon: "RiAlignLeft", className: "size-4" }));
const slugIcon = (_jsx(IconPlaceholder, { lucide: "HashIcon", tabler: "IconHash", hugeicons: "HashtagIcon", phosphor: "HashIcon", remixicon: "RiHashtag", className: "size-4" }));
const personIcon = (_jsx(IconPlaceholder, { lucide: "UserIcon", tabler: "IconUser", hugeicons: "UserIcon", phosphor: "UserIcon", remixicon: "RiUserLine", className: "size-4" }));
const approverIcon = (_jsx(IconPlaceholder, { lucide: "UserCheckIcon", tabler: "IconUserCheck", hugeicons: "UserCheck01Icon", phosphor: "UserCheckIcon", remixicon: "RiUserFollowLine", className: "size-4" }));
const watcherIcon = (_jsx(IconPlaceholder, { lucide: "EyeIcon", tabler: "IconEye", hugeicons: "EyeIcon", phosphor: "EyeIcon", remixicon: "RiEyeLine", className: "size-4" }));
const timestampIcon = (_jsx(IconPlaceholder, { lucide: "ClockIcon", tabler: "IconClock", hugeicons: "Clock01Icon", phosphor: "ClockIcon", remixicon: "RiTimeLine", className: "size-4" }));
const deadlineIcon = (_jsx(IconPlaceholder, { lucide: "CalendarCheckIcon", tabler: "IconCalendarCheck", hugeicons: "CalendarCheckIn01Icon", phosphor: "CalendarCheckIcon", remixicon: "RiCalendarCheckLine", className: "size-4" }));
const shippedIcon = (_jsx(IconPlaceholder, { lucide: "TruckIcon", tabler: "IconTruck", hugeicons: "TruckIcon", phosphor: "TruckIcon", remixicon: "RiTruckLine", className: "size-4" }));
const statusIcon = (_jsx(IconPlaceholder, { lucide: "FlagIcon", tabler: "IconFlag", hugeicons: "Flag01Icon", phosphor: "FlagIcon", remixicon: "RiFlagLine", className: "size-4" }));
const priorityIcon = (_jsx(IconPlaceholder, { lucide: "FlameIcon", tabler: "IconFlame", hugeicons: "Fire02Icon", phosphor: "FlameIcon", remixicon: "RiFireLine", className: "size-4" }));
const stageIcon = (_jsx(IconPlaceholder, { lucide: "Columns3Icon", tabler: "IconColumns3", hugeicons: "LayoutThreeColumnIcon", phosphor: "ColumnsIcon", remixicon: "RiLayoutColumnLine", className: "size-4" }));
const effortIcon = (_jsx(IconPlaceholder, { lucide: "SlidersHorizontalIcon", tabler: "IconAdjustmentsHorizontal", hugeicons: "SlidersHorizontalIcon", phosphor: "SlidersHorizontalIcon", remixicon: "RiEqualizer2Line", className: "size-4" }));
const impactIcon = (_jsx(IconPlaceholder, { lucide: "TrendingUpIcon", tabler: "IconTrendingUp", hugeicons: "TradeUpIcon", phosphor: "TrendUpIcon", remixicon: "RiStockLine", className: "size-4" }));
const repositoryIcon = (_jsx(IconPlaceholder, { lucide: "GitBranchIcon", tabler: "IconGitBranch", hugeicons: "GitBranchIcon", phosphor: "GitBranchIcon", remixicon: "RiGitBranchLine", className: "size-4" }));
const designIcon = (_jsx(IconPlaceholder, { lucide: "PaletteIcon", tabler: "IconPalette", hugeicons: "PaintBoardIcon", phosphor: "PaletteIcon", remixicon: "RiPaletteLine", className: "size-4" }));
const planIcon = (_jsx(IconPlaceholder, { lucide: "PackageIcon", tabler: "IconPackage", hugeicons: "PackageIcon", phosphor: "PackageIcon", remixicon: "RiBox3Line", className: "size-4" }));
const seatsIcon = (_jsx(IconPlaceholder, { lucide: "UsersRoundIcon", tabler: "IconUsersGroup", hugeicons: "UserMultiple02Icon", phosphor: "UsersThreeIcon", remixicon: "RiTeamLine", className: "size-4" }));
const noteIcon = (_jsx(IconPlaceholder, { lucide: "SquarePenIcon", tabler: "IconEdit", hugeicons: "FileEditIcon", phosphor: "NotePencilIcon", remixicon: "RiEditBoxLine", className: "size-4" }));
const importIcon = (_jsx(IconPlaceholder, { lucide: "CloudDownloadIcon", tabler: "IconCloudDownload", hugeicons: "CloudDownloadIcon", phosphor: "CloudArrowDownIcon", remixicon: "RiDownloadCloud2Line", className: "size-4" }));
/**
 * Product marks, not icons.
 *
 * `CascaderAction` takes any ReactNode for `icon`, so each entry can carry the
 * logo of the product it names. That is the whole reason the flyout is a list
 * of SOURCES rather than a list of field types: seven marks are told apart at a
 * glance, where seven variations on a generic glyph are not. The full-colour
 * marks need no theme handling; GitHub's is one flat shape, so both files ship
 * and `dark:` picks between them at paint time.
 */
const slackLogo = _jsx(Slack, { className: "size-4", "aria-hidden": "true" });
const githubLogo = (_jsxs(_Fragment, { children: [_jsx(GithubLight, { className: "size-4 dark:hidden", "aria-hidden": "true" }), _jsx(GithubDark, { className: "hidden size-4 dark:block", "aria-hidden": "true" })] }));
const driveLogo = _jsx(GoogleDrive, { className: "size-4", "aria-hidden": "true" });
const dropboxLogo = _jsx(Dropbox, { className: "size-4", "aria-hidden": "true" });
const supabaseLogo = _jsx(Supabase, { className: "size-4", "aria-hidden": "true" });
const stripeLogo = _jsx(Stripe, { className: "size-4", "aria-hidden": "true" });
const redisLogo = _jsx(Redis, { className: "size-4", "aria-hidden": "true" });
const properties = [
    {
        value: "basics",
        label: "Basics",
        icon: basicsIcon,
        children: [
            { value: "basics.title", label: "Title", icon: textIcon },
            { value: "basics.summary", label: "Summary", icon: longTextIcon },
            { value: "basics.slug", label: "Slug", icon: slugIcon },
        ],
    },
    {
        value: "people",
        label: "People",
        icon: peopleIcon,
        children: [
            { value: "people.owner", label: "Owner", icon: personIcon },
            { value: "people.reviewers", label: "Reviewers", icon: approverIcon },
            { value: "people.watchers", label: "Watchers", icon: watcherIcon },
        ],
    },
    {
        value: "dates",
        label: "Dates",
        icon: datesIcon,
        children: [
            { value: "dates.created", label: "Created at", icon: timestampIcon },
            { value: "dates.due", label: "Due date", icon: deadlineIcon },
            { value: "dates.shipped", label: "Shipped at", icon: shippedIcon },
        ],
    },
    {
        value: "workflow",
        label: "Workflow",
        icon: workflowIcon,
        children: [
            { value: "workflow.status", label: "Status", icon: statusIcon },
            { value: "workflow.priority", label: "Priority", icon: priorityIcon },
            { value: "workflow.stage", label: "Stage", icon: stageIcon },
        ],
    },
    {
        value: "metrics",
        label: "Metrics",
        icon: metricsIcon,
        children: [
            { value: "metrics.effort", label: "Effort", icon: effortIcon },
            { value: "metrics.impact", label: "Impact", icon: impactIcon },
        ],
    },
    {
        value: "links",
        label: "Links",
        icon: linksIcon,
        children: [
            { value: "links.repo", label: "Repository", icon: repositoryIcon },
            { value: "links.design", label: "Design file", icon: designIcon },
        ],
    },
    {
        value: "billing",
        label: "Billing",
        icon: billingIcon,
        children: [
            { value: "billing.plan", label: "Plan", icon: planIcon },
            { value: "billing.seats", label: "Seats", icon: seatsIcon },
        ],
    },
    { value: "notes", label: "Notes", icon: noteIcon },
];
/**
 * The flyout body.
 *
 * Its own component because `useCascaderSubmenu` has to be called from INSIDE
 * the submenu, and `close()` is what makes a command list behave like one: a
 * command runs and the list goes away, rather than sitting open as if the
 * entries were toggles.
 *
 * Seven entries is enough that a flat list stops reading as a list and starts
 * reading as a wall, so they are split into two named runs. `CascaderGroup`
 * rather than a `<div>` with a heading in it: the group is what carries the
 * name, so a screen reader says "Apps, group" before the four entries instead
 * of reading out a line of text that belongs to nothing. `CascaderSeparator`
 * draws the break for everyone else.
 */
function ImportSourceMenu({ onImport, }) {
    const { close } = useCascaderSubmenu();
    const run = (source) => () => {
        onImport(source);
        close();
    };
    return (_jsxs(_Fragment, { children: [_jsxs(CascaderGroup, { className: "gap-0.5", children: [_jsx(CascaderLabel, { children: "Apps" }), _jsx(CascaderAction, { icon: slackLogo, onSelect: run("Slack"), children: "Slack" }), _jsx(CascaderAction, { icon: githubLogo, onSelect: run("GitHub"), children: "GitHub" }), _jsx(CascaderAction, { icon: driveLogo, onSelect: run("Google Drive"), children: "Google Drive" }), _jsx(CascaderAction, { icon: dropboxLogo, onSelect: run("Dropbox"), children: "Dropbox" })] }), _jsx(CascaderSeparator, {}), _jsxs(CascaderGroup, { className: "gap-0.5", children: [_jsx(CascaderLabel, { children: "Data sources" }), _jsx(CascaderAction, { icon: supabaseLogo, onSelect: run("Supabase"), children: "Supabase" }), _jsx(CascaderAction, { icon: stripeLogo, onSelect: run("Stripe"), children: "Stripe" }), _jsx(CascaderAction, { icon: redisLogo, onSelect: run("Redis"), children: "Redis" })] })] }));
}
/**
 * A pinned footer, and a flyout that opens to the side.
 *
 * "The property I want is not in this list, it lives in another product" is a
 * normal outcome of a property picker, and the answer to it is a COMMAND rather
 * than another row. `CascaderFooter` pins its actions below the list, where
 * they stay put while the list scrolls, changes level, or filters down to
 * nothing - which is exactly the moment "Import properties from" is most
 * useful, and exactly the moment a row inside the list would have disappeared.
 *
 * `CascaderSubmenu` turns that row into a side-anchored flyout, so the seven
 * connected sources do not have to be seven footer rows. It is one level deep
 * on purpose: a footer is for commands, and a command list that nests is a menu
 * bar in disguise. One command is all this picker needs, and a footer holding a
 * single row is still worth having - it is the border and the pinning that make
 * the row read as an action rather than an eighth option.
 *
 * Nothing in the footer joins the option list. It is not in the arrow-key ring,
 * it is not filtered by the query, and it never becomes a selection - press
 * Escape once to close the flyout and again to close the cascader.
 *
 * The wrapper centres the demo horizontally (`w-full` + `items-center`, so the
 * trigger sits on the middle of the frame whichever surface renders it) and
 * pins it to the TOP (`self-start`). Both the docs frame and the catalog card
 * centre their child vertically, and this example grows a second line the
 * moment a source is imported, so a vertically centred demo would slide up
 * under the reader's cursor as it reports back. `pt-6` then keeps that top edge
 * off the frame.
 */
export default function Pattern() {
    const [value, setValue] = useState("");
    const [log, setLog] = useState("");
    return (_jsxs("div", { className: "flex w-full flex-col items-center gap-3 self-start px-4 pt-6 pb-4", children: [_jsxs(Cascader, { items: properties, value: value, onValueChange: setValue, children: [_jsx(CascaderTrigger, { "aria-label": "Property", render: _jsx(Button, { variant: "outline", className: "w-72 justify-between gap-2 font-normal" }), children: _jsx(CascaderValue, { placeholder: "Select a property" }) }), _jsx(CascaderContent, { className: "w-72", children: _jsxs(CascaderPanel, { children: [_jsx(CascaderNav, { children: _jsx(CascaderInput, {}) }), _jsx(CascaderBreadcrumb, {}), _jsx(CascaderEmpty, {}), _jsx(CascaderList, { children: _jsx(CascaderItems, {}) }), _jsx(CascaderFooter, { children: _jsxs(CascaderSubmenu, { children: [_jsx(CascaderSubmenuTrigger, { icon: importIcon, children: "Import properties from" }), _jsx(CascaderSubmenuContent, { children: _jsx(ImportSourceMenu, { onImport: (source) => setLog(`Importing from ${source}`) }) })] }) }), _jsx(CascaderStatus, {})] }) })] }), _jsx("p", { className: "text-muted-foreground min-h-4 text-xs", role: "status", children: log })] }));
}
