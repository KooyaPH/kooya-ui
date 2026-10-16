import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { Kbd } from "../../../../../registry/bases/radix/ui/kbd.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const commands = [
    {
        icon: (_jsx(IconPlaceholder, { lucide: "SearchIcon", tabler: "IconSearch", hugeicons: "Search01Icon", phosphor: "MagnifyingGlassIcon", remixicon: "RiSearchLine" })),
        label: "Search",
        shortcut: "⌘K",
    },
    {
        icon: (_jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine" })),
        label: "New File",
        shortcut: "⌘N",
    },
    {
        icon: (_jsx(IconPlaceholder, { lucide: "SaveIcon", tabler: "IconDeviceFloppy", hugeicons: "FloppyDiskIcon", phosphor: "FloppyDiskIcon", remixicon: "RiSaveLine" })),
        label: "Save",
        shortcut: "⌘S",
    },
    {
        icon: (_jsx(IconPlaceholder, { lucide: "SettingsIcon", tabler: "IconSettings", hugeicons: "SettingsIcon", phosphor: "GearIcon", remixicon: "RiSettings3Line" })),
        label: "Settings",
        shortcut: "⌘,",
    },
    {
        icon: (_jsx(IconPlaceholder, { lucide: "LogOutIcon", tabler: "IconLogout", hugeicons: "LogoutSquare01Icon", phosphor: "SignOutIcon", remixicon: "RiLogoutBoxRLine" })),
        label: "Sign Out",
        shortcut: "⌘Q",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-64 flex-col gap-0.5", children: commands.map((cmd) => (_jsx(Item, { asChild: true, size: "xs", children: _jsxs("a", { href: "#", children: [_jsx(ItemMedia, { variant: "icon", children: cmd.icon }), _jsx(ItemContent, { children: _jsx(ItemTitle, { children: cmd.label }) }), _jsx(ItemActions, { children: _jsx(Kbd, { children: cmd.shortcut }) })] }) }, cmd.label))) }));
}
