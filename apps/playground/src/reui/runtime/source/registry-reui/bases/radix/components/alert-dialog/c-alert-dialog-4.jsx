import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Small (Media)" }) }), _jsxs(AlertDialogContent, { size: "sm", children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogMedia, { children: _jsx(IconPlaceholder, { lucide: "BluetoothIcon", tabler: "IconBluetooth", hugeicons: "BluetoothIcon", phosphor: "BluetoothIcon", remixicon: "RiBluetoothLine" }) }), _jsx(AlertDialogTitle, { children: "Allow accessory to connect?" }), _jsx(AlertDialogDescription, { children: "Do you want to allow the USB accessory to connect to this device?" })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Don't allow" }), _jsx(AlertDialogAction, { children: "Allow" })] })] })] }));
}
