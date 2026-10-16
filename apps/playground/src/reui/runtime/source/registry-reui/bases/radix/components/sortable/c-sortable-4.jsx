"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
import { Sortable, SortableItem, SortableItemHandle, } from "../../reui/sortable.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const defaultTracks = [
    {
        id: "1",
        title: "Midnight City",
        artist: "M83",
        album: "Hurry Up, We're Dreaming",
        duration: "4:03",
        plays: "1.2B",
        active: true,
    },
    {
        id: "2",
        title: "Digital Love",
        artist: "Daft Punk",
        album: "Discovery",
        duration: "4:58",
        plays: "845M",
    },
    {
        id: "3",
        title: "Starlight",
        artist: "Muse",
        album: "Black Holes",
        duration: "3:59",
        plays: "720M",
    },
    {
        id: "4",
        title: "Take On Me",
        artist: "a-ha",
        album: "Hunting High and Low",
        duration: "3:48",
        plays: "1.8B",
    },
    {
        id: "5",
        title: "Blue Monday",
        artist: "New Order",
        album: "Power, Corruption",
        duration: "7:29",
        plays: "530M",
    },
];
export default function Pattern() {
    const [tracks, setTracks] = useState(defaultTracks);
    return (_jsx("div", { className: "mx-auto w-full max-w-md", children: _jsxs(Frame, { spacing: "xs", children: [_jsx(FrameHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(FrameTitle, { children: "Queue" }), _jsxs(FrameDescription, { children: [tracks.length, " tracks"] })] }), _jsxs(Badge, { variant: "outline", size: "sm", children: [_jsx(IconPlaceholder, { lucide: "ListMusicIcon", tabler: "IconPlaylist", hugeicons: "PlayListIcon", phosphor: "PlaylistIcon", remixicon: "RiPlayListLine", className: "size-3" }), "Playlist"] })] }) }), _jsx(Sortable, { value: tracks, onValueChange: setTracks, getItemValue: (item) => item.id, strategy: "vertical", className: "space-y-0.5", children: tracks.map((track, index) => (_jsx(SortableItem, { value: track.id, children: _jsx(FramePanel, { className: "p-0!", children: _jsxs("div", { className: "group flex items-center gap-3 px-3 py-2.5", children: [_jsx(SortableItemHandle, { className: "text-muted-foreground hover:text-foreground", children: _jsx(IconPlaceholder, { lucide: "GripVerticalIcon", tabler: "IconGripVertical", hugeicons: "DragDropVerticalIcon", phosphor: "DotsSixVerticalIcon", remixicon: "RiDraggable", className: "size-4" }) }), _jsx("div", { className: "bg-muted flex size-9 shrink-0 items-center justify-center rounded-md", children: _jsx(IconPlaceholder, { lucide: "MusicIcon", tabler: "IconMusic", hugeicons: "MusicNote03Icon", phosphor: "MusicNotesIcon", remixicon: "RiMusic2Line", className: "text-muted-foreground size-4" }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("p", { className: `truncate text-sm font-medium ${track.active ? "text-primary" : ""}`, children: [track.title, track.active && (_jsx(Badge, { variant: "primary-light", size: "xs", className: "ms-1.5 align-middle", children: "Playing" }))] }), _jsxs("p", { className: "text-muted-foreground truncate text-xs", children: [track.artist, " \u00B7 ", track.album] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-muted-foreground hidden text-xs tabular-nums sm:inline", children: track.plays }), _jsx("span", { className: "text-muted-foreground text-xs tabular-nums", children: track.duration })] })] }) }) }, track.id))) })] }) }));
}
