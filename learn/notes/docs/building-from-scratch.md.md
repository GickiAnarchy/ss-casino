# docs/building-from-scratch.md

[Exact copy](../../original/docs/building-from-scratch.md)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
# Build S&S Casino Hub from Scratch: A Beginner's Guide
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 2

```text

```

Blank line separates documentation topics.

### Line 3

```text
This tutorial explains how to think about and build this project one layer at a time. It assumes you are learning web development and may not yet know how HTML, CSS, JavaScript, browser storage, or tests fit together. The codebase is a real static web app, so there is no server framework to install and no build command that hides what the browser runs.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: This tutorial explains how to think about and build this project one layer at a time. It assumes you are learning web development and may not yet know how HTML, CSS, JavaScript, browser storage, or tests fit together. The codebase is a real

### Line 4

```text

```

Blank line separates documentation topics.

### Line 5

```text
> The casino uses virtual credits only. It has no deposits, cashouts, real-money wagers, online game server, live sports feed, or account sync service.
```

This callout emphasizes a safety or product boundary that should remain true while learning or extending the app.

### Line 6

```text

```

Blank line separates documentation topics.

### Line 7

```text
## 1. What you are building
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 8

```text

```

Blank line separates documentation topics.

### Line 9

```text
A browser loads three kinds of files:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: A browser loads three kinds of files:

### Line 10

```text

```

Blank line separates documentation topics.

### Line 11

```text
- **HTML** describes the page structure: headings, buttons, game screens, dialogs, and reusable slot-machine templates.
```

This bullet gives a concrete project responsibility or rule: **HTML** describes the page structure: headings, buttons, game screens, dialogs, and reusable slot-machine templates.

### Line 12

```text
- **CSS** controls how that structure looks: colors, layout, responsive behavior, and animations.
```

This bullet gives a concrete project responsibility or rule: **CSS** controls how that structure looks: colors, layout, responsive behavior, and animations.

### Line 13

```text
- **JavaScript** makes the page interactive: changing balances, spinning reels, saving progress, and updating the screen.
```

This bullet gives a concrete project responsibility or rule: **JavaScript** makes the page interactive: changing balances, spinning reels, saving progress, and updating the screen.

### Line 14

```text

```

Blank line separates documentation topics.

### Line 15

```text
S&S Casino Hub deliberately uses plain HTML, CSS, and JavaScript. A static host such as GitHub Pages can serve the files directly. There is no build step, server-side code, database service, or npm dependency. This makes the source easier to inspect and lets the same files run locally and on a static host.
```

This sentence teaches static deployment in the casino and gives the reader context for why the design behaves this way: S&S Casino Hub deliberately uses plain HTML, CSS, and JavaScript. A static host such as GitHub Pages can serve the files directly. There is no build step, server-side code, database service, or npm dependency. This makes the source easier t

### Line 16

```text

```

Blank line separates documentation topics.

### Line 17

```text
The lobby has a dedicated **Slot Room** containing all five slot choices. Coin Toss, Blackjack, and Racing remain separate games. The app also includes a daily bonus wheel, local profiles, settings, a virtual bank, player levels, and a browser-local demo jackpot.
```

This sentence teaches non-cash economy in the casino and gives the reader context for why the design behaves this way: The lobby has a dedicated **Slot Room** containing all five slot choices. Coin Toss, Blackjack, and Racing remain separate games. The app also includes a daily bonus wheel, local profiles, settings, a virtual bank, player levels, and a brow

### Line 18

```text

```

Blank line separates documentation topics.

### Line 19

```text
## 2. Tools to install
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 20

```text

```

Blank line separates documentation topics.

### Line 21

```text
You need:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: You need:

### Line 22

```text

```

Blank line separates documentation topics.

### Line 23

```text
1. A modern browser, such as Chrome, Firefox, Edge, or Safari.
```

This numbered instruction gives an actionable build or verification step: A modern browser, such as Chrome, Firefox, Edge, or Safari.

### Line 24

```text
2. A text editor. Visual Studio Code is optional; any editor that handles plain text works.
```

This numbered instruction gives an actionable build or verification step: A text editor. Visual Studio Code is optional; any editor that handles plain text works.

### Line 25

```text
3. Node.js 18 or newer if you want to run the automated tests. The project uses Node's built-in test runner and installs no test packages.
```

This numbered instruction gives an actionable build or verification step: Node.js 18 or newer if you want to run the automated tests. The project uses Node's built-in test runner and installs no test packages.

### Line 26

```text
4. Python 3 if you want the simple built-in local web server. Most systems have it already. The Windows launcher is commonly named `py`.
```

This numbered instruction gives an actionable build or verification step: Python 3 if you want the simple built-in local web server. Most systems have it already. The Windows launcher is commonly named `py`.

### Line 27

```text
5. Git if you want to track your changes.
```

This numbered instruction gives an actionable build or verification step: Git if you want to track your changes.

### Line 28

```text

```

Blank line separates documentation topics.

### Line 29

```text
You do **not** need a Firebase account, an API key, a casino service, a package installation, or a payment provider.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: You do **not** need a Firebase account, an API key, a casino service, a package installation, or a payment provider.

### Line 30

```text

```

Blank line separates documentation topics.

### Line 31

```text
## 3. Create a project folder
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 32

```text

```

Blank line separates documentation topics.

### Line 33

```text
For a new project, create a folder and change into it. The `dev` branch is used for this project's development work:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: For a new project, create a folder and change into it. The `dev` branch is used for this project's development work:

### Line 34

```text

```

Blank line separates documentation topics.

### Line 35

```text
```sh
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 36

```text
mkdir ss-casino
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: mkdir ss-casino

### Line 37

```text
cd ss-casino
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: cd ss-casino

### Line 38

```text
git init -b dev
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: git init -b dev

### Line 39

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 40

```text

```

Blank line separates documentation topics.

### Line 41

```text
If you are working in the existing repository instead, first check that it is on `dev` and that you understand any local changes before editing:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: If you are working in the existing repository instead, first check that it is on `dev` and that you understand any local changes before editing:

### Line 42

```text

```

Blank line separates documentation topics.

### Line 43

```text
```sh
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 44

```text
git status --short --branch
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: git status --short --branch

### Line 45

```text
git branch --show-current
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: git branch --show-current

### Line 46

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 47

```text

```

Blank line separates documentation topics.

### Line 48

```text
Do not overwrite files containing player data. In this project, player data lives in the browser's site storage or in a user-selected save backup, not in the source folder.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Do not overwrite files containing player data. In this project, player data lives in the browser's site storage or in a user-selected save backup, not in the source folder.

### Line 49

```text

```

Blank line separates documentation topics.

### Line 50

```text
Create the folders below. The root `index.html` is intentional: static hosting looks for it as the site's home page.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Create the folders below. The root `index.html` is intentional: static hosting looks for it as the site's home page.

### Line 51

```text

```

Blank line separates documentation topics.

### Line 52

```text
```text
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 53

```text
ss-casino/
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: ss-casino/

### Line 54

```text
├── index.html
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: ├── index.html

### Line 55

```text
├── assets/
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: ├── assets/

### Line 56

```text
├── src/
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: ├── src/

### Line 57

```text
│   ├── css/
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: │   ├── css/

### Line 58

```text
│   └── js/
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: │   └── js/

### Line 59

```text
├── tests/
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: ├── tests/

### Line 60

```text
└── docs/
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: └── docs/

### Line 61

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 62

```text

```

Blank line separates documentation topics.

### Line 63

```text
What belongs where:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: What belongs where:

### Line 64

```text

```

Blank line separates documentation topics.

### Line 65

```text
- `index.html`: the page shell and the static pieces of the user interface.
```

This bullet gives a concrete project responsibility or rule: `index.html`: the page shell and the static pieces of the user interface.

### Line 66

```text
- `src/css/`: site styles.
```

This bullet gives a concrete project responsibility or rule: `src/css/`: site styles.

### Line 67

```text
- `src/js/`: browser code, separated into modules by responsibility.
```

This bullet gives a concrete project responsibility or rule: `src/js/`: browser code, separated into modules by responsibility.

### Line 68

```text
- `assets/`: local images or other static files.
```

This bullet gives a concrete project responsibility or rule: `assets/`: local images or other static files.

### Line 69

```text
- `tests/`: automated checks run by Node.
```

This bullet gives a concrete project responsibility or rule: `tests/`: automated checks run by Node.

### Line 70

```text
- `docs/`: explanations for people using or maintaining the project.
```

This bullet gives a concrete project responsibility or rule: `docs/`: explanations for people using or maintaining the project.

### Line 71

```text

```

Blank line separates documentation topics.

### Line 72

```text
This is a simple organization rule, not a browser requirement. The browser can load a file from any directory as long as the path in HTML is correct. A clear structure makes it easier for a beginner to find the right file.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: This is a simple organization rule, not a browser requirement. The browser can load a file from any directory as long as the path in HTML is correct. A clear structure makes it easier for a beginner to find the right file.

### Line 73

```text

```

Blank line separates documentation topics.

### Line 74

```text
## 4. Start with the page shell
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 75

```text

```

Blank line separates documentation topics.

### Line 76

```text
Create `index.html` with the minimum valid document structure:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Create `index.html` with the minimum valid document structure:

### Line 77

```text

```

Blank line separates documentation topics.

### Line 78

```text
```html
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 79

```text
<!doctype html>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <!doctype html>

### Line 80

```text
<html lang="en">
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <html lang="en">

### Line 81

