"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Title: Signature Pad
// Description: Shadcn signature pad with pressure and velocity ink, touch and stylus input, undo and redo, form fields and PNG, JPEG or SVG export.
import { createContext, memo, useContext, useEffect, useId, useImperativeHandle, useLayoutEffect, useRef, useState, } from "react";
import { cn } from "cn";
import { Button } from "../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../adapters/icons.tsx";
/* -------------------------------------------------------------------------- */
/*                                  Geometry                                  */
/* -------------------------------------------------------------------------- */
const round = (value) => Math.round(value * 100) / 100;
const pair = (x, y) => `${round(x)} ${round(y)}`;
/* Past ~100 degrees the averaged tangent flips and the outline pinches, so a
   stroke is split there and each piece gets its own round caps. */
const CORNER_COS = -0.17;
function circlePath(x, y, r) {
    const radius = round(Math.max(r, 0.25));
    return `M${pair(x - radius, y)}a${radius} ${radius} 0 1 0 ${round(radius * 2)} 0a${radius} ${radius} 0 1 0 ${round(-radius * 2)} 0Z`;
}
/**
 * One filled outline: the left offset forward, a round cap, the right offset
 * back, a round cap. Every arc sweeps the same way as the outline itself, so
 * overlapping pieces and self-crossing loops add up under the default
 * `nonzero` fill instead of punching holes.
 */
