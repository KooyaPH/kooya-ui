import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Rating } from "../../../../../../../adapters/utility.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx(Rating, { rating: 4, size: "sm" }), _jsx(Rating, { rating: 4 }), _jsx(Rating, { rating: 4, size: "lg" })] }));
}
