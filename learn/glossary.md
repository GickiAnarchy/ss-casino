# Programming concepts in plain language

## The three browser languages

**HTML** describes the page's content and structure: headings, forms, buttons, images, and tables. A tag such as `<button>` starts an element, and `</button>` ends it. Attributes are extra settings inside a tag: `id="save"` gives it a unique name; `type="button"` controls its behavior. Nesting elements makes a parent/child tree.

**CSS** changes presentation. In `.panel { padding: 12px; }`, `.panel` is a selector matching elements with class `panel`; `padding` is a property; `12px` is its value. Padding is space inside a box; margin is space outside. Flexbox and grid arrange boxes. A media query changes styles for conditions such as a narrow screen. A CSS custom property such as `--accent` is a reusable value, read with `var(--accent)`.

**JavaScript** supplies behavior: reading input, calculating, responding to a click, changing the page, and saving data. HTML normally loads it with a script element. A browser downloads linked files, but opening a source file in an editor shows the text instead of executing it.

**DOM**, the Document Object Model, is the browser's live object tree for the HTML. JavaScript can find an element, change its text, or create another element. `document.getElementById('save')` finds a unique ID; `querySelector('.panel')` uses CSS selector syntax. A missing element usually gives `null`, so code must check before using it.

## Reading JavaScript expressions

A **value** can be a number, text, true/false, an object, an array, or another supported type. Text is called a **string** and is usually written inside quotes. `null` explicitly means no value; `undefined` often means a value has not been supplied. They are different values.

A **variable** is a name bound to a value. `const` prevents assigning a different value to that binding; it does **not** freeze an object's contents. `let` permits reassignment. An **array** is an ordered list, with indices starting at zero. An **object** groups named properties, such as `{ hours: 8, paid: false }`. `shift.hours` reads its hours property; `shifts[0]` reads the first shift.

An **operator** combines or compares values. `+`, `-`, `*`, and `/` perform arithmetic, although `+` can join strings. `%` is the remainder: `65 % 60` is 5. `===` checks equal value **and** type; `=` assigns a value and is not an equality check. `!x` negates truthiness. `x && y` evaluates y only when x is truthy. `x || fallback` uses the fallback for any falsy x; `x ?? fallback` uses it only for null or undefined, preserving legitimate zero/false/empty-string values.

**Truthiness** is JavaScript's way of treating values as true or false in a condition. Examples of falsy values include false, 0, an empty string, null, undefined, and NaN. An empty array or object is truthy.

An **if statement** chooses a branch. A **ternary**, `condition ? first : second`, chooses one of two values. A **loop** repeats instructions. Braces `{ ... }` often mark a block, but can also describe an object, so context matters. Semicolons end many statements; commas separate arguments or list entries.

**Optional chaining**, as in `element?.focus()`, stops with undefined if the guarded receiver is null or undefined. It does not mean every possible error is ignored.

## Reusing and organizing work

A **function** is a reusable operation with inputs called parameters. Calling it supplies arguments. `return` sends a result to its caller and stops that invocation. A **callback** is a function supplied to another function to run later or once per item. `items.map(...)` builds a transformed array; `filter(...)` keeps matching entries; `reduce(...)` combines entries into one accumulated result.

A **class** is a reusable definition for objects with data and methods. `new Player(...)` makes an instance. Inside an instance method, `this` normally refers to the receiver object, though callback binding can matter. An arrow callback inherits `this` from the surrounding scope rather than creating its own.

A **module** is a file with an explicit import/export boundary. An import does not copy the other file's text; it connects exported bindings. Timekeeper uses ES modules. Casino primarily uses classic scripts and browser globals, so their loading order matters. A **global** is reachable across the page's shared environment, such as a property placed on `window`.

**Scope** determines where a name can be used. A local variable inside a function is not automatically available outside it. A **closure** lets a callback retain access to variables from where it was created, even when the callback runs later.

An **event** is a notification, such as a click, input change, or the page finishing initial parsing. An **event listener** is a callback registered to react. `preventDefault()` stops the browser's normal response, such as submitting a form by navigating away; it does not itself validate or save anything.

## Time, money, and asynchronous operations

A **timestamp** represents a point in time; JavaScript's `Date.now()` counts milliseconds since the Unix epoch, 1970-01-01 UTC. A duration is elapsed time, not a calendar date. There are 1,000 milliseconds in a second, 60 seconds in a minute, and 3,600 seconds in an hour. Local time zones and UTC are not interchangeable.

**Floating-point arithmetic** approximates many decimal fractions. Money-related code may round values or use whole-number cents to reduce errors. `Math.floor(x)` rounds down; `Math.round(x)` rounds to the nearest integer; `Math.max(a,b)` chooses the larger value. Read where rounding occurs: rounding each item can differ from rounding the final total.

A **Promise** represents work that may finish later. An **async function** returns a Promise; `await` suspends that function until the Promise settles. Other browser work can continue. Rejection behaves like a thrown error at the await point. `try/catch` handles errors; `finally` runs cleanup whether the operation succeeds or fails. A queue can serialize writes so an older save does not finish after and overwrite a newer one.

## Data, safety, and tools

**JSON** is a text format for data. It resembles JavaScript objects but has stricter rules: quoted keys, no functions, and no ordinary comments. `JSON.stringify` encodes data; `JSON.parse` decodes it. Parsing confirms syntax, not whether the data is safe or sensible; validation must still check fields and ranges.

**Browser storage** keeps data on a particular browser/device. It is not automatically a server account or a backup. Exports and imports are a separate way to move data. **Encryption** transforms data using a key; its security depends on the password, derivation, implementation, and surrounding workflow. An unencrypted export remains readable even if the normal profile storage is encrypted.

**Firestore** is a cloud document database. Collections hold documents with fields. Authentication identifies a user; authorization decides what they may access. These are different concerns. Firestore rules are enforced by the service; a browser-only check cannot replace them. A public browser Firebase API key is an application identifier, not a substitute for restrictive database rules.

**Node.js** runs JavaScript outside a browser, useful for tests and tools. A Node test can imitate a small part of the DOM; that does not prove every real-device behavior. **npm** manages JavaScript packages and configured commands. `package.json` declares the project; `package-lock.json` records resolved dependency versions and integrity metadata. `node_modules` contains installed third-party packages and is intentionally excluded here.

A **test** sets up inputs, runs code, and uses an **assertion** to compare actual behavior with an expectation. A fixture is prepared sample data. A mock is a simplified stand-in. A syntax check catches invalid grammar, not incorrect business logic. The teaching copy also compares parsed code structures to ensure inserted comments do not change executable expressions or HTML/CSS structure.

**Git** records source history. A repository is the project history and working tree; a branch names a development line; a commit records a snapshot. A local edit is not a push. A push is not automatically a deployment, although a hosting workflow can connect them.

**Mermaid** describes diagrams as text so boxes and arrows can be edited and regenerated. The PNGs here are rendered views of those editable sources. An arrow means the particular relationship written in the diagram, not necessarily an internet request.

A **sidecar note** is a separate explanation paired with a file. Here, `notes/path/to/file.md` repeats original line numbers. **Original L42** in an inline comment points to line 42 of the unannotated copy, not line 42 after all teaching comments were inserted.