function outlinePath(points, from, to) {
    const [startX, startY, startSize] = points[from];
    if (from === to)
        return circlePath(startX, startY, startSize / 2);
    const left = [];
    const right = [];
    let nx = 0;
    let ny = 1;
    for (let i = from; i <= to; i++) {
        const [ax, ay] = points[Math.max(i - 1, from)];
        const [bx, by] = points[Math.min(i + 1, to)];
        const length = Math.hypot(bx - ax, by - ay);
        if (length > 1e-6) {
            nx = -(by - ay) / length;
            ny = (bx - ax) / length;
        }
        const [x, y, size] = points[i];
        const r = size / 2;
        left.push([x + nx * r, y + ny * r]);
        right.push([x - nx * r, y - ny * r]);
    }
    const last = left.length - 1;
    const endRadius = round(points[to][2] / 2);
    const startRadius = round(startSize / 2);
    let d = `M${pair(...left[0])}`;
    for (let i = 1; i < last; i++) {
        const [x, y] = left[i];
        d += `Q${pair(x, y)} ${pair((x + left[i + 1][0]) / 2, (y + left[i + 1][1]) / 2)}`;
    }
    d += `L${pair(...left[last])}A${endRadius} ${endRadius} 0 0 0 ${pair(...right[last])}`;
    for (let i = last - 1; i > 0; i--) {
        const [x, y] = right[i];
        d += `Q${pair(x, y)} ${pair((x + right[i - 1][0]) / 2, (y + right[i - 1][1]) / 2)}`;
    }
    return `${d}L${pair(...right[0])}A${startRadius} ${startRadius} 0 0 0 ${pair(...left[0])}Z`;
}
function isCorner(a, b, c) {
    const ux = b[0] - a[0];
    const uy = b[1] - a[1];
    const vx = c[0] - b[0];
    const vy = c[1] - b[1];
    const lengths = Math.hypot(ux, uy) * Math.hypot(vx, vy);
    return lengths > 0 && (ux * vx + uy * vy) / lengths < CORNER_COS;
}
/** The SVG path data of one stroke's filled outline, shared by the pad and every export. */
function getSignaturePadStrokePath(stroke) {
    const { points } = stroke;
    if (points.length === 0)
        return "";
    let d = "";
    let start = 0;
    for (let i = 1; i < points.length - 1; i++) {
        if (isCorner(points[i - 1], points[i], points[i + 1])) {
            d += outlinePath(points, start, i);
            start = i;
        }
    }
    return d + outlinePath(points, start, points.length - 1);
}
/** The ink's bounding box, stroke width included, or `null` when there is no ink. */
function getSignaturePadBounds(strokes) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const stroke of strokes) {
        for (const [x, y, size] of stroke.points) {
            const r = size / 2;
            minX = Math.min(minX, x - r);
            minY = Math.min(minY, y - r);
            maxX = Math.max(maxX, x + r);
            maxY = Math.max(maxY, y + r);
        }
    }
    if (minX === Infinity)
        return null;
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}
/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */
function resolveFrame(strokes, options) {
    const { width, height, padding = 8, crop = true } = options;
    if (width !== undefined && height !== undefined) {
        return { x: 0, y: 0, width, height };
    }
    const bounds = getSignaturePadBounds(strokes);
    if (!bounds)
        return { x: 0, y: 0, width: width ?? 1, height: height ?? 1 };
    if (!crop) {
        return {
            x: 0,
            y: 0,
            width: width ?? Math.ceil(bounds.x + bounds.width + padding),
            height: height ?? Math.ceil(bounds.y + bounds.height + padding),
        };
    }
    /* Round the edges, not the size: flooring x and ceiling only the width
       could leave the right and bottom edges up to 1px inside the ink. */
    const x = Math.floor(bounds.x - padding);
    const y = Math.floor(bounds.y - padding);
    return {
        x,
        y,
        width: Math.ceil(bounds.x + bounds.width + padding) - x,
        height: Math.ceil(bounds.y + bounds.height + padding) - y,
    };
}
const escapeAttribute = (value) => value.replace(/[&"<>]/g, (char) => `&#${char.charCodeAt(0)};`);
/** A standalone SVG document string. */
function signaturePadToSVG(strokes, options = {}) {
    const { x, y, width, height } = resolveFrame(strokes, options);
    const color = options.color ?? "#000000";
    const background = options.background
        ? `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${escapeAttribute(options.background)}"/>`
        : "";
    const paths = strokes
        .map((stroke) => {
        const d = getSignaturePadStrokePath(stroke);
        return d
            ? `<path d="${d}" fill="${escapeAttribute(stroke.color ?? color)}"/>`
            : "";
    })
        .join("");
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${width} ${height}" width="${width}" height="${height}">${background}${paths}</svg>`;
}
function drawToCanvas(strokes, options) {
    const { x, y, width, height } = resolveFrame(strokes, options);
    const scale = options.scale ?? 2;
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));
    const context = canvas.getContext("2d");
    if (!context)
        return canvas;
    context.scale(scale, scale);
    context.translate(-x, -y);
    /* JPEG has no alpha, so transparent ink would land on black. */
    const background = options.background ?? (options.type === "image/jpeg" ? "#ffffff" : "");
    if (background) {
        context.fillStyle = background;
        context.fillRect(x, y, width, height);
    }
    for (const stroke of strokes) {
        const d = getSignaturePadStrokePath(stroke);
        if (!d)
            continue;
        context.fillStyle = stroke.color ?? options.color ?? "#000000";
        context.fill(new Path2D(d));
    }
    return canvas;
}
/** A PNG data URL, or `type`. Browser only: call it from a handler or an effect, never while rendering. */
function signaturePadToDataURL(strokes, options = {}) {
    return drawToCanvas(strokes, options).toDataURL(options.type ?? "image/png", options.quality);
}
/** For uploads: a `Blob` skips the base64 inflation of a data URL. Browser only. */
function signaturePadToBlob(strokes, options = {}) {
    return new Promise((resolve) => {
        drawToCanvas(strokes, options).toBlob(resolve, options.type ?? "image/png", options.quality);
    });
}
/** One string per format, and `""` for an empty pad so a `required` field fails. `png` and `jpeg` need a browser. */
function serializeSignaturePad(strokes, format = "svg", options = {}) {
    if (strokes.length === 0)
        return "";
    if (format === "json")
        return JSON.stringify(strokes);
    if (format === "svg") {
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(signaturePadToSVG(strokes, options))}`;
    }
    return signaturePadToDataURL(strokes, {
        ...options,
        type: format === "jpeg" ? "image/jpeg" : "image/png",
    });
}
const API_KEYS = [
    "strokes",
    "isEmpty",
    "isDrawing",
    "canUndo",
    "canRedo",
    "disabled",
    "readOnly",
    "clear",
    "undo",
    "redo",
    "focus",
    "toSVG",
    "toDataURL",
    "toBlob",
    "serialize",
];
const SignaturePadContext = createContext(null);
const SignaturePadConfigContext = createContext(null);
function useSignaturePad() {
    const context = useContext(SignaturePadContext);
    if (!context) {
        throw new Error("useSignaturePad must be used within a SignaturePad");
    }
    return context;
}
function useSignaturePadConfig(part) {
    const context = useContext(SignaturePadConfigContext);
    if (!context)
        throw new Error(`${part} must be used within a SignaturePad`);
    return context;
}
/* -------------------------------------------------------------------------- */
/*                                    Root                                    */
/* -------------------------------------------------------------------------- */
const HISTORY_LIMIT = 100;
/* Structural, not identity: react-hook-form and other stores hand back a
   deep copy of the value, and identity alone read every copy as an outside
   change and voided undo. First and last point are enough to tell a copy from
   a real edit. */
function sameStrokes(a, b) {
    if (a === b)
        return true;
    if (a.length !== b.length)
        return false;
    return a.every((stroke, index) => {
        const other = b[index];
        if (stroke === other)
            return true;
        const { points } = stroke;
        const last = points.length - 1;
        return (stroke.color === other.color &&
            points.length === other.points.length &&
            (last < 0 ||
                (points[0].join() === other.points[0].join() &&
                    points[last].join() === other.points[last].join())));
    });
}
/* Next still server-renders "use client" files, and a bare useLayoutEffect
   logs on every SSR pass. Same alias the code block ships. */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
function SignaturePad({ value, defaultValue, onValueChange, onStrokeStart, onStrokeEnd, apiRef, color, minWidth = 0.8, maxWidth = 3.2, smoothing = 0.5, sizing = "auto", pointerTypes, disabled = false, readOnly = false, name, form, required = false, format = "svg", className, children, ...props }) {
    const [uncontrolled, setUncontrolled] = useState(() => defaultValue ?? []);
    const strokes = value ?? uncontrolled;
    /* What a form reset restores, as a native field returns to its default. */
    const [initialValue] = useState(() => defaultValue ?? []);
    const [history, setHistory] = useState(() => ({
        past: [],
        future: [],
        present: strokes,
    }));
    const [isDrawing, setDrawing] = useState(false);
    const areaRef = useRef(null);
    const synced = sameStrokes(history.present, strokes);
    const past = synced ? history.past : [];
    const future = synced ? history.future : [];
    const setStrokes = (next, nextHistory) => {
        setHistory(nextHistory);
        if (value === undefined)
            setUncontrolled(next);
        onValueChange?.(next);
    };
    const commit = (next) => setStrokes(next, {
        past: [...past, strokes].slice(-HISTORY_LIMIT),
        future: [],
        present: next,
    });
    /* With `crop: false` and no size, an export frames the area as rendered. */
    const withAreaFrame = (options = {}) => {
        const area = areaRef.current;
        if (options.crop !== false || !area)
            return options;
        return {
            ...options,
            width: options.width ?? area.clientWidth,
            height: options.height ?? area.clientHeight,
        };
    };
    const api = {
        strokes,
        isEmpty: strokes.length === 0,
        isDrawing,
        canUndo: past.length > 0,
        canRedo: future.length > 0,
        disabled,
        readOnly,
        clear: () => {
            if (strokes.length > 0)
                commit([]);
        },
        undo: () => {
            const previous = past[past.length - 1];
            if (!previous)
                return;
            setStrokes(previous, {
                past: past.slice(0, -1),
                future: [strokes, ...future],
                present: previous,
            });
        },
        redo: () => {
            const next = future[0];
            if (!next)
                return;
            setStrokes(next, {
                past: [...past, strokes],
                future: future.slice(1),
                present: next,
            });
        },
        focus: () => areaRef.current?.focus({ preventScroll: true }),
        toSVG: (options) => signaturePadToSVG(strokes, withAreaFrame(options)),
        toDataURL: (options) => signaturePadToDataURL(strokes, withAreaFrame(options)),
        toBlob: (options) => signaturePadToBlob(strokes, withAreaFrame(options)),
        serialize: (format, options) => serializeSignaturePad(strokes, format, withAreaFrame(options)),
    };
    /* Members read the latest render through getters, and the object is
       rebuilt only when the pad's state changes. A handle rebuilt on every
       render made a state-setter `apiRef` loop until React threw, including the
       inline `(h) => setApi(h)` form React re-attaches each render; a handle
       that never changed left such a consumer frozen at its mount state. */
    const latestApi = useRef(null);
    const handleRef = useRef(null);
    useIsoLayoutEffect(() => {
        latestApi.current = api;
    });
    useImperativeHandle(apiRef, () => {
        const key = [strokes, history, isDrawing, disabled, readOnly];
        const cached = handleRef.current;
        if (cached && cached.key.every((item, i) => Object.is(item, key[i]))) {
            return cached.handle;
        }
        const handle = {};
        for (const name of API_KEYS) {
            Object.defineProperty(handle, name, {
                enumerable: true,
                get: () => latestApi.current[name],
            });
        }
        handleRef.current = { key, handle };
        return handle;
    }, [strokes, history, isDrawing, disabled, readOnly]);
    const config = {
        color,
        minWidth,
        maxWidth: Math.max(minWidth, maxWidth),
        smoothing: Math.min(Math.max(smoothing, 0), 1),
        sizing,
        pointerTypes,
        name,
        form,
        required,
        format,
        interactive: !disabled && !readOnly,
        undoDepth: past.length,
        redoDepth: future.length,
        setArea: (node) => {
            areaRef.current = node;
        },
        setDrawing,
        commitStroke: (stroke) => {
            commit([...strokes, stroke]);
            onStrokeEnd?.(stroke);
        },
        resetToDefault: () => {
            if (!sameStrokes(strokes, initialValue))
                commit(initialValue);
        },
        onStrokeStart,
    };
    return (_jsx(SignaturePadContext.Provider, { value: api, children: _jsx(SignaturePadConfigContext.Provider, { value: config, children: _jsx("div", { "data-slot": "signature-pad", "data-empty": strokes.length === 0 || undefined, "data-drawing": isDrawing || undefined, "data-disabled": disabled || undefined, "data-readonly": readOnly || undefined, className: cn("flex w-full flex-col gap-2", className), ...props, children: children }) }) }));
}
/* -------------------------------------------------------------------------- */
/*                                    Area                                    */
/* -------------------------------------------------------------------------- */
const AREA_BASE_CLASS = "relative h-40 w-full overflow-hidden border text-foreground outline-none touch-none select-none [-webkit-touch-callout:none] cursor-crosshair data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:cursor-default";
/* Radius, focus and invalid rings, copied token for token from the textarea
   ladder so the pad reads as the same kind of control in every style. Every
   variant takes these. */
const AREA_STATE_CLASS = "style-vega:focus-visible:border-ring style-vega:focus-visible:ring-ring/50 style-vega:aria-invalid:ring-destructive/20 style-vega:dark:aria-invalid:ring-destructive/40 style-vega:aria-invalid:border-destructive style-vega:dark:aria-invalid:border-destructive/50 style-vega:rounded-md style-vega:transition-[color,box-shadow] style-vega:focus-visible:ring-3 style-vega:aria-invalid:ring-3 style-nova:focus-visible:border-ring style-nova:focus-visible:ring-ring/50 style-nova:aria-invalid:ring-destructive/20 style-nova:dark:aria-invalid:ring-destructive/40 style-nova:aria-invalid:border-destructive style-nova:dark:aria-invalid:border-destructive/50 style-nova:rounded-lg style-nova:transition-colors style-nova:focus-visible:ring-3 style-nova:aria-invalid:ring-3 style-maia:focus-visible:border-ring style-maia:focus-visible:ring-ring/50 style-maia:aria-invalid:ring-destructive/20 style-maia:dark:aria-invalid:ring-destructive/40 style-maia:aria-invalid:border-destructive style-maia:dark:aria-invalid:border-destructive/50 style-maia:rounded-xl style-maia:transition-colors style-maia:focus-visible:ring-[3px] style-maia:aria-invalid:ring-[3px] style-lyra:focus-visible:border-ring style-lyra:focus-visible:ring-ring/50 style-lyra:aria-invalid:ring-destructive/20 style-lyra:dark:aria-invalid:ring-destructive/40 style-lyra:aria-invalid:border-destructive style-lyra:dark:aria-invalid:border-destructive/50 style-lyra:rounded-none style-lyra:transition-colors style-lyra:focus-visible:ring-1 style-lyra:aria-invalid:ring-1 style-mira:focus-visible:border-ring style-mira:focus-visible:ring-ring/30 style-mira:aria-invalid:ring-destructive/20 style-mira:dark:aria-invalid:ring-destructive/40 style-mira:aria-invalid:border-destructive style-mira:dark:aria-invalid:border-destructive/50 style-mira:rounded-md style-mira:transition-colors style-mira:focus-visible:ring-2 style-mira:aria-invalid:ring-2 style-luma:focus-visible:border-ring style-luma:focus-visible:ring-ring/30 style-luma:aria-invalid:ring-destructive/20 style-luma:dark:aria-invalid:ring-destructive/40 style-luma:aria-invalid:border-destructive style-luma:dark:aria-invalid:border-destructive/50 style-luma:rounded-2xl style-luma:transition-[color,box-shadow,background-color] style-luma:focus-visible:ring-3 style-luma:aria-invalid:ring-3 style-rhea:focus-visible:border-ring style-rhea:focus-visible:ring-ring/30 style-rhea:aria-invalid:ring-destructive/20 style-rhea:dark:aria-invalid:ring-destructive/40 style-rhea:aria-invalid:border-destructive style-rhea:dark:aria-invalid:border-destructive/50 style-rhea:rounded-2xl style-rhea:transition-[color,box-shadow] style-rhea:duration-200 style-rhea:focus-visible:ring-3 style-rhea:aria-invalid:ring-3 style-sera:focus-visible:border-b-ring style-sera:aria-invalid:border-b-destructive style-sera:dark:aria-invalid:border-b-destructive/50 style-sera:rounded-none style-sera:transition-[color,border-color]";
/* Kept apart from the rings because a style-prefixed fill outranks a plain
   one: sharing a ladder, `muted` could never paint over the textarea's
   `bg-transparent`. The `disabled:` tokens become `data-disabled:`, since a
   div never matches `:disabled`. */
const AREA_VARIANT_CLASS = {
    default: "style-vega:border-input style-vega:bg-transparent style-vega:dark:bg-input/30 style-vega:shadow-xs style-nova:border-input style-nova:bg-transparent style-nova:dark:bg-input/30 style-nova:data-disabled:bg-input/50 style-nova:dark:data-disabled:bg-input/80 style-maia:border-input style-maia:bg-input/30 style-lyra:border-input style-lyra:bg-transparent style-lyra:dark:bg-input/30 style-lyra:data-disabled:bg-input/50 style-lyra:dark:data-disabled:bg-input/80 style-mira:border-input style-mira:bg-input/20 style-mira:dark:bg-input/30 style-luma:border-transparent style-luma:bg-input/50 style-rhea:border-transparent style-rhea:bg-input/50 style-sera:border-transparent style-sera:border-b-input style-sera:bg-transparent",
    muted: "border-border bg-muted/50",
    ghost: "border-transparent bg-transparent",
};
const StrokePath = memo(function StrokePath({ stroke, }) {
    return (_jsx("path", { "data-slot": "signature-pad-stroke", d: getSignaturePadStrokePath(stroke), fill: stroke.color ?? "currentColor" }));
});
/**
 * The drawing surface. Children are overlays (a guide, a placeholder, pinned
 * controls) and must be `pointer-events-none` unless they are controls: a
 * stroke only starts on the area itself, never on something inside it.
 */
function SignaturePadArea({ ref, variant = "default", className, children, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onLostPointerCapture, onKeyDown, onContextMenu, "aria-describedby": describedBy, ...props }) {
    const api = useSignaturePad();
    const config = useSignaturePadConfig("SignaturePadArea");
    const liveRef = useRef(null);
    const pathRef = useRef(null);
    const inputRef = useRef(null);
    const frameRef = useRef(0);
    const resetRef = useRef(config.resetToDefault);
    useEffect(() => {
        resetRef.current = config.resetToDefault;
    });
    /* Set imperatively: a PNG needs a canvas, which only exists in the browser,
       and a controlled `value` would then differ between server and client. */
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = serializeSignaturePad(api.strokes, config.format);
        }
    }, [api.strokes, config.format, config.name]);
    /* Listens on the input's own root (the document, or a shadow root) and asks
       for its form at reset time, so a `form` attribute or an owner that
       changes later is still honoured. The restore waits a task, like a native
       reset's default action, because any listener may still cancel it. */
    useEffect(() => {
        const root = inputRef.current?.getRootNode();
        if (!root)
            return;
        let pending = 0;
        const onReset = (event) => {
            if (event.target !== inputRef.current?.form)
                return;
            pending = window.setTimeout(() => {
                if (!event.defaultPrevented)
                    resetRef.current();
            });
        };
        root.addEventListener("reset", onReset, true);
        return () => {
            root.removeEventListener("reset", onReset, true);
            window.clearTimeout(pending);
        };
    }, [config.name]);
    useEffect(() => () => cancelAnimationFrame(frameRef.current), []);
    const paint = () => {
        frameRef.current = 0;
        const live = liveRef.current;
        pathRef.current?.setAttribute("d", live ? getSignaturePadStrokePath({ points: live.points }) : "");
    };
    const schedulePaint = () => {
        if (!frameRef.current)
            frameRef.current = requestAnimationFrame(paint);
    };
    const addSample = (live, clientX, clientY, pressure, time) => {
        const x = (clientX - live.left) * live.scaleX;
        const y = (clientY - live.top) * live.scaleY;
        live.rawX = x;
        live.rawY = y;
        const { minWidth, maxWidth, sizing, smoothing } = config;
        const usePressure = sizing === "pressure" || (sizing === "auto" && live.pointerType === "pen");
        const pressed = minWidth + (maxWidth - minWidth) * Math.min(pressure, 1);
        const previous = live.points[live.points.length - 1];
        if (!previous) {
            /* A pen at rest is slow, so it starts near full width; at the midpoint
               a tap left a dot a third the weight of the line beside it. */
            live.size = usePressure ? pressed : minWidth + (maxWidth - minWidth) * 0.8;
            live.time = time;
            live.points.push([round(x), round(y), round(live.size)]);
            return;
        }
        /* Streamline: each point moves only part of the way toward the pointer. */
        const follow = 1 - smoothing * 0.85;
        const sx = previous[0] + (x - previous[0]) * follow;
        const sy = previous[1] + (y - previous[1]) * follow;
        const distance = Math.hypot(sx - previous[0], sy - previous[1]);
        if (distance < 0.75)
            return;
        const speed = distance / Math.max(time - live.time, 1);
        live.velocity = live.velocity * 0.3 + speed * 0.7;
        live.time = time;
        const target = usePressure
            ? pressed
            : Math.max(maxWidth / (live.velocity + 1), minWidth);
        live.size += (target - live.size) * 0.35;
        live.points.push([round(sx), round(sy), round(live.size)]);
    };
    /** `commit: false` discards: a pointercancel is the platform taking the pointer back, often a rejected palm. */
    const finish = (pointerId, commit = true) => {
        const live = liveRef.current;
        if (!live || live.pointerId !== pointerId)
            return;
        liveRef.current = null;
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
        /* Cleared in the same discrete event that commits the stroke, so React
           paints the committed path in this frame and the ink never blinks. */
        pathRef.current?.setAttribute("d", "");
        config.setDrawing(false);
        if (!commit)
            return;
        const last = live.points[live.points.length - 1];
        if (last && Math.hypot(live.rawX - last[0], live.rawY - last[1]) >= 0.5) {
            live.points.push([round(live.rawX), round(live.rawY), round(live.size)]);
        }
        config.commitStroke(config.color === undefined
            ? { points: live.points }
            : { points: live.points, color: config.color });
    };
    const handlePointerDown = (event) => {
        onPointerDown?.(event);
        const area = event.currentTarget;
        const pointerType = event.pointerType;
        if (event.defaultPrevented ||
            !config.interactive ||
            event.target !== area ||
            !event.isPrimary ||
            (pointerType === "mouse" && event.button !== 0) ||
            (config.pointerTypes && !config.pointerTypes.includes(pointerType))) {
            return;
        }
        /* A pen landing mid-stroke means the touch stroke was a resting palm. */
        const live = liveRef.current;
        if (live) {
            if (live.pointerType !== "touch" || pointerType !== "pen")
                return;
            liveRef.current = null;
        }
        /* No preventDefault: the native mousedown focuses the area without
           `:focus-visible`, where a scripted focus() lit the keyboard ring on
           every mouse stroke. Touch scrolling and text selection are already off
           through `touch-none` and `select-none`. */
        try {
            area.setPointerCapture(event.pointerId);
        }
        catch {
            /* Only a pointer that is no longer active refuses capture. */
        }
        const rect = area.getBoundingClientRect();
        const next = {
            pointerId: event.pointerId,
            pointerType,
            points: [],
            /* The ink layer starts inside the border, and a transformed ancestor
               (a zooming dialog) scales the rect but not the coordinate space. */
            left: rect.left + area.clientLeft * (rect.width / area.offsetWidth || 1),
            top: rect.top + area.clientTop * (rect.height / area.offsetHeight || 1),
            scaleX: rect.width ? area.offsetWidth / rect.width : 1,
            scaleY: rect.height ? area.offsetHeight / rect.height : 1,
            time: event.timeStamp,
            velocity: 0,
            size: 0,
            rawX: 0,
            rawY: 0,
        };
        liveRef.current = next;
        addSample(next, event.clientX, event.clientY, event.pressure, event.timeStamp);
        schedulePaint();
        config.setDrawing(true);
        config.onStrokeStart?.({ pointerType });
    };
    const handlePointerMove = (event) => {
        onPointerMove?.(event);
        const live = liveRef.current;
        if (!live || live.pointerId !== event.pointerId)
            return;
        /* A fast pen reports several samples per frame; the coalesced list keeps
           curves round instead of cutting across them. */
        const samples = event.nativeEvent.getCoalescedEvents?.() ?? [];
        for (const sample of samples.length ? samples : [event.nativeEvent]) {
            addSample(live, sample.clientX, sample.clientY, sample.pressure, sample.timeStamp);
        }
        schedulePaint();
    };
    const handleKeyDown = (event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || !config.interactive)
            return;
        if (!(event.metaKey || event.ctrlKey) || event.altKey)
            return;
        /* The physical key when the layout types no Latin letter (Cyrillic,
           Greek, Hebrew), so the shortcut survives a layout switch. */
        const typed = event.key.toLowerCase();
        const key = /^[a-z]$/.test(typed)
            ? typed
            : event.code.replace(/^Key/, "").toLowerCase();
        /* Pressed on a pinned control, the action may disable that control
           (Undo at the start of history, Clear or Save on an emptied pad), and
           focus would fall to <body>; it moves to the area instead. */
        const fromControl = event.target !== event.currentTarget;
        if (key === "z" && !event.shiftKey && api.canUndo) {
            event.preventDefault();
            api.undo();
            if (fromControl)
                api.focus();
        }
        else if ((key === "y" || (key === "z" && event.shiftKey)) &&
            api.canRedo) {
            event.preventDefault();
            api.redo();
            if (fromControl)
                api.focus();
        }
    };
    const labelled = props["aria-label"] ?? props["aria-labelledby"];
    const statusId = useId();
    return (_jsxs("div", { ref: (node) => {
            config.setArea(node);
            if (typeof ref === "function")
                ref(node);
            else if (ref)
                ref.current = node;
        }, role: "application", "aria-roledescription": "signature pad", "aria-label": labelled ? undefined : "Signature pad", "aria-disabled": api.disabled || undefined, "aria-describedby": describedBy ? `${describedBy} ${statusId}` : statusId, tabIndex: config.interactive ? 0 : -1, "data-slot": "signature-pad-area", "data-variant": variant, "data-empty": api.isEmpty || undefined, "data-drawing": api.isDrawing || undefined, "data-disabled": api.disabled || undefined, "data-readonly": api.readOnly || undefined, className: cn(AREA_BASE_CLASS, AREA_STATE_CLASS, AREA_VARIANT_CLASS[variant], className), ...props, onPointerDown: handlePointerDown, onPointerMove: handlePointerMove, onPointerUp: (event) => {
            onPointerUp?.(event);
            finish(event.pointerId);
        }, onPointerCancel: (event) => {
            onPointerCancel?.(event);
            finish(event.pointerId, false);
        }, onLostPointerCapture: (event) => {
            onLostPointerCapture?.(event);
            finish(event.pointerId);
        }, onKeyDown: handleKeyDown, onContextMenu: (event) => {
            onContextMenu?.(event);
            /* A long press on touch opens the context menu mid-stroke. */
            if (liveRef.current)
                event.preventDefault();
        }, children: [children, _jsxs("span", { id: statusId, className: "sr-only", children: [api.isEmpty ? "Empty" : "Signed", api.readOnly ? ", read only" : ""] }), _jsxs("svg", { "data-slot": "signature-pad-canvas", "aria-hidden": "true", className: "pointer-events-none absolute inset-0 size-full overflow-visible", children: [api.strokes.map((stroke, index) => (_jsx(StrokePath, { stroke: stroke }, index))), _jsx("path", { ref: pathRef, fill: config.color ?? "currentColor" })] }), config.name && (_jsx("input", { ref: inputRef, type: "text", name: config.name, form: config.form, required: config.required, disabled: api.disabled, defaultValue: "", tabIndex: -1, "aria-hidden": "true", 
                /* A failed `required` check focuses this input; hand that to the pad. */
                onFocus: () => api.focus(), className: "pointer-events-none absolute bottom-0 left-1/2 size-px opacity-0" }))] }));
}
/* -------------------------------------------------------------------------- */
/*                                  Overlays                                  */
/* -------------------------------------------------------------------------- */
/** A dashed signing line with a cross at its start. Replace the cross with `children`. */
function SignaturePadGuide({ className, children, ...props }) {
    return (_jsx("div", { "data-slot": "signature-pad-guide", "aria-hidden": "true", className: cn("text-muted-foreground border-muted-foreground/40 pointer-events-none absolute inset-x-6 bottom-8 flex items-end gap-2 border-b border-dashed pb-1.5 text-xs", className), ...props, children: children ?? (_jsx("svg", { viewBox: "0 0 12 12", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", className: "size-3", children: _jsx("path", { d: "M2 2l8 8M10 2l-8 8" }) })) }));
}
/** Shown only while the pad is empty and nobody is drawing. */
function SignaturePadPlaceholder({ className, children, ...props }) {
    const { isEmpty, isDrawing } = useSignaturePad();
    if (!isEmpty || isDrawing)
        return null;
    return (_jsx("div", { "data-slot": "signature-pad-placeholder", "aria-hidden": "true", className: cn("text-muted-foreground pointer-events-none absolute inset-0 flex items-center justify-center p-4 text-center text-sm", className), ...props, children: children ?? "Sign here" }));
}
const CONTROLS_POSITION_CLASS = {
    "top-start": "top-2 start-2",
    "top-end": "top-2 end-2",
    "bottom-start": "bottom-2 start-2",
    "bottom-end": "bottom-2 end-2",
};
/**
 * Pins a group of controls to a corner of the area, above the ink. Top-end by
 * default: signatures run along the bottom, where `bottom-end` sat on the
 * guide line and under the last letters.
 */
function SignaturePadControls({ position = "top-end", className, ...props }) {
    return (_jsx("div", { "data-slot": "signature-pad-controls", "data-position": position, className: cn("absolute z-10 flex items-center gap-1", CONTROLS_POSITION_CLASS[position], className), ...props }));
}
/*
 * Each control defaults to an icon button and takes text as `children`. A
 * control that disables itself would strand keyboard focus on `<body>`, so
 * each one hands focus to the area when its own action empties it.
 */
function SignaturePadClear({ children, onClick, disabled, variant = "outline", size = "icon-sm", ...props }) {
    const api = useSignaturePad();
    return (_jsx(Button, { type: "button", "data-slot": "signature-pad-clear", "aria-label": children === undefined ? "Clear signature" : undefined, variant: variant, size: size, ...props, disabled: disabled || api.isEmpty || api.disabled || api.readOnly, onClick: (event) => {
            onClick?.(event);
            if (event.defaultPrevented)
                return;
            api.clear();
            api.focus();
        }, children: children ?? (_jsx(IconPlaceholder, { lucide: "BrushCleaningIcon", tabler: "IconEraser", hugeicons: "BrushCleaningIcon", phosphor: "BroomIcon", remixicon: "RiEraserLine", "aria-hidden": "true" })) }));
}
function SignaturePadUndo({ children, onClick, disabled, variant = "outline", size = "icon-sm", ...props }) {
    const api = useSignaturePad();
    const { undoDepth } = useSignaturePadConfig("SignaturePadUndo");
    return (_jsx(Button, { type: "button", "data-slot": "signature-pad-undo", "aria-label": children === undefined ? "Undo" : undefined, variant: variant, size: size, ...props, disabled: disabled || !api.canUndo || api.disabled || api.readOnly, onClick: (event) => {
            onClick?.(event);
            if (event.defaultPrevented)
                return;
            api.undo();
            if (undoDepth === 1)
                api.focus();
        }, children: children ?? (_jsx(IconPlaceholder, { lucide: "Undo2Icon", tabler: "IconArrowBackUp", hugeicons: "Undo02Icon", phosphor: "ArrowUUpLeftIcon", remixicon: "RiArrowGoBackLine", "aria-hidden": "true" })) }));
}
function SignaturePadRedo({ children, onClick, disabled, variant = "outline", size = "icon-sm", ...props }) {
    const api = useSignaturePad();
    const { redoDepth } = useSignaturePadConfig("SignaturePadRedo");
    return (_jsx(Button, { type: "button", "data-slot": "signature-pad-redo", "aria-label": children === undefined ? "Redo" : undefined, variant: variant, size: size, ...props, disabled: disabled || !api.canRedo || api.disabled || api.readOnly, onClick: (event) => {
            onClick?.(event);
            if (event.defaultPrevented)
                return;
            api.redo();
            if (redoDepth === 1)
                api.focus();
        }, children: children ?? (_jsx(IconPlaceholder, { lucide: "Redo2Icon", tabler: "IconArrowForwardUp", hugeicons: "Redo02Icon", phosphor: "ArrowUUpRightIcon", remixicon: "RiArrowGoForwardLine", "aria-hidden": "true" })) }));
}
/** Serializes the pad and hands the result to `onSave`. Disabled while the pad is empty. */
function SignaturePadSave({ format = "png", options, onSave, children, onClick, disabled, variant = "outline", size = "icon-sm", ...props }) {
    const api = useSignaturePad();
    return (_jsx(Button, { type: "button", "data-slot": "signature-pad-save", "aria-label": children === undefined ? "Save signature" : undefined, variant: variant, size: size, ...props, disabled: disabled || api.isEmpty || api.disabled, onClick: (event) => {
            onClick?.(event);
            if (event.defaultPrevented)
                return;
            onSave?.(api.serialize(format, options), api.strokes);
        }, children: children ?? (_jsx(IconPlaceholder, { lucide: "SaveIcon", tabler: "IconDeviceFloppy", hugeicons: "FloppyDiskIcon", phosphor: "FloppyDiskIcon", remixicon: "RiSaveLine", "aria-hidden": "true" })) }));
}
/* -------------------------------------------------------------------------- */
/*                                   Preview                                  */
/* -------------------------------------------------------------------------- */
/**
 * Saved strokes as an inline SVG cropped to the ink, for lists, receipts and
 * documents. Needs no `SignaturePad` around it, renders on the server, and
 * scales with CSS while the ink keeps following `currentColor`.
 */
function SignaturePadPreview({ strokes, padding = 4, color, className, ...props }) {
    if (strokes.length === 0)
        return null;
    const { x, y, width, height } = resolveFrame(strokes, { padding });
    return (_jsx("svg", { "data-slot": "signature-pad-preview", role: "img", "aria-label": "Signature", viewBox: `${x} ${y} ${width} ${height}`, width: width, height: height, className: cn("text-foreground h-auto max-w-full", className), ...props, children: strokes.map((stroke, index) => (_jsx("path", { d: getSignaturePadStrokePath(stroke), fill: stroke.color ?? color ?? "currentColor" }, index))) }));
}
export { SignaturePad, SignaturePadArea, SignaturePadGuide, SignaturePadPlaceholder, SignaturePadControls, SignaturePadClear, SignaturePadUndo, SignaturePadRedo, SignaturePadSave, SignaturePadPreview, useSignaturePad, getSignaturePadStrokePath, getSignaturePadBounds, serializeSignaturePad, signaturePadToSVG, signaturePadToDataURL, signaturePadToBlob, };
