import { jsx as _jsx } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const handleDeploy = () => {
        toast.promise(new Promise((resolve) => setTimeout(() => resolve({ name: "production" }), 2000)), {
            loading: "Deploying to production...",
            success: (data) => `Deployed to ${data.name} successfully`,
            error: "Deployment failed. Please try again.",
        });
    };
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { onClick: handleDeploy, variant: "outline", className: "w-fit", children: "Deploy" }) }));
}
