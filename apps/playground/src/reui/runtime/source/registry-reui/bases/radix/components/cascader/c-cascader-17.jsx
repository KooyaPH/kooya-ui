"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Cascader, CascaderContent, CascaderEmpty, CascaderList, CascaderPanel, CascaderStatus, CascaderTrigger, useCascaderSelection, } from "../../../../../../../adapters/cascader.tsx";
import { CascaderItems } from "../../../../../../../adapters/cascader.tsx";
import { CascaderBreadcrumb, CascaderInput, CascaderNav, CascaderValue, } from "../../../../../../../adapters/cascader.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
/* -------------------------------------------------------------------------- */
/*                                    Icons                                   */
/* -------------------------------------------------------------------------- */
/**
 * One glyph per THING, never one glyph per LEVEL.
 *
 * This example used to draw the same table icon on all eight tables and the
 * same column icon on every column under them, which is the shape of an icon
 * without any of the use: a marker repeated down a level tells you where you
 * are, which the breadcrumb already said, and nothing about the row it is on.
 * So a table gets the icon of its subject and a column gets the icon of its
 * TYPE - money, timestamp, identifier, geography - and the run of icons down a
 * level becomes a second, faster reading of the level's shape.
 *
 * Written out one by one because `IconPlaceholder` resolves its five names at
 * build time: a helper that took the names as arguments would hand it dynamic
 * values, and `shadcn add` would emit a component that imports nothing.
 *
 * These are decoration, not state, so none of them pins its colour. The row's
 * own `data-highlighted:**:text-accent-foreground` is meant to reach them: the
 * icon belongs to the row and should follow it. A mark that carries MEANING -
 * a check, a status dot - is the case that has to pin both levels.
 */
