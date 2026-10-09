# Third-party notices

Kooya UI's original source, design tokens, components, templates, and
accompanying documentation are distributed under the MIT License in `LICENSE`.
The following dependencies retain their own licenses:

| Project                                                                                                    | Use                                 | License                    |
| ---------------------------------------------------------------------------------------------------------- | ----------------------------------- | -------------------------- |
| [Ant Design](https://github.com/ant-design/ant-design)                                                     | Required external runtime peer      | MIT                        |
| [React](https://github.com/facebook/react) and React DOM                                                   | Required external runtime peers     | MIT                        |
| [Inter](https://github.com/rsms/inter) and [DM Sans](https://github.com/google/fonts/tree/main/ofl/dmsans) | Playground and Storybook fonts      | SIL Open Font License 1.1  |
| [Lucide](https://github.com/lucide-icons/lucide)                                                           | Playground and Storybook icons      | ISC                        |
| [Storybook](https://github.com/storybookjs/storybook), Vite, Vitest, TypeScript, and Testing Library       | Development and documentation tools | See each project's license |

Kooya UI does not bundle Ant Design, React, or React DOM in its distributable
JavaScript. Consumers install the runtime peers separately and must retain the
applicable third-party license notices when redistributing their applications.
The playground and Storybook load their own development dependencies. Refer to
the package licenses in the lockfile for exact versions and full terms.

The MIT License covers the software. It does not grant permission to use the
Kooya name, marks, or logos to imply endorsement.
