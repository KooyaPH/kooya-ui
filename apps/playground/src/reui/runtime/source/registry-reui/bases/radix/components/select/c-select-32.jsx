import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const categories = [
    {
        value: "documents",
        label: "Documents",
        icon: (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", className: "size-4" })),
    },
    {
        value: "images",
        label: "Images",
        icon: (_jsx(IconPlaceholder, { lucide: "ImageIcon", tabler: "IconPhoto", hugeicons: "ImageIcon", phosphor: "ImageIcon", remixicon: "RiImageLine", className: "size-4" })),
    },
    {
        value: "videos",
        label: "Videos",
        icon: (_jsx(IconPlaceholder, { lucide: "VideoIcon", tabler: "IconVideo", hugeicons: "Video02Icon", phosphor: "VideoCameraIcon", remixicon: "RiVideoOnLine", className: "size-4" })),
    },
    {
        value: "audio",
        label: "Audio",
        icon: (_jsx(IconPlaceholder, { lucide: "MusicIcon", tabler: "IconMusic", hugeicons: "MusicNote03Icon", phosphor: "MusicNotesIcon", remixicon: "RiMusic2Line", className: "size-4" })),
    },
    {
        value: "archives",
        label: "Archives",
        icon: (_jsx(IconPlaceholder, { lucide: "ArchiveIcon", tabler: "IconArchive", hugeicons: "Archive02Icon", phosphor: "ArchiveIcon", remixicon: "RiArchiveLine", className: "size-4" })),
    },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { defaultValue: categories[0].value, children: [_jsx(SelectTrigger, { className: "w-[200px]", children: _jsx(SelectValue, { placeholder: "Select category" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: categories.map((category) => (_jsx(SelectItem, { value: category.value, children: _jsxs("span", { className: "flex items-center gap-2", children: [category.icon, _jsx("span", { children: category.label })] }) }, category.value))) }) })] }) }));
}