const usersIcon = (_jsx(IconPlaceholder, { lucide: "UsersIcon", tabler: "IconUsers", hugeicons: "UserGroupIcon", phosphor: "UsersIcon", remixicon: "RiGroupLine", className: "size-4" }));
const cartIcon = (_jsx(IconPlaceholder, { lucide: "ShoppingCartIcon", tabler: "IconShoppingCart", hugeicons: "ShoppingCart01Icon", phosphor: "ShoppingCartIcon", remixicon: "RiShoppingCartLine", className: "size-4" }));
const packageIcon = (_jsx(IconPlaceholder, { lucide: "PackageIcon", tabler: "IconPackage", hugeicons: "PackageIcon", phosphor: "PackageIcon", remixicon: "RiBox3Line", className: "size-4" }));
const receiptIcon = (_jsx(IconPlaceholder, { lucide: "ReceiptIcon", tabler: "IconReceipt", hugeicons: "Invoice01Icon", phosphor: "ReceiptIcon", remixicon: "RiReceiptLine", className: "size-4" }));
const truckIcon = (_jsx(IconPlaceholder, { lucide: "TruckIcon", tabler: "IconTruck", hugeicons: "TruckIcon", phosphor: "TruckIcon", remixicon: "RiTruckLine", className: "size-4" }));
const undoIcon = (_jsx(IconPlaceholder, { lucide: "RotateCcwIcon", tabler: "IconRotate2", hugeicons: "UndoIcon", phosphor: "ArrowCounterClockwiseIcon", remixicon: "RiArrowGoBackLine", className: "size-4" }));
const repeatIcon = (_jsx(IconPlaceholder, { lucide: "RepeatIcon", tabler: "IconRepeat", hugeicons: "RepeatIcon", phosphor: "RepeatIcon", remixicon: "RiRepeatLine", className: "size-4" }));
const monitorIcon = (_jsx(IconPlaceholder, { lucide: "MonitorIcon", tabler: "IconDeviceDesktop", hugeicons: "ComputerIcon", phosphor: "MonitorIcon", remixicon: "RiComputerLine", className: "size-4" }));
const houseIcon = (_jsx(IconPlaceholder, { lucide: "HouseIcon", tabler: "IconHome", hugeicons: "Home03Icon", phosphor: "HouseIcon", remixicon: "RiHome5Line", className: "size-4" }));
const cardIcon = (_jsx(IconPlaceholder, { lucide: "CreditCardIcon", tabler: "IconCreditCard", hugeicons: "CreditCardIcon", phosphor: "CreditCardIcon", remixicon: "RiBankCardLine", className: "size-4" }));
const textIcon = (_jsx(IconPlaceholder, { lucide: "TypeIcon", tabler: "IconLetterCase", hugeicons: "TextFontIcon", phosphor: "TextAaIcon", remixicon: "RiFontSize", className: "size-4" }));
const mailIcon = (_jsx(IconPlaceholder, { lucide: "MailIcon", tabler: "IconMail", hugeicons: "Mail01Icon", phosphor: "EnvelopeIcon", remixicon: "RiMailLine", className: "size-4" }));
const phoneIcon = (_jsx(IconPlaceholder, { lucide: "PhoneIcon", tabler: "IconPhone", hugeicons: "Call02Icon", phosphor: "PhoneIcon", remixicon: "RiPhoneLine", className: "size-4" }));
const moneyIcon = (_jsx(IconPlaceholder, { lucide: "BanknoteIcon", tabler: "IconCashBanknote", hugeicons: "Money01Icon", phosphor: "MoneyIcon", remixicon: "RiMoneyDollarCircleLine", className: "size-4" }));
const hashIcon = (_jsx(IconPlaceholder, { lucide: "HashIcon", tabler: "IconHash", hugeicons: "HashtagIcon", phosphor: "HashIcon", remixicon: "RiHashtag", className: "size-4" }));
const codeIcon = (_jsx(IconPlaceholder, { lucide: "QrCodeIcon", tabler: "IconQrcode", hugeicons: "QrCodeIcon", phosphor: "QrCodeIcon", remixicon: "RiQrCodeLine", className: "size-4" }));
const routeIcon = (_jsx(IconPlaceholder, { lucide: "RouteIcon", tabler: "IconRoute", hugeicons: "Route01Icon", phosphor: "PathIcon", remixicon: "RiRouteLine", className: "size-4" }));
const statusIcon = (_jsx(IconPlaceholder, { lucide: "CircleDashedIcon", tabler: "IconCircleDashed", hugeicons: "DashedLineCircleIcon", phosphor: "CircleDashedIcon", remixicon: "RiRecordCircleLine", className: "size-4" }));
const calendarIcon = (_jsx(IconPlaceholder, { lucide: "CalendarIcon", tabler: "IconCalendar", hugeicons: "Calendar03Icon", phosphor: "CalendarBlankIcon", remixicon: "RiCalendarLine", className: "size-4" }));
const calendarDueIcon = (_jsx(IconPlaceholder, { lucide: "CalendarClockIcon", tabler: "IconCalendarClock", hugeicons: "Calendar02Icon", phosphor: "CalendarDotsIcon", remixicon: "RiCalendarScheduleLine", className: "size-4" }));
const calendarDoneIcon = (_jsx(IconPlaceholder, { lucide: "CalendarCheckIcon", tabler: "IconCalendarCheck", hugeicons: "CalendarCheckIn01Icon", phosphor: "CalendarCheckIcon", remixicon: "RiCalendarCheckLine", className: "size-4" }));
const timerIcon = (_jsx(IconPlaceholder, { lucide: "TimerIcon", tabler: "IconClock", hugeicons: "Timer01Icon", phosphor: "TimerIcon", remixicon: "RiTimerLine", className: "size-4" }));
const pinIcon = (_jsx(IconPlaceholder, { lucide: "MapPinIcon", tabler: "IconMapPin", hugeicons: "Location01Icon", phosphor: "MapPinIcon", remixicon: "RiMapPinLine", className: "size-4" }));
const globeIcon = (_jsx(IconPlaceholder, { lucide: "GlobeIcon", tabler: "IconWorld", hugeicons: "Globe02Icon", phosphor: "GlobeIcon", remixicon: "RiGlobalLine", className: "size-4" }));
const buildingIcon = (_jsx(IconPlaceholder, { lucide: "BuildingIcon", tabler: "IconBuilding", hugeicons: "Building02Icon", phosphor: "BuildingIcon", remixicon: "RiBuilding2Line", className: "size-4" }));
const targetIcon = (_jsx(IconPlaceholder, { lucide: "TargetIcon", tabler: "IconTarget", hugeicons: "Target01Icon", phosphor: "TargetIcon", remixicon: "RiFocus3Line", className: "size-4" }));
const tagIcon = (_jsx(IconPlaceholder, { lucide: "TagIcon", tabler: "IconTag", hugeicons: "Tag01Icon", phosphor: "TagIcon", remixicon: "RiPriceTag3Line", className: "size-4" }));
const storeIcon = (_jsx(IconPlaceholder, { lucide: "StoreIcon", tabler: "IconBuildingStore", hugeicons: "Store01Icon", phosphor: "StorefrontIcon", remixicon: "RiStore2Line", className: "size-4" }));
const listIcon = (_jsx(IconPlaceholder, { lucide: "ListIcon", tabler: "IconList", hugeicons: "LeftToRightListBulletIcon", phosphor: "ListBulletsIcon", remixicon: "RiListUnordered", className: "size-4" }));
const walletIcon = (_jsx(IconPlaceholder, { lucide: "WalletIcon", tabler: "IconWallet", hugeicons: "Wallet01Icon", phosphor: "WalletIcon", remixicon: "RiWallet3Line", className: "size-4" }));
const archiveIcon = (_jsx(IconPlaceholder, { lucide: "ArchiveIcon", tabler: "IconArchive", hugeicons: "Archive01Icon", phosphor: "ArchiveIcon", remixicon: "RiArchiveLine", className: "size-4" }));
const layersIcon = (_jsx(IconPlaceholder, { lucide: "LayersIcon", tabler: "IconStack2", hugeicons: "Layers01Icon", phosphor: "StackIcon", remixicon: "RiStackLine", className: "size-4" }));
const approvedIcon = (_jsx(IconPlaceholder, { lucide: "UserCheckIcon", tabler: "IconUserCheck", hugeicons: "UserCheck01Icon", phosphor: "UserCheckIcon", remixicon: "RiUserFollowLine", className: "size-4" }));
const browserIcon = (_jsx(IconPlaceholder, { lucide: "AppWindowIcon", tabler: "IconAppWindow", hugeicons: "BrowserIcon", phosphor: "AppWindowIcon", remixicon: "RiWindowLine", className: "size-4" }));
const wifiIcon = (_jsx(IconPlaceholder, { lucide: "WifiIcon", tabler: "IconWifi", hugeicons: "Wifi01Icon", phosphor: "WifiHighIcon", remixicon: "RiWifiLine", className: "size-4" }));
/* -------------------------------------------------------------------------- */
/*                                    Data                                    */
/* -------------------------------------------------------------------------- */
/**
 * Eight tables, each with six or more columns, and two of them with a nested
 * group inside.
 *
 * The child levels used to hold two or three columns, which made every drill a
 * dead end: you pressed a table, saw less than fits on one screen of the panel
 * and pressed Back. A level worth entering has to be worth SEARCHING, which is
 * the whole reason the panel carries an input, so no branch here bottoms out
 * under six. `Customers / Address` and `Orders / Payment` go one level deeper
 * again, because a three-level path is what makes the breadcrumb, the Back
 * affordance and the deep-search result path do any work at all.
 *
 * Several tables carry a "Name", a "Status" and a "Created at" of their own.
 * The duplicate labels are the point: a bare chip saying "Status" four times is
 * worthless, so the chip label below is built from the node's PATH.
 */
