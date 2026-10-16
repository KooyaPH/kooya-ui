import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Timeline, TimelineContent, TimelineDate, TimelineHeader, TimelineIndicator, TimelineItem, TimelineSeparator, TimelineTitle, } from "../../../../../../../adapters/structured.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const gitActivity = [
    {
        id: 1,
        date: "15 minutes ago",
        title: "Forked Repository",
        description: "Forked the repository to create a new branch for development.",
        icon: (_jsx(IconPlaceholder, { lucide: "GitForkIcon", tabler: "IconGitFork", hugeicons: "GitForkIcon", phosphor: "GitForkIcon", remixicon: "RiGitForkLine", className: "size-4" })),
    },
    {
        id: 2,
        date: "10 minutes ago",
        title: "Pull Request Submitted",
        description: "Submitted PR #342 with new feature implementation. Waiting for code review.",
        icon: (_jsx(IconPlaceholder, { lucide: "GitPullRequestArrowIcon", tabler: "IconGitPullRequest", hugeicons: "GitPullRequestIcon", phosphor: "GitPullRequest", remixicon: "RiGitPullRequestLine", className: "size-3.5" })),
    },
    {
        id: 3,
        date: "5 minutes ago",
        title: "Comparing Branches",
        description: "Received comments on PR. Minor adjustments needed in error handling.",
        icon: (_jsx(IconPlaceholder, { lucide: "GitCompareArrowsIcon", tabler: "IconGitCompare", hugeicons: "GitCompareIcon", phosphor: "GitDiffIcon", remixicon: "RiGitPullRequestLine", className: "size-3.5" })),
    },
    {
        id: 4,
        date: "Just now",
        title: "Merged Branch",
        description: "Merged the feature branch into the main branch. Ready for deployment.",
        icon: (_jsx(IconPlaceholder, { lucide: "GitMergeIcon", tabler: "IconGitMerge", hugeicons: "GitMergeIcon", phosphor: "GitMergeIcon", remixicon: "RiGitMergeLine", className: "size-3.5" })),
    },
];
export default function Pattern() {
    return (_jsx(Timeline, { defaultValue: 3, className: "w-full max-w-md", children: gitActivity.map((item) => (_jsxs(TimelineItem, { step: item.id, className: "group-data-[orientation=vertical]/timeline:ms-10", children: [_jsxs(TimelineHeader, { children: [_jsx(TimelineSeparator, { className: "group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" }), _jsx(TimelineTitle, { className: "mt-0.5", children: item.title }), _jsx(TimelineIndicator, { className: "bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7", children: item.icon })] }), _jsxs(TimelineContent, { children: [item.description, _jsx(TimelineDate, { className: "mt-2 mb-0", children: item.date })] })] }, item.id))) }));
}