```text
<head>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <head>

### Line 82

```text
  <meta charset="utf-8">
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <meta charset="utf-8">

### Line 83

```text
  <meta name="viewport" content="width=device-width, initial-scale=1">
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <meta name="viewport" content="width=device-width, initial-scale=1">

### Line 84

```text
  <title>S&amp;S Casino Hub</title>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <title>S&amp;S Casino Hub</title>

### Line 85

```text
  <link rel="stylesheet" href="src/css/style.css">
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <link rel="stylesheet" href="src/css/style.css">

### Line 86

```text
  <script src="src/js/models.js" defer></script>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <script src="src/js/models.js" defer></script>

### Line 87

```text
  <script src="src/js/local-save.js" defer></script>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <script src="src/js/local-save.js" defer></script>

### Line 88

```text
  <script src="src/js/profiles.js" defer></script>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <script src="src/js/profiles.js" defer></script>

### Line 89

```text
  <script src="src/js/race-engine.js" defer></script>
```

This sentence teaches seeded local simulation in the casino and gives the reader context for why the design behaves this way: <script src="src/js/race-engine.js" defer></script>

### Line 90

```text
  <script src="src/js/slot-bet-rules.js" defer></script>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <script src="src/js/slot-bet-rules.js" defer></script>

### Line 91

```text
  <script src="src/js/slot-templates.js" defer></script>
```

This sentence teaches reusable HTML in the casino and gives the reader context for why the design behaves this way: <script src="src/js/slot-templates.js" defer></script>

### Line 92

```text
  <script src="src/js/app.js" defer></script>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <script src="src/js/app.js" defer></script>

### Line 93

```text
</head>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: </head>

### Line 94

```text
<body>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <body>

### Line 95

```text
  <header><!-- global balance and profile controls --></header>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <header><!-- global balance and profile controls --></header>

### Line 96

```text
  <main id="app-container"><!-- lobby and game views --></main>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <main id="app-container"><!-- lobby and game views --></main>

### Line 97

```text
</body>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: </body>

### Line 98

```text
</html>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: </html>

### Line 99

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 100

```text

```

Blank line separates documentation topics.

### Line 101

```text
The `defer` attribute tells the browser to download a script without blocking HTML parsing, then run it after the document has been parsed. Deferred scripts run in document order. Order matters because later files call APIs created by earlier files: the model loads before save/profile code, and the slot catalog loads before the app controller creates slot engines.
```

This sentence teaches data-driven machine registration in the casino and gives the reader context for why the design behaves this way: The `defer` attribute tells the browser to download a script without blocking HTML parsing, then run it after the document has been parsed. Deferred scripts run in document order. Order matters because later files call APIs created by earli

### Line 102

```text

```

Blank line separates documentation topics.

### Line 103

```text
Keep the script tags in one list in `index.html`. That gives a beginner one visible place to understand the app's startup order. This project uses browser globals rather than ES-module imports; the globals are explicitly attached to `window` so other deferred scripts can use them.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Keep the script tags in one list in `index.html`. That gives a beginner one visible place to understand the app's startup order. This project uses browser globals rather than ES-module imports; the globals are explicitly attached to `window

### Line 104

```text

```

Blank line separates documentation topics.

### Line 105

```text
### 4.1 Build the lobby and give slots their own room
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 106

```text

```

Blank line separates documentation topics.

### Line 107

```text
Use semantic sections and headings to show that the slot machines belong together. A simplified example:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Use semantic sections and headings to show that the slot machines belong together. A simplified example:

### Line 108

```text

```

Blank line separates documentation topics.

### Line 109

```text
```html
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 110

```text
<section id="view-lobby" class="view-screen active-view">
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <section id="view-lobby" class="view-screen active-view">

### Line 111

```text
  <header class="lobby-header">
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <header class="lobby-header">

### Line 112

```text
    <h2>Select a room</h2>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <h2>Select a room</h2>

### Line 113

```text
    <p>Choose a game to play.</p>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <p>Choose a game to play.</p>

### Line 114

```text
  </header>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: </header>

### Line 115

```text

```

Blank line separates documentation topics.

### Line 116

```text
  <section class="lobby-slot-room" aria-labelledby="slot-room-title">
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <section class="lobby-slot-room" aria-labelledby="slot-room-title">

### Line 117

```text
    <h3 id="slot-room-title">Slot Room</h3>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <h3 id="slot-room-title">Slot Room</h3>

### Line 118

```text
    <div class="slot-room-grid">
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <div class="slot-room-grid">

### Line 119

```text
      <!-- Hand-authored cards for the original machines go here. -->
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <!-- Hand-authored cards for the original machines go here. -->

### Line 120

```text
    </div>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: </div>

### Line 121

```text
  </section>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: </section>

### Line 122

```text

```

Blank line separates documentation topics.

### Line 123

```text
  <div class="game-grid">
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <div class="game-grid">

### Line 124

```text
    <!-- Coin Toss, Blackjack, and Racing cards go here. -->
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <!-- Coin Toss, Blackjack, and Racing cards go here. -->

### Line 125

```text
  </div>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: </div>

### Line 126

```text
</section>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: </section>

### Line 127

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 128

```text

```

Blank line separates documentation topics.

### Line 129

```text
The `aria-labelledby` attribute connects the room's accessible name to its heading. The `.slot-room-grid` is a deliberate contract: the slot catalog looks for that class and appends the themed slot cards there. Keeping the slot cards separate from `.game-grid` prevents future machines from drifting back into the general game list.
```

This sentence teaches data-driven machine registration in the casino and gives the reader context for why the design behaves this way: The `aria-labelledby` attribute connects the room's accessible name to its heading. The `.slot-room-grid` is a deliberate contract: the slot catalog looks for that class and appends the themed slot cards there. Keeping the slot cards separa

### Line 130

```text

```

Blank line separates documentation topics.

### Line 131

```text
Every play button has a `data-game` attribute:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Every play button has a `data-game` attribute:

### Line 132

```text

```

Blank line separates documentation topics.

### Line 133

```text
```html
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 134

```text
<button type="button" class="play-btn" data-game="blackjack">Play now</button>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <button type="button" class="play-btn" data-game="blackjack">Play now</button>

### Line 135

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 136

```text

```

Blank line separates documentation topics.

### Line 137

```text
A `data-*` attribute stores a small string of app-specific data on an HTML element. Here it is the navigation key. JavaScript reads it when the user clicks the button. `type="button"` prevents the button from accidentally submitting a form if the markup is later nested inside one.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: A `data-*` attribute stores a small string of app-specific data on an HTML element. Here it is the navigation key. JavaScript reads it when the user clicks the button. `type="button"` prevents the button from accidentally submitting a form 

### Line 138

```text

```

Blank line separates documentation topics.

### Line 139

```text
### 4.2 Give each game a view
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 140

```text

```

Blank line separates documentation topics.

### Line 141

```text
A game view is a section in the same page. The app hides all but the selected one by toggling CSS classes:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: A game view is a section in the same page. The app hides all but the selected one by toggling CSS classes:

### Line 142

```text

```

Blank line separates documentation topics.

### Line 143

```text
```html
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 144

```text
<section id="view-blackjack" class="view-screen hidden-view">
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <section id="view-blackjack" class="view-screen hidden-view">

### Line 145

```text
  <button type="button" class="back-lobby-btn">Back to lobby</button>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <button type="button" class="back-lobby-btn">Back to lobby</button>

### Line 146

```text
  <!-- Blackjack table and controls -->
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <!-- Blackjack table and controls -->

### Line 147

```text
</section>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: </section>

### Line 148

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 149

```text

```

Blank line separates documentation topics.

### Line 150

```text
The lobby is marked `active-view` at first, and other views start as `hidden-view`. This is simpler than navigating between separate HTML files because the wallet and game engines can stay alive while the player switches views.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: The lobby is marked `active-view` at first, and other views start as `hidden-view`. This is simpler than navigating between separate HTML files because the wallet and game engines can stay alive while the player switches views.

### Line 151

```text

```

Blank line separates documentation topics.

### Line 152

```text
### 4.3 Make reusable slot templates
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 153

```text

```

Blank line separates documentation topics.

### Line 154

```text
A `<template>` is stored in the document but is not displayed until JavaScript clones its contents. One classic-slot template can therefore create several machines without copying the same controls and layout:
```

This sentence teaches reusable HTML in the casino and gives the reader context for why the design behaves this way: A `<template>` is stored in the document but is not displayed until JavaScript clones its contents. One classic-slot template can therefore create several machines without copying the same controls and layout:

### Line 155

```text

```

Blank line separates documentation topics.

### Line 156

```text
```html
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 157

```text
<template id="slot-template-classic">
```

This sentence teaches reusable HTML in the casino and gives the reader context for why the design behaves this way: <template id="slot-template-classic">

### Line 158

```text
  <section>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <section>

### Line 159

```text
    <button type="button" class="back-lobby-btn">Back to lobby</button>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <button type="button" class="back-lobby-btn">Back to lobby</button>

### Line 160

```text
    <div class="slot-machine theme-slot-machine">
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <div class="slot-machine theme-slot-machine">

### Line 161

```text
      <h1 data-slot-title></h1>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <h1 data-slot-title></h1>

### Line 162

```text
      <p data-slot-stakes></p>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <p data-slot-stakes></p>

### Line 163

```text
      <div data-slot-status role="status" aria-live="polite"></div>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <div data-slot-status role="status" aria-live="polite"></div>

### Line 164