const fields = [
    {
        value: "customers",
        label: "Customers",
        icon: usersIcon,
        children: [
            { value: "customers.name", label: "Name", icon: textIcon },
            { value: "customers.email", label: "Email", icon: mailIcon },
            { value: "customers.phone", label: "Phone", icon: phoneIcon },
            { value: "customers.segment", label: "Segment", icon: tagIcon },
            {
                value: "customers.lifetime_value",
                label: "Lifetime value",
                icon: moneyIcon,
            },
            { value: "customers.signed_up", label: "Signed up", icon: calendarIcon },
            {
                value: "customers.address",
                label: "Address",
                icon: houseIcon,
                children: [
                    {
                        value: "customers.address.street",
                        label: "Street",
                        icon: textIcon,
                    },
                    {
                        value: "customers.address.city",
                        label: "City",
                        icon: buildingIcon,
                    },
                    {
                        value: "customers.address.postal_code",
                        label: "Postal code",
                        icon: hashIcon,
                    },
                    {
                        value: "customers.address.region",
                        label: "Region",
                        icon: pinIcon,
                    },
                    {
                        value: "customers.address.country",
                        label: "Country",
                        icon: globeIcon,
                    },
                    {
                        value: "customers.address.coordinates",
                        label: "Coordinates",
                        icon: targetIcon,
                    },
                ],
            },
        ],
    },
    {
        value: "orders",
        label: "Orders",
        icon: cartIcon,
        children: [
            { value: "orders.number", label: "Order number", icon: hashIcon },
            { value: "orders.total", label: "Total", icon: moneyIcon },
            { value: "orders.status", label: "Status", icon: statusIcon },
            { value: "orders.channel", label: "Channel", icon: storeIcon },
            { value: "orders.line_items", label: "Line items", icon: listIcon },
            { value: "orders.placed_at", label: "Placed at", icon: calendarIcon },
            {
                value: "orders.payment",
                label: "Payment",
                icon: cardIcon,
                children: [
                    {
                        value: "orders.payment.method",
                        label: "Method",
                        icon: walletIcon,
                    },
                    {
                        value: "orders.payment.card_brand",
                        label: "Card brand",
                        icon: cardIcon,
                    },
                    {
                        value: "orders.payment.last_four",
                        label: "Last four",
                        icon: hashIcon,
                    },
                    {
                        value: "orders.payment.authorized_at",
                        label: "Authorized at",
                        icon: calendarIcon,
                    },
                    {
                        value: "orders.payment.captured_at",
                        label: "Captured at",
                        icon: calendarDoneIcon,
                    },
                    {
                        value: "orders.payment.processor_fee",
                        label: "Processor fee",
                        icon: moneyIcon,
                    },
                ],
            },
        ],
    },
    {
        value: "products",
        label: "Products",
        icon: packageIcon,
        children: [
            { value: "products.name", label: "Name", icon: textIcon },
            { value: "products.sku", label: "SKU", icon: codeIcon },
            { value: "products.price", label: "Price", icon: moneyIcon },
            { value: "products.stock", label: "Stock on hand", icon: archiveIcon },
            { value: "products.category", label: "Category", icon: tagIcon },
            { value: "products.created_at", label: "Created at", icon: calendarIcon },
        ],
    },
    {
        value: "invoices",
        label: "Invoices",
        icon: receiptIcon,
        children: [
            { value: "invoices.number", label: "Number", icon: hashIcon },
            { value: "invoices.amount_due", label: "Amount due", icon: moneyIcon },
            { value: "invoices.status", label: "Status", icon: statusIcon },
            { value: "invoices.issued_at", label: "Issued at", icon: calendarIcon },
            { value: "invoices.due_date", label: "Due date", icon: calendarDueIcon },
            { value: "invoices.paid_at", label: "Paid at", icon: calendarDoneIcon },
        ],
    },
    {
        value: "shipments",
        label: "Shipments",
        icon: truckIcon,
        children: [
            { value: "shipments.carrier", label: "Carrier", icon: truckIcon },
            {
                value: "shipments.tracking",
                label: "Tracking number",
                icon: routeIcon,
            },
            { value: "shipments.destination", label: "Destination", icon: pinIcon },
            { value: "shipments.status", label: "Status", icon: statusIcon },
            {
                value: "shipments.shipped_at",
                label: "Shipped at",
                icon: calendarIcon,
            },
            {
                value: "shipments.delivered_at",
                label: "Delivered at",
                icon: calendarDoneIcon,
            },
        ],
    },
    {
        value: "refunds",
        label: "Refunds",
        icon: undoIcon,
        children: [
            { value: "refunds.amount", label: "Amount", icon: moneyIcon },
            { value: "refunds.reason", label: "Reason", icon: textIcon },
            { value: "refunds.status", label: "Status", icon: statusIcon },
            {
                value: "refunds.approved_by",
                label: "Approved by",
                icon: approvedIcon,
            },
            {
                value: "refunds.requested_at",
                label: "Requested at",
                icon: calendarIcon,
            },
            {
                value: "refunds.processed_at",
                label: "Processed at",
                icon: calendarDoneIcon,
            },
        ],
    },
    {
        value: "subscriptions",
        label: "Subscriptions",
        icon: repeatIcon,
        children: [
            { value: "subscriptions.plan", label: "Plan", icon: layersIcon },
            { value: "subscriptions.seats", label: "Seats", icon: usersIcon },
            {
                value: "subscriptions.mrr",
                label: "Monthly revenue",
                icon: moneyIcon,
            },
            { value: "subscriptions.status", label: "Status", icon: statusIcon },
            {
                value: "subscriptions.started_at",
                label: "Started at",
                icon: calendarIcon,
            },
            {
                value: "subscriptions.renews_at",
                label: "Renews at",
                icon: calendarDueIcon,
            },
        ],
    },
    {
        value: "sessions",
        label: "Sessions",
        icon: monitorIcon,
        children: [
            { value: "sessions.device", label: "Device", icon: monitorIcon },
            { value: "sessions.browser", label: "Browser", icon: browserIcon },
            { value: "sessions.ip_address", label: "IP address", icon: wifiIcon },
            { value: "sessions.location", label: "Location", icon: pinIcon },
            { value: "sessions.started_at", label: "Started at", icon: calendarIcon },
            { value: "sessions.duration", label: "Duration", icon: timerIcon },
        ],
    },
];
/* -------------------------------------------------------------------------- */
/*                                    Chips                                   */
/* -------------------------------------------------------------------------- */
/**
 * The chip row, rendered by the CONSUMER.
 *
 * `useCascaderSelection` hands back the resolved nodes and their ancestor
 * chains plus `remove`, which is everything a chip needs - so the chip is an
 * ordinary ReUI `Badge` with a ghost icon `Button` in it, styled by the design
 * system rather than by the primitive. `CascaderChips` remains for the case
 * where the chips ARE the trigger surface; this is the other shape, where the
 * trigger stays a button and the chips live beside it.
 *
 * There is no "Clear all" here on purpose. The row is a set of individual
 * removals, and a second, differently shaped control sitting in the same flex
 * wrap read as one more chip - one that silently threw the whole selection
 * away. `clear` is on the hook for the case where a page has a real place to
 * put it.
 */
