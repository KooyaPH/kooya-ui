"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { SignaturePad, SignaturePadArea, SignaturePadGuide, SignaturePadPlaceholder, } from "../../reui/signature-pad.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    /* `apiRef` reaches the pad from code outside its tree, such as a form
       library's submit handler. */
    const padRef = useRef(null);
    const [upload, setUpload] = useState(null);
    const [empty, setEmpty] = useState(true);
    const prepareUpload = async () => {
        const blob = await padRef.current?.toBlob({ scale: 3 });
        if (!blob)
            return;
        const file = new File([blob], "signature.png", { type: "image/png" });
        /* Append `file` to a FormData and POST it to your own endpoint. */
        setUpload({ name: file.name, size: file.size });
    };
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-lg flex-col gap-3", children: [_jsx(SignaturePad, { apiRef: padRef, onValueChange: (strokes) => {
                    setEmpty(strokes.length === 0);
                    setUpload(null);
                }, children: _jsxs(SignaturePadArea, { className: "h-44", children: [_jsx(SignaturePadGuide, {}), _jsx(SignaturePadPlaceholder, {})] }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { disabled: empty, onClick: prepareUpload, children: "Attach as PNG" }), _jsx(Button, { variant: "ghost", disabled: empty, onClick: () => {
                            padRef.current?.clear();
                            /* This button disables itself, so focus moves to the pad. */
                            padRef.current?.focus();
                        }, children: "Clear" }), _jsx("p", { role: "status", className: "text-muted-foreground ms-auto truncate text-sm", children: upload && `${upload.name}, ${(upload.size / 1024).toFixed(1)} KB` })] })] }));
}
