import { jsx as _jsx } from "react/jsx-runtime";
import { FileType, } from "../../reui/file-type.jsx";
const formats = [
    "pdf",
    "docx",
    "xlsx",
    "pptx",
    "jpg",
    "mp4",
    "mp3",
    "zip",
    "fig",
    "html",
];
export default function Pattern() {
    // No captions: each icon names itself ("PDF file", "MP4 file"), so a screen
    // reader still hears every format.
    return (_jsx("div", { className: "mx-auto grid w-fit grid-cols-5 gap-x-4 gap-y-6", children: formats.map((type) => (_jsx(FileType, { type: type }, type))) }));
}