```text
      <div class="reels-viewport"><!-- reel strips --></div>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <div class="reels-viewport"><!-- reel strips --></div>

### Line 165

```text
      <button type="button" data-slot-spin>Spin</button>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: <button type="button" data-slot-spin>Spin</button>

### Line 166

```text
    </div>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: </div>

### Line 167

```text
  </section>
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: </section>

### Line 168

```text
</template>
```

This sentence teaches reusable HTML in the casino and gives the reader context for why the design behaves this way: </template>

### Line 169

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 170

```text

```

Blank line separates documentation topics.

### Line 171

```text
The `data-slot-*` attributes are stable hooks that the engine uses to find controls. They separate the engine from specific element IDs, which makes the template reusable. The five-reel template has additional markup for its bonus panel and five reels.
```

This sentence teaches reusable HTML in the casino and gives the reader context for why the design behaves this way: The `data-slot-*` attributes are stable hooks that the engine uses to find controls. They separate the engine from specific element IDs, which makes the template reusable. The five-reel template has additional markup for its bonus panel and

### Line 172

```text

```

Blank line separates documentation topics.

### Line 173

```text
Use `aria-live="polite"` for status text that changes during play so assistive technology can announce results without interrupting the current reading.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Use `aria-live="polite"` for status text that changes during play so assistive technology can announce results without interrupting the current reading.

### Line 174

```text

```

Blank line separates documentation topics.

### Line 175

```text
## 5. Add visual rules in CSS
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 176

```text

```

Blank line separates documentation topics.

### Line 177

```text
Create `src/css/style.css`. Start with a few shared values:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Create `src/css/style.css`. Start with a few shared values:

### Line 178

```text

```

Blank line separates documentation topics.

### Line 179

```text
```css
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 180

```text
:root {
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: :root {

### Line 181

```text
  --gold-primary: #ffd700;
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: --gold-primary: #ffd700;

### Line 182

```text
  --panel-bg: #1e1e24;
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: --panel-bg: #1e1e24;

### Line 183

```text
  --bg-primary: radial-gradient(circle, #4a0d66, #0f081d);
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: --bg-primary: radial-gradient(circle, #4a0d66, #0f081d);

### Line 184

```text
}
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: }

### Line 185

```text

```

Blank line separates documentation topics.

### Line 186

```text
* {
```

