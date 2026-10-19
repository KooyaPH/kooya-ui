/** Small no-hydration counterpart of the split AuthLayout for issuer protocol pages. */
export const authDocumentStyles = `
body.ku-auth-document{display:block;padding:0;background:#fafbf8;font-family:"DM Sans Variable","DM Sans",system-ui,sans-serif;--ku-ink:#20271f;--ku-muted:#5c6657;--ku-line:#d9ddd4;--ku-surface:#fff;--ku-subtle:#f1f4ee;--ku-accent:#45583d;--ku-accent-ink:#fff;--ku-highlight:#e3eadc}
.ku-auth-document-shell{box-sizing:border-box;min-height:100svh;max-width:1280px;margin:auto;display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,440px);gap:80px;align-items:center;padding:64px 40px}
.ku-auth-document .ku-auth-panel{width:100%;border:0;padding:0;background:transparent;border-radius:0;box-shadow:none}
.ku-auth-document-brand{display:flex;align-items:center;gap:10px;font-size:17px;font-weight:650;margin-bottom:56px}
.ku-auth-document-mark{display:grid;place-items:center;width:36px;height:36px;border-radius:8px;background:var(--ku-accent);color:var(--ku-accent-ink)}
.ku-auth-document-intro h2{overflow-wrap:anywhere;max-width:12ch;font-size:44px;line-height:1.12;letter-spacing:-.045em;margin:0 0 16px;color:var(--ku-ink)}
.ku-auth-document-intro>p{color:var(--ku-muted);line-height:1.7;max-width:38ch;margin:0 0 36px}
.ku-auth-document .ku-auth-panel h1{font-size:28px;line-height:1.25;letter-spacing:-.035em;margin:0 0 16px}
.ku-auth-document .ku-auth-panel details{font-size:12px;line-height:1.6;color:var(--ku-muted);margin:20px 0}
.ku-auth-document summary{cursor:pointer}
.ku-auth-document .ku-auth-panel a{padding:8px 0;text-underline-offset:4px}
.ku-auth-preview{margin:0;border:1px solid var(--ku-line);border-radius:12px;background:var(--ku-surface);overflow:hidden;transform:rotate(-1deg)}
.ku-auth-preview__toolbar{display:flex;align-items:center;gap:8px;padding:14px 16px;border-bottom:1px solid var(--ku-line);font-size:11px;color:var(--ku-muted)}
.ku-auth-preview__mark{display:grid;place-items:center;width:21px;height:21px;background:var(--ku-accent);color:var(--ku-accent-ink);border-radius:5px}
.ku-auth-preview__presence{margin-left:auto}.ku-auth-preview__columns{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;padding:16px;background:var(--ku-subtle)}
.ku-auth-preview__column-title{display:flex;gap:5px;font-size:10px;color:var(--ku-muted);margin-bottom:12px}.ku-auth-preview__column-title>span{margin-left:auto}
.ku-auth-preview__card{padding:12px 10px;margin-bottom:10px;border:1px solid var(--ku-line);border-radius:6px;background:var(--ku-surface)}
.ku-auth-preview__card p{overflow-wrap:anywhere;font-size:11px;line-height:1.5;margin:0 0 16px;color:var(--ku-ink)}.ku-auth-preview__card-footer{display:flex;gap:3px;justify-content:flex-end}.ku-auth-preview__card-footer i{width:13px;height:13px;border-radius:50%;background:var(--ku-highlight)}
.ku-auth-preview figcaption{padding:10px 16px;font-size:10px;color:var(--ku-muted);border-top:1px solid var(--ku-line)}
@media(prefers-color-scheme:dark){body.ku-auth-document{background:#171b16;--ku-ink:#e9ece5;--ku-muted:#b7c0ae;--ku-line:#485140;--ku-surface:#21271e;--ku-subtle:#252d21;--ku-accent:#bdcfa9;--ku-accent-ink:#1d2816;--ku-highlight:#394730}.ku-auth-document .ku-auth-panel{background:transparent}}
@media(max-width:1023px){.ku-auth-document-shell{grid-template-columns:minmax(0,1fr);max-width:480px;gap:32px;align-content:start;padding:56px 20px}.ku-auth-document-intro>h2,.ku-auth-document-intro>p,.ku-auth-document-intro>.ku-auth-preview{display:none}.ku-auth-document-brand{margin:0}}
@media(prefers-reduced-motion:reduce){.ku-auth-preview{transform:none}}
`;
