import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Default (Media)" }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogMedia, { children: _jsx(IconPlaceholder, { lucide: "BluetoothIcon", tabler: "IconBluetooth", hugeicons: "BluetoothIcon", phosphor: "BluetoothIcon", remixicon: "RiBluetoothLine" }) }), _jsx(AlertDialogTitle, { children: "Pair with this device?" }), _jsx(AlertDialogDescription, { children: "This will allow the device to connect and share data with your current session." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Cancel" }), _jsx(AlertDialogAction, { children: "Connect" })] })] })] }));
}
