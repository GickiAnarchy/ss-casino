# assets/README.md

[Exact copy](../../original/assets/README.md)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
# Local assets
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 2

```text

```

Blank line separates documentation topics.

### Line 3

```text
`assets/splash.png` is the casino's locally served splash-screen image, referenced by `index.html`. It is a binary PNG, so source-code comments cannot be embedded in it; this note documents its role instead. Keeping it in the repository avoids a remote image dependency and lets GitHub Pages serve it as a static file.
```

This sentence teaches static deployment in the casino and gives the reader context for why the design behaves this way: `assets/splash.png` is the casino's locally served splash-screen image, referenced by `index.html`. It is a binary PNG, so source-code comments cannot be embedded in it; this note documents its role instead. Keeping it in the repository avo

### Line 4

```text

```

Blank line separates documentation topics.

### Line 5

```text
When adding another image, place it in this directory and reference it from the root `index.html` with a relative path such as `assets/example.png`. If JavaScript builds an image URL from a file under `src/js`, remember that browser URL paths are resolved from the page URL unless the code explicitly constructs another base. Give meaningful images useful `alt` text; use an empty `alt` for decoration.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: When adding another image, place it in this directory and reference it from the root `index.html` with a relative path such as `assets/example.png`. If JavaScript builds an image URL from a file under `src/js`, remember that browser URL pat