This bullet gives a concrete project responsibility or rule: {

### Line 187

```text
  box-sizing: border-box;
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: box-sizing: border-box;

### Line 188

```text
  margin: 0;
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: margin: 0;

### Line 189

```text
  padding: 0;
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: padding: 0;

### Line 190

```text
  font-family: "Segoe UI", Tahoma, sans-serif;
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: font-family: "Segoe UI", Tahoma, sans-serif;

### Line 191

```text
}
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: }

### Line 192

```text

```

Blank line separates documentation topics.

### Line 193

```text
body {
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: body {

### Line 194

```text
  min-height: 100vh;
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: min-height: 100vh;

### Line 195

```text
  background: var(--bg-primary);
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: background: var(--bg-primary);

### Line 196

```text
  color: #fff;
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: color: #fff;

### Line 197

```text
}
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: }

### Line 198

```text

```

Blank line separates documentation topics.

### Line 199

```text
.hidden-view { display: none !important; }
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: .hidden-view { display: none !important; }

### Line 200

```text
.active-view { display: block; }
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: .active-view { display: block; }

### Line 201

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 202

```text

```

Blank line separates documentation topics.

### Line 203

```text
The custom properties beginning with `--` are CSS variables. They centralize the palette so themes can change the same values in one place. `box-sizing: border-box` makes declared widths include padding and borders, which makes card sizing more predictable.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: The custom properties beginning with `--` are CSS variables. They centralize the palette so themes can change the same values in one place. `box-sizing: border-box` makes declared widths include padding and borders, which makes card sizing 

### Line 204

```text

```

Blank line separates documentation topics.

### Line 205

```text
Use CSS Grid for card collections because it automatically lays cards out in rows and can adapt to available space:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Use CSS Grid for card collections because it automatically lays cards out in rows and can adapt to available space:

### Line 206

```text

```

Blank line separates documentation topics.

### Line 207

```text
```css
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 208

```text
.slot-room-grid,
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: .slot-room-grid,

### Line 209

```text
.game-grid {
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: .game-grid {

### Line 210

```text
  display: grid;
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: display: grid;

### Line 211

```text
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

This sentence teaches reusable HTML in the casino and gives the reader context for why the design behaves this way: grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

### Line 212

```text
  gap: 20px;
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: gap: 20px;

### Line 213

```text
}
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: }

### Line 214

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 215

```text

```

Blank line separates documentation topics.

### Line 216

```text
`auto-fit` creates as many columns as fit. `minmax(250px, 1fr)` asks each column to stay at least 250 pixels wide while sharing the remaining space. On a narrow screen, fewer columns fit and the room naturally becomes a single column.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: `auto-fit` creates as many columns as fit. `minmax(250px, 1fr)` asks each column to stay at least 250 pixels wide while sharing the remaining space. On a narrow screen, fewer columns fit and the room naturally becomes a single column.

### Line 217

```text

```

Blank line separates documentation topics.

### Line 218

```text
The actual stylesheet also includes responsive breakpoints, slot-reel windows, card styles, buttons, modals, race tracks, reduced-motion support, and theme-variable consumers. Comments in the file explain why the broader rules are grouped together.
```

This sentence teaches seeded local simulation in the casino and gives the reader context for why the design behaves this way: The actual stylesheet also includes responsive breakpoints, slot-reel windows, card styles, buttons, modals, race tracks, reduced-motion support, and theme-variable consumers. Comments in the file explain why the broader rules are grouped t

### Line 219

```text

```

Blank line separates documentation topics.

### Line 220

```text
### 5.1 Theme the whole page and each slot cabinet
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 221

```text

```

Blank line separates documentation topics.

### Line 222

```text
There are two independent theme systems:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: There are two independent theme systems:

### Line 223

```text

```

Blank line separates documentation topics.

### Line 224

```text
- The **page theme** (`vegas`, `midnight`, or `gold`) changes shared CSS variables on the `<body>`.
```

This bullet gives a concrete project responsibility or rule: The **page theme** (`vegas`, `midnight`, or `gold`) changes shared CSS variables on the `<body>`.

### Line 225

```text
- A **slot-machine theme** gives one cabinet its own accent, reel, symbol, and button colors.
```

This bullet gives a concrete project responsibility or rule: A **slot-machine theme** gives one cabinet its own accent, reel, symbol, and button colors.

### Line 226

```text

```

Blank line separates documentation topics.

### Line 227

```text
Keeping them separate lets a player choose an overall site style without erasing the identity of the Citrus Garden or Deep Sea machine. Slot theme values are written as CSS custom properties such as `--slot-accent`; the shared `.theme-slot-machine` rules read those values.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Keeping them separate lets a player choose an overall site style without erasing the identity of the Citrus Garden or Deep Sea machine. Slot theme values are written as CSS custom properties such as `--slot-accent`; the shared `.theme-slot-

### Line 228

```text

```

Blank line separates documentation topics.

### Line 229

```text
## 6. Model the player and use cents for wagers
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 230

```text

```

Blank line separates documentation topics.

### Line 231

```text
### 6.1 The `Player` model
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 232

```text

```

Blank line separates documentation topics.

### Line 233

```text
`src/js/models.js` defines a `Player` class. It keeps related player state—balance, level, experience, debt, credit limit, and maximum wager—in one object. It also has `toProfile()` and `fromProfile()` methods to convert between a live object and a plain data record.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: `src/js/models.js` defines a `Player` class. It keeps related player state—balance, level, experience, debt, credit limit, and maximum wager—in one object. It also has `toProfile()` and `fromProfile()` methods to convert between a live obje

### Line 234

```text

```

Blank line separates documentation topics.

### Line 235

```text
That explicit conversion is important: browser saves should contain only intended game fields, not methods or temporary animation state. Numeric input passes through `numberOr()` so a malformed or negative value cannot blindly become part of the in-memory model.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: That explicit conversion is important: browser saves should contain only intended game fields, not methods or temporary animation state. Numeric input passes through `numberOr()` so a malformed or negative value cannot blindly become part o

### Line 236

```text

```

Blank line separates documentation topics.

### Line 237

```text
A new profile starts at $100.00, but loading a real saved profile must preserve its valid balance. Defaults are for missing or invalid data, not permission to overwrite progress.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: A new profile starts at $100.00, but loading a real saved profile must preserve its valid balance. Defaults are for missing or invalid data, not permission to overwrite progress.

### Line 238

```text

```

Blank line separates documentation topics.

### Line 239

```text
### 6.2 Why money is stored as integer cents during calculations
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 240

```text

```

Blank line separates documentation topics.

### Line 241

```text
JavaScript uses binary floating-point numbers. Many decimal fractions, including 0.1, cannot be represented exactly. A calculation such as `0.1 + 0.2` can produce a value that displays as `0.30000000000000004`.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: JavaScript uses binary floating-point numbers. Many decimal fractions, including 0.1, cannot be represented exactly. A calculation such as `0.1 + 0.2` can produce a value that displays as `0.30000000000000004`.

### Line 242

```text

```

Blank line separates documentation topics.

### Line 243

```text
`src/js/slot-bet-rules.js` converts a dollar amount into integer cents with `toCents()`, performs limits and increments using integers, then converts back for display. A $0.05 minimum with $0.05 steps therefore stays exactly on legal increments. The module also checks the player's wallet, their personal maximum, and the table maximum together.
```

This sentence teaches rounding-safe wager arithmetic in the casino and gives the reader context for why the design behaves this way: `src/js/slot-bet-rules.js` converts a dollar amount into integer cents with `toCents()`, performs limits and increments using integers, then converts back for display. A $0.05 minimum with $0.05 steps therefore stays exactly on legal increm

### Line 244

```text

```

Blank line separates documentation topics.

### Line 245

```text
All tables share these rules but pass different configuration:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: All tables share these rules but pass different configuration:

### Line 246

```text

```

Blank line separates documentation topics.

### Line 247

```text
- A penny table: minimum $0.05, step $0.05, maximum $5.00.
```

This bullet gives a concrete project responsibility or rule: A penny table: minimum $0.05, step $0.05, maximum $5.00.

### Line 248

```text
- A quarter table: minimum $0.25, step $0.25, maximum $25.00.
```

This bullet gives a concrete project responsibility or rule: A quarter table: minimum $0.25, step $0.25, maximum $25.00.

### Line 249

```text
- The original high-stakes tables: minimum and step $5.00, bounded by the player's affordable maximum.
```

This bullet gives a concrete project responsibility or rule: The original high-stakes tables: minimum and step $5.00, bounded by the player's affordable maximum.

### Line 250

```text

```

Blank line separates documentation topics.

### Line 251

```text
Payouts still display two decimal places. Integer cents reduce the common source of rounding surprises; they do not turn the game into a financial ledger.
```

This sentence teaches rounding-safe wager arithmetic in the casino and gives the reader context for why the design behaves this way: Payouts still display two decimal places. Integer cents reduce the common source of rounding surprises; they do not turn the game into a financial ledger.

### Line 252

```text

```

Blank line separates documentation topics.

### Line 253

```text
## 7. Organize game logic into engines and managers
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 254

```text

```

Blank line separates documentation topics.

### Line 255

```text
`src/js/app.js` is the browser controller. It waits for the page, creates the shared managers, connects controls to events, and hosts the game engines. It is large because the project intentionally avoids a framework and has multiple games; the comments divide it into understandable systems.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: `src/js/app.js` is the browser controller. It waits for the page, creates the shared managers, connects controls to events, and hosts the game engines. It is large because the project intentionally avoids a framework and has multiple games;

### Line 256

```text

```

Blank line separates documentation topics.

### Line 257

```text
A **manager** owns a shared service such as settings, XP, the bank, or the daily wheel. An **engine** owns one game's round state and rules. A game's engine asks the central casino hub to change the wallet rather than directly editing unrelated interface elements.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: A **manager** owns a shared service such as settings, XP, the bank, or the daily wheel. An **engine** owns one game's round state and rules. A game's engine asks the central casino hub to change the wallet rather than directly editing unrel

### Line 258

```text

```

Blank line separates documentation topics.

### Line 259

```text
### 7.1 The central casino hub
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 260

```text

```

Blank line separates documentation topics.

### Line 261

```text
`CasinoHubController` owns the active `Player`, the current view, and the global balance display. `modifyBalance(amount)` rounds to cents, saves, and refreshes the displayed wallet. `switchView(name)` hides the prior section and reveals the selected game view.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: `CasinoHubController` owns the active `Player`, the current view, and the global balance display. `modifyBalance(amount)` rounds to cents, saves, and refreshes the displayed wallet. `switchView(name)` hides the prior section and reveals the

### Line 262

```text

```

Blank line separates documentation topics.

### Line 263

```text
This avoids making a separate copy of the player's balance inside every game. The game may remember its current wager, but the hub remains the source of truth for the wallet.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: This avoids making a separate copy of the player's balance inside every game. The game may remember its current wager, but the hub remains the source of truth for the wallet.

### Line 264

```text

```

Blank line separates documentation topics.

### Line 265

```text
### 7.2 Sound and celebration effects
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 266

```text

```

Blank line separates documentation topics.

### Line 267

```text
`FXEngine` creates short tones with the Web Audio API and particles on a Canvas. A user click is used to initialize or resume audio because browsers normally restrict sound that starts without a user gesture. The master gain node applies volume and mute settings to sounds. The Canvas is a visual layer with `pointer-events: none`, so confetti cannot block clicks.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: `FXEngine` creates short tones with the Web Audio API and particles on a Canvas. A user click is used to initialize or resume audio because browsers normally restrict sound that starts without a user gesture. The master gain node applies vo

### Line 268

```text

```

Blank line separates documentation topics.

### Line 269

```text
This approach avoids remote sound files and keeps effects optional. If the browser lacks an audio context or canvas, the app can skip those effects rather than relying on an external service.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: This approach avoids remote sound files and keeps effects optional. If the browser lacks an audio context or canvas, the app can skip those effects rather than relying on an external service.

### Line 270

```text

```

Blank line separates documentation topics.

### Line 271

```text
### 7.3 Coin Toss
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 272

```text

```

Blank line separates documentation topics.

### Line 273

```text
The coin-toss engine tracks the chosen side, current wager, and `isFlipping` flag. The busy flag disables actions while CSS animation runs and prevents a double click from charging the player twice. A completed virtual round calls the hub to deduct the wager or award the result.
```

This sentence teaches non-cash economy in the casino and gives the reader context for why the design behaves this way: The coin-toss engine tracks the chosen side, current wager, and `isFlipping` flag. The busy flag disables actions while CSS animation runs and prevents a double click from charging the player twice. A completed virtual round calls the hub t

### Line 274

```text

```

Blank line separates documentation topics.

### Line 275

```text
### 7.4 Blackjack
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 276

```text

```

Blank line separates documentation topics.

### Line 277

```text
Blackjack uses a finite set of game states: `BETTING`, `PLAYER_TURN`, `DEALER_TURN`, and `ENDED`. The state decides which controls are visible. A deck is shuffled with the Fisher–Yates algorithm: walk backward through an array, choose a random remaining position, and swap those two cards.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Blackjack uses a finite set of game states: `BETTING`, `PLAYER_TURN`, `DEALER_TURN`, and `ENDED`. The state decides which controls are visible. A deck is shuffled with the Fisher–Yates algorithm: walk backward through an array, choose a ran

### Line 278

```text

```

Blank line separates documentation topics.

### Line 279

```text
Aces are first counted as 11. If the total exceeds 21, the value is reduced by 10 for as many aces as needed, making each such ace count as 1. When the player stands, the dealer draws until reaching 17 or more. The engine settles wins, losses, pushes, and natural blackjack, then returns to betting for the next hand.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Aces are first counted as 11. If the total exceeds 21, the value is reduced by 10 for as many aces as needed, making each such ace count as 1. When the player stands, the dealer draws until reaching 17 or more. The engine settles wins, loss

### Line 280

```text

```

Blank line separates documentation topics.

### Line 281

```text
### 7.5 Daily bonus wheel
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 282

```text

```

Blank line separates documentation topics.

### Line 283

```text
The wheel is drawn with the Canvas 2D API. JavaScript chooses a prize, animates a rotation with `requestAnimationFrame`, and records the completion time. A 24-hour cooldown is computed from the saved timestamp. The wheel's prize list and displayed wheel use the same slice array, so the visual and the credited prize stay aligned.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: The wheel is drawn with the Canvas 2D API. JavaScript chooses a prize, animates a rotation with `requestAnimationFrame`, and records the completion time. A 24-hour cooldown is computed from the saved timestamp. The wheel's prize list and di

### Line 284

```text

```

Blank line separates documentation topics.

### Line 285

```text
### 7.6 Experience and levels
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 286

```text

```

Blank line separates documentation topics.

### Line 287

```text
`XPManager` awards experience from virtual wagers and loops through level-ups if a large award crosses more than one threshold. It updates the level badge and progress bar. Reaching milestones can grant virtual-chip bonuses. XP changes progression, not the casino's random draw or the race result.
```

This sentence teaches seeded local simulation, non-cash economy in the casino and gives the reader context for why the design behaves this way: `XPManager` awards experience from virtual wagers and loops through level-ups if a large award crosses more than one threshold. It updates the level badge and progress bar. Reaching milestones can grant virtual-chip bonuses. XP changes prog

### Line 288

```text

```

Blank line separates documentation topics.

### Line 289

```text
### 7.7 Local jackpot and bank
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 290

```text

```

Blank line separates documentation topics.

### Line 291

```text
The demo jackpot is stored under its own browser local-storage key and is shared by profiles within that browser origin. A browser `storage` event updates other tabs when that key changes. Slot wagers contribute a small fraction; a jackpot feature awards the current value and resets it. It is explicitly a local demo value, not a shared online prize pool.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: The demo jackpot is stored under its own browser local-storage key and is shared by profiles within that browser origin. A browser `storage` event updates other tabs when that key changes. Slot wagers contribute a small fraction; a jackpot 

### Line 292

```text

```

Blank line separates documentation topics.

### Line 293

```text
The bank modifies only virtual chips and a local debt field. A loan adds a stated flat fee to virtual debt; repayment is capped by debt and the current virtual balance. Neither action contacts a financial institution.
```

This sentence teaches non-cash economy in the casino and gives the reader context for why the design behaves this way: The bank modifies only virtual chips and a local debt field. A loan adds a stated flat fee to virtual debt; repayment is capped by debt and the current virtual balance. Neither action contacts a financial institution.

### Line 294

```text

```

Blank line separates documentation topics.

### Line 295

```text
## 8. Build reusable slot machines
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 296

```text

```

Blank line separates documentation topics.

### Line 297

```text
### 8.1 Catalog versus engine
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 298

```text

```

Blank line separates documentation topics.

### Line 299

```text
The slot project separates three ideas:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: The slot project separates three ideas:

### Line 300

```text

```

Blank line separates documentation topics.

### Line 301

```text
1. **Template** — the reusable HTML cabinet layout.
```

This numbered instruction gives an actionable build or verification step: **Template** — the reusable HTML cabinet layout.

### Line 302

```text
2. **Catalog entry** — one machine's ID, name, stake limits, selected template, and theme.
```

This numbered instruction gives an actionable build or verification step: **Catalog entry** — one machine's ID, name, stake limits, selected template, and theme.

### Line 303

```text
3. **Engine** — the shared rules for a three-reel or five-reel machine.
```

This numbered instruction gives an actionable build or verification step: **Engine** — the shared rules for a three-reel or five-reel machine.

### Line 304

```text

```

Blank line separates documentation topics.

### Line 305

```text
This separation is why adding a color theme does not require copying the animation, bet handling, or payout code.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: This separation is why adding a color theme does not require copying the animation, bet handling, or payout code.

### Line 306

```text

```

Blank line separates documentation topics.

### Line 307

```text
`src/js/slot-templates.js` contains a `themes` object and a `games` array. When it loads, `render()` finds `.slot-room-grid`, creates a card for every catalog entry, clones the matching HTML template, fills title/stake/status labels, applies CSS variables, and appends the game view to `#app-container`.
```

This sentence teaches reusable HTML, data-driven machine registration in the casino and gives the reader context for why the design behaves this way: `src/js/slot-templates.js` contains a `themes` object and a `games` array. When it loads, `render()` finds `.slot-room-grid`, creates a card for every catalog entry, clones the matching HTML template, fills title/stake/status labels, applie

### Line 308

```text

```

Blank line separates documentation topics.

### Line 309

```text
The generated view receives an ID such as `view-penny-slots` and `data-game-view="penny-slots"`. The main controller uses those identifiers to find the right view when the card is clicked. Because `slot-templates.js` is deferred before `app.js`, the cards and views exist when the controller binds buttons.
```

This sentence teaches reusable HTML in the casino and gives the reader context for why the design behaves this way: The generated view receives an ID such as `view-penny-slots` and `data-game-view="penny-slots"`. The main controller uses those identifiers to find the right view when the card is clicked. Because `slot-templates.js` is deferred before `app

### Line 310

```text

```

Blank line separates documentation topics.

### Line 311

```text
### 8.2 Three-reel game loop
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 312

```text

```

Blank line separates documentation topics.

### Line 313

```text
The classic engine:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: The classic engine:

### Line 314

```text

```

Blank line separates documentation topics.

### Line 315

```text
1. Finds its controls by `data-slot-*` attributes.
```

This numbered instruction gives an actionable build or verification step: Finds its controls by `data-slot-*` attributes.

### Line 316

```text
2. Checks the legal maximum wager against wallet balance and player limit.
```

This numbered instruction gives an actionable build or verification step: Checks the legal maximum wager against wallet balance and player limit.

### Line 317

```text
3. Deducts the wager once and awards XP/contributes to the demo jackpot.
```

This numbered instruction gives an actionable build or verification step: Deducts the wager once and awards XP/contributes to the demo jackpot.

### Line 318

```text
4. Chooses a final symbol grid using weighted random symbol selection.
```

This numbered instruction gives an actionable build or verification step: Chooses a final symbol grid using weighted random symbol selection.

### Line 319

```text
5. Builds a longer strip with random symbols and the final results at the end.
```

This numbered instruction gives an actionable build or verification step: Builds a longer strip with random symbols and the final results at the end.

### Line 320

```text
6. Animates each reel to its result; later reels stop after a longer duration to create a staggered effect.
```

This numbered instruction gives an actionable build or verification step: Animates each reel to its result; later reels stop after a longer duration to create a staggered effect.

### Line 321

```text
7. Evaluates each configured payline, substitutes wild symbols, highlights wins, and adds the payout to the wallet.
```

This numbered instruction gives an actionable build or verification step: Evaluates each configured payline, substitutes wild symbols, highlights wins, and adds the payout to the wallet.

### Line 322

```text
8. Re-enables controls and displays a result message.
```

This numbered instruction gives an actionable build or verification step: Re-enables controls and displays a result message.

### Line 323

```text

```

Blank line separates documentation topics.

### Line 324

```text
The final result is chosen before the animation. The moving strip is presentation; it does not decide the outcome after a wager has been charged. That separation is easier to reason about and keeps the screen in sync with the payout.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: The final result is chosen before the animation. The moving strip is presentation; it does not decide the outcome after a wager has been charged. That separation is easier to reason about and keeps the screen in sync with the payout.

### Line 325

```text

```

Blank line separates documentation topics.

### Line 326

```text
### 8.3 Five-reel bonus features
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 327

```text

```

Blank line separates documentation topics.

### Line 328

```text
The five-reel engine uses five columns and three visible rows. A payline is a list of `[reel, row]` positions; a win evaluator reads the symbol in each position. The `SYMBOLS` list contains each symbol's weight and payout multiplier. A lower weight means a symbol is less likely to be selected by the weighted chooser.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: The five-reel engine uses five columns and three visible rows. A payline is a list of `[reel, row]` positions; a win evaluator reads the symbol in each position. The `SYMBOLS` list contains each symbol's weight and payout multiplier. A lowe

### Line 329

```text

```

Blank line separates documentation topics.

### Line 330

```text
This table also keeps `freeSpinsRemaining`, cumulative bonus winnings, and a 5-by-3 sticky-wild grid. Scatter symbols can trigger bonus spins, and wilds that land in appropriate positions can be retained during the bonus sequence. While free spins remain, wager buttons are disabled and the bonus status is shown. The free-spin sequence uses the wager of the paid spin that started the bonus.
```

This sentence teaches bonus durability in the casino and gives the reader context for why the design behaves this way: This table also keeps `freeSpinsRemaining`, cumulative bonus winnings, and a 5-by-3 sticky-wild grid. Scatter symbols can trigger bonus spins, and wilds that land in appropriate positions can be retained during the bonus sequence. While fre

### Line 331

```text

```

Blank line separates documentation topics.

### Line 332

```text
To protect yourself from accidental feature changes, add a test or manually verify the trigger, counter, retained wilds, payout, and transition back to paid spins whenever you edit the bonus rules.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: To protect yourself from accidental feature changes, add a test or manually verify the trigger, counter, retained wilds, payout, and transition back to paid spins whenever you edit the bonus rules.

### Line 333

```text

```

Blank line separates documentation topics.

### Line 334

```text
## 9. Add another themed slot table
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 335

```text

```

Blank line separates documentation topics.

### Line 336

```text
The current themed tables demonstrate the extension pattern. To add another catalog-driven machine:
```

This sentence teaches data-driven machine registration in the casino and gives the reader context for why the design behaves this way: The current themed tables demonstrate the extension pattern. To add another catalog-driven machine:

### Line 337

```text

```

Blank line separates documentation topics.

### Line 338

```text
1. Choose `classic` or `five-reel`. Reuse a template and engine before deciding a new engine is necessary.
```

This numbered instruction gives an actionable build or verification step: Choose `classic` or `five-reel`. Reuse a template and engine before deciding a new engine is necessary.

### Line 339

```text
2. Add a theme object in `src/js/slot-templates.js`. Supply an unused key, a display label, a card icon, colors for the cabinet/reels/symbols/buttons, optional symbol replacements, and sound preset names already supported by `FXEngine`.
```

This numbered instruction gives an actionable build or verification step: Add a theme object in `src/js/slot-templates.js`. Supply an unused key, a display label, a card icon, colors for the cabinet/reels/symbols/buttons, optional symbol replacements, and sound preset names already supported b

### Line 340

```text
3. Add a record to the `games` array. Give it a unique `id`, set `engine` to exactly `classic` or `five-reel`, reference the matching `templateId`, add a title and description, select the `themeId`, and provide `minimumBet`, `betStep`, `maximumBet`, and `startingBet`.
```

This numbered instruction gives an actionable build or verification step: Add a record to the `games` array. Give it a unique `id`, set `engine` to exactly `classic` or `five-reel`, reference the matching `templateId`, add a title and description, select the `themeId`, and provide `minimumBet`

### Line 341

```text
4. Keep the `stakes` string consistent with the numeric values. It is visible on the lobby card and inside the machine.
```

This numbered instruction gives an actionable build or verification step: Keep the `stakes` string consistent with the numeric values. It is visible on the lobby card and inside the machine.

### Line 342

```text
5. Use unique IDs. The ID becomes part of the view ID and is used to navigate to that table.
```

This numbered instruction gives an actionable build or verification step: Use unique IDs. The ID becomes part of the view ID and is used to navigate to that table.

### Line 343

```text
6. If a theme uses an image, put it in `assets/`, give it appropriate alternative text, and remember that URL paths are resolved relative to the page unless your code makes an explicit base URL.
```

This numbered instruction gives an actionable build or verification step: If a theme uses an image, put it in `assets/`, give it appropriate alternative text, and remember that URL paths are resolved relative to the page unless your code makes an explicit base URL.

### Line 344

```text
7. Run the tests, then load the local site and verify the new card appears **inside Slot Room**, its play button opens the correct view, its stake controls stop at the right values, and its payouts update the shared balance.
```

This numbered instruction gives an actionable build or verification step: Run the tests, then load the local site and verify the new card appears **inside Slot Room**, its play button opens the correct view, its stake controls stop at the right values, and its payouts update the shared balance

### Line 345

```text

```

Blank line separates documentation topics.

### Line 346

```text
The catalog's renderer targets `.slot-room-grid`; changing that selector back to `.game-grid` would break the room grouping. Keep the static original cards in `index.html` and generated themed cards in the catalog.
```

This sentence teaches data-driven machine registration in the casino and gives the reader context for why the design behaves this way: The catalog's renderer targets `.slot-room-grid`; changing that selector back to `.game-grid` would break the room grouping. Keep the static original cards in `index.html` and generated themed cards in the catalog.

### Line 347

```text

```

Blank line separates documentation topics.

### Line 348

```text
## 10. Keep player progress local
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 349

```text

```

Blank line separates documentation topics.

### Line 350

```text
### 10.1 Browser storage concepts
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 351

```text

```

Blank line separates documentation topics.

### Line 352

```text
`localStorage` is a small key/value store scoped to the browser profile and website origin. A value is text, so the app serializes plain objects with `JSON.stringify()` and reads them back with `JSON.parse()`. It persists after a tab closes, but it does not automatically sync to a different browser or computer.
```

This sentence teaches origin-scoped browser persistence in the casino and gives the reader context for why the design behaves this way: `localStorage` is a small key/value store scoped to the browser profile and website origin. A value is text, so the app serializes plain objects with `JSON.stringify()` and reads them back with `JSON.parse()`. It persists after a tab closes

### Line 353

```text

```

Blank line separates documentation topics.

### Line 354

```text
S&S Casino Hub uses browser local storage for the encrypted profile database and the shared demo jackpot. `IndexedDB` is used to remember a file handle for optional linked-save support, because file handles are structured objects rather than plain text.
```

This sentence teaches file-handle persistence in the casino and gives the reader context for why the design behaves this way: S&S Casino Hub uses browser local storage for the encrypted profile database and the shared demo jackpot. `IndexedDB` is used to remember a file handle for optional linked-save support, because file handles are structured objects rather tha

### Line 355

```text

```

Blank line separates documentation topics.

### Line 356

```text
### 10.2 Password-protected profiles
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 357

```text

```

Blank line separates documentation topics.

### Line 358

```text
`src/js/profiles.js` owns profile creation, unlock, encryption, and save updates. At a beginner level, the flow is:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: `src/js/profiles.js` owns profile creation, unlock, encryption, and save updates. At a beginner level, the flow is:

### Line 359

```text

```

Blank line separates documentation topics.

### Line 360

```text
1. Create a random per-profile salt.
```

This numbered instruction gives an actionable build or verification step: Create a random per-profile salt.

### Line 361

```text
2. Convert the password to bytes and derive a key with PBKDF2 and SHA-256.
```

This numbered instruction gives an actionable build or verification step: Convert the password to bytes and derive a key with PBKDF2 and SHA-256.

### Line 362

```text
3. Encrypt the normalized profile save with AES-GCM and a fresh random initialization vector.
```

This numbered instruction gives an actionable build or verification step: Encrypt the normalized profile save with AES-GCM and a fresh random initialization vector.

### Line 363

```text
4. Store the profile name/ID, salt, IV, and ciphertext in browser local storage.
```

This numbered instruction gives an actionable build or verification step: Store the profile name/ID, salt, IV, and ciphertext in browser local storage.

### Line 364

```text
5. When unlocking, derive a key from the entered password and saved salt, then ask AES-GCM to authenticate and decrypt the ciphertext.
```

This numbered instruction gives an actionable build or verification step: When unlocking, derive a key from the entered password and saved salt, then ask AES-GCM to authenticate and decrypt the ciphertext.

### Line 365

```text

```

Blank line separates documentation topics.

### Line 366

```text
AES-GCM both encrypts the content and detects unauthorized changes. The profile ID and name are included as additional authenticated data so a ciphertext cannot be silently moved to a different profile identity. The code validates the database and normalizes values when they are loaded.
```

This sentence teaches authenticated local encryption in the casino and gives the reader context for why the design behaves this way: AES-GCM both encrypts the content and detects unauthorized changes. The profile ID and name are included as additional authenticated data so a ciphertext cannot be silently moved to a different profile identity. The code validates the datab

### Line 367

```text

```

Blank line separates documentation topics.

### Line 368

```text
This design is for local-at-rest privacy, not an identity system or an online account. A person who controls the browser while a profile is unlocked can use the app. If the password is forgotten, the profile cannot be decrypted. The Web Crypto API requires HTTPS or a browser-recognized secure context; `localhost` is recognized for development. Do not open the page with `file://` and expect encrypted profile setup to work.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: This design is for local-at-rest privacy, not an identity system or an online account. A person who controls the browser while a profile is unlocked can use the app. If the password is forgotten, the profile cannot be decrypted. The Web Cry

### Line 369

```text

```

Blank line separates documentation topics.

### Line 370

```text
### 10.3 Migrations and compatibility
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 371

```text

```

Blank line separates documentation topics.

### Line 372

```text
The profile manager reads older local-save fields, normalizes them, then migrates them into the first encrypted profile. It removes old legacy keys only after creating the new profile. Normalization preserves a valid existing balance and applies defaults only where a field is absent or invalid. Race tickets also carry compatibility fields so previously saved event results can still be reconstructed.
```

This sentence teaches seeded local simulation in the casino and gives the reader context for why the design behaves this way: The profile manager reads older local-save fields, normalizes them, then migrates them into the first encrypted profile. It removes old legacy keys only after creating the new profile. Normalization preserves a valid existing balance and ap

### Line 373

```text

```

Blank line separates documentation topics.

### Line 374

```text
Changing a storage key, record shape, or algorithm is a data-format change. Before doing so, decide how existing saves will migrate. Do not simply delete old keys or replace them with defaults; that can destroy progress.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Changing a storage key, record shape, or algorithm is a data-format change. Before doing so, decide how existing saves will migrate. Do not simply delete old keys or replace them with defaults; that can destroy progress.

### Line 375

```text

```

Blank line separates documentation topics.

### Line 376

```text
### 10.4 Export, import, and linked files
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 377

```text

```

Blank line separates documentation topics.

### Line 378

```text
`src/js/local-save.js` builds a versioned JSON backup containing the player's game state, preferences, and jackpot. It does not include profile passwords or encryption keys. The JSON backup is **not encrypted**, even though the normal browser profile database is.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: `src/js/local-save.js` builds a versioned JSON backup containing the player's game state, preferences, and jackpot. It does not include profile passwords or encryption keys. The JSON backup is **not encrypted**, even though the normal brows

### Line 379

```text

```

Blank line separates documentation topics.

### Line 380

```text
The browser File System Access API can link a user-selected JSON file on supported desktop browsers. The app writes sequentially through a promise queue so rapid games events do not save out of order. A browser permission may have to be granted again. If linking is unsupported, the player can still download and import backups.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: The browser File System Access API can link a user-selected JSON file on supported desktop browsers. The app writes sequentially through a promise queue so rapid games events do not save out of order. A browser permission may have to be gra

### Line 381

```text

```

Blank line separates documentation topics.

### Line 382

```text
Import is validated before it changes live state and asks before replacing the active progress. This is important because a valid backup can still be the wrong backup for the currently open profile.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Import is validated before it changes live state and asks before replacing the active progress. This is important because a valid backup can still be the wrong backup for the currently open profile.

### Line 383

```text

```

Blank line separates documentation topics.

### Line 384

```text
See [Local saves and profiles](local-saves.md) for the complete user-facing details and limitations.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: See [Local saves and profiles](../../original/docs/local-saves.md) for the complete user-facing details and limitations.

### Line 385

```text

```

Blank line separates documentation topics.

### Line 386

```text
## 11. Simulate horse and car races locally
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 387

```text

```

Blank line separates documentation topics.

### Line 388

```text
The race engine is in `src/js/race-engine.js` and does not call a sports feed or server. It uses the device's local calendar:
```

This sentence teaches seeded local simulation in the casino and gives the reader context for why the design behaves this way: The race engine is in `src/js/race-engine.js` and does not call a sports feed or server. It uses the device's local calendar:

### Line 389

```text

```

Blank line separates documentation topics.

### Line 390

```text
- Race start times are each hour from 7 AM through 9 PM.
```

This bullet gives a concrete project responsibility or rule: Race start times are each hour from 7 AM through 9 PM.

### Line 391

```text
- Horse events begin at 7 AM and occupy every other hourly slot.
```

This bullet gives a concrete project responsibility or rule: Horse events begin at 7 AM and occupy every other hourly slot.

### Line 392

```text
- Car events begin at 8 AM and occupy the alternating slots.
```

This bullet gives a concrete project responsibility or rule: Car events begin at 8 AM and occupy the alternating slots.

### Line 393

```text
- Previews and betting open 45 minutes before a start; betting closes five minutes before.
```

This bullet gives a concrete project responsibility or rule: Previews and betting open 45 minutes before a start; betting closes five minutes before.

### Line 394

```text
- No new events are scheduled overnight.
```

This bullet gives a concrete project responsibility or rule: No new events are scheduled overnight.

### Line 395

```text
- Horse fields have six entrants and car fields eight.
```

This bullet gives a concrete project responsibility or rule: Horse fields have six entrants and car fields eight.

### Line 396

```text

```

Blank line separates documentation topics.

### Line 397

```text
A **seed** is a repeatable starting number used by a pseudo-random generator. The event time, circuit, and random-stream value form the seed. Rebuilding the same event therefore returns the same entrants, duration, odds, and winner. The generator is chosen for reproducibility, not for security or real-money fairness.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: A **seed** is a repeatable starting number used by a pseudo-random generator. The event time, circuit, and random-stream value form the seed. Rebuilding the same event therefore returns the same entrants, duration, odds, and winner. The gen

### Line 398

```text

```

Blank line separates documentation topics.

### Line 399

```text
Each runner has stable identity, plus saved starts and wins. Experience/form changes ability and advertised chances in later generated events. The winning runner's finish factor is adjusted so the on-screen animation agrees with the seeded winner.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Each runner has stable identity, plus saved starts and wins. Experience/form changes ability and advertised chances in later generated events. The winning runner's finish factor is adjusted so the on-screen animation agrees with the seeded 

### Line 400

```text

```

Blank line separates documentation topics.

### Line 401

```text
When a player places a bet, the profile saves the event ID, circuit type, runner ID, winner ID, stake, odds, and duration. The stake is deducted then. On a later browser visit, the engine reconstructs that event and settles the ticket from its saved result. It also processes completed events missed while the browser was closed so runner experience can advance. One open ticket is allowed across both circuits.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: When a player places a bet, the profile saves the event ID, circuit type, runner ID, winner ID, stake, odds, and duration. The stake is deducted then. On a later browser visit, the engine reconstructs that event and settles the ticket from 

### Line 402

```text

```

Blank line separates documentation topics.

### Line 403

```text
The project keeps a legacy race generator for old ticket formats. It is not the current race schedule; it exists so an older saved bet can be settled using its original deterministic result. Removing it without migrating old tickets could change or invalidate saved outcomes.
```

This sentence teaches seeded local simulation in the casino and gives the reader context for why the design behaves this way: The project keeps a legacy race generator for old ticket formats. It is not the current race schedule; it exists so an older saved bet can be settled using its original deterministic result. Removing it without migrating old tickets could c

### Line 404

```text

```

Blank line separates documentation topics.

### Line 405

```text
## 12. Write automated tests
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 406

```text

```

Blank line separates documentation topics.

### Line 407

```text
Node includes a basic test runner. A test file imports the module or reads it into a lightweight VM environment, calls a behavior, and makes assertions about the expected result.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Node includes a basic test runner. A test file imports the module or reads it into a lightweight VM environment, calls a behavior, and makes assertions about the expected result.

### Line 408

```text

```

Blank line separates documentation topics.

### Line 409

```text
Run all tests from the repository root:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Run all tests from the repository root:

### Line 410

```text

```

Blank line separates documentation topics.

### Line 411

```text
```sh
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 412

```text
node --test tests/*.test.js
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: node --test tests/*.test.js

### Line 413

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 414

```text

```

Blank line separates documentation topics.

### Line 415

```text
The suites cover:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: The suites cover:

### Line 416

```text

```

Blank line separates documentation topics.

### Line 417

```text
- `tests/models.test.js`: the default $100 profile and preservation of a valid saved balance.
```

This bullet gives a concrete project responsibility or rule: `tests/models.test.js`: the default $100 profile and preservation of a valid saved balance.

### Line 418

```text
- `tests/profiles.test.js`: defaulting and normalization of horse/car experience, tickets, and invalid runner records.
```

This bullet gives a concrete project responsibility or rule: `tests/profiles.test.js`: defaulting and normalization of horse/car experience, tickets, and invalid runner records.

### Line 419

```text
- `tests/race-engine.test.js`: deterministic fields, odds, schedule timing, overnight closure, UI betting guards, experience changes, catch-up processing, and old tickets.
```

This bullet gives a concrete project responsibility or rule: `tests/race-engine.test.js`: deterministic fields, odds, schedule timing, overnight closure, UI betting guards, experience changes, catch-up processing, and old tickets.

### Line 420

```text
- `tests/slot-bet-rules.test.js`: penny/quarter increments, affordability, maximums, and two-decimal formatting.
```

This bullet gives a concrete project responsibility or rule: `tests/slot-bet-rules.test.js`: penny/quarter increments, affordability, maximums, and two-decimal formatting.

### Line 421

```text
- `tests/slot-room.test.js`: room markup, the original slot-card placement, the dynamic catalog target, and valid local HTML asset paths.
```

This bullet gives a concrete project responsibility or rule: `tests/slot-room.test.js`: room markup, the original slot-card placement, the dynamic catalog target, and valid local HTML asset paths.

### Line 422

```text

```

Blank line separates documentation topics.

### Line 423

```text
A VM (virtual machine) test context is a small isolated JavaScript environment. These tests use it to load browser-oriented classes without creating a real browser or touching someone's actual profile. A DOM mock is not a substitute for manual browser testing, but it allows logic to be checked quickly and repeatedly.
```

This sentence teaches non-cash economy in the casino and gives the reader context for why the design behaves this way: A VM (virtual machine) test context is a small isolated JavaScript environment. These tests use it to load browser-oriented classes without creating a real browser or touching someone's actual profile. A DOM mock is not a substitute for man

### Line 424

```text

```

Blank line separates documentation topics.

### Line 425

```text
When changing rules, add a test for the new rule and at least one boundary. For example, when changing a 25-cent step, test both the maximum legal amount and the next amount beyond it.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: When changing rules, add a test for the new rule and at least one boundary. For example, when changing a 25-cent step, test both the maximum legal amount and the next amount beyond it.

### Line 426

```text

```

Blank line separates documentation topics.

### Line 427

```text
## 13. Run a manual browser check
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 428

```text

```

Blank line separates documentation topics.

### Line 429

```text
Start a local server from the repository root:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Start a local server from the repository root:

### Line 430

```text

```

Blank line separates documentation topics.

### Line 431

```text
```sh
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 432

```text
python3 -m http.server 8000 --bind 127.0.0.1
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: python3 -m http.server 8000 --bind 127.0.0.1

### Line 433

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 434

```text

```

Blank line separates documentation topics.

### Line 435

```text
On Windows, try `py -m http.server 8000 --bind 127.0.0.1`. Open <http://localhost:8000/>. Keep the server terminal open while using the site; stop it with `Ctrl+C` when finished.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: On Windows, try `py -m http.server 8000 --bind 127.0.0.1`. Open <http://localhost:8000/>. Keep the server terminal open while using the site; stop it with `Ctrl+C` when finished.

### Line 436

```text

```

Blank line separates documentation topics.

### Line 437

```text
Verify at least these paths:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Verify at least these paths:

### Line 438

```text

```

Blank line separates documentation topics.

### Line 439

```text
1. **First profile:** create a profile, close the tab, reopen the local URL, and unlock it.
```

This numbered instruction gives an actionable build or verification step: **First profile:** create a profile, close the tab, reopen the local URL, and unlock it.

### Line 440

```text
2. **Balance preservation:** play a harmless virtual round or use an existing local profile, reload, and confirm the balance remains.
```

This numbered instruction gives an actionable build or verification step: **Balance preservation:** play a harmless virtual round or use an existing local profile, reload, and confirm the balance remains.

### Line 441

```text
3. **Slot Room:** confirm all five slot cards are together and the non-slot cards remain outside that section.
```

This numbered instruction gives an actionable build or verification step: **Slot Room:** confirm all five slot cards are together and the non-slot cards remain outside that section.

### Line 442

```text
4. **Machine navigation:** open each slot table and return to the lobby. Confirm titles, theme colors, and stake labels match.
```

This numbered instruction gives an actionable build or verification step: **Machine navigation:** open each slot table and return to the lobby. Confirm titles, theme colors, and stake labels match.

### Line 443

```text
5. **Wager boundaries:** increase/decrease a penny and quarter wager; confirm limits and increments are correct.
```

This numbered instruction gives an actionable build or verification step: **Wager boundaries:** increase/decrease a penny and quarter wager; confirm limits and increments are correct.

### Line 444

```text
6. **Bonus features:** test free spins/sticky wilds if a bonus is triggered; confirm the wager is not charged again for each free spin.
```

This numbered instruction gives an actionable build or verification step: **Bonus features:** test free spins/sticky wilds if a bonus is triggered; confirm the wager is not charged again for each free spin.

### Line 445

```text
7. **Other games:** test a Coin Toss result and a short Blackjack hand; confirm the balance updates once per round.
```

This numbered instruction gives an actionable build or verification step: **Other games:** test a Coin Toss result and a short Blackjack hand; confirm the balance updates once per round.

### Line 446

```text
8. **Daily wheel:** check the cooldown label after a completed spin.
```

This numbered instruction gives an actionable build or verification step: **Daily wheel:** check the cooldown label after a completed spin.

### Line 447

```text
9. **Race screen:** inspect the next event, its countdown, and the betting cutoff. When racing is closed, confirm upcoming runner details are hidden and controls are disabled.
```

This numbered instruction gives an actionable build or verification step: **Race screen:** inspect the next event, its countdown, and the betting cutoff. When racing is closed, confirm upcoming runner details are hidden and controls are disabled.

### Line 448

```text
10. **Save backup:** export a backup and inspect that it is JSON. Remember it is not encrypted. Import only a backup you intend to use, because import replaces active game state after confirmation.
```

This numbered instruction gives an actionable build or verification step: **Save backup:** export a backup and inspect that it is JSON. Remember it is not encrypted. Import only a backup you intend to use, because import replaces active game state after confirmation.

### Line 449

```text
11. **Responsive screen:** reduce the browser width and verify room cards, header controls, and game controls fit without horizontal scrolling.
```

This numbered instruction gives an actionable build or verification step: **Responsive screen:** reduce the browser width and verify room cards, header controls, and game controls fit without horizontal scrolling.

### Line 450

```text
12. **Console/network:** inspect developer tools for JavaScript errors or failed local asset requests. Since this is static and local-only, the app should not require a casino API or remote save service.
```

This numbered instruction gives an actionable build or verification step: **Console/network:** inspect developer tools for JavaScript errors or failed local asset requests. Since this is static and local-only, the app should not require a casino API or remote save service.

### Line 451

```text

```

Blank line separates documentation topics.

### Line 452

```text
Use a throwaway local browser profile if you need to test profile creation and recovery. Browser site data is persistent. Do not clear the user's real browser storage just to test a code change.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Use a throwaway local browser profile if you need to test profile creation and recovery. Browser site data is persistent. Do not clear the user's real browser storage just to test a code change.

### Line 453

```text

```

Blank line separates documentation topics.

### Line 454

```text
## 14. Keep the HTML and static paths deployable
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 455

```text

```

Blank line separates documentation topics.

### Line 456

```text
A static host serves the directory as files. Since the page is at the repository root, a reference such as `src/js/app.js` means “the `src/js/app.js` file below this page's directory.” The stylesheet, script tags, and splash image all use relative paths.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: A static host serves the directory as files. Since the page is at the repository root, a reference such as `src/js/app.js` means “the `src/js/app.js` file below this page's directory.” The stylesheet, script tags, and splash image all use r

### Line 457

```text

```

Blank line separates documentation topics.

### Line 458

```text
When moving a file, update every link that points to it. Search before and after the move:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: When moving a file, update every link that points to it. Search before and after the move:

### Line 459

```text

```

Blank line separates documentation topics.

### Line 460

```text
```sh
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 461

```text
rg -n 'src=|href=|LOCAL_SAVES|require\(' index.html README.md docs src tests
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: rg -n 'src=|href=|LOCAL_SAVES|require\(' index.html README.md docs src tests

### Line 462

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 463

```text

```

Blank line separates documentation topics.

### Line 464

```text
Do not move `index.html` into `src/` unless you also change the host's document-root configuration. GitHub Pages commonly serves the root `index.html` automatically.
```

This sentence teaches static deployment in the casino and gives the reader context for why the design behaves this way: Do not move `index.html` into `src/` unless you also change the host's document-root configuration. GitHub Pages commonly serves the root `index.html` automatically.

### Line 465

```text

```

Blank line separates documentation topics.

### Line 466

```text
The current project has no bundler, so every JavaScript file requested by `index.html` is downloaded separately. That makes script order visible and simple; the trade-off is that adding many files means adding script tags and keeping their order correct.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: The current project has no bundler, so every JavaScript file requested by `index.html` is downloaded separately. That makes script order visible and simple; the trade-off is that adding many files means adding script tags and keeping their 

### Line 467

```text

```

Blank line separates documentation topics.

### Line 468

```text
## 15. Change and publish carefully
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 469

```text

```

Blank line separates documentation topics.

### Line 470

```text
Before committing, check what changed and run tests:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Before committing, check what changed and run tests:

### Line 471

```text

```

Blank line separates documentation topics.

### Line 472

```text
```sh
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 473

```text
git status --short --branch
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: git status --short --branch

### Line 474

```text
git diff --check
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: git diff --check

### Line 475

```text
node --test tests/*.test.js
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: node --test tests/*.test.js

### Line 476

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 477

```text

```

Blank line separates documentation topics.

### Line 478

```text
Then review the actual diff, especially HTML paths, profile storage, and any code that could reset user progress. A local change does not reach GitHub Pages until it is published through the project's configured branch or deployment workflow. The project owner asked that current changes not be pushed until specifically allowed; keep this work local until that permission changes.
```

This sentence teaches static deployment in the casino and gives the reader context for why the design behaves this way: Then review the actual diff, especially HTML paths, profile storage, and any code that could reset user progress. A local change does not reach GitHub Pages until it is published through the project's configured branch or deployment workflo

### Line 479

```text

```

Blank line separates documentation topics.

### Line 480

```text
If deployment is later approved, first check which branch/source GitHub Pages is configured to publish. Developing on `dev` does not automatically mean the site is served from `dev`. Do not assume that a push to the development branch deploys the production site.
```

This sentence teaches static deployment in the casino and gives the reader context for why the design behaves this way: If deployment is later approved, first check which branch/source GitHub Pages is configured to publish. Developing on `dev` does not automatically mean the site is served from `dev`. Do not assume that a push to the development branch deplo

### Line 481

```text

```

Blank line separates documentation topics.

### Line 482

```text
## 16. Beginner glossary
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 483

```text

```

Blank line separates documentation topics.

### Line 484

```text
| Term | Meaning in this project |
```

This glossary/table row maps a technical term to its concrete meaning in this browser casino.

### Line 485

```text
|---|---|
```

This glossary/table row maps a technical term to its concrete meaning in this browser casino.

### Line 486

```text
| Browser origin | The combination of scheme, host, and port. Local storage on `http://localhost:8000` differs from storage on the hosted site. |
```

This glossary/table row maps a technical term to its concrete meaning in this browser casino.

### Line 487

```text
| Catalog | Data that describes available themed machines without containing their spin algorithms. |
```

This glossary/table row maps a technical term to its concrete meaning in this browser casino.

### Line 488

```text
| DOM | The browser's in-memory representation of the HTML page; JavaScript queries and updates it. |
```

This glossary/table row maps a technical term to its concrete meaning in this browser casino.

### Line 489

```text
| Engine | The code that runs a game round, such as the slot or race engine. |
```

This glossary/table row maps a technical term to its concrete meaning in this browser casino.

### Line 490

```text
| Event listener | A function the browser calls when something happens, commonly a button click. |
```

This glossary/table row maps a technical term to its concrete meaning in this browser casino.

### Line 491

```text
| Integer cents | Dollars represented as an integer number of cents, such as `$1.25` becoming `125`, for predictable arithmetic. |
```

This glossary/table row maps a technical term to its concrete meaning in this browser casino.

### Line 492

```text
| Local storage | Persistent origin-scoped string key/value storage provided by the browser. |
```

This glossary/table row maps a technical term to its concrete meaning in this browser casino.

### Line 493

```text
| Normalization | Checking input fields and converting them into safe, expected formats before the app uses them. |
```

This glossary/table row maps a technical term to its concrete meaning in this browser casino.

### Line 494

```text
| Seeded pseudo-random generator | A repeatable random-like sequence derived from a known starting value. |
```

This glossary/table row maps a technical term to its concrete meaning in this browser casino.

### Line 495

```text
| Template | Inert HTML that JavaScript clones to create a reusable machine view. |
```

This glossary/table row maps a technical term to its concrete meaning in this browser casino.

### Line 496

```text
| Virtual machine (VM) test | A separate JavaScript context used by tests to load code without a full browser. |
```

This glossary/table row maps a technical term to its concrete meaning in this browser casino.

### Line 497

```text
| Web Crypto | The browser API used for secure password derivation and AES-GCM encryption. |
```

This glossary/table row maps a technical term to its concrete meaning in this browser casino.

### Line 498

```text

```

Blank line separates documentation topics.

### Line 499

```text
## 17. Final design principles
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 500

```text

```

Blank line separates documentation topics.

### Line 501

```text
When extending the project, follow these rules:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: When extending the project, follow these rules:

### Line 502

```text

```

Blank line separates documentation topics.

### Line 503

```text
1. Keep the project static unless a real requirement justifies adding a backend.
```

This numbered instruction gives an actionable build or verification step: Keep the project static unless a real requirement justifies adding a backend.

### Line 504

```text
2. Keep every slot card in `.slot-room-grid` and every game key unique.
```

This numbered instruction gives an actionable build or verification step: Keep every slot card in `.slot-room-grid` and every game key unique.

### Line 505

```text
3. Reuse templates and engines when only the theme or stake configuration changes.
```

This numbered instruction gives an actionable build or verification step: Reuse templates and engines when only the theme or stake configuration changes.

### Line 506

```text
4. Calculate wagers in integer cents and normalize imported values.
```

This numbered instruction gives an actionable build or verification step: Calculate wagers in integer cents and normalize imported values.

### Line 507

```text
5. Preserve valid existing saves; never replace them with defaults during a code reorganization.
```

This numbered instruction gives an actionable build or verification step: Preserve valid existing saves; never replace them with defaults during a code reorganization.

### Line 508

```text
6. Keep the profile password and encryption key out of backups and logs.
```

This numbered instruction gives an actionable build or verification step: Keep the profile password and encryption key out of backups and logs.

### Line 509

```text
7. Explain compatibility-sensitive code, especially save migrations and legacy race tickets.
```

This numbered instruction gives an actionable build or verification step: Explain compatibility-sensitive code, especially save migrations and legacy race tickets.

### Line 510

```text
8. Test both code rules and the browser experience.
```

This numbered instruction gives an actionable build or verification step: Test both code rules and the browser experience.

### Line 511

```text
9. Make no claim that locally simulated races or jackpot values are live or shared online.
```

This numbered instruction gives an actionable build or verification step: Make no claim that locally simulated races or jackpot values are live or shared online.

### Line 512

```text
10. Confirm the deployment source branch before publishing static files.
```

This numbered instruction gives an actionable build or verification step: Confirm the deployment source branch before publishing static files.
