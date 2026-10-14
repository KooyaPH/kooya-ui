"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { SignaturePad, SignaturePadArea, SignaturePadClear, SignaturePadControls, SignaturePadGuide, SignaturePadPlaceholder, SignaturePadPreview, SignaturePadUndo, } from "../../reui/signature-pad.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "../../../../../../../adapters/overlays.tsx";
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const [open, setOpen] = useState(false);
    const [signature, setSignature] = useState([]);
    /* Edits land in a draft, so Cancel leaves the saved signature untouched. */
    const [draft, setDraft] = useState([]);
    const editRef = useRef(null);
    return (_jsxs(_Fragment, { children: [_jsxs(Item, { variant: "outline", className: "mx-auto w-full max-w-lg", children: [_jsxs(ItemContent, { children: [_jsx(ItemTitle, { children: "Authorized signature" }), _jsx(ItemDescription, { children: "Printed on invoices and purchase orders." })] }), _jsx(ItemActions, { children: _jsx(Button, { ref: editRef, variant: "outline", size: "sm", onClick: (event) => {
                                /* Safari does not focus a clicked button; focusing it here gives
                                   both dialog libraries the same element to return focus to. */
                                event.currentTarget.focus();
                                setDraft(signature);
                                setOpen(true);
                            }, children: signature.length > 0 ? "Edit" : "Add signature" }) }), signature.length > 0 && (_jsxs(ItemFooter, { children: [_jsx(SignaturePadPreview, { strokes: signature, className: "h-10 w-auto" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
                                    setSignature([]);
                                    /* Remove unmounts itself, so focus moves to the row's action. */
                                    editRef.current?.focus();
                                }, children: "Remove" })] }))] }), _jsx(Dialog, { open: open, onOpenChange: setOpen, children: _jsxs(DialogContent, { className: "sm:max-w-lg", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Draw your signature" }), _jsx(DialogDescription, { children: "Saved to your profile and reused on new documents." })] }), _jsx(SignaturePad, { value: draft, onValueChange: setDraft, children: _jsxs(SignaturePadArea, { variant: "muted", className: "h-48", children: [_jsx(SignaturePadGuide, {}), _jsx(SignaturePadPlaceholder, {}), _jsxs(SignaturePadControls, { children: [_jsx(SignaturePadUndo, {}), _jsx(SignaturePadClear, {})] })] }) }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancel" }), _jsx(Button, { disabled: draft.length === 0, onClick: () => {
                                        setSignature(draft);
                                        setOpen(false);
                                    }, children: "Save signature" })] })] }) })] }));
}