function ColumnChips() {
    const { paths, isEmpty, remove } = useCascaderSelection();
    if (isEmpty) {
        return (_jsx("p", { className: "text-muted-foreground text-sm", children: "No columns yet. Pick a table to start." }));
    }
    // Driven off `paths` rather than `selected`, because a path carries the
    // ancestors AND its own leaf - and `selected` drops values the index cannot
    // resolve, so the two arrays are not guaranteed to line up index for index.
    return (_jsx("div", { className: "flex flex-wrap items-center gap-1.5", children: paths.map((path) => {
            const node = path[path.length - 1];
            if (!node)
                return null;
            /**
             * The WHOLE chain, not just the parent.
             *
             * Four tables have a "Status" and three have a "Created at", so a bare
             * label is ambiguous - and now that two tables carry a nested group,
             * one level of parent is ambiguous too: "Address / Country" does not
             * say which table's address it came from. The chip is the only place
             * the choice survives after the panel closes, so it carries the path
             * that would let you find the column again.
             */
            const label = path.map((ancestor) => ancestor.label).join(" / ");
            return (_jsxs(Badge, { variant: "secondary", className: "gap-0.5", children: [label, _jsx(Button, { variant: "ghost", size: "icon", "aria-label": `Remove ${label}`, onClick: () => remove(node.value), className: "size-3 hover:bg-transparent", children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine" }) })] }, node.value));
        }) }));
}
/**
 * Chips instead of "3 selected".
 *
 * A report builder is the case for it: you need to see what you already picked
 * and drop one of them without reopening the panel. Labels repeat across the
 * tables - four of them have a "Status" - so a chip carries its full path
 * rather than the column name on its own.
 *
 * The wrapper pins itself to the TOP of the preview surface (`self-start`,
 * plus `items-start` for the case where a host stretches it). Both the docs
 * frame and the catalog card centre their child vertically, and the chip row
 * wraps onto a new line as columns are added, so a centred demo shifts the
 * trigger every time you pick one. `pt-6` keeps the top edge deliberate rather
 * than flush.
 *
 * `max-w-md` rather than the usual field width, because the chips are the
 * second half of this example and a three-segment path is a wide chip: at
 * `max-w-sm` each one owned a line of its own and the row stopped reading as a
 * row.
 */
export default function Pattern() {
    const [value, setValue] = useState([]);
    return (_jsx("div", { className: "flex w-full items-start justify-center self-start px-4 pt-6 pb-4", children: _jsx("div", { className: "flex w-full max-w-md flex-col gap-3", children: _jsxs(Cascader, { multiple: true, items: fields, value: value, onValueChange: setValue, children: [_jsx(CascaderTrigger, { "aria-label": "Report columns", render: _jsx(Button, { variant: "outline", className: "w-full justify-between gap-2 font-normal" }), children: _jsx(CascaderValue, { placeholder: "Add a column...", display: "count" }) }), _jsx(CascaderContent, { className: "w-80", children: _jsxs(CascaderPanel, { children: [_jsx(CascaderNav, { children: _jsx(CascaderInput, {}) }), _jsx(CascaderBreadcrumb, {}), _jsx(CascaderEmpty, {}), _jsx(CascaderList, { children: _jsx(CascaderItems, {}) }), _jsx(CascaderStatus, {})] }) }), _jsx(ColumnChips, {})] }) }) }));
}
