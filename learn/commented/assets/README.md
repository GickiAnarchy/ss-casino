# Local assets

`assets/splash.png` is the casino's locally served splash-screen image, referenced by `index.html`. It is a binary PNG, so source-code comments cannot be embedded in it; this note documents its role instead. Keeping it in the repository avoids a remote image dependency and lets GitHub Pages serve it as a static file.

When adding another image, place it in this directory and reference it from the root `index.html` with a relative path such as `assets/example.png`. If JavaScript builds an image URL from a file under `src/js`, remember that browser URL paths are resolved from the page URL unless the code explicitly constructs another base. Give meaningful images useful `alt` text; use an empty `alt` for decoration.
