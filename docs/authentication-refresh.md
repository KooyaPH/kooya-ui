# Authentication · 1.3.0

The split authentication presentation pairs a restrained brand introduction and illustrative workspace with a focused, open form. It uses the active palette and light/dark tokens. Below 1024px, or inside a container narrower than 900px, the introduction and illustration collapse to leave one task column.

## Public components

- `AuthLayout`: existing panel presentation remains the default. Opt in with `presentation="split"`, `introduction` and `visual` slots. Keep a single page title; put supporting brand copy in the introduction. `wide` accommodates permission reviews.
- `AuthMethodChoice`: controlled Google/email choice. Consumers supply `googleAvailable`, `onGoogle`, `onEmail`, optional `disabled` and `bootstrapLink`. Authentication availability and navigation belong to the application.
- `OtpCodeInput`: controlled `value`/`onChange`, six numeric inputs, code paste, arrow and backspace navigation, native one-time-code autocomplete. Keep validation and verification in the application.
- `AuthWorkspacePreview`: decorative, noninteractive illustration. Consumers provide synthetic column titles and card text. Do not pass real workspace records or fetch application data for this illustration.

The split composition has no enclosing card. Controls have at least 44px height, text wraps within the available width and the page owns vertical scrolling. Static identity and form labels remain visible while data loads. Honor reduced motion and active palette settings.

`publicDocumentStyles` also supports a scoped `body.ku-auth-document` presentation for server-rendered protocol and logout documents. Forms, hidden inputs, provider contracts and security headers remain the consumer's responsibility.

See **Compositions/Authentication** in Storybook and the focused authentication collection in the showcase for interactive examples. The example provider actions are demonstrations and never initiate real authentication.
