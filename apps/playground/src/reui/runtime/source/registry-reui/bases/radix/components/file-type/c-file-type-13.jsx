import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileType, } from "../../reui/file-type.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const FILES = [
    {
        type: "pdf",
        caption: "Locked PDF",
        icon: (_jsx(IconPlaceholder, { lucide: "LockIcon", tabler: "IconLock", hugeicons: "SquareLock01Icon", phosphor: "LockSimpleIcon", remixicon: "RiLockLine" })),
    },
    {
        type: "docx",
        caption: "Verified DOCX",
        icon: (_jsx(IconPlaceholder, { lucide: "ShieldCheckIcon", tabler: "IconShieldCheck", hugeicons: "ShieldEnergyIcon", phosphor: "ShieldCheckIcon", remixicon: "RiShieldCheckLine" })),
    },
    {
        type: "xlsx",
        caption: "Shared XLSX",
        icon: (_jsx(IconPlaceholder, { lucide: "LinkIcon", tabler: "IconLink", hugeicons: "Link01Icon", phosphor: "LinkIcon", remixicon: "RiLinkM" })),
    },
    {
        type: "png",
        caption: "Starred PNG",
        icon: (_jsx(IconPlaceholder, { lucide: "StarIcon", tabler: "IconStar", hugeicons: "StarIcon", phosphor: "StarIcon", remixicon: "RiStarLine" })),
    },
    {
        type: "fig",
        caption: "Hidden FIG",
        icon: (_jsx(IconPlaceholder, { lucide: "EyeOffIcon", tabler: "IconEyeOff", hugeicons: "ViewOffSlashIcon", phosphor: "EyeSlashIcon", remixicon: "RiEyeOffLine" })),
    },
    {
        type: "zip",
        caption: "Uploading ZIP",
        icon: (_jsx(IconPlaceholder, { lucide: "CloudUploadIcon", tabler: "IconCloudUpload", hugeicons: "CloudUploadIcon", phosphor: "CloudArrowUpIcon", remixicon: "RiUploadCloud2Line" })),
    },
];
export default function Pattern() {
    return (_jsx("ul", { className: "mx-auto grid w-fit grid-cols-3 gap-x-8 gap-y-6", children: FILES.map((file) => (_jsxs("li", { className: "flex flex-col items-center gap-2.5", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(FileType, { type: file.type, icon: file.icon, "aria-hidden": "true" }), _jsx(FileType, { type: file.type, icon: file.icon, variant: "solid", "aria-hidden": "true" })] }), _jsx("span", { className: "text-muted-foreground text-xs", children: file.caption })] }, file.type))) }));
}
