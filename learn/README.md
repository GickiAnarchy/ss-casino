# Learn S&S Casino

Start with [the offline code reader](START-HERE.html), or browse [the file map](file-map.md). This is a local teaching companion—not a second deployed app.

## What is here

- **commented/**: copies with an explanation for every original source line. JavaScript uses // comments; CSS uses /* comments */; HTML uses <!-- comments -->. JSON, Markdown, rules and other formats use accompanying line notes rather than unsafe syntax changes.
- **original/**: byte-for-byte copies of all 32 eligible project files, including documentation and assets.
- **notes/**: explanations alongside the original text for all 8,680 text lines, plus binary asset notes.
- **START-HERE.html**: a self-contained, searchable reader that puts original code beside explanations. Open it directly in a browser; it requires no account, build, network request, or server.
- **architecture.md**, **glossary.md**, diagrams and **file-map.md**: a route from concepts to implementation.
- **coverage-manifest.json** and **verification.md**: coverage, original-file hashes, and checks performed.

## How comments stay safe

Comments normally sit immediately before their source line. When a line is inside a multiline string, template literal, tag, or comment, its explanation is grouped at the preceding safe boundary instead. Each comment says **Original L[number]**; use that number in the exact copy or notes. The JavaScript abstract syntax tree, HTML document tree, and CSS rule/declaration tree are checked against the original with comments ignored. HTML text whitespace is preserved.

Test copies use `name.test.source.js` or `name.test.source.mjs` to prevent the learning directory from adding duplicate tests to normal discovery. The manifest maps the original filenames. Relative source imports remain intact. Source-code-regex tests should be run against the original project, not the commented copy: comments can intentionally change the source text a regex sees even when parsed behavior is identical.

## A beginner route

1. Read [the glossary](glossary.md) and [the practical workbook](workbook.md) for HTML, CSS, JavaScript, DOM, function, object, event, and persistence.
2. Read architecture.md, then open index.html in the reader and trace its stylesheet/script links.
3. Pick one button or form. Find its ID in HTML, its listener in JavaScript, the rule/model called, and the render/update that follows.
4. Read the test for that rule. Predict one expected result by hand before reading the assertion.
5. Only experiment in a separate disposable copy. Never point experiments at real personal/payroll data or overwrite a valuable casino save.

## Local-only safety

Original project files were not edited, and nothing was committed, pushed, or deployed. Excluded: Git internals, dependencies, private environment/secrets, and generated build/APK files. Do not deploy this directory accidentally. Local browser saves and profile protection are not a trusted money system, online account service, or guarantee against local tampering. Preserve backups before experimenting.
