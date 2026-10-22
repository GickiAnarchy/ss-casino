# src/css/style.css

[Exact copy](../../../original/src/css/style.css)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
/* Theme tokens centralize repeated colors and reel sizes so palette changes do not rewrite every component. */
```

Comment: Theme tokens centralize repeated colors and reel sizes so palette changes do not rewrite every component..

### Line 2

```text
:root {
```

Selects :root; the declarations inside control its matching elements.

### Line 3

```text
  --gold-primary: #ffd700;
```

Sets --gold-primary: #ffd700 (sets --gold-primary).

### Line 4

```text
  --gold-dark: #b8860b;
```

Sets --gold-dark: #b8860b (sets --gold-dark).

### Line 5

```text
  --bg-primary: radial-gradient(circle, #4a0d66 0%, #0f081d 100%);
```

Sets --bg-primary: radial-gradient(circle, #4a0d66 0%, #0f081d 100%) (sets --bg-primary).

### Line 6

```text
  --panel-bg: #1e1e24;
```

Sets --panel-bg: #1e1e24 (sets --panel-bg).

### Line 7

```text
  --header-bg: #0a0514;
```

Sets --header-bg: #0a0514 (sets --header-bg).

### Line 8

```text
  --symbol-size-3reel: 90px;
```

Sets --symbol-size-3reel: 90px (sets --symbol-size-3reel).

### Line 9

```text
  --symbol-size-5reel: 70px;
```

Sets --symbol-size-5reel: 70px (sets --symbol-size-5reel).

### Line 10

```text
  --spin-duration: 1200ms;
```

Sets --spin-duration: 1200ms (sets --spin-duration).

### Line 11

```text
  --spin-target-y: 0px;
```

Sets --spin-target-y: 0px (sets --spin-target-y).

### Line 12

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 13

```text

```

Blank line separates stylesheet rules.

### Line 14

```text
/* Theme overrides replace shared tokens only; components inherit the selected palette automatically. */
```

Comment: Theme overrides replace shared tokens only; components inherit the selected palette automatically..

### Line 15

```text
body[data-theme="midnight"] {
```

Selects body[data-theme="midnight"]; the declarations inside control its matching elements.

### Line 16

```text
  --gold-primary: #00d2d3;
```

Sets --gold-primary: #00d2d3 (sets --gold-primary).

### Line 17

```text
  --gold-dark: #00838f;
```

Sets --gold-dark: #00838f (sets --gold-dark).

### Line 18

```text
  --bg-primary: radial-gradient(circle, #1a202c 0%, #0d1117 100%);
```

Sets --bg-primary: radial-gradient(circle, #1a202c 0%, #0d1117 100%) (sets --bg-primary).

### Line 19

```text
  --panel-bg: #161b22;
```

Sets --panel-bg: #161b22 (sets --panel-bg).

### Line 20

```text
  --header-bg: #090d12;
```

Sets --header-bg: #090d12 (sets --header-bg).

### Line 21

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 22

```text

```

Blank line separates stylesheet rules.

### Line 23

```text
body[data-theme="gold"] {
```

Selects body[data-theme="gold"]; the declarations inside control its matching elements.

### Line 24

```text
  --gold-primary: #ffe066;
```

Sets --gold-primary: #ffe066 (sets --gold-primary).

### Line 25

```text
  --gold-dark: #cc9900;
```

Sets --gold-dark: #cc9900 (sets --gold-dark).

### Line 26

```text
  --bg-primary: radial-gradient(circle, #3d2b1f 0%, #170d07 100%);
```

Sets --bg-primary: radial-gradient(circle, #3d2b1f 0%, #170d07 100%) (sets --bg-primary).

### Line 27

```text
  --panel-bg: #291c14;
```

Sets --panel-bg: #291c14 (sets --panel-bg).

### Line 28

```text
  --header-bg: #120a05;
```

Sets --header-bg: #120a05 (sets --header-bg).

### Line 29

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 30

```text

```

Blank line separates stylesheet rules.

### Line 31

```text
body[data-theme="money"] {
```

Selects body[data-theme="money"]; the declarations inside control its matching elements.

### Line 32

```text
  --gold-primary: #4eec5c;
```

Sets --gold-primary: #4eec5c (sets --gold-primary).

### Line 33

```text
  --gold-dark: #039634;
```

Sets --gold-dark: #039634 (sets --gold-dark).

### Line 34

```text
  --bg-primary: radial-gradient(circle, #5b7e4f 0%, #1f3d21 100%);
```

Sets --bg-primary: radial-gradient(circle, #5b7e4f 0%, #1f3d21 100%) (sets --bg-primary).

### Line 35

```text
  --panel-bg: #08250d;
```

Sets --panel-bg: #08250d (sets --panel-bg).

### Line 36

```text
  --header-bg: #495b4b;
```

Sets --header-bg: #495b4b (sets --header-bg).

### Line 37

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 38

```text

```

Blank line separates stylesheet rules.

### Line 39

```text
/* A predictable border-box reset makes card dimensions and responsive grids easier to calculate. */
```

Comment: A predictable border-box reset makes card dimensions and responsive grids easier to calculate..

### Line 40

```text
* {
```

Selects *; the declarations inside control its matching elements.

### Line 41

```text
  box-sizing: border-box;
```

Sets box-sizing: border-box (sets box-sizing).

### Line 42

```text
  margin: 0;
```

Sets margin: 0 (sets outer spacing).

### Line 43

```text
  padding: 0;
```

Sets padding: 0 (adds inner spacing).

### Line 44

```text
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

Sets font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif (sets font stack).

### Line 45

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 46

```text

```

Blank line separates stylesheet rules.

### Line 47

```text
body {
```

Selects body; the declarations inside control its matching elements.

### Line 48

```text
  background: var(--bg-primary);
```

Sets background: var(--bg-primary) (paints the background).

### Line 49

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 50

```text
  min-height: 100vh;
```

Sets min-height: 100vh (sets minimum height).

### Line 51

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 52

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 53

```text
  overflow-x: hidden;
```

Sets overflow-x: hidden (controls horizontal overflow).

### Line 54

```text
  transition: background 0.3s ease;
```

Sets transition: background 0.3s ease (animates changes to listed properties).

### Line 55

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 56

```text

```

Blank line separates stylesheet rules.

### Line 57

```text
#fx-canvas {
```

Selects #fx-canvas; the declarations inside control its matching elements.

### Line 58

```text
  position: fixed;
```

Sets position: fixed (sets positioning scheme).

### Line 59

```text
  top: 0;
```

Sets top: 0 (sets top offset).

### Line 60

```text
  left: 0;
```

Sets left: 0 (sets left offset).

### Line 61

```text
  width: 100vw;
```

Sets width: 100vw (sets used width).

### Line 62

```text
  height: 100vh;
```

Sets height: 100vh (sets used height).

### Line 63

```text
  pointer-events: none;
```

Sets pointer-events: none (controls hit testing).

### Line 64

```text
  z-index: 999;
```

Sets z-index: 999 (sets stacking order).

### Line 65

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 66

```text

```

Blank line separates stylesheet rules.

### Line 67

```text
/* The flex header wraps instead of pushing the balance and settings controls off narrow screens. */
```

Comment: The flex header wraps instead of pushing the balance and settings controls off narrow screens..

### Line 68

```text
.global-bar {
```

Selects .global-bar; the declarations inside control its matching elements.

### Line 69

```text
  background: var(--header-bg);
```

Sets background: var(--header-bg) (paints the background).

### Line 70

```text
  border-bottom: 2px solid var(--gold-dark);
```

Sets border-bottom: 2px solid var(--gold-dark) (sets bottom border).

### Line 71

```text
  padding: 8px 16px;
```

Sets padding: 8px 16px (adds inner spacing).

### Line 72

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 73

```text
  justify-content: space-between;
```

Sets justify-content: space-between (distributes children on main axis).

### Line 74

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 75

```text
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
```

Sets box-shadow: 0 4px 15px rgba(0,0,0,0.5) (adds outer/inset shadow).

### Line 76

```text
  z-index: 100;
```

Sets z-index: 100 (sets stacking order).

### Line 77

```text
  gap: 16px;
```

Sets gap: 16px (sets spacing between flex/grid children).

### Line 78

```text
  flex-wrap: wrap;
```

Sets flex-wrap: wrap (allows children to wrap).

### Line 79

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 80

```text

```

Blank line separates stylesheet rules.

### Line 81

```text
.logo-area {
```

Selects .logo-area; the declarations inside control its matching elements.

### Line 82

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 83

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 84

```text
  gap: 12px;
```

Sets gap: 12px (sets spacing between flex/grid children).

### Line 85

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 86

```text

```

Blank line separates stylesheet rules.

### Line 87

```text
.logo-title {
```

Selects .logo-title; the declarations inside control its matching elements.

### Line 88

```text
  font-size: 1.2rem;
```

Sets font-size: 1.2rem (sets text size).

### Line 89

```text
  font-weight: 900;
```

Sets font-weight: 900 (sets text weight).

### Line 90

```text
  color: var(--gold-primary);
```

Sets color: var(--gold-primary) (sets text color).

### Line 91

```text
  letter-spacing: 1px;
```

Sets letter-spacing: 1px (sets spacing between characters).

### Line 92

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 93

```text

```

Blank line separates stylesheet rules.

### Line 94

```text
.wheel-header-btn {
```

Selects .wheel-header-btn; the declarations inside control its matching elements.

### Line 95

```text
  background: linear-gradient(180deg, #ff4757 0%, #ff6b81 100%);
```

Sets background: linear-gradient(180deg, #ff4757 0%, #ff6b81 100%) (paints the background).

### Line 96

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 97

```text
  border: 1px solid #ff7f50;
```

Sets border: 1px solid #ff7f50 (sets border width/style/color).

### Line 98

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 99

```text
  padding: 6px 10px;
```

Sets padding: 6px 10px (adds inner spacing).

### Line 100

```text
  font-weight: bold;
```

Sets font-weight: bold (sets text weight).

### Line 101

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 102

```text
  box-shadow: 0 0 10px rgba(255, 71, 87, 0.5);
```

Sets box-shadow: 0 0 10px rgba(255, 71, 87, 0.5) (adds outer/inset shadow).

### Line 103

```text
  animation: pulse-bonus 1.8s infinite alternate;
```

Sets animation: pulse-bonus 1.8s infinite alternate (runs a named CSS animation).

### Line 104

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 105

```text

```

Blank line separates stylesheet rules.

### Line 106

```text
@keyframes pulse-bonus {
```

Defines animation timeline pulse-bonus for changing properties over time.

### Line 107

```text
  0% { transform: scale(1); }
```

Selects 0% and applies transform: scale(1).

### Line 108

```text
  100% { transform: scale(1.04); box-shadow: 0 0 15px rgba(255, 71, 87, 0.8); }
```

Selects 100% and applies transform: scale(1.04); box-shadow: 0 0 15px rgba(255, 71, 87, 0.8).

### Line 109

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 110

```text

```

Blank line separates stylesheet rules.

### Line 111

```text
.xp-header-widget {
```

Selects .xp-header-widget; the declarations inside control its matching elements.

### Line 112

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 113

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 114

```text
  gap: 8px;
```

Sets gap: 8px (sets spacing between flex/grid children).

### Line 115

```text
  background: #151022;
```

Sets background: #151022 (paints the background).

### Line 116

```text
  border: 1px solid #3d345a;
```

Sets border: 1px solid #3d345a (sets border width/style/color).

### Line 117

```text
  padding: 4px 10px;
```

Sets padding: 4px 10px (adds inner spacing).

### Line 118

```text
  border-radius: 10px;
```

Sets border-radius: 10px (rounds corners).

### Line 119

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 120

```text

```

Blank line separates stylesheet rules.

### Line 121

```text
.level-badge {
```

Selects .level-badge; the declarations inside control its matching elements.

### Line 122

```text
  background: linear-gradient(135deg, #e056fd, #686de0);
```

Sets background: linear-gradient(135deg, #e056fd, #686de0) (paints the background).

### Line 123

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 124

```text
  font-weight: 900;
```

Sets font-weight: 900 (sets text weight).

### Line 125

```text
  font-size: 0.7rem;
```

Sets font-size: 0.7rem (sets text size).

### Line 126

```text
  padding: 3px 6px;
```

Sets padding: 3px 6px (adds inner spacing).

### Line 127

```text
  border-radius: 5px;
```

Sets border-radius: 5px (rounds corners).

### Line 128

```text
  box-shadow: 0 0 6px rgba(224, 86, 253, 0.5);
```

Sets box-shadow: 0 0 6px rgba(224, 86, 253, 0.5) (adds outer/inset shadow).

### Line 129

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 130

```text

```

Blank line separates stylesheet rules.

### Line 131

```text
.xp-bar-container {
```

Selects .xp-bar-container; the declarations inside control its matching elements.

### Line 132

```text
  width: 90px;
```

Sets width: 90px (sets used width).

### Line 133

```text
  height: 12px;
```

Sets height: 12px (sets used height).

### Line 134

```text
  background: #090610;
```

Sets background: #090610 (paints the background).

### Line 135

```text
  border: 1px solid #444;
```

Sets border: 1px solid #444 (sets border width/style/color).

### Line 136

```text
  border-radius: 6px;
```

Sets border-radius: 6px (rounds corners).

### Line 137

```text
  position: relative;
```

Sets position: relative (sets positioning scheme).

### Line 138

```text
  overflow: hidden;
```

Sets overflow: hidden (controls clipping/scrolling).

### Line 139

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 140

```text

```

Blank line separates stylesheet rules.

### Line 141

```text
.xp-bar-fill {
```

Selects .xp-bar-fill; the declarations inside control its matching elements.

### Line 142

```text
  height: 100%;
```

Sets height: 100% (sets used height).

### Line 143

```text
  background: linear-gradient(90deg, #4eef90, #20bf6b);
```

Sets background: linear-gradient(90deg, #4eef90, #20bf6b) (paints the background).

### Line 144

```text
  width: 0%;
```

Sets width: 0% (sets used width).

### Line 145

```text
  transition: width 0.3s ease;
```

Sets transition: width 0.3s ease (animates changes to listed properties).

### Line 146

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 147

```text

```

Blank line separates stylesheet rules.

### Line 148

```text
.xp-bar-text {
```

Selects .xp-bar-text; the declarations inside control its matching elements.

### Line 149

```text
  position: absolute;
```

Sets position: absolute (sets positioning scheme).

### Line 150

```text
  top: 50%;
```

Sets top: 50% (sets top offset).

### Line 151

```text
  left: 50%;
```

Sets left: 50% (sets left offset).

### Line 152

```text
  transform: translate(-50%, -50%);
```

Sets transform: translate(-50%, -50%) (applies geometric transform).

### Line 153

```text
  font-size: 0.52rem;
```

Sets font-size: 0.52rem (sets text size).

### Line 154

```text
  font-weight: bold;
```

Sets font-weight: bold (sets text weight).

### Line 155

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 156

```text
  text-shadow: 0 0 3px #000;
```

Sets text-shadow: 0 0 3px #000 (adds shadow behind text).

### Line 157

```text
  white-space: nowrap;
```

Sets white-space: nowrap (controls wrapping).

### Line 158

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 159

```text

```

Blank line separates stylesheet rules.

### Line 160

```text
.vip-tier-tag {
```

Selects .vip-tier-tag; the declarations inside control its matching elements.

### Line 161

```text
  font-size: 0.6rem;
```

Sets font-size: 0.6rem (sets text size).

### Line 162

```text
  font-weight: 900;
```

Sets font-weight: 900 (sets text weight).

### Line 163

```text
  color: var(--gold-primary);
```

Sets color: var(--gold-primary) (sets text color).

### Line 164

```text
  letter-spacing: 0.5px;
```

Sets letter-spacing: 0.5px (sets spacing between characters).

### Line 165

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 166

```text

```

Blank line separates stylesheet rules.

### Line 167

```text
.jackpot-ticker-container {
```

Selects .jackpot-ticker-container; the declarations inside control its matching elements.

### Line 168

```text
  background: radial-gradient(circle, #8a1313 0%, #300000 100%);
```

Sets background: radial-gradient(circle, #8a1313 0%, #300000 100%) (paints the background).

### Line 169

```text
  border: 1px solid var(--gold-primary);
```

Sets border: 1px solid var(--gold-primary) (sets border width/style/color).

### Line 170

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 171

```text
  padding: 2px 10px;
```

Sets padding: 2px 10px (adds inner spacing).

### Line 172

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 173

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 174

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 175

```text
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
```

Sets box-shadow: 0 0 8px rgba(255, 215, 0, 0.4) (adds outer/inset shadow).

### Line 176

```text
  animation: pulse-jackpot 2s infinite alternate;
```

Sets animation: pulse-jackpot 2s infinite alternate (runs a named CSS animation).

### Line 177

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 178

```text

```

Blank line separates stylesheet rules.

### Line 179

```text
@keyframes pulse-jackpot {
```

Defines animation timeline pulse-jackpot for changing properties over time.

### Line 180

```text
  0% { transform: scale(1); box-shadow: 0 0 8px rgba(255, 215, 0, 0.3); }
```

Selects 0% and applies transform: scale(1); box-shadow: 0 0 8px rgba(255, 215, 0, 0.3).

### Line 181

```text
  100% { transform: scale(1.02); box-shadow: 0 0 14px rgba(255, 215, 0, 0.7); }
```

Selects 100% and applies transform: scale(1.02); box-shadow: 0 0 14px rgba(255, 215, 0, 0.7).

### Line 182

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 183

```text

```

Blank line separates stylesheet rules.

### Line 184

```text
.jackpot-label { font-size: 0.5rem; color: #ffcccc; letter-spacing: 1px; font-weight: bold; }
```

Selects .jackpot-label and applies font-size: 0.5rem; color: #ffcccc; letter-spacing: 1px; font-weight: bold.

### Line 185

```text
.jackpot-amount { font-size: 0.95rem; font-weight: 900; color: var(--gold-primary); }
```

Selects .jackpot-amount and applies font-size: 0.95rem; font-weight: 900; color: var(--gold-primary).

### Line 186

```text

```

Blank line separates stylesheet rules.

### Line 187

```text
.header-right {
```

Selects .header-right; the declarations inside control its matching elements.

### Line 188

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 189

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 190

```text
  gap: 8px;
```

Sets gap: 8px (sets spacing between flex/grid children).

### Line 191

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 192

```text

```

Blank line separates stylesheet rules.

### Line 193

```text
.icon-btn {
```

Selects .icon-btn; the declarations inside control its matching elements.

### Line 194

```text
  background: #2a2a35;
```

Sets background: #2a2a35 (paints the background).

### Line 195

```text
  border: 1px solid #555;
```

Sets border: 1px solid #555 (sets border width/style/color).

### Line 196

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 197

```text
  padding: 6px 8px;
```

Sets padding: 6px 8px (adds inner spacing).

### Line 198

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 199

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 200

```text
  font-size: 1rem;
```

Sets font-size: 1rem (sets text size).

### Line 201

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 202

```text

```

Blank line separates stylesheet rules.

### Line 203

```text
.icon-btn:hover { background: #444; }
```

Selects .icon-btn:hover and applies background: #444.

### Line 204

```text

```

Blank line separates stylesheet rules.

### Line 205

```text
.bank-btn {
```

Selects .bank-btn; the declarations inside control its matching elements.

### Line 206

```text
  background: linear-gradient(180deg, #3a7bd5 0%, #3a6073 100%);
```

Sets background: linear-gradient(180deg, #3a7bd5 0%, #3a6073 100%) (paints the background).

### Line 207

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 208

```text
  border: 1px solid #4a90e2;
```

Sets border: 1px solid #4a90e2 (sets border width/style/color).

### Line 209

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 210

```text
  padding: 6px 12px;
```

Sets padding: 6px 12px (adds inner spacing).

### Line 211

```text
  font-weight: bold;
```

Sets font-weight: bold (sets text weight).

### Line 212

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 213

```text
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
```

Sets box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4) (adds outer/inset shadow).

### Line 214

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 215

```text

```

Blank line separates stylesheet rules.

### Line 216

```text
.bank-btn:hover { background: #4a90e2; }
```

Selects .bank-btn:hover and applies background: #4a90e2.

### Line 217

```text

```

Blank line separates stylesheet rules.

### Line 218

```text
.wallet-display {
```

Selects .wallet-display; the declarations inside control its matching elements.

### Line 219

```text
  background: #171026;
```

Sets background: #171026 (paints the background).

### Line 220

```text
  border: 1px solid var(--gold-primary);
```

Sets border: 1px solid var(--gold-primary) (sets border width/style/color).

### Line 221

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 222

```text
  padding: 3px 10px;
```

Sets padding: 3px 10px (adds inner spacing).

### Line 223

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 224

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 225

```text
  align-items: flex-end;
```

Sets align-items: flex-end (aligns children on cross axis).

### Line 226

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 227

```text

```

Blank line separates stylesheet rules.

### Line 228

```text
.wallet-label { font-size: 0.55rem; color: #aaa; letter-spacing: 0.5px; }
```

Selects .wallet-label and applies font-size: 0.55rem; color: #aaa; letter-spacing: 0.5px.

### Line 229

```text
.wallet-amount { font-size: 1rem; font-weight: bold; color: #4eef90; }
```

Selects .wallet-amount and applies font-size: 1rem; font-weight: bold; color: #4eef90.

### Line 230

```text

```

Blank line separates stylesheet rules.

### Line 231

```text
.reset-data-btn {
```

Selects .reset-data-btn; the declarations inside control its matching elements.

### Line 232

```text
  background: #2a2a35;
```

Sets background: #2a2a35 (paints the background).

### Line 233

```text
  border: 1px solid #555;
```

Sets border: 1px solid #555 (sets border width/style/color).

### Line 234

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 235

```text
  padding: 6px 8px;
```

Sets padding: 6px 8px (adds inner spacing).

### Line 236

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 237

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 238

```text
  font-size: 1rem;
```

Sets font-size: 1rem (sets text size).

### Line 239

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 240

```text

```

Blank line separates stylesheet rules.

### Line 241

```text
.reset-data-btn:hover {
```

Selects .reset-data-btn:hover; the declarations inside control its matching elements.

### Line 242

```text
  background: #444;
```

Sets background: #444 (paints the background).

### Line 243

```text
  border-color: #777;
```

Sets border-color: #777 (sets border color).

### Line 244

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 245

```text

```

Blank line separates stylesheet rules.

### Line 246

```text
/* Modal Overlay Styling */
```

Comment: Modal Overlay Styling.

### Line 247

```text
/* Shared fixed overlays keep settings, saves, wheel, and bank dialogs visually consistent. */
```

Comment: Shared fixed overlays keep settings, saves, wheel, and bank dialogs visually consistent..

### Line 248

```text
.modal-overlay {
```

Selects .modal-overlay; the declarations inside control its matching elements.

### Line 249

```text
  position: fixed;
```

Sets position: fixed (sets positioning scheme).

### Line 250

```text
  top: 0;
```

Sets top: 0 (sets top offset).

### Line 251

```text
  left: 0;
```

Sets left: 0 (sets left offset).

### Line 252

```text
  width: 100vw;
```

Sets width: 100vw (sets used width).

### Line 253

```text
  height: 100vh;
```

Sets height: 100vh (sets used height).

### Line 254

```text
  background: rgba(0, 0, 0, 0.8);
```

Sets background: rgba(0, 0, 0, 0.8) (paints the background).

### Line 255

```text
  backdrop-filter: blur(5px);
```

Sets backdrop-filter: blur(5px) (sets backdrop-filter).

### Line 256

```text
  z-index: 1000;
```

Sets z-index: 1000 (sets stacking order).

### Line 257

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 258

```text
  justify-content: center;
```

Sets justify-content: center (distributes children on main axis).

### Line 259

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 260

```text
  padding: 20px;
```

Sets padding: 20px (adds inner spacing).

### Line 261

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 262

```text

```

Blank line separates stylesheet rules.

### Line 263

```text
.modal-card {
```

Selects .modal-card; the declarations inside control its matching elements.

### Line 264

```text
  background: #181820;
```

Sets background: #181820 (paints the background).

### Line 265

```text
  border: 3px solid var(--gold-primary);
```

Sets border: 3px solid var(--gold-primary) (sets border width/style/color).

### Line 266

```text
  border-radius: 20px;
```

Sets border-radius: 20px (rounds corners).

### Line 267

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 268

```text
  max-width: 550px;
```

Sets max-width: 550px (sets maximum width).

### Line 269

```text
  padding: 28px;
```

Sets padding: 28px (adds inner spacing).

### Line 270

```text
  position: relative;
```

Sets position: relative (sets positioning scheme).

### Line 271

```text
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
```

Sets box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8) (adds outer/inset shadow).

### Line 272

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 273

```text

```

Blank line separates stylesheet rules.

### Line 274

```text
.wheel-modal-card {
```

Selects .wheel-modal-card; the declarations inside control its matching elements.

### Line 275

```text
  max-width: 440px;
```

Sets max-width: 440px (sets maximum width).

### Line 276

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 277

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 278

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 279

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 280

```text

```

Blank line separates stylesheet rules.

### Line 281

```text
.modal-close-btn {
```

Selects .modal-close-btn; the declarations inside control its matching elements.

### Line 282

```text
  position: absolute;
```

Sets position: absolute (sets positioning scheme).

### Line 283

```text
  top: 15px;
```

Sets top: 15px (sets top offset).

### Line 284

```text
  right: 20px;
```

Sets right: 20px (sets right offset).

### Line 285

```text
  background: none;
```

Sets background: none (paints the background).

### Line 286

```text
  border: none;
```

Sets border: none (sets border width/style/color).

### Line 287

```text
  color: #aaa;
```

Sets color: #aaa (sets text color).

### Line 288

```text
  font-size: 2rem;
```

Sets font-size: 2rem (sets text size).

### Line 289

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 290

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 291

```text

```

Blank line separates stylesheet rules.

### Line 292

```text
.modal-close-btn:hover { color: #fff; }
```

Selects .modal-close-btn:hover and applies color: #fff.

### Line 293

```text

```

Blank line separates stylesheet rules.

### Line 294

```text
.modal-card h2 { color: var(--gold-primary); text-align: center; font-size: 1.5rem; margin-bottom: 4px; }
```

Selects .modal-card h2 and applies color: var(--gold-primary); text-align: center; font-size: 1.5rem; margin-bottom: 4px.

### Line 295

```text
.modal-subtitle { text-align: center; color: #aaa; font-size: 0.85rem; margin-bottom: 20px; }
```

Selects .modal-subtitle and applies text-align: center; color: #aaa; font-size: 0.85rem; margin-bottom: 20px.

### Line 296

```text

```

Blank line separates stylesheet rules.

### Line 297

```text
/* Wheel Canvas Stage */
```

Comment: Wheel Canvas Stage.

### Line 298

```text
.wheel-stage-container {
```

Selects .wheel-stage-container; the declarations inside control its matching elements.

### Line 299

```text
  position: relative;
```

Sets position: relative (sets positioning scheme).

### Line 300

```text
  width: 320px;
```

Sets width: 320px (sets used width).

### Line 301

```text
  height: 320px;
```

Sets height: 320px (sets used height).

### Line 302

```text
  margin-bottom: 20px;
```

Sets margin-bottom: 20px (sets bottom outer spacing).

### Line 303

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 304

```text
  justify-content: center;
```

Sets justify-content: center (distributes children on main axis).

### Line 305

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 306

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 307

```text

```

Blank line separates stylesheet rules.

### Line 308

```text
.wheel-pointer {
```

Selects .wheel-pointer; the declarations inside control its matching elements.

### Line 309

```text
  position: absolute;
```

Sets position: absolute (sets positioning scheme).

### Line 310

```text
  top: -10px;
```

Sets top: -10px (sets top offset).

### Line 311

```text
  left: 50%;
```

Sets left: 50% (sets left offset).

### Line 312

```text
  transform: translateX(-50%);
```

Sets transform: translateX(-50%) (applies geometric transform).

### Line 313

```text
  font-size: 2rem;
```

Sets font-size: 2rem (sets text size).

### Line 314

```text
  color: var(--gold-primary);
```

Sets color: var(--gold-primary) (sets text color).

### Line 315

```text
  z-index: 10;
```

Sets z-index: 10 (sets stacking order).

### Line 316

```text
  text-shadow: 0 2px 5px rgba(0,0,0,0.8);
```

Sets text-shadow: 0 2px 5px rgba(0,0,0,0.8) (adds shadow behind text).

### Line 317

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 318

```text

```

Blank line separates stylesheet rules.

### Line 319

```text
#wheel-canvas {
```

Selects #wheel-canvas; the declarations inside control its matching elements.

### Line 320

```text
  border-radius: 50%;
```

Sets border-radius: 50% (rounds corners).

### Line 321

```text
  border: 6px solid var(--gold-primary);
```

Sets border: 6px solid var(--gold-primary) (sets border width/style/color).

### Line 322

```text
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
```

Sets box-shadow: 0 0 20px rgba(255, 215, 0, 0.4) (adds outer/inset shadow).

### Line 323

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 324

```text

```

Blank line separates stylesheet rules.

### Line 325

```text
.wheel-action-area {
```

Selects .wheel-action-area; the declarations inside control its matching elements.

### Line 326

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 327

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 328

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 329

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 330

```text
  gap: 10px;
```

Sets gap: 10px (sets spacing between flex/grid children).

### Line 331

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 332

```text

```

Blank line separates stylesheet rules.

### Line 333

```text
.cooldown-badge {
```

Selects .cooldown-badge; the declarations inside control its matching elements.

### Line 334

```text
  background: #2a1c1c;
```

Sets background: #2a1c1c (paints the background).

### Line 335

```text
  border: 1px solid #ff4d4d;
```

Sets border: 1px solid #ff4d4d (sets border width/style/color).

### Line 336

```text
  color: #ff6b6b;
```

Sets color: #ff6b6b (sets text color).

### Line 337

```text
  padding: 8px 16px;
```

Sets padding: 8px 16px (adds inner spacing).

### Line 338

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 339

```text
  font-weight: bold;
```

Sets font-weight: bold (sets text weight).

### Line 340

```text
  font-size: 0.9rem;
```

Sets font-size: 0.9rem (sets text size).

### Line 341

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 342

```text

```

Blank line separates stylesheet rules.

### Line 343

```text
.spin-wheel-btn {
```

Selects .spin-wheel-btn; the declarations inside control its matching elements.

### Line 344

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 345

```text
  background: linear-gradient(180deg, #ffd700 0%, #b8860b 100%);
```

Sets background: linear-gradient(180deg, #ffd700 0%, #b8860b 100%) (paints the background).

### Line 346

```text
  color: #000;
```

Sets color: #000 (sets text color).

### Line 347

```text
  border: none;
```

Sets border: none (sets border width/style/color).

### Line 348

```text
  padding: 14px;
```

Sets padding: 14px (adds inner spacing).

### Line 349

```text
  font-size: 1.2rem;
```

Sets font-size: 1.2rem (sets text size).

### Line 350

```text
  font-weight: 900;
```

Sets font-weight: 900 (sets text weight).

### Line 351

```text
  border-radius: 12px;
```

Sets border-radius: 12px (rounds corners).

### Line 352

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 353

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 354

```text

```

Blank line separates stylesheet rules.

### Line 355

```text
.spin-wheel-btn:disabled { opacity: 0.5; cursor: not-allowed; }
```

Selects .spin-wheel-btn:disabled and applies opacity: 0.5; cursor: not-allowed.

### Line 356

```text

```

Blank line separates stylesheet rules.

### Line 357

```text
.settings-section {
```

Selects .settings-section; the declarations inside control its matching elements.

### Line 358

```text
  background: #22222d;
```

Sets background: #22222d (paints the background).

### Line 359

```text
  border: 1px solid #333;
```

Sets border: 1px solid #333 (sets border width/style/color).

### Line 360

```text
  border-radius: 12px;
```

Sets border-radius: 12px (rounds corners).

### Line 361

```text
  padding: 16px;
```

Sets padding: 16px (adds inner spacing).

### Line 362

```text
  margin-bottom: 16px;
```

Sets margin-bottom: 16px (sets bottom outer spacing).

### Line 363

```text
  justify-content: center;
```

Sets justify-content: center (distributes children on main axis).

### Line 364

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 365

```text

```

Blank line separates stylesheet rules.

### Line 366

```text
.settings-hr { margin: 15px; }
```

Selects .settings-hr and applies margin: 15px.

### Line 367

```text
.settings-section h3 { font-size: 0.95rem; color: var(--gold-primary); margin-bottom: 12px; }
```

Selects .settings-section h3 and applies font-size: 0.95rem; color: var(--gold-primary); margin-bottom: 12px.

### Line 368

```text

```

Blank line separates stylesheet rules.

### Line 369

```text
.setting-row {
```

Selects .setting-row; the declarations inside control its matching elements.

### Line 370

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 371

```text
  justify-content: space-between;
```

Sets justify-content: space-between (distributes children on main axis).

### Line 372

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 373

```text
  margin-bottom: 12px;
```

Sets margin-bottom: 12px (sets bottom outer spacing).

### Line 374

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 375

```text

```

Blank line separates stylesheet rules.

### Line 376

```text
.setting-row:last-child { margin-bottom: 0; }
```

Selects .setting-row:last-child and applies margin-bottom: 0.

### Line 377

```text
.setting-row label { font-size: 0.9rem; color: #ccc; }
```

Selects .setting-row label and applies font-size: 0.9rem; color: #ccc.

### Line 378

```text

```

Blank line separates stylesheet rules.

### Line 379

```text
.volume-control { display: flex; align-items: center; gap: 10px; }
```

Selects .volume-control and applies display: flex; align-items: center; gap: 10px.

### Line 380

```text
.volume-control input[type="range"] { accent-color: var(--gold-primary); cursor: pointer; }
```

Selects .volume-control input[type="range"] and applies accent-color: var(--gold-primary); cursor: pointer.

### Line 381

```text
.volume-control span { font-size: 0.85rem; color: #aaa; min-width: 40px; text-align: right; }
```

Selects .volume-control span and applies font-size: 0.85rem; color: #aaa; min-width: 40px; text-align: right.

### Line 382

```text

```

Blank line separates stylesheet rules.

### Line 383

```text
.toggle-btn {
```

Selects .toggle-btn; the declarations inside control its matching elements.

### Line 384

```text
  background: #333;
```

Sets background: #333 (paints the background).

### Line 385

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 386

```text
  border: 1px solid #555;
```

Sets border: 1px solid #555 (sets border width/style/color).

### Line 387

```text
  padding: 6px 12px;
```

Sets padding: 6px 12px (adds inner spacing).

### Line 388

```text
  border-radius: 6px;
```

Sets border-radius: 6px (rounds corners).

### Line 389

```text
  font-size: 0.85rem;
```

Sets font-size: 0.85rem (sets text size).

### Line 390

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 391

```text
  font-weight: bold;
```

Sets font-weight: bold (sets text weight).

### Line 392

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 393

```text

```

Blank line separates stylesheet rules.

### Line 394

```text
.toggle-btn.is-muted { background: #8a1313; border-color: #ff4d4d; color: #ffcccc; }
```

Selects .toggle-btn.is-muted and applies background: #8a1313; border-color: #ff4d4d; color: #ffcccc.

### Line 395

```text

```

Blank line separates stylesheet rules.

### Line 396

```text
.theme-selector-grid { display: flex; justify-content: space-around;}
```

Selects .theme-selector-grid and applies display: flex; justify-content: space-around.

### Line 397

```text

```

Blank line separates stylesheet rules.

### Line 398

```text
.theme-btn {
```

Selects .theme-btn; the declarations inside control its matching elements.

### Line 399

```text
  flex: 1;
```

Sets flex: 1 (sets flex growth/shrink/basis).

### Line 400

```text
  background: #181820;
```

Sets background: #181820 (paints the background).

### Line 401

```text
  border: 2px solid #444;
```

Sets border: 2px solid #444 (sets border width/style/color).

### Line 402

```text
  color: #aaa;
```

Sets color: #aaa (sets text color).

### Line 403

```text
  padding: 10px;
```

Sets padding: 10px (adds inner spacing).

### Line 404

```text
  border-radius: 10px;
```

Sets border-radius: 10px (rounds corners).

### Line 405

```text
  font-size: 0.8rem;
```

Sets font-size: 0.8rem (sets text size).

### Line 406

```text
  font-weight: bold;
```

Sets font-weight: bold (sets text weight).

### Line 407

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 408

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 409

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 410

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 411

```text
  width: 20%;
```

Sets width: 20% (sets used width).

### Line 412

```text
  gap: 6px;
```

Sets gap: 6px (sets spacing between flex/grid children).

### Line 413

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 414

```text

```

Blank line separates stylesheet rules.

### Line 415

```text
.theme-btn.active-theme { border-color: var(--gold-primary); color: #fff; background: #282835; }
```

Selects .theme-btn.active-theme and applies border-color: var(--gold-primary); color: #fff; background: #282835.

### Line 416

```text

```

Blank line separates stylesheet rules.

### Line 417

```text
.theme-swatch { width: 24px; height: 24px; border-radius: 50%; border: 1px solid #fff; }
```

Selects .theme-swatch and applies width: 24px; height: 24px; border-radius: 50%; border: 1px solid #fff.

### Line 418

```text
.swatch-vegas { background: linear-gradient(135deg, #4a0d66, #ffd700); }
```

Selects .swatch-vegas and applies background: linear-gradient(135deg, #4a0d66, #ffd700).

### Line 419

```text
.swatch-midnight { background: linear-gradient(135deg, #1a202c, #00d2d3); }
```

Selects .swatch-midnight and applies background: linear-gradient(135deg, #1a202c, #00d2d3).

### Line 420

```text
.swatch-gold { background: linear-gradient(135deg, #3d2b1f, #ffe066); }
```

Selects .swatch-gold and applies background: linear-gradient(135deg, #3d2b1f, #ffe066).

### Line 421

```text
.swatch-money { background: linear-gradient(135deg, #1f3d21, #4eec5c); }
```

Selects .swatch-money and applies background: linear-gradient(135deg, #1f3d21, #4eec5c).

### Line 422

```text

```

Blank line separates stylesheet rules.

### Line 423

```text
/* Bank Grid Styling */
```

Comment: Bank Grid Styling.

### Line 424

```text
.bank-stats-grid {
```

Selects .bank-stats-grid; the declarations inside control its matching elements.

### Line 425

```text
  display: grid;
```

Sets display: grid (controls layout mode/visibility).

### Line 426

```text
  grid-template-columns: repeat(3, 1fr);
```

Sets grid-template-columns: repeat(3, 1fr) (defines grid columns).

### Line 427

```text
  gap: 10px;
```

Sets gap: 10px (sets spacing between flex/grid children).

### Line 428

```text
  margin-bottom: 24px;
```

Sets margin-bottom: 24px (sets bottom outer spacing).

### Line 429

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 430

```text

```

Blank line separates stylesheet rules.

### Line 431

```text
.bank-stat-card {
```

Selects .bank-stat-card; the declarations inside control its matching elements.

### Line 432

```text
  background: #22222d;
```

Sets background: #22222d (paints the background).

### Line 433

```text
  border: 1px solid #333;
```

Sets border: 1px solid #333 (sets border width/style/color).

### Line 434

```text
  padding: 12px;
```

Sets padding: 12px (adds inner spacing).

### Line 435

```text
  border-radius: 10px;
```

Sets border-radius: 10px (rounds corners).

### Line 436

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 437

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 438

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 439

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 440

```text

```

Blank line separates stylesheet rules.

### Line 441

```text
.stat-label { font-size: 0.65rem; color: #888; font-weight: bold; margin-bottom: 4px; }
```

Selects .stat-label and applies font-size: 0.65rem; color: #888; font-weight: bold; margin-bottom: 4px.

### Line 442

```text
.stat-value { font-size: 1.1rem; font-weight: bold; color: #fff; }
```

Selects .stat-value and applies font-size: 1.1rem; font-weight: bold; color: #fff.

### Line 443

```text
.stat-value.debt-color { color: #ff4d4d; }
```

Selects .stat-value.debt-color and applies color: #ff4d4d.

### Line 444

```text

```

Blank line separates stylesheet rules.

### Line 445

```text
.bank-actions-container { display: flex; flex-direction: column; gap: 16px; }
```

Selects .bank-actions-container and applies display: flex; flex-direction: column; gap: 16px.

### Line 446

```text

```

Blank line separates stylesheet rules.

### Line 447

```text
.bank-action-box {
```

Selects .bank-action-box; the declarations inside control its matching elements.

### Line 448

```text
  background: #1e1e28;
```

Sets background: #1e1e28 (paints the background).

### Line 449

```text
  border: 1px solid #333;
```

Sets border: 1px solid #333 (sets border width/style/color).

### Line 450

```text
  padding: 16px;
```

Sets padding: 16px (adds inner spacing).

### Line 451

```text
  border-radius: 12px;
```

Sets border-radius: 12px (rounds corners).

### Line 452

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 453

```text

```

Blank line separates stylesheet rules.

### Line 454

```text
.bank-action-box h3 { font-size: 1rem; color: var(--gold-primary); margin-bottom: 4px; }
```

Selects .bank-action-box h3 and applies font-size: 1rem; color: var(--gold-primary); margin-bottom: 4px.

### Line 455

```text
.bank-action-box p { font-size: 0.75rem; color: #aaa; margin-bottom: 12px; }
```

Selects .bank-action-box p and applies font-size: 0.75rem; color: #aaa; margin-bottom: 12px.

### Line 456

```text

```

Blank line separates stylesheet rules.

### Line 457

```text
.action-inputs { display: flex; gap: 10px; }
```

Selects .action-inputs and applies display: flex; gap: 10px.

### Line 458

```text

```

Blank line separates stylesheet rules.

### Line 459

```text
.btn-preset-loan, .btn-repay {
```

Selects .btn-preset-loan, .btn-repay; the declarations inside control its matching elements.

### Line 460

```text
  flex: 1;
```

Sets flex: 1 (sets flex growth/shrink/basis).

### Line 461

```text
  background: #2b2b3a;
```

Sets background: #2b2b3a (paints the background).

### Line 462

```text
  border: 1px solid var(--gold-dark);
```

Sets border: 1px solid var(--gold-dark) (sets border width/style/color).

### Line 463

```text
  color: var(--gold-primary);
```

Sets color: var(--gold-primary) (sets text color).

### Line 464

```text
  padding: 10px;
```

Sets padding: 10px (adds inner spacing).

### Line 465

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 466

```text
  font-weight: bold;
```

Sets font-weight: bold (sets text weight).

### Line 467

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 468

```text
  transition: background 0.2s;
```

Sets transition: background 0.2s (animates changes to listed properties).

### Line 469

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 470

```text

```

Blank line separates stylesheet rules.

### Line 471

```text
.btn-preset-loan:hover { background: #3b3b4f; }
```

Selects .btn-preset-loan:hover and applies background: #3b3b4f.

### Line 472

```text
.btn-repay { background: #223a2b; border-color: #4eef90; color: #4eef90; }
```

Selects .btn-repay and applies background: #223a2b; border-color: #4eef90; color: #4eef90.

### Line 473

```text
.btn-repay:hover { background: #2c4d39; }
```

Selects .btn-repay:hover and applies background: #2c4d39.

### Line 474

```text
.btn-repay-max { background: #3a2222; border-color: #ff4d4d; color: #ff6b6b; }
```

Selects .btn-repay-max and applies background: #3a2222; border-color: #ff4d4d; color: #ff6b6b.

### Line 475

```text
.btn-repay-max:hover { background: #4d2c2c; }
```

Selects .btn-repay-max:hover and applies background: #4d2c2c.

### Line 476

```text

```

Blank line separates stylesheet rules.

### Line 477

```text
#app-container {
```

Selects #app-container; the declarations inside control its matching elements.

### Line 478

```text
  flex: 1;
```

Sets flex: 1 (sets flex growth/shrink/basis).

### Line 479

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 480

```text
  justify-content: center;
```

Sets justify-content: center (distributes children on main axis).

### Line 481

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 482

```text
  padding: 20px;
```

Sets padding: 20px (adds inner spacing).

### Line 483

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 484

```text

```

Blank line separates stylesheet rules.

### Line 485

```text
/* Navigation toggles visibility classes on complete views rather than rebuilding game markup. */
```

Comment: Navigation toggles visibility classes on complete views rather than rebuilding game markup..

### Line 486

```text
.view-screen { width: 100%; max-width: 900px; }
```

Selects .view-screen and applies width: 100%; max-width: 900px.

### Line 487

```text
.active-view { display: block; }
```

Selects .active-view and applies display: block.

### Line 488

```text
.modal-overlay.active-view { display: flex; }
```

Selects .modal-overlay.active-view and applies display: flex.

### Line 489

```text
.hidden-view { display: none !important; }
```

Selects .hidden-view and applies display: none !important.

### Line 490

```text

```

Blank line separates stylesheet rules.

### Line 491

```text
.lobby-header { text-align: center; margin-bottom: 30px; }
```

Selects .lobby-header and applies text-align: center; margin-bottom: 30px.

### Line 492

```text
.lobby-header h2 { font-size: 2.2rem; color: var(--gold-primary); }
```

Selects .lobby-header h2 and applies font-size: 2.2rem; color: var(--gold-primary).

### Line 493

```text
.lobby-header p { color: #ccc; }
```

Selects .lobby-header p and applies color: #ccc.

### Line 494

```text

```

Blank line separates stylesheet rules.

### Line 495

```text
/* The lobby's non-slot games use a fluid grid; slot cards have their own sibling grid so the Slot Room remains visually distinct. */
```

Comment: The lobby's non-slot games use a fluid grid; slot cards have their own sibling grid so the Slot Room remains visually distinct..

### Line 496

```text
.game-grid {
```

Selects .game-grid; the declarations inside control its matching elements.

### Line 497

```text
  display: grid;
```

Sets display: grid (controls layout mode/visibility).

### Line 498

```text
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

Sets grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) (defines grid columns).

### Line 499

```text
  gap: 20px;
```

Sets gap: 20px (sets spacing between flex/grid children).

### Line 500

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 501

```text

```

Blank line separates stylesheet rules.

### Line 502

```text
summary::marker {
```

Selects summary::marker; the declarations inside control its matching elements.

### Line 503

```text
  content: "🎰▶️";
```

Sets content: "🎰▶️" (generates pseudo-element content).

### Line 504

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 505

```text

```

Blank line separates stylesheet rules.

### Line 506

```text
/* Keep the Coin Flip disclosure distinct from the slot-machine marker. */
```

Comment: Keep the Coin Flip disclosure distinct from the slot-machine marker..

### Line 507

```text
.lobby-coin-room summary {
```

Selects .lobby-coin-room summary; the declarations inside control its matching elements.

### Line 508

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 509

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 510

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 511

```text

```

Blank line separates stylesheet rules.

### Line 512

```text
.lobby-coin-room summary::marker { content: "▶ "; color: var(--gold-primary); }
```

Selects .lobby-coin-room summary::marker and applies content: "▶ "; color: var(--gold-primary).

### Line 513

```text
.lobby-coin-room details[open] > summary::marker { content: "▼ "; }
```

Selects .lobby-coin-room details[open] > summary::marker and applies content: "▼ ".

### Line 514

```text
.lobby-coin-room summary:focus-visible { outline: 2px solid var(--gold-primary); outline-offset: 6px; }
```

Selects .lobby-coin-room summary:focus-visible and applies outline: 2px solid var(--gold-primary); outline-offset: 6px.

### Line 515

```text
.lobby-coin-room .lobby-coin-room-heading { margin-bottom: 0; }
```

Selects .lobby-coin-room .lobby-coin-room-heading and applies margin-bottom: 0.

### Line 516

```text
.lobby-coin-room details[open] > summary { margin-bottom: 16px; }
```

Selects .lobby-coin-room details[open] > summary and applies margin-bottom: 16px.

### Line 517

```text
.lobby-coin-room .game-grid { grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr)); }
```

Selects .lobby-coin-room .game-grid and applies grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr)).

### Line 518

```text

```

Blank line separates stylesheet rules.

### Line 519

```text
/* Room containers make groups easy to scan and let each family of games grow without mixing unrelated cards. */
```

Comment: Room containers make groups easy to scan and let each family of games grow without mixing unrelated cards..

### Line 520

```text
.lobby-slot-room, .lobby-coin-room {
```

Selects .lobby-slot-room, .lobby-coin-room; the declarations inside control its matching elements.

### Line 521

```text
  margin-bottom: 24px;
```

Sets margin-bottom: 24px (sets bottom outer spacing).

### Line 522

```text
  padding: 22px;
```

Sets padding: 22px (adds inner spacing).

### Line 523

```text
  border: 1px solid rgba(255, 215, 0, 0.42);
```

Sets border: 1px solid rgba(255, 215, 0, 0.42) (sets border width/style/color).

### Line 524

```text
  border-radius: 18px;
```

Sets border-radius: 18px (rounds corners).

### Line 525

```text
  background: linear-gradient(145deg, rgba(42, 29, 58, 0.96), rgba(19, 15, 29, 0.96));
```

Sets background: linear-gradient(145deg, rgba(42, 29, 58, 0.96), rgba(19, 15, 29, 0.96)) (paints the background).

### Line 526

```text
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.24);
```

Sets box-shadow: 0 12px 30px rgba(0, 0, 0, 0.24) (adds outer/inset shadow).

### Line 527

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 528

```text

```

Blank line separates stylesheet rules.

### Line 529

```text
.lobby-slot-room-heading, .lobby-coin-room-heading {
```

Selects .lobby-slot-room-heading, .lobby-coin-room-heading; the declarations inside control its matching elements.

### Line 530

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 531

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 532

```text
  justify-content: space-between;
```

Sets justify-content: space-between (distributes children on main axis).

### Line 533

```text
  gap: 18px;
```

Sets gap: 18px (sets spacing between flex/grid children).

### Line 534

```text
  margin-bottom: 16px;
```

Sets margin-bottom: 16px (sets bottom outer spacing).

### Line 535

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 536

```text

```

Blank line separates stylesheet rules.

### Line 537

```text
.lobby-slot-room-heading h3, .lobby-coin-room-heading h3 {
```

Selects .lobby-slot-room-heading h3, .lobby-coin-room-heading h3; the declarations inside control its matching elements.

### Line 538

```text
  margin-bottom: 4px;
```

Sets margin-bottom: 4px (sets bottom outer spacing).

### Line 539

```text
  color: var(--gold-primary);
```

Sets color: var(--gold-primary) (sets text color).

### Line 540

```text
  font-size: 1.35rem;
```

Sets font-size: 1.35rem (sets text size).

### Line 541

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 542

```text

```

Blank line separates stylesheet rules.

### Line 543

```text
.lobby-slot-room-heading > div > p:last-child, .lobby-coin-room-heading > div > p:last-child {
```

Selects .lobby-slot-room-heading > div > p:last-child, .lobby-coin-room-heading > div > p:last-child; the declarations inside control its matching elements.

### Line 544

```text
  color: #c8c1d0;
```

Sets color: #c8c1d0 (sets text color).

### Line 545

```text
  font-size: 0.82rem;
```

Sets font-size: 0.82rem (sets text size).

### Line 546

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 547

```text

```

Blank line separates stylesheet rules.

### Line 548

```text
/* Auto-fit uses the same minimum comfortable card width as the main lobby grid, including when catalog cards are appended at runtime. */
```

Comment: Auto-fit uses the same minimum comfortable card width as the main lobby grid, including when catalog cards are appended at runtime..

### Line 549

```text
.slot-room-grid {
```

Selects .slot-room-grid; the declarations inside control its matching elements.

### Line 550

```text
  display: grid;
```

Sets display: grid (controls layout mode/visibility).

### Line 551

```text
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

Sets grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) (defines grid columns).

### Line 552

```text
  gap: 20px;
```

Sets gap: 20px (sets spacing between flex/grid children).

### Line 553

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 554

```text

```

Blank line separates stylesheet rules.

### Line 555

```text
.game-card {
```

Selects .game-card; the declarations inside control its matching elements.

### Line 556

```text
  background: var(--panel-bg);
```

Sets background: var(--panel-bg) (paints the background).

### Line 557

```text
  border: 2px solid #333;
```

Sets border: 2px solid #333 (sets border width/style/color).

### Line 558

```text
  border-radius: 16px;
```

Sets border-radius: 16px (rounds corners).

### Line 559

```text
  padding: 24px;
```

Sets padding: 24px (adds inner spacing).

### Line 560

```text
  text-align: center;
```

Sets text-align: center (aligns text).

### Line 561

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 562

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 563

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 564

```text
  gap: 12px;
```

Sets gap: 12px (sets spacing between flex/grid children).

### Line 565

```text
  transition: transform 0.2s, border-color 0.2s;
```

Sets transition: transform 0.2s, border-color 0.2s (animates changes to listed properties).

### Line 566

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 567

```text

```

Blank line separates stylesheet rules.

### Line 568

```text
.game-card:hover { transform: translateY(-5px); border-color: var(--gold-primary); }
```

Selects .game-card:hover and applies transform: translateY(-5px); border-color: var(--gold-primary).

### Line 569

```text
.card-icon { font-size: 3.5rem; }
```

Selects .card-icon and applies font-size: 3.5rem.

### Line 570

```text

```

Blank line separates stylesheet rules.

### Line 571

```text
.play-btn {
```

Selects .play-btn; the declarations inside control its matching elements.

### Line 572

```text
  background: linear-gradient(180deg, #ffd700 0%, #b8860b 100%);
```

Sets background: linear-gradient(180deg, #ffd700 0%, #b8860b 100%) (paints the background).

### Line 573

```text
  color: #000;
```

Sets color: #000 (sets text color).

### Line 574

```text
  border: none;
```

Sets border: none (sets border width/style/color).

### Line 575

```text
  padding: 10px 20px;
```

Sets padding: 10px 20px (adds inner spacing).

### Line 576

```text
  font-size: 1rem;
```

Sets font-size: 1rem (sets text size).

### Line 577

```text
  font-weight: bold;
```

Sets font-weight: bold (sets text weight).

### Line 578

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 579

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 580

```text
  margin-top: auto;
```

Sets margin-top: auto (sets top outer spacing).

### Line 581

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 582

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 583

```text

```

Blank line separates stylesheet rules.

### Line 584

```text
.back-lobby-btn {
```

Selects .back-lobby-btn; the declarations inside control its matching elements.

### Line 585

```text
  background: #333;
```

Sets background: #333 (paints the background).

### Line 586

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 587

```text
  border: 1px solid #555;
```

Sets border: 1px solid #555 (sets border width/style/color).

### Line 588

```text
  padding: 8px 16px;
```

Sets padding: 8px 16px (adds inner spacing).

### Line 589

```text
  border-radius: 6px;
```

Sets border-radius: 6px (rounds corners).

### Line 590

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 591

```text
  margin-bottom: 15px;
```

Sets margin-bottom: 15px (sets bottom outer spacing).

### Line 592

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 593

```text

```

Blank line separates stylesheet rules.

### Line 594

```text
/* Shared cabinet surfaces visually connect game tables while each game keeps its own inner layout. */
```

Comment: Shared cabinet surfaces visually connect game tables while each game keeps its own inner layout..

### Line 595

```text
.slot-machine {
```

Selects .slot-machine; the declarations inside control its matching elements.

### Line 596

```text
  background: linear-gradient(145deg, #2a2a35, #141419);
```

Sets background: linear-gradient(145deg, #2a2a35, #141419) (paints the background).

### Line 597

```text
  border: 4px solid var(--gold-primary);
```

Sets border: 4px solid var(--gold-primary) (sets border width/style/color).

### Line 598

```text
  border-radius: 24px;
```

Sets border-radius: 24px (rounds corners).

### Line 599

```text
  padding: 24px;
```

Sets padding: 24px (adds inner spacing).

### Line 600

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 601

```text
  margin: 0 auto;
```

Sets margin: 0 auto (sets outer spacing).

### Line 602

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 603

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 604

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 605

```text
  gap: 20px;
```

Sets gap: 20px (sets spacing between flex/grid children).

### Line 606

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 607

```text

```

Blank line separates stylesheet rules.

### Line 608

```text
.slot-machine.slot-5reel, .slot-machine.coin-toss-machine, .slot-machine.three-coin-toss-machine, .slot-machine.blackjack-table { max-width: 580px; }
```

Selects .slot-machine.slot-5reel, .slot-machine.coin-toss-machine, .slot-machine.three-coin-toss-machine, .slot-machine.blackjack-table and applies max-width: 580px.

### Line 609

```text

```

Blank line separates stylesheet rules.

### Line 610

```text
/* Felt Blackjack Table Styling */
```

Comment: Felt Blackjack Table Styling.

### Line 611

```text
.felt-table {
```

Selects .felt-table; the declarations inside control its matching elements.

### Line 612

```text
  background: radial-gradient(circle, #1a5e35 0%, #0c331c 100%);
```

Sets background: radial-gradient(circle, #1a5e35 0%, #0c331c 100%) (paints the background).

### Line 613

```text
  border: 3px solid var(--gold-primary);
```

Sets border: 3px solid var(--gold-primary) (sets border width/style/color).

### Line 614

```text
  border-radius: 16px;
```

Sets border-radius: 16px (rounds corners).

### Line 615

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 616

```text
  padding: 20px;
```

Sets padding: 20px (adds inner spacing).

### Line 617

```text
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.6);
```

Sets box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.6) (adds outer/inset shadow).

### Line 618

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 619

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 620

```text
  gap: 16px;
```

Sets gap: 16px (sets spacing between flex/grid children).

### Line 621

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 622

```text

```

Blank line separates stylesheet rules.

### Line 623

```text
.table-divider {
```

Selects .table-divider; the declarations inside control its matching elements.

### Line 624

```text
  border-top: 1px dashed rgba(255, 215, 0, 0.4);
```

Sets border-top: 1px dashed rgba(255, 215, 0, 0.4) (sets top border).

### Line 625

```text
  border-bottom: 1px dashed rgba(255, 215, 0, 0.4);
```

Sets border-bottom: 1px dashed rgba(255, 215, 0, 0.4) (sets bottom border).

### Line 626

```text
  padding: 4px;
```

Sets padding: 4px (adds inner spacing).

### Line 627

```text
  text-align: center;
```

Sets text-align: center (aligns text).

### Line 628

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 629

```text

```

Blank line separates stylesheet rules.

### Line 630

```text
.table-divider span {
```

Selects .table-divider span; the declarations inside control its matching elements.

### Line 631

```text
  font-size: 0.65rem;
```

Sets font-size: 0.65rem (sets text size).

### Line 632

```text
  font-weight: bold;
```

Sets font-weight: bold (sets text weight).

### Line 633

```text
  color: var(--gold-primary);
```

Sets color: var(--gold-primary) (sets text color).

### Line 634

```text
  letter-spacing: 1px;
```

Sets letter-spacing: 1px (sets spacing between characters).

### Line 635

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 636

```text

```

Blank line separates stylesheet rules.

### Line 637

```text
.hand-section {
```

Selects .hand-section; the declarations inside control its matching elements.

### Line 638

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 639

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 640

```text
  gap: 8px;
```

Sets gap: 8px (sets spacing between flex/grid children).

### Line 641

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 642

```text

```

Blank line separates stylesheet rules.

### Line 643

```text
.hand-header {
```

Selects .hand-header; the declarations inside control its matching elements.

### Line 644

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 645

```text
  justify-content: space-between;
```

Sets justify-content: space-between (distributes children on main axis).

### Line 646

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 647

```text
  font-size: 0.85rem;
```

Sets font-size: 0.85rem (sets text size).

### Line 648

```text
  font-weight: bold;
```

Sets font-weight: bold (sets text weight).

### Line 649

```text
  color: #ddd;
```

Sets color: #ddd (sets text color).

### Line 650

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 651

```text

```

Blank line separates stylesheet rules.

### Line 652

```text
.score-badge {
```

Selects .score-badge; the declarations inside control its matching elements.

### Line 653

```text
  background: #000;
```

Sets background: #000 (paints the background).

### Line 654

```text
  border: 1px solid var(--gold-primary);
```

Sets border: 1px solid var(--gold-primary) (sets border width/style/color).

### Line 655

```text
  color: var(--gold-primary);
```

Sets color: var(--gold-primary) (sets text color).

### Line 656

```text
  padding: 2px 8px;
```

Sets padding: 2px 8px (adds inner spacing).

### Line 657

```text
  border-radius: 6px;
```

Sets border-radius: 6px (rounds corners).

### Line 658

```text
  font-size: 0.85rem;
```

Sets font-size: 0.85rem (sets text size).

### Line 659

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 660

```text

```

Blank line separates stylesheet rules.

### Line 661

```text
.cards-container {
```

Selects .cards-container; the declarations inside control its matching elements.

### Line 662

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 663

```text
  gap: 8px;
```

Sets gap: 8px (sets spacing between flex/grid children).

### Line 664

```text
  min-height: 80px;
```

Sets min-height: 80px (sets minimum height).

### Line 665

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 666

```text
  flex-wrap: wrap;
```

Sets flex-wrap: wrap (allows children to wrap).

### Line 667

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 668

```text

```

Blank line separates stylesheet rules.

### Line 669

```text
.playing-card {
```

Selects .playing-card; the declarations inside control its matching elements.

### Line 670

```text
  width: 55px;
```

Sets width: 55px (sets used width).

### Line 671

```text
  height: 80px;
```

Sets height: 80px (sets used height).

### Line 672

```text
  background: #ffffff;
```

Sets background: #ffffff (paints the background).

### Line 673

```text
  color: #111;
```

Sets color: #111 (sets text color).

### Line 674

```text
  border-radius: 6px;
```

Sets border-radius: 6px (rounds corners).

### Line 675

```text
  border: 1px solid #ccc;
```

Sets border: 1px solid #ccc (sets border width/style/color).

### Line 676

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 677

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 678

```text
  justify-content: space-between;
```

Sets justify-content: space-between (distributes children on main axis).

### Line 679

```text
  padding: 4px 6px;
```

Sets padding: 4px 6px (adds inner spacing).

### Line 680

```text
  font-weight: bold;
```

Sets font-weight: bold (sets text weight).

### Line 681

```text
  box-shadow: 2px 4px 8px rgba(0,0,0,0.4);
```

Sets box-shadow: 2px 4px 8px rgba(0,0,0,0.4) (adds outer/inset shadow).

### Line 682

```text
  animation: dealCard 0.2s ease-out;
```

Sets animation: dealCard 0.2s ease-out (runs a named CSS animation).

### Line 683

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 684

```text

```

Blank line separates stylesheet rules.

### Line 685

```text
@keyframes dealCard {
```

Defines animation timeline dealCard for changing properties over time.

### Line 686

```text
  from { transform: translateY(-20px); opacity: 0; }
```

Selects from and applies transform: translateY(-20px); opacity: 0.

### Line 687

```text
  to { transform: translateY(0); opacity: 1; }
```

Selects to and applies transform: translateY(0); opacity: 1.

### Line 688

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 689

```text

```

Blank line separates stylesheet rules.

### Line 690

```text
.playing-card.red-suit { color: #d63031; }
```

Selects .playing-card.red-suit and applies color: #d63031.

### Line 691

```text

```

Blank line separates stylesheet rules.

### Line 692

```text
.playing-card.card-back {
```

Selects .playing-card.card-back; the declarations inside control its matching elements.

### Line 693

```text
  background: repeating-linear-gradient(45deg, #2c3e50, #2c3e50 10px, #34495e 10px, #34495e 20px);
```

Sets background: repeating-linear-gradient(45deg, #2c3e50, #2c3e50 10px, #34495e 10px, #34495e 20px) (paints the background).

### Line 694

```text
  border: 2px solid #fff;
```

Sets border: 2px solid #fff (sets border width/style/color).

### Line 695

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 696

```text

```

Blank line separates stylesheet rules.

### Line 697

```text
.card-top { font-size: 0.9rem; line-height: 1; }
```

Selects .card-top and applies font-size: 0.9rem; line-height: 1.

### Line 698

```text
.card-center { font-size: 1.4rem; align-self: center; }
```

Selects .card-center and applies font-size: 1.4rem; align-self: center.

### Line 699

```text
.card-bottom { font-size: 0.9rem; line-height: 1; align-self: flex-end; }
```

Selects .card-bottom and applies font-size: 0.9rem; line-height: 1; align-self: flex-end.

### Line 700

```text

```

Blank line separates stylesheet rules.

### Line 701

```text
/* Action Buttons */
```

Comment: Action Buttons.

### Line 702

```text
.action-btn-green, .action-btn-red, .action-btn-gold {
```

Selects .action-btn-green, .action-btn-red, .action-btn-gold; the declarations inside control its matching elements.

### Line 703

```text
  flex: 1;
```

Sets flex: 1 (sets flex growth/shrink/basis).

### Line 704

```text
  border: none;
```

Sets border: none (sets border width/style/color).

### Line 705

```text
  padding: 12px;
```

Sets padding: 12px (adds inner spacing).

### Line 706

```text
  font-size: 1rem;
```

Sets font-size: 1rem (sets text size).

### Line 707

```text
  font-weight: bold;
```

Sets font-weight: bold (sets text weight).

### Line 708

```text
  border-radius: 10px;
```

Sets border-radius: 10px (rounds corners).

### Line 709

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 710

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 711

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 712

```text

```

Blank line separates stylesheet rules.

### Line 713

```text
.action-btn-green { background: #27ae60; }
```

Selects .action-btn-green and applies background: #27ae60.

### Line 714

```text
.action-btn-green:hover { background: #2ecc71; }
```

Selects .action-btn-green:hover and applies background: #2ecc71.

### Line 715

```text

```

Blank line separates stylesheet rules.

### Line 716

```text
.action-btn-red { background: #c0392b; }
```

Selects .action-btn-red and applies background: #c0392b.

### Line 717

```text
.action-btn-red:hover { background: #e74c3c; }
```

Selects .action-btn-red:hover and applies background: #e74c3c.

### Line 718

```text

```

Blank line separates stylesheet rules.

### Line 719

```text
.action-btn-gold { background: #d35400; }
```

Selects .action-btn-gold and applies background: #d35400.

### Line 720

```text
.action-btn-gold:hover { background: #e67e22; }
```

Selects .action-btn-gold:hover and applies background: #e67e22.

### Line 721

```text

```

Blank line separates stylesheet rules.

### Line 722

```text
.header h1 { font-size: 1.8rem; color: var(--gold-primary); text-align: center; }
```

Selects .header h1 and applies font-size: 1.8rem; color: var(--gold-primary); text-align: center.

### Line 723

```text

```

Blank line separates stylesheet rules.

### Line 724

```text
.status-banner {
```

Selects .status-banner; the declarations inside control its matching elements.

### Line 725

```text
  background: #0a0a0d;
```

Sets background: #0a0a0d (paints the background).

### Line 726

```text
  border: 1px solid var(--gold-dark);
```

Sets border: 1px solid var(--gold-dark) (sets border width/style/color).

### Line 727

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 728

```text
  padding: 10px;
```

Sets padding: 10px (adds inner spacing).

### Line 729

```text
  font-weight: bold;
```

Sets font-weight: bold (sets text weight).

### Line 730

```text
  font-size: 1.1rem;
```

Sets font-size: 1.1rem (sets text size).

### Line 731

```text
  min-height: 45px;
```

Sets min-height: 45px (sets minimum height).

### Line 732

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 733

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 734

```text
  justify-content: center;
```

Sets justify-content: center (distributes children on main axis).

### Line 735

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 736

```text
  text-align: center;
```

Sets text-align: center (aligns text).

### Line 737

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 738

```text

```

Blank line separates stylesheet rules.

### Line 739

```text
.status-banner.status-spinning { color: #ffd700; }
```

Selects .status-banner.status-spinning and applies color: #ffd700.

### Line 740

```text
.status-banner.status-win { color: #4eef90; border-color: #4eef90; }
```

Selects .status-banner.status-win and applies color: #4eef90; border-color: #4eef90.

### Line 741

```text
.status-banner.status-loss { color: #ff4d4d; border-color: #ff4d4d; }
```

Selects .status-banner.status-loss and applies color: #ff4d4d; border-color: #ff4d4d.

### Line 742

```text
.status-banner.status-bonus { color: #e056fd; border-color: #e056fd; }
```

Selects .status-banner.status-bonus and applies color: #e056fd; border-color: #e056fd.

### Line 743

```text
.status-banner.status-jackpot { color: #ffd700; border-color: #ffd700; background: #5e0000; }
```

Selects .status-banner.status-jackpot and applies color: #ffd700; border-color: #ffd700; background: #5e0000.

### Line 744

```text

```

Blank line separates stylesheet rules.

### Line 745

```text
/* Coin Toss 3D Elements */
```

Comment: Coin Toss 3D Elements.

### Line 746

```text
.coin-stage {
```

Selects .coin-stage; the declarations inside control its matching elements.

### Line 747

```text
  perspective: 1000px;
```

Sets perspective: 1000px (sets perspective).

### Line 748

```text
  height: 160px;
```

Sets height: 160px (sets used height).

### Line 749

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 750

```text
  justify-content: center;
```

Sets justify-content: center (distributes children on main axis).

### Line 751

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 752

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 753

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 754

```text

```

Blank line separates stylesheet rules.

### Line 755

```text
.three-coin-stage {
```

Selects .three-coin-stage; the declarations inside control its matching elements.

### Line 756

```text
  perspective: 1000px;
```

Sets perspective: 1000px (sets perspective).

### Line 757

```text
  height: 160px;
```

Sets height: 160px (sets used height).

### Line 758

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 759

```text
  justify-content: space-evenly;
```

Sets justify-content: space-evenly (distributes children on main axis).

### Line 760

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 761

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 762

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 763

```text

```

Blank line separates stylesheet rules.

### Line 764

```text
.coin {
```

Selects .coin; the declarations inside control its matching elements.

### Line 765

```text
  width: 130px;
```

Sets width: 130px (sets used width).

### Line 766

```text
  height: 130px;
```

Sets height: 130px (sets used height).

### Line 767

```text
  position: relative;
```

Sets position: relative (sets positioning scheme).

### Line 768

```text
  transform-style: preserve-3d;
```

Sets transform-style: preserve-3d (preserves 3D child transforms).

### Line 769

```text
  transform: rotateY(0deg);
```

Sets transform: rotateY(0deg) (applies geometric transform).

### Line 770

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 771

```text

```

Blank line separates stylesheet rules.

### Line 772

```text
.coin.animate-heads {
```

Selects .coin.animate-heads; the declarations inside control its matching elements.

### Line 773

```text
  animation: flipToHeads 1.5s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
```

Sets animation: flipToHeads 1.5s cubic-bezier(0.1, 0.8, 0.2, 1) forwards (runs a named CSS animation).

### Line 774

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 775

```text

```

Blank line separates stylesheet rules.

### Line 776

```text
.coin.animate-tails {
```

Selects .coin.animate-tails; the declarations inside control its matching elements.

### Line 777

```text
  animation: flipToTails 1.5s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
```

Sets animation: flipToTails 1.5s cubic-bezier(0.1, 0.8, 0.2, 1) forwards (runs a named CSS animation).

### Line 778

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 779

```text

```

Blank line separates stylesheet rules.

### Line 780

```text
@keyframes flipToHeads {
```

Defines animation timeline flipToHeads for changing properties over time.

### Line 781

```text
  0% { transform: rotateY(0deg) scale(1); }
```

Selects 0% and applies transform: rotateY(0deg) scale(1).

### Line 782

```text
  50% { transform: rotateY(900deg) scale(1.3); }
```

Selects 50% and applies transform: rotateY(900deg) scale(1.3).

### Line 783

```text
  100% { transform: rotateY(1800deg) scale(1); }
```

Selects 100% and applies transform: rotateY(1800deg) scale(1).

### Line 784

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 785

```text

```

Blank line separates stylesheet rules.

### Line 786

```text
@keyframes flipToTails {
```

Defines animation timeline flipToTails for changing properties over time.

### Line 787

```text
  0% { transform: rotateY(0deg) scale(1); }
```

Selects 0% and applies transform: rotateY(0deg) scale(1).

### Line 788

```text
  50% { transform: rotateY(990deg) scale(1.3); }
```

Selects 50% and applies transform: rotateY(990deg) scale(1.3).

### Line 789

```text
  100% { transform: rotateY(1980deg) scale(1); }
```

Selects 100% and applies transform: rotateY(1980deg) scale(1).

### Line 790

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 791

```text

```

Blank line separates stylesheet rules.

### Line 792

```text
.coin-face {
```

Selects .coin-face; the declarations inside control its matching elements.

### Line 793

```text
  position: absolute;
```

Sets position: absolute (sets positioning scheme).

### Line 794

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 795

```text
  height: 100%;
```

Sets height: 100% (sets used height).

### Line 796

```text
  border-radius: 50%;
```

Sets border-radius: 50% (rounds corners).

### Line 797

```text
  border: 4px solid var(--gold-primary);
```

Sets border: 4px solid var(--gold-primary) (sets border width/style/color).

### Line 798

```text
  background: radial-gradient(circle, #2c2508 0%, #0a0902 100%);
```

Sets background: radial-gradient(circle, #2c2508 0%, #0a0902 100%) (paints the background).

### Line 799

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 800

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 801

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 802

```text
  justify-content: center;
```

Sets justify-content: center (distributes children on main axis).

### Line 803

```text
  font-size: 2.8rem;
```

Sets font-size: 2.8rem (sets text size).

### Line 804

```text
  backface-visibility: hidden;
```

Sets backface-visibility: hidden (sets backface-visibility).

### Line 805

```text
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
```

Sets box-shadow: 0 0 15px rgba(255, 215, 0, 0.3) (adds outer/inset shadow).

### Line 806

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 807

```text

```

Blank line separates stylesheet rules.

### Line 808

```text
.coin-face span {
```

Selects .coin-face span; the declarations inside control its matching elements.

### Line 809

```text
  font-size: 0.8rem;
```

Sets font-size: 0.8rem (sets text size).

### Line 810

```text
  font-weight: bold;
```

Sets font-weight: bold (sets text weight).

### Line 811

```text
  color: var(--gold-primary);
```

Sets color: var(--gold-primary) (sets text color).

### Line 812

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 813

```text

```

Blank line separates stylesheet rules.

### Line 814

```text
.coin-heads { transform: rotateY(0deg); }
```

Selects .coin-heads and applies transform: rotateY(0deg).

### Line 815

```text
.coin-tails { transform: rotateY(180deg); }
```

Selects .coin-tails and applies transform: rotateY(180deg).

### Line 816

```text

```

Blank line separates stylesheet rules.

### Line 817

```text
.choice-selector {
```

Selects .choice-selector; the declarations inside control its matching elements.

### Line 818

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 819

```text
  gap: 12px;
```

Sets gap: 12px (sets spacing between flex/grid children).

### Line 820

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 821

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 822

```text

```

Blank line separates stylesheet rules.

### Line 823

```text
.choice-btn {
```

Selects .choice-btn; the declarations inside control its matching elements.

### Line 824

```text
  flex: 1;
```

Sets flex: 1 (sets flex growth/shrink/basis).

### Line 825

```text
  background: #252530;
```

Sets background: #252530 (paints the background).

### Line 826

```text
  border: 2px solid #444;
```

Sets border: 2px solid #444 (sets border width/style/color).

### Line 827

```text
  color: #aaa;
```

Sets color: #aaa (sets text color).

### Line 828

```text
  padding: 10px;
```

Sets padding: 10px (adds inner spacing).

### Line 829

```text
  border-radius: 10px;
```

Sets border-radius: 10px (rounds corners).

### Line 830

```text
  font-weight: bold;
```

Sets font-weight: bold (sets text weight).

### Line 831

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 832

```text
  transition: all 0.2s;
```

Sets transition: all 0.2s (animates changes to listed properties).

### Line 833

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 834

```text

```

Blank line separates stylesheet rules.

### Line 835

```text
.choice-btn.active-choice {
```

Selects .choice-btn.active-choice; the declarations inside control its matching elements.

### Line 836

```text
  background: #3b3111;
```

Sets background: #3b3111 (paints the background).

### Line 837

```text
  border-color: var(--gold-primary);
```

Sets border-color: var(--gold-primary) (sets border color).

### Line 838

```text
  color: var(--gold-primary);
```

Sets color: var(--gold-primary) (sets text color).

### Line 839

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 840

```text

```

Blank line separates stylesheet rules.

### Line 841

```text
/* Bonus HUD */
```

Comment: Bonus HUD.

### Line 842

```text
.bonus-hud {
```

Selects .bonus-hud; the declarations inside control its matching elements.

### Line 843

```text
  background: radial-gradient(circle, #5b1380 0%, #200430 100%);
```

Sets background: radial-gradient(circle, #5b1380 0%, #200430 100%) (paints the background).

### Line 844

```text
  border: 2px solid #e056fd;
```

Sets border: 2px solid #e056fd (sets border width/style/color).

### Line 845

```text
  border-radius: 12px;
```

Sets border-radius: 12px (rounds corners).

### Line 846

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 847

```text
  padding: 8px 16px;
```

Sets padding: 8px 16px (adds inner spacing).

### Line 848

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 849

```text
  justify-content: space-around;
```

Sets justify-content: space-around (distributes children on main axis).

### Line 850

```text
  box-shadow: 0 0 15px rgba(224, 86, 253, 0.4);
```

Sets box-shadow: 0 0 15px rgba(224, 86, 253, 0.4) (adds outer/inset shadow).

### Line 851

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 852

```text

```

Blank line separates stylesheet rules.

### Line 853

```text
.bonus-stat { font-weight: bold; font-size: 0.95rem; color: #fff; }
```

Selects .bonus-stat and applies font-weight: bold; font-size: 0.95rem; color: #fff.

### Line 854

```text
.bonus-stat span { color: #ffd700; font-size: 1.1rem; }
```

Selects .bonus-stat span and applies color: #ffd700; font-size: 1.1rem.

### Line 855

```text

```

Blank line separates stylesheet rules.

### Line 856

```text
/* Viewports & Reels */
```

Comment: Viewports & Reels.

### Line 857

```text
.reels-viewport {
```

Selects .reels-viewport; the declarations inside control its matching elements.

### Line 858

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 859

```text
  justify-content: center;
```

Sets justify-content: center (distributes children on main axis).

### Line 860

```text
  gap: 10px;
```

Sets gap: 10px (sets spacing between flex/grid children).

### Line 861

```text
  background: #000;
```

Sets background: #000 (paints the background).

### Line 862

```text
  padding: 10px;
```

Sets padding: 10px (adds inner spacing).

### Line 863

```text
  border-radius: 14px;
```

Sets border-radius: 14px (rounds corners).

### Line 864

```text
  border: 3px solid #333;
```

Sets border: 3px solid #333 (sets border width/style/color).

### Line 865

```text
  height: calc(var(--symbol-size-3reel) * 3 + 20px);
```

Sets height: calc(var(--symbol-size-3reel) * 3 + 20px) (sets used height).

### Line 866

```text
  overflow: hidden;
```

Sets overflow: hidden (controls clipping/scrolling).

### Line 867

```text
  position: relative;
```

Sets position: relative (sets positioning scheme).

### Line 868

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 869

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 870

```text

```

Blank line separates stylesheet rules.

### Line 871

```text
.payline-overlay {
```

Selects .payline-overlay; the declarations inside control its matching elements.

### Line 872

```text
  position: absolute;
```

Sets position: absolute (sets positioning scheme).

### Line 873

```text
  top: 50%;
```

Sets top: 50% (sets top offset).

### Line 874

```text
  left: 0;
```

Sets left: 0 (sets left offset).

### Line 875

```text
  right: 0;
```

Sets right: 0 (sets right offset).

### Line 876

```text
  height: 2px;
```

Sets height: 2px (sets used height).

### Line 877

```text
  background: rgba(255, 215, 0, 0.4);
```

Sets background: rgba(255, 215, 0, 0.4) (paints the background).

### Line 878

```text
  pointer-events: none;
```

Sets pointer-events: none (controls hit testing).

### Line 879

```text
  z-index: 10;
```

Sets z-index: 10 (sets stacking order).

### Line 880

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 881

```text

```

Blank line separates stylesheet rules.

### Line 882

```text
.reel {
```

Selects .reel; the declarations inside control its matching elements.

### Line 883

```text
  width: var(--symbol-size-3reel);
```

Sets width: var(--symbol-size-3reel) (sets used width).

### Line 884

```text
  height: 100%;
```

Sets height: 100% (sets used height).

### Line 885

```text
  position: relative;
```

Sets position: relative (sets positioning scheme).

### Line 886

```text
  background: #181820;
```

Sets background: #181820 (paints the background).

### Line 887

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 888

```text
  overflow: hidden;
```

Sets overflow: hidden (controls clipping/scrolling).

### Line 889

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 890

```text

```

Blank line separates stylesheet rules.

### Line 891

```text
.reel .symbol { height: var(--symbol-size-3reel); font-size: 2.8rem; }
```

Selects .reel .symbol and applies height: var(--symbol-size-3reel); font-size: 2.8rem.

### Line 892

```text

```

Blank line separates stylesheet rules.

### Line 893

```text
.reels-viewport-5reel {
```

Selects .reels-viewport-5reel; the declarations inside control its matching elements.

### Line 894

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 895

```text
  justify-content: center;
```

Sets justify-content: center (distributes children on main axis).

### Line 896

```text
  gap: 6px;
```

Sets gap: 6px (sets spacing between flex/grid children).

### Line 897

```text
  background: #000;
```

Sets background: #000 (paints the background).

### Line 898

```text
  padding: 8px;
```

Sets padding: 8px (adds inner spacing).

### Line 899

```text
  border-radius: 14px;
```

Sets border-radius: 14px (rounds corners).

### Line 900

```text
  border: 3px solid #333;
```

Sets border: 3px solid #333 (sets border width/style/color).

### Line 901

```text
  height: calc(var(--symbol-size-5reel) * 3 + 16px);
```

Sets height: calc(var(--symbol-size-5reel) * 3 + 16px) (sets used height).

### Line 902

```text
  overflow: hidden;
```

Sets overflow: hidden (controls clipping/scrolling).

### Line 903

```text
  position: relative;
```

Sets position: relative (sets positioning scheme).

### Line 904

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 905

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 906

```text

```

Blank line separates stylesheet rules.

### Line 907

```text
.reel-5reel {
```

Selects .reel-5reel; the declarations inside control its matching elements.

### Line 908

```text
  width: var(--symbol-size-5reel);
```

Sets width: var(--symbol-size-5reel) (sets used width).

### Line 909

```text
  height: 100%;
```

Sets height: 100% (sets used height).

### Line 910

```text
  position: relative;
```

Sets position: relative (sets positioning scheme).

### Line 911

```text
  background: #181820;
```

Sets background: #181820 (paints the background).

### Line 912

```text
  border-radius: 6px;
```

Sets border-radius: 6px (rounds corners).

### Line 913

```text
  overflow: hidden;
```

Sets overflow: hidden (controls clipping/scrolling).

### Line 914

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 915

```text

```

Blank line separates stylesheet rules.

### Line 916

```text
.reel-5reel .symbol { height: var(--symbol-size-5reel); font-size: 2rem; }
```

Selects .reel-5reel .symbol and applies height: var(--symbol-size-5reel); font-size: 2rem.

### Line 917

```text

```

Blank line separates stylesheet rules.

### Line 918

```text
.strip {
```

Selects .strip; the declarations inside control its matching elements.

### Line 919

```text
  position: absolute;
```

Sets position: absolute (sets positioning scheme).

### Line 920

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 921

```text
  top: 0;
```

Sets top: 0 (sets top offset).

### Line 922

```text
  left: 0;
```

Sets left: 0 (sets left offset).

### Line 923

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 924

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 925

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 926

```text

```

Blank line separates stylesheet rules.

### Line 927

```text
.strip.is-spinning {
```

Selects .strip.is-spinning; the declarations inside control its matching elements.

### Line 928

```text
  transition: transform var(--spin-duration) cubic-bezier(0.1, 0.9, 0.2, 1.05);
```

Sets transition: transform var(--spin-duration) cubic-bezier(0.1, 0.9, 0.2, 1.05) (animates changes to listed properties).

### Line 929

```text
  transform: translateY(var(--spin-target-y));
```

Sets transform: translateY(var(--spin-target-y)) (applies geometric transform).

### Line 930

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 931

```text

```

Blank line separates stylesheet rules.

### Line 932

```text
.symbol {
```

Selects .symbol; the declarations inside control its matching elements.

### Line 933

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 934

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 935

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 936

```text
  justify-content: center;
```

Sets justify-content: center (distributes children on main axis).

### Line 937

```text
  background: #1d1d26;
```

Sets background: #1d1d26 (paints the background).

### Line 938

```text
  border-bottom: 1px solid #2a2a38;
```

Sets border-bottom: 1px solid #2a2a38 (sets bottom border).

### Line 939

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 940

```text

```

Blank line separates stylesheet rules.

### Line 941

```text
.symbol.highlight {
```

Selects .symbol.highlight; the declarations inside control its matching elements.

### Line 942

```text
  background: #3b3111;
```

Sets background: #3b3111 (paints the background).

### Line 943

```text
  border: 2px solid var(--gold-primary);
```

Sets border: 2px solid var(--gold-primary) (sets border width/style/color).

### Line 944

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 945

```text

```

Blank line separates stylesheet rules.

### Line 946

```text
.symbol.sticky-wild {
```

Selects .symbol.sticky-wild; the declarations inside control its matching elements.

### Line 947

```text
  background: #4a154b !important;
```

Sets background: #4a154b !important (paints the background).

### Line 948

```text
  border: 2px solid #e056fd !important;
```

Sets border: 2px solid #e056fd !important (sets border width/style/color).

### Line 949

```text
  box-shadow: inset 0 0 10px #e056fd;
```

Sets box-shadow: inset 0 0 10px #e056fd (adds outer/inset shadow).

### Line 950

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 951

```text

```

Blank line separates stylesheet rules.

### Line 952

```text
.dashboard { width: 100%; }
```

Selects .dashboard and applies width: 100%.

### Line 953

```text
.card {
```

Selects .card; the declarations inside control its matching elements.

### Line 954

```text
  background: var(--panel-bg);
```

Sets background: var(--panel-bg) (paints the background).

### Line 955

```text
  border: 1px solid #333;
```

Sets border: 1px solid #333 (sets border width/style/color).

### Line 956

```text
  padding: 10px;
```

Sets padding: 10px (adds inner spacing).

### Line 957

```text
  border-radius: 10px;
```

Sets border-radius: 10px (rounds corners).

### Line 958

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 959

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 960

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 961

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 962

```text

```

Blank line separates stylesheet rules.

### Line 963

```text
.card .label { font-size: 0.75rem; color: #aaa; }
```

Selects .card .label and applies font-size: 0.75rem; color: #aaa.

### Line 964

```text
.card .value { font-size: 1.2rem; font-weight: bold; }
```

Selects .card .value and applies font-size: 1.2rem; font-weight: bold.

### Line 965

```text

```

Blank line separates stylesheet rules.

### Line 966

```text
.bet-controls { display: flex; align-items: center; gap: 8px; }
```

Selects .bet-controls and applies display: flex; align-items: center; gap: 8px.

### Line 967

```text
.btn-small {
```

Selects .btn-small; the declarations inside control its matching elements.

### Line 968

```text
  background: #333;
```

Sets background: #333 (paints the background).

### Line 969

```text
  color: var(--gold-primary);
```

Sets color: var(--gold-primary) (sets text color).

### Line 970

```text
  border: 1px solid var(--gold-dark);
```

Sets border: 1px solid var(--gold-dark) (sets border width/style/color).

### Line 971

```text
  width: 28px;
```

Sets width: 28px (sets used width).

### Line 972

```text
  height: 28px;
```

Sets height: 28px (sets used height).

### Line 973

```text
  border-radius: 6px;
```

Sets border-radius: 6px (rounds corners).

### Line 974

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 975

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 976

```text

```

Blank line separates stylesheet rules.

### Line 977

```text
.actions { display: flex; gap: 10px; width: 100%; }
```

Selects .actions and applies display: flex; gap: 10px; width: 100%.

### Line 978

```text
.spin-btn {
```

Selects .spin-btn; the declarations inside control its matching elements.

### Line 979

```text
  flex: 2;
```

Sets flex: 2 (sets flex growth/shrink/basis).

### Line 980

```text
  background: linear-gradient(180deg, #ffd700 0%, #b8860b 100%);
```

Sets background: linear-gradient(180deg, #ffd700 0%, #b8860b 100%) (paints the background).

### Line 981

```text
  color: #000;
```

Sets color: #000 (sets text color).

### Line 982

```text
  border: none;
```

Sets border: none (sets border width/style/color).

### Line 983

```text
  padding: 14px;
```

Sets padding: 14px (adds inner spacing).

### Line 984

```text
  font-size: 1.3rem;
```

Sets font-size: 1.3rem (sets text size).

### Line 985

```text
  font-weight: 900;
```

Sets font-weight: 900 (sets text weight).

### Line 986

```text
  border-radius: 12px;
```

Sets border-radius: 12px (rounds corners).

### Line 987

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 988

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 989

```text

```

Blank line separates stylesheet rules.

### Line 990

```text
.spin-btn:disabled { opacity: 0.5; cursor: not-allowed; }
```

Selects .spin-btn:disabled and applies opacity: 0.5; cursor: not-allowed.

### Line 991

```text
.max-btn {
```

Selects .max-btn; the declarations inside control its matching elements.

### Line 992

```text
  flex: 1;
```

Sets flex: 1 (sets flex growth/shrink/basis).

### Line 993

```text
  background: #3a1c1c;
```

Sets background: #3a1c1c (paints the background).

### Line 994

```text
  color: #ff6b6b;
```

Sets color: #ff6b6b (sets text color).

### Line 995

```text
  border: 1px solid #ff4d4d;
```

Sets border: 1px solid #ff4d4d (sets border width/style/color).

### Line 996

```text
  border-radius: 12px;
```

Sets border-radius: 12px (rounds corners).

### Line 997

```text
  font-weight: bold;
```

Sets font-weight: bold (sets text weight).

### Line 998

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 999

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1000

```text

```

Blank line separates stylesheet rules.

### Line 1001

```text
/* ==========================================
```

Comment: ========================================.

### Line 1002

```text
   MOBILE RESPONSIVE OVERRIDES (max-width: 768px)
```

Sets MOBILE RESPONSIVE OVERRIDES (max-width: 768px) (sets MOBILE RESPONSIVE OVERRIDES (max-width).

### Line 1003

```text
   ========================================== */
```

Finishes the multiline comment labeling the following max-width: 768px mobile overrides.

### Line 1004

```text

```

Blank line separates stylesheet rules.

### Line 1005

```text
@media (max-width: 768px) {
```

Begins a responsive rule block that applies only when (max-width: 768px).

### Line 1006

```text

```

Blank line separates stylesheet rules.

### Line 1007

```text
  /* 1. Global Header Adaptations */
```

Comment: 1. Global Header Adaptations.

### Line 1008

```text
  .global-bar {
```

Selects .global-bar; the declarations inside control its matching elements.

### Line 1009

```text
    flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 1010

```text
    padding: 10px 14px;
```

Sets padding: 10px 14px (adds inner spacing).

### Line 1011

```text
    gap: 8px;
```

Sets gap: 8px (sets spacing between flex/grid children).

### Line 1012

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1013

```text

```

Blank line separates stylesheet rules.

### Line 1014

```text
  .logo-title {
```

Selects .logo-title; the declarations inside control its matching elements.

### Line 1015

```text
    font-size: 1.1rem;
```

Sets font-size: 1.1rem (sets text size).

### Line 1016

```text
    letter-spacing: 1px;
```

Sets letter-spacing: 1px (sets spacing between characters).

### Line 1017

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1018

```text

```

Blank line separates stylesheet rules.

### Line 1019

```text
  .xp-header-widget {
```

Selects .xp-header-widget; the declarations inside control its matching elements.

### Line 1020

```text
    width: 100%;
```

Sets width: 100% (sets used width).

### Line 1021

```text
    justify-content: space-between;
```

Sets justify-content: space-between (distributes children on main axis).

### Line 1022

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1023

```text

```

Blank line separates stylesheet rules.

### Line 1024

```text
  .xp-bar-container {
```

Selects .xp-bar-container; the declarations inside control its matching elements.

### Line 1025

```text
    flex: 1;
```

Sets flex: 1 (sets flex growth/shrink/basis).

### Line 1026

```text
    max-width: 140px;
```

Sets max-width: 140px (sets maximum width).

### Line 1027

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1028

```text

```

Blank line separates stylesheet rules.

### Line 1029

```text
  .jackpot-ticker-container {
```

Selects .jackpot-ticker-container; the declarations inside control its matching elements.

### Line 1030

```text
    width: 100%;
```

Sets width: 100% (sets used width).

### Line 1031

```text
    padding: 4px 10px;
```

Sets padding: 4px 10px (adds inner spacing).

### Line 1032

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1033

```text

```

Blank line separates stylesheet rules.

### Line 1034

```text
  .jackpot-amount {
```

Selects .jackpot-amount; the declarations inside control its matching elements.

### Line 1035

```text
    font-size: 1.1rem;
```

Sets font-size: 1.1rem (sets text size).

### Line 1036

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1037

```text

```

Blank line separates stylesheet rules.

### Line 1038

```text
  .header-right {
```

Selects .header-right; the declarations inside control its matching elements.

### Line 1039

```text
    width: 100%;
```

Sets width: 100% (sets used width).

### Line 1040

```text
    justify-content: space-between;
```

Sets justify-content: space-between (distributes children on main axis).

### Line 1041

```text
    flex-wrap: wrap;
```

Sets flex-wrap: wrap (allows children to wrap).

### Line 1042

```text
    gap: 6px;
```

Sets gap: 6px (sets spacing between flex/grid children).

### Line 1043

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1044

```text

```

Blank line separates stylesheet rules.

### Line 1045

```text
  .wallet-display {
```

Selects .wallet-display; the declarations inside control its matching elements.

### Line 1046

```text
    padding: 2px 8px;
```

Sets padding: 2px 8px (adds inner spacing).

### Line 1047

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1048

```text

```

Blank line separates stylesheet rules.

### Line 1049

```text
  .wallet-amount {
```

Selects .wallet-amount; the declarations inside control its matching elements.

### Line 1050

```text
    font-size: 0.95rem;
```

Sets font-size: 0.95rem (sets text size).

### Line 1051

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1052

```text

```

Blank line separates stylesheet rules.

### Line 1053

```text
  .wheel-header-btn, .bank-btn, .icon-btn, .reset-data-btn {
```

Selects .wheel-header-btn, .bank-btn, .icon-btn, .reset-data-btn; the declarations inside control its matching elements.

### Line 1054

```text
    padding: 6px 10px;
```

Sets padding: 6px 10px (adds inner spacing).

### Line 1055

```text
    font-size: 0.8rem;
```

Sets font-size: 0.8rem (sets text size).

### Line 1056

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1057

```text

```

Blank line separates stylesheet rules.

### Line 1058

```text
  /* 2. Main Container & Stage Scaling */
```

Comment: 2. Main Container & Stage Scaling.

### Line 1059

```text
  #app-container {
```

Selects #app-container; the declarations inside control its matching elements.

### Line 1060

```text
    padding: 10px 8px;
```

Sets padding: 10px 8px (adds inner spacing).

### Line 1061

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1062

```text

```

Blank line separates stylesheet rules.

### Line 1063

```text
  .slot-machine {
```

Selects .slot-machine; the declarations inside control its matching elements.

### Line 1064

```text
    padding: 14px 10px;
```

Sets padding: 14px 10px (adds inner spacing).

### Line 1065

```text
    border-radius: 16px;
```

Sets border-radius: 16px (rounds corners).

### Line 1066

```text
    gap: 14px;
```

Sets gap: 14px (sets spacing between flex/grid children).

### Line 1067

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1068

```text

```

Blank line separates stylesheet rules.

### Line 1069

```text
  .slot-machine.slot-5reel,
```

Continues the mobile selector list for the 5-reel slot machine, whose width is capped at 100% below.

### Line 1070

```text
  .slot-machine.coin-toss-machine,
```

Continues the mobile selector list for the coin-toss machine, grouping it with the other full-width game cabinets.

### Line 1071

```text
  .slot-machine.blackjack-table {
```

Selects .slot-machine.blackjack-table; the declarations inside control its matching elements.

### Line 1072

```text
    max-width: 100%;
```

Sets max-width: 100% (sets maximum width).

### Line 1073

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1074

```text

```

Blank line separates stylesheet rules.

### Line 1075

```text
  /* 3. 3-Reel & 5-Reel Slot Scaling */
```

Comment: 3. 3-Reel & 5-Reel Slot Scaling.

### Line 1076

```text
  :root {
```

Selects :root; the declarations inside control its matching elements.

### Line 1077

```text
    --symbol-size-3reel: 90px;
```

Sets --symbol-size-3reel: 90px (sets --symbol-size-3reel).

### Line 1078

```text
    --symbol-size-5reel: 70px;
```

Sets --symbol-size-5reel: 70px (sets --symbol-size-5reel).

### Line 1079

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1080

```text

```

Blank line separates stylesheet rules.

### Line 1081

```text
  .reel .symbol {
```

Selects .reel .symbol; the declarations inside control its matching elements.

### Line 1082

```text
    font-size: 2rem;
```

Sets font-size: 2rem (sets text size).

### Line 1083

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1084

```text

```

Blank line separates stylesheet rules.

### Line 1085

```text
  .reel-5reel .symbol {
```

Selects .reel-5reel .symbol; the declarations inside control its matching elements.

### Line 1086

```text
    font-size: 1.4rem;
```

Sets font-size: 1.4rem (sets text size).

### Line 1087

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1088

```text

```

Blank line separates stylesheet rules.

### Line 1089

```text
  .reels-viewport-5reel {
```

Selects .reels-viewport-5reel; the declarations inside control its matching elements.

### Line 1090

```text
    gap: 3px;
```

Sets gap: 3px (sets spacing between flex/grid children).

### Line 1091

```text
    padding: 4px;
```

Sets padding: 4px (adds inner spacing).

### Line 1092

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1093

```text

```

Blank line separates stylesheet rules.

### Line 1094

```text
  /* 4. Felt Table & Card Visuals for Mobile */
```

Comment: 4. Felt Table & Card Visuals for Mobile.

### Line 1095

```text
  .felt-table {
```

Selects .felt-table; the declarations inside control its matching elements.

### Line 1096

```text
    padding: 12px 8px;
```

Sets padding: 12px 8px (adds inner spacing).

### Line 1097

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1098

```text

```

Blank line separates stylesheet rules.

### Line 1099

```text
  .playing-card {
```

Selects .playing-card; the declarations inside control its matching elements.

### Line 1100

```text
    width: 44px;
```

Sets width: 44px (sets used width).

### Line 1101

```text
    height: 64px;
```

Sets height: 64px (sets used height).

### Line 1102

```text
    padding: 2px 4px;
```

Sets padding: 2px 4px (adds inner spacing).

### Line 1103

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1104

```text

```

Blank line separates stylesheet rules.

### Line 1105

```text
  .card-top, .card-bottom {
```

Selects .card-top, .card-bottom; the declarations inside control its matching elements.

### Line 1106

```text
    font-size: 0.75rem;
```

Sets font-size: 0.75rem (sets text size).

### Line 1107

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1108

```text

```

Blank line separates stylesheet rules.

### Line 1109

```text
  .card-center {
```

Selects .card-center; the declarations inside control its matching elements.

### Line 1110

```text
    font-size: 1rem;
```

Sets font-size: 1rem (sets text size).

### Line 1111

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1112

```text

```

Blank line separates stylesheet rules.

### Line 1113

```text
  .cards-container {
```

Selects .cards-container; the declarations inside control its matching elements.

### Line 1114

```text
    min-height: 66px;
```

Sets min-height: 66px (sets minimum height).

### Line 1115

```text
    gap: 4px;
```

Sets gap: 4px (sets spacing between flex/grid children).

### Line 1116

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1117

```text

```

Blank line separates stylesheet rules.

### Line 1118

```text
  .score-badge {
```

Selects .score-badge; the declarations inside control its matching elements.

### Line 1119

```text
    font-size: 0.75rem;
```

Sets font-size: 0.75rem (sets text size).

### Line 1120

```text
    padding: 2px 6px;
```

Sets padding: 2px 6px (adds inner spacing).

### Line 1121

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1122

```text

```

Blank line separates stylesheet rules.

### Line 1123

```text
  /* 5. Mobile Touch Action Controls */
```

Comment: 5. Mobile Touch Action Controls.

### Line 1124

```text
  .actions {
```

Selects .actions; the declarations inside control its matching elements.

### Line 1125

```text
    flex-wrap: wrap;
```

Sets flex-wrap: wrap (allows children to wrap).

### Line 1126

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1127

```text

```

Blank line separates stylesheet rules.

### Line 1128

```text
  .spin-btn, .action-btn-green, .action-btn-red, .action-btn-gold, .max-btn {
```

Selects .spin-btn, .action-btn-green, .action-btn-red, .action-btn-gold, .max-btn; the declarations inside control its matching elements.

### Line 1129

```text
    font-size: 1rem;
```

Sets font-size: 1rem (sets text size).

### Line 1130

```text
    padding: 12px;
```

Sets padding: 12px (adds inner spacing).

### Line 1131

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1132

```text

```

Blank line separates stylesheet rules.

### Line 1133

```text
  .choice-selector {
```

Selects .choice-selector; the declarations inside control its matching elements.

### Line 1134

```text
    flex-direction: row;
```

Sets flex-direction: row (sets flex main-axis direction).

### Line 1135

```text
    gap: 8px;
```

Sets gap: 8px (sets spacing between flex/grid children).

### Line 1136

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1137

```text

```

Blank line separates stylesheet rules.

### Line 1138

```text
  .choice-btn {
```

Selects .choice-btn; the declarations inside control its matching elements.

### Line 1139

```text
    padding: 8px;
```

Sets padding: 8px (adds inner spacing).

### Line 1140

```text
    font-size: 0.85rem;
```

Sets font-size: 0.85rem (sets text size).

### Line 1141

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1142

```text

```

Blank line separates stylesheet rules.

### Line 1143

```text
  /* 6. Wheel Stage Scaling */
```

Comment: 6. Wheel Stage Scaling.

### Line 1144

```text
  .wheel-modal-card {
```

Selects .wheel-modal-card; the declarations inside control its matching elements.

### Line 1145

```text
    padding: 20px 14px;
```

Sets padding: 20px 14px (adds inner spacing).

### Line 1146

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1147

```text

```

Blank line separates stylesheet rules.

### Line 1148

```text
  .wheel-stage-container {
```

Selects .wheel-stage-container; the declarations inside control its matching elements.

### Line 1149

```text
    width: 260px;
```

Sets width: 260px (sets used width).

### Line 1150

```text
    height: 260px;
```

Sets height: 260px (sets used height).

### Line 1151

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1152

```text

```

Blank line separates stylesheet rules.

### Line 1153

```text
  #wheel-canvas {
```

Selects #wheel-canvas; the declarations inside control its matching elements.

### Line 1154

```text
    width: 260px !important;
```

Sets width: 260px !important (sets used width).

### Line 1155

```text
    height: 260px !important;
```

Sets height: 260px !important (sets used height).

### Line 1156

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1157

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1158

```text

```

Blank line separates stylesheet rules.

### Line 1159

```text

```

Blank line separates stylesheet rules.

### Line 1160

```text
/* Local save controls */
```

Comment: Local save controls.

### Line 1161

```text
.local-save-header-btn {
```

Selects .local-save-header-btn; the declarations inside control its matching elements.

### Line 1162

```text
  background: linear-gradient(180deg, #59419c 0%, #33245e 100%);
```

Sets background: linear-gradient(180deg, #59419c 0%, #33245e 100%) (paints the background).

### Line 1163

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 1164

```text
  border: 1px solid #8f75d6;
```

Sets border: 1px solid #8f75d6 (sets border width/style/color).

### Line 1165

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 1166

```text
  padding: 6px 10px;
```

Sets padding: 6px 10px (adds inner spacing).

### Line 1167

```text
  font-weight: 800;
```

Sets font-weight: 800 (sets text weight).

### Line 1168

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 1169

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1170

```text
.local-save-header-btn:hover { background: #634bad; }
```

Selects .local-save-header-btn:hover and applies background: #634bad.

### Line 1171

```text
.startup-overlay {
```

Selects .startup-overlay; the declarations inside control its matching elements.

### Line 1172

```text
  position: fixed;
```

Sets position: fixed (sets positioning scheme).

### Line 1173

```text
  inset: 0;
```

Sets inset: 0 (sets inset).

### Line 1174

```text
  z-index: 3000;
```

Sets z-index: 3000 (sets stacking order).

### Line 1175

```text
  display: grid;
```

Sets display: grid (controls layout mode/visibility).

### Line 1176

```text
  place-items: center;
```

Sets place-items: center (centers/aligns grid items).

### Line 1177

```text
  padding: 20px;
```

Sets padding: 20px (adds inner spacing).

### Line 1178

```text
  background: rgba(8, 5, 18, 0.94);
```

Sets background: rgba(8, 5, 18, 0.94) (paints the background).

### Line 1179

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1180

```text
.startup-card {
```

Selects .startup-card; the declarations inside control its matching elements.

### Line 1181

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 1182

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 1183

```text
  gap: 14px;
```

Sets gap: 14px (sets spacing between flex/grid children).

### Line 1184

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 1185

```text
  background: #181820;
```

Sets background: #181820 (paints the background).

### Line 1186

```text
  border: 1px solid var(--gold-primary);
```

Sets border: 1px solid var(--gold-primary) (sets border width/style/color).

### Line 1187

```text
  border-radius: 14px;
```

Sets border-radius: 14px (rounds corners).

### Line 1188

```text
  padding: 20px 24px;
```

Sets padding: 20px 24px (adds inner spacing).

### Line 1189

```text
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
```

Sets box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7) (adds outer/inset shadow).

### Line 1190

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1191

```text
.startup-spinner {
```

Selects .startup-spinner; the declarations inside control its matching elements.

### Line 1192

```text
  width: 22px;
```

Sets width: 22px (sets used width).

### Line 1193

```text
  height: 22px;
```

Sets height: 22px (sets used height).

### Line 1194

```text
  border: 3px solid rgba(255, 255, 255, 0.25);
```

Sets border: 3px solid rgba(255, 255, 255, 0.25) (sets border width/style/color).

### Line 1195

```text
  border-top-color: var(--gold-primary);
```

Sets border-top-color: var(--gold-primary) (sets border-top-color).

### Line 1196

```text
  border-radius: 50%;
```

Sets border-radius: 50% (rounds corners).

### Line 1197

```text
  animation: local-save-spin 0.8s linear infinite;
```

Sets animation: local-save-spin 0.8s linear infinite (runs a named CSS animation).

### Line 1198

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1199

```text
@keyframes local-save-spin { to { transform: rotate(360deg); } }
```

Defines animation timeline local-save-spin for changing properties over time.

### Line 1200

```text
.local-save-modal-card { max-width: 460px; }
```

Selects .local-save-modal-card and applies max-width: 460px.

### Line 1201

```text
.local-save-actions { display: grid; gap: 9px; margin-top: 16px; }
```

Selects .local-save-actions and applies display: grid; gap: 9px; margin-top: 16px.

### Line 1202

```text
.local-save-action-btn, .local-save-secondary-btn {
```

Selects .local-save-action-btn, .local-save-secondary-btn; the declarations inside control its matching elements.

### Line 1203

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 1204

```text
  padding: 11px 14px;
```

Sets padding: 11px 14px (adds inner spacing).

### Line 1205

```text
  font-weight: 800;
```

Sets font-weight: 800 (sets text weight).

### Line 1206

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 1207

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1208

```text
.local-save-action-btn {
```

Selects .local-save-action-btn; the declarations inside control its matching elements.

### Line 1209

```text
  border: 1px solid var(--gold-primary);
```

Sets border: 1px solid var(--gold-primary) (sets border width/style/color).

### Line 1210

```text
  background: linear-gradient(180deg, #b8860b, #72520a);
```

Sets background: linear-gradient(180deg, #b8860b, #72520a) (paints the background).

### Line 1211

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 1212

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1213

```text
.local-save-secondary-btn { border: 1px solid #585866; background: #292933; color: #ddd; }
```

Selects .local-save-secondary-btn and applies border: 1px solid #585866; background: #292933; color: #ddd.

### Line 1214

```text
.local-save-status {
```

Selects .local-save-status; the declarations inside control its matching elements.

### Line 1215

```text
  border: 1px solid #464652;
```

Sets border: 1px solid #464652 (sets border width/style/color).

### Line 1216

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 1217

```text
  background: #101017;
```

Sets background: #101017 (paints the background).

### Line 1218

```text
  color: #cfcfd8;
```

Sets color: #cfcfd8 (sets text color).

### Line 1219

```text
  padding: 10px 12px;
```

Sets padding: 10px 12px (adds inner spacing).

### Line 1220

```text
  font-size: 0.82rem;
```

Sets font-size: 0.82rem (sets text size).

### Line 1221

```text
  line-height: 1.45;
```

Sets line-height: 1.45 (sets line height).

### Line 1222

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1223

```text
.local-save-status[data-state="linked"] { color: #8ef0ae; border-color: #286b42; }
```

Selects .local-save-status[data-state="linked"] and applies color: #8ef0ae; border-color: #286b42.

### Line 1224

```text
.local-save-status[data-state="warning"] { color: #ffadad; border-color: #873c3c; }
```

Selects .local-save-status[data-state="warning"] and applies color: #ffadad; border-color: #873c3c.

### Line 1225

```text
.local-save-note { margin-top: 15px; color: #9696a2; font-size: 0.75rem; line-height: 1.5; }
```

Selects .local-save-note and applies margin-top: 15px; color: #9696a2; font-size: 0.75rem; line-height: 1.5.

### Line 1226

```text

```

Blank line separates stylesheet rules.

### Line 1227

```text
@media (max-width: 768px) {
```

Begins a responsive rule block that applies only when (max-width: 768px).

### Line 1228

```text
  .local-save-header-btn { flex: 1 1 100%; }
```

Selects .local-save-header-btn and applies flex: 1 1 100%.

### Line 1229

```text
  .local-save-modal-card { padding: 24px 18px; }
```

Selects .local-save-modal-card and applies padding: 24px 18px.

### Line 1230

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1231

```text

```

Blank line separates stylesheet rules.

### Line 1232

```text

```

Blank line separates stylesheet rules.

### Line 1233

```text
/* Password-protected browser-local profiles */
```

Comment: Password-protected browser-local profiles.

### Line 1234

```text
.profile-header-btn {
```

Selects .profile-header-btn; the declarations inside control its matching elements.

### Line 1235

```text
  background: #251d36;
```

Sets background: #251d36 (paints the background).

### Line 1236

```text
  border: 1px solid var(--gold-primary);
```

Sets border: 1px solid var(--gold-primary) (sets border width/style/color).

### Line 1237

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 1238

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 1239

```text
  padding: 6px 10px;
```

Sets padding: 6px 10px (adds inner spacing).

### Line 1240

```text
  font-weight: 800;
```

Sets font-weight: 800 (sets text weight).

### Line 1241

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 1242

```text
  max-width: 150px;
```

Sets max-width: 150px (sets maximum width).

### Line 1243

```text
  overflow: hidden;
```

Sets overflow: hidden (controls clipping/scrolling).

### Line 1244

```text
  text-overflow: ellipsis;
```

Sets text-overflow: ellipsis (controls overflowing text marker).

### Line 1245

```text
  white-space: nowrap;
```

Sets white-space: nowrap (controls wrapping).

### Line 1246

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1247

```text
.profile-header-btn:hover { background: #3a2b55; }
```

Selects .profile-header-btn:hover and applies background: #3a2b55.

### Line 1248

```text
.profile-gate {
```

Selects .profile-gate; the declarations inside control its matching elements.

### Line 1249

```text
  position: fixed;
```

Sets position: fixed (sets positioning scheme).

### Line 1250

```text
  inset: 0;
```

Sets inset: 0 (sets inset).

### Line 1251

```text
  z-index: 4000;
```

Sets z-index: 4000 (sets stacking order).

### Line 1252

```text
  display: grid;
```

Sets display: grid (controls layout mode/visibility).

### Line 1253

```text
  place-items: center;
```

Sets place-items: center (centers/aligns grid items).

### Line 1254

```text
  overflow-y: auto;
```

Sets overflow-y: auto (controls vertical overflow).

### Line 1255

```text
  padding: 20px;
```

Sets padding: 20px (adds inner spacing).

### Line 1256

```text
  background: rgba(8, 5, 18, 0.97);
```

Sets background: rgba(8, 5, 18, 0.97) (paints the background).

### Line 1257

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1258

```text
.profile-card {
```

Selects .profile-card; the declarations inside control its matching elements.

### Line 1259

```text
  width: min(100%, 520px);
```

Sets width: min(100%, 520px) (sets used width).

### Line 1260

```text
  max-height: calc(100vh - 40px);
```

Sets max-height: calc(100vh - 40px) (sets maximum height).

### Line 1261

```text
  overflow-y: auto;
```

Sets overflow-y: auto (controls vertical overflow).

### Line 1262

```text
  background: #181820;
```

Sets background: #181820 (paints the background).

### Line 1263

```text
  border: 2px solid var(--gold-primary);
```

Sets border: 2px solid var(--gold-primary) (sets border width/style/color).

### Line 1264

```text
  border-radius: 18px;
```

Sets border-radius: 18px (rounds corners).

### Line 1265

```text
  padding: 28px;
```

Sets padding: 28px (adds inner spacing).

### Line 1266

```text
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.75);
```

Sets box-shadow: 0 16px 44px rgba(0, 0, 0, 0.75) (adds outer/inset shadow).

### Line 1267

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1268

```text
.profile-card h2 {
```

Selects .profile-card h2; the declarations inside control its matching elements.

### Line 1269

```text
  color: var(--gold-primary);
```

Sets color: var(--gold-primary) (sets text color).

### Line 1270

```text
  text-align: center;
```

Sets text-align: center (aligns text).

### Line 1271

```text
  font-size: 1.45rem;
```

Sets font-size: 1.45rem (sets text size).

### Line 1272

```text
  margin-bottom: 8px;
```

Sets margin-bottom: 8px (sets bottom outer spacing).

### Line 1273

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1274

```text
.profile-subtitle {
```

Selects .profile-subtitle; the declarations inside control its matching elements.

### Line 1275

```text
  text-align: center;
```

Sets text-align: center (aligns text).

### Line 1276

```text
  color: #bbb;
```

Sets color: #bbb (sets text color).

### Line 1277

```text
  font-size: 0.92rem;
```

Sets font-size: 0.92rem (sets text size).

### Line 1278

```text
  line-height: 1.5;
```

Sets line-height: 1.5 (sets line height).

### Line 1279

```text
  margin-bottom: 18px;
```

Sets margin-bottom: 18px (sets bottom outer spacing).

### Line 1280

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1281

```text
.profile-form { display: grid; gap: 12px; }
```

Selects .profile-form and applies display: grid; gap: 12px.

### Line 1282

```text
.profile-field { display: grid; gap: 6px; color: #e3e3e8; font-size: 0.86rem; font-weight: 700; }
```

Selects .profile-field and applies display: grid; gap: 6px; color: #e3e3e8; font-size: 0.86rem; font-weight: 700.

### Line 1283

```text
.profile-field input {
```

Selects .profile-field input; the declarations inside control its matching elements.

### Line 1284

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 1285

```text
  min-height: 44px;
```

Sets min-height: 44px (sets minimum height).

### Line 1286

```text
  border: 1px solid #585866;
```

Sets border: 1px solid #585866 (sets border width/style/color).

### Line 1287

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 1288

```text
  padding: 10px 12px;
```

Sets padding: 10px 12px (adds inner spacing).

### Line 1289

```text
  background: #101017;
```

Sets background: #101017 (paints the background).

### Line 1290

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 1291

```text
  font-size: 1rem;
```

Sets font-size: 1rem (sets text size).

### Line 1292

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1293

```text
.profile-field input:focus { outline: 2px solid var(--gold-primary); outline-offset: 1px; }
```

Selects .profile-field input:focus and applies outline: 2px solid var(--gold-primary); outline-offset: 1px.

### Line 1294

```text
.profile-field input:disabled { opacity: 0.5; }
```

Selects .profile-field input:disabled and applies opacity: 0.5.

### Line 1295

```text
.profile-primary-btn, .profile-secondary-btn {
```

Selects .profile-primary-btn, .profile-secondary-btn; the declarations inside control its matching elements.

### Line 1296

```text
  min-height: 44px;
```

Sets min-height: 44px (sets minimum height).

### Line 1297

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 1298

```text
  padding: 10px 14px;
```

Sets padding: 10px 14px (adds inner spacing).

### Line 1299

```text
  font-weight: 800;
```

Sets font-weight: 800 (sets text weight).

### Line 1300

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 1301

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1302

```text
.profile-primary-btn { border: 1px solid var(--gold-primary); background: linear-gradient(180deg, #b8860b, #72520a); color: #fff; }
```

Selects .profile-primary-btn and applies border: 1px solid var(--gold-primary); background: linear-gradient(180deg, #b8860b, #72520a); color: #fff.

### Line 1303

```text
.profile-secondary-btn { border: 1px solid #555566; background: #282832; color: #ddd; }
```

Selects .profile-secondary-btn and applies border: 1px solid #555566; background: #282832; color: #ddd.

### Line 1304

```text
.profile-primary-btn:hover:not(:disabled), .profile-secondary-btn:hover { filter: brightness(1.15); }
```

Selects .profile-primary-btn:hover:not(:disabled), .profile-secondary-btn:hover and applies filter: brightness(1.15).

### Line 1305

```text
.profile-primary-btn:disabled { opacity: 0.55; cursor: not-allowed; }
```

Selects .profile-primary-btn:disabled and applies opacity: 0.55; cursor: not-allowed.

### Line 1306

```text
.profile-list { display: grid; gap: 8px; margin-bottom: 14px; }
```

Selects .profile-list and applies display: grid; gap: 8px; margin-bottom: 14px.

### Line 1307

```text
.profile-choice-btn {
```

Selects .profile-choice-btn; the declarations inside control its matching elements.

### Line 1308

```text
  min-height: 46px;
```

Sets min-height: 46px (sets minimum height).

### Line 1309

```text
  border: 1px solid #4b4658;
```

Sets border: 1px solid #4b4658 (sets border width/style/color).

### Line 1310

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 1311

```text
  padding: 10px 14px;
```

Sets padding: 10px 14px (adds inner spacing).

### Line 1312

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 1313

```text
  background: #24232d;
```

Sets background: #24232d (paints the background).

### Line 1314

```text
  text-align: left;
```

Sets text-align: left (aligns text).

### Line 1315

```text
  font-weight: 800;
```

Sets font-weight: 800 (sets text weight).

### Line 1316

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 1317

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1318

```text
.profile-choice-btn:hover, .profile-choice-btn.selected { border-color: var(--gold-primary); background: #352b46; }
```

Selects .profile-choice-btn:hover, .profile-choice-btn.selected and applies border-color: var(--gold-primary); background: #352b46.

### Line 1319

```text
.profile-feedback { min-height: 1.3em; margin-top: 10px; color: #ffadad; font-size: 0.85rem; text-align: center; }
```

Selects .profile-feedback and applies min-height: 1.3em; margin-top: 10px; color: #ffadad; font-size: 0.85rem; text-align: center.

### Line 1320

```text
.profile-note, .profile-migration-note { margin-top: 14px; color: #9999a6; font-size: 0.76rem; line-height: 1.55; }
```

Selects .profile-note, .profile-migration-note and applies margin-top: 14px; color: #9999a6; font-size: 0.76rem; line-height: 1.55.

### Line 1321

```text
.profile-migration-note { padding: 10px 12px; border: 1px solid #5c4b16; border-radius: 8px; color: #f0d991; background: rgba(184, 134, 11, 0.12); }
```

Selects .profile-migration-note and applies padding: 10px 12px; border: 1px solid #5c4b16; border-radius: 8px; color: #f0d991; background: rgba(184, 134, 11, 0.12).

### Line 1322

```text

```

Blank line separates stylesheet rules.

### Line 1323

```text
/* Simulated racing stays visually consistent with the casino while making live movement and betting state clear. */
```

Comment: Simulated racing stays visually consistent with the casino while making live movement and betting state clear..

### Line 1324

```text
.race-machine { max-width: 900px; }
```

Selects .race-machine and applies max-width: 900px.

### Line 1325

```text
.race-header { width: 100%; }
```

Selects .race-header and applies width: 100%.

### Line 1326

```text
.race-local-note { margin: 5px 0 12px; color: #b9b4c6; font-size: 0.82rem; text-align: center; }
```

Selects .race-local-note and applies margin: 5px 0 12px; color: #b9b4c6; font-size: 0.82rem; text-align: center.

### Line 1327

```text
.race-mode-switch { display: flex; justify-content: center; gap: 8px; margin: 10px 0 14px; }
```

Selects .race-mode-switch and applies display: flex; justify-content: center; gap: 8px; margin: 10px 0 14px.

### Line 1328

```text
.race-mode-switch > span { min-height: 40px; padding: 8px 16px; display: flex; align-items: center; border: 1px solid #584a68; border-radius: 9px; color: #e6dfef; background: #211c2b; font-weight: 800; }
```

Selects .race-mode-switch > span and applies min-height: 40px; padding: 8px 16px; display: flex; align-items: center; border: 1px solid #584a68; border-radius: 9px; color: #e6dfef; background: #211c2b; font-weight: 800.

### Line 1329

```text
.race-mode-switch > span.is-active { border-color: var(--gold-primary); color: #211707; background: var(--gold-primary); box-shadow: 0 0 12px rgba(255,215,0,0.18); }
```

Selects .race-mode-switch > span.is-active and applies border-color: var(--gold-primary); color: #211707; background: var(--gold-primary); box-shadow: 0 0 12px rgba(255,215,0,0.18).

### Line 1330

```text
.race-info-strip { width: 100%; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
```

Selects .race-info-strip and applies width: 100%; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px.

### Line 1331

```text
.race-info-item { display: grid; gap: 4px; padding: 10px 8px; background: #17131f; border: 1px solid #423853; border-radius: 9px; text-align: center; }
```

Selects .race-info-item and applies display: grid; gap: 4px; padding: 10px 8px; background: #17131f; border: 1px solid #423853; border-radius: 9px; text-align: center.

### Line 1332

```text
.race-info-item span { color: #aaa2ba; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.08em; }
```

Selects .race-info-item span and applies color: #aaa2ba; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.08em.

### Line 1333

```text
.race-info-item strong { color: var(--gold-primary); font-size: 0.9rem; }
```

Selects .race-info-item strong and applies color: var(--gold-primary); font-size: 0.9rem.

### Line 1334

```text
.race-stage, .race-betting-panel { width: 100%; border-radius: 14px; background: #15141a; border: 1px solid #3d3548; padding: 14px; }
```

Selects .race-stage, .race-betting-panel and applies width: 100%; border-radius: 14px; background: #15141a; border: 1px solid #3d3548; padding: 14px.

### Line 1335

```text
.race-track-heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; color: #d9d2e4; font-size: 0.7rem; font-weight: 900; letter-spacing: 0.08em; }
```

Selects .race-track-heading and applies display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; color: #d9d2e4; font-size: 0.7rem; font-weight: 900; letter-spacing: 0.08em.

### Line 1336

```text
.race-finish-label { color: #ffd700; }
```

Selects .race-finish-label and applies color: #ffd700.

### Line 1337

```text
.race-track { display: grid; gap: 5px; }
```

Selects .race-track and applies display: grid; gap: 5px.

### Line 1338

```text
.race-lane { min-width: 0; display: grid; grid-template-columns: 24px minmax(0, 1fr) 118px; align-items: center; gap: 8px; }
```

Selects .race-lane and applies min-width: 0; display: grid; grid-template-columns: 24px minmax(0, 1fr) 118px; align-items: center; gap: 8px.

### Line 1339

```text
.race-lane-number { color: #aaa; font-size: 0.68rem; font-weight: 800; text-align: center; }
```

Selects .race-lane-number and applies color: #aaa; font-size: 0.68rem; font-weight: 800; text-align: center.

### Line 1340

```text
.race-lane-rail { position: relative; height: 36px; overflow: hidden; border: 1px solid #4d4850; border-radius: 5px; background: repeating-linear-gradient(0deg, #284b30 0, #284b30 7px, #1c3d26 7px, #1c3d26 14px); }
```

Selects .race-lane-rail and applies position: relative; height: 36px; overflow: hidden; border: 1px solid #4d4850; border-radius: 5px; background: repeating-linear-gradient(0deg, #284b30 0, #284b30 7px, #1c3d26 7px, #1c3d26 14px).

### Line 1341

```text
.race-lane-rail::before { content: ''; position: absolute; inset: 50% 0 auto; border-top: 1px dashed rgba(255,255,255,0.16); }
```

Selects .race-lane-rail::before and applies content: ''; position: absolute; inset: 50% 0 auto; border-top: 1px dashed rgba(255,255,255,0.16).

### Line 1342

```text
.race-finish-line { position: absolute; top: 0; right: 4%; z-index: 1; height: 100%; border-left: 3px solid #fff; box-shadow: 1px 0 #111; }
```

Selects .race-finish-line and applies position: absolute; top: 0; right: 4%; z-index: 1; height: 100%; border-left: 3px solid #fff; box-shadow: 1px 0 #111.

### Line 1343

```text
.race-horse-token { position: absolute; top: 50%; left: 0; z-index: 2; width: 30px; height: 30px; display: grid; place-items: center; border: 2px solid var(--silks-color, #fff); border-radius: 50%; background: #101017; font-size: 1rem; transform: translate(-50%, -50%); transition: left 220ms linear, box-shadow 180ms ease; }
```

Selects .race-horse-token and applies position: absolute; top: 50%; left: 0; z-index: 2; width: 30px; height: 30px; display: grid; place-items: center; border: 2px solid var(--silks-color, #fff); border-radius: 50%; background: #101017; font-size: 1rem; transform: translate(-50%, -50%); transition: left 220ms linear, box-shadow 180ms ease.

### Line 1344

```text
.race-car-token { width: 34px; height: 28px; border-radius: 8px; font-size: 1.15rem; }
```

Selects .race-car-token and applies width: 34px; height: 28px; border-radius: 8px; font-size: 1.15rem.

### Line 1345

```text
.race-lane-name { overflow: hidden; color: #d7d3df; font-size: 0.72rem; text-overflow: ellipsis; white-space: nowrap; }
```

Selects .race-lane-name and applies overflow: hidden; color: #d7d3df; font-size: 0.72rem; text-overflow: ellipsis; white-space: nowrap.

### Line 1346

```text
.race-lane.is-race-running .race-horse-token { box-shadow: 0 0 10px var(--silks-color); }
```

Selects .race-lane.is-race-running .race-horse-token and applies box-shadow: 0 0 10px var(--silks-color).

### Line 1347

```text
.race-lane.is-race-winner .race-horse-token { box-shadow: 0 0 16px #ffd700; border-color: #ffd700; }
```

Selects .race-lane.is-race-winner .race-horse-token and applies box-shadow: 0 0 16px #ffd700; border-color: #ffd700.

### Line 1348

```text
.race-panel-heading { margin-bottom: 11px; }
```

Selects .race-panel-heading and applies margin-bottom: 11px.

### Line 1349

```text
.race-panel-heading h2 { color: var(--gold-primary); font-size: 1.1rem; }
```

Selects .race-panel-heading h2 and applies color: var(--gold-primary); font-size: 1.1rem.

### Line 1350

```text
.race-panel-heading p { margin-top: 3px; color: #aaa; font-size: 0.77rem; line-height: 1.4; }
```

Selects .race-panel-heading p and applies margin-top: 3px; color: #aaa; font-size: 0.77rem; line-height: 1.4.

### Line 1351

```text
.race-runner-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
```

Selects .race-runner-list and applies display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px.

### Line 1352

```text
.race-runner-option { min-width: 0; display: grid; grid-template-columns: 38px minmax(0, 1fr) auto; align-items: center; gap: 8px; padding: 9px; border: 1px solid #484251; border-radius: 9px; color: #fff; background: #201c29; text-align: left; cursor: pointer; transition: border-color 150ms ease, background 150ms ease, transform 150ms ease; }
```

Selects .race-runner-option and applies min-width: 0; display: grid; grid-template-columns: 38px minmax(0, 1fr) auto; align-items: center; gap: 8px; padding: 9px; border: 1px solid #484251; border-radius: 9px; color: #fff; background: #201c29; text-align: left; cursor: pointer; transition: border-color 150ms ease, background 150ms ease, transform 150ms ease.

### Line 1353

```text
.race-runner-option:hover:not(:disabled) { transform: translateY(-1px); border-color: var(--gold-primary); }
```

Selects .race-runner-option:hover:not(:disabled) and applies transform: translateY(-1px); border-color: var(--gold-primary).

### Line 1354

```text
.race-runner-option.is-selected { border-color: var(--gold-primary); background: #352b1a; box-shadow: 0 0 0 1px rgba(255,215,0,0.15); }
```

Selects .race-runner-option.is-selected and applies border-color: var(--gold-primary); background: #352b1a; box-shadow: 0 0 0 1px rgba(255,215,0,0.15).

### Line 1355

```text
.race-runner-option:disabled { cursor: not-allowed; opacity: 0.72; }
```

Selects .race-runner-option:disabled and applies cursor: not-allowed; opacity: 0.72.

### Line 1356

```text
.race-runner-silks { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%; background: #111018; font-size: 1.2rem; }
```

Selects .race-runner-silks and applies width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%; background: #111018; font-size: 1.2rem.

### Line 1357

```text
.race-runner-details { min-width: 0; display: grid; gap: 3px; }
```

Selects .race-runner-details and applies min-width: 0; display: grid; gap: 3px.

### Line 1358

```text
.race-runner-details strong { overflow: hidden; font-size: 0.78rem; text-overflow: ellipsis; white-space: nowrap; }
```

Selects .race-runner-details strong and applies overflow: hidden; font-size: 0.78rem; text-overflow: ellipsis; white-space: nowrap.

### Line 1359

```text
.race-runner-details small, .race-odds-wrap small { color: #aaa4b2; font-size: 0.61rem; }
```

Selects .race-runner-details small, .race-odds-wrap small and applies color: #aaa4b2; font-size: 0.61rem.

### Line 1360

```text
.race-odds-wrap { display: grid; justify-items: end; gap: 2px; }
```

Selects .race-odds-wrap and applies display: grid; justify-items: end; gap: 2px.

### Line 1361

```text
.race-runner-odds { color: #ffe17a; font-size: 0.88rem; font-weight: 900; white-space: nowrap; }
```

Selects .race-runner-odds and applies color: #ffe17a; font-size: 0.88rem; font-weight: 900; white-space: nowrap.

### Line 1362

```text
.race-dashboard { width: 100%; margin: 0; }
```

Selects .race-dashboard and applies width: 100%; margin: 0.

### Line 1363

```text
.race-dashboard .card { flex: 1; }
```

Selects .race-dashboard .card and applies flex: 1.

### Line 1364

```text
.race-return-card { align-items: flex-end; }
```

Selects .race-return-card and applies align-items: flex-end.

### Line 1365

```text
.race-return-card .value { color: #4eef90; }
```

Selects .race-return-card .value and applies color: #4eef90.

### Line 1366

```text
.race-actions { width: 100%; }
```

Selects .race-actions and applies width: 100%.

### Line 1367

```text
.race-actions button { min-height: 46px; }
```

Selects .race-actions button and applies min-height: 46px.

### Line 1368

```text
.race-actions button:disabled { cursor: not-allowed; opacity: 0.48; }
```

Selects .race-actions button:disabled and applies cursor: not-allowed; opacity: 0.48.

### Line 1369

```text
.race-ticket-note { min-height: 1.4em; color: #ffe17a; font-size: 0.82rem; line-height: 1.45; text-align: center; }
```

Selects .race-ticket-note and applies min-height: 1.4em; color: #ffe17a; font-size: 0.82rem; line-height: 1.45; text-align: center.

### Line 1370

```text
.race-odds-note { max-width: 620px; color: #9d98a7; font-size: 0.69rem; line-height: 1.45; text-align: center; }
```

Selects .race-odds-note and applies max-width: 620px; color: #9d98a7; font-size: 0.69rem; line-height: 1.45; text-align: center.

### Line 1371

```text
.race-result-notice { display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 10px 18px; padding: 12px 18px; border-bottom: 1px solid var(--gold-primary); background: #352b1a; color: #fff3c4; text-align: center; }
```

Selects .race-result-notice and applies display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 10px 18px; padding: 12px 18px; border-bottom: 1px solid var(--gold-primary); background: #352b1a; color: #fff3c4; text-align: center.

### Line 1372

```text
.race-result-notice p { flex: 1 1 360px; max-width: 900px; font-size: 0.88rem; font-weight: 700; line-height: 1.45; }
```

Selects .race-result-notice p and applies flex: 1 1 360px; max-width: 900px; font-size: 0.88rem; font-weight: 700; line-height: 1.45.

### Line 1373

```text
.race-result-actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 8px; }
```

Selects .race-result-actions and applies display: flex; justify-content: center; flex-wrap: wrap; gap: 8px.

### Line 1374

```text
.race-result-action-btn, .race-result-dismiss-btn { min-height: 38px; padding: 7px 12px; border: 1px solid #ffd700; border-radius: 8px; color: #17120a; background: #ffd700; font-weight: 800; cursor: pointer; }
```

Selects .race-result-action-btn, .race-result-dismiss-btn and applies min-height: 38px; padding: 7px 12px; border: 1px solid #ffd700; border-radius: 8px; color: #17120a; background: #ffd700; font-weight: 800; cursor: pointer.

### Line 1375

```text
.race-result-dismiss-btn { border-color: #8b7848; color: #fff3c4; background: #272116; }
```

Selects .race-result-dismiss-btn and applies border-color: #8b7848; color: #fff3c4; background: #272116.

### Line 1376

```text
.race-result-action-btn:focus-visible, .race-result-dismiss-btn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
```

Selects .race-result-action-btn:focus-visible, .race-result-dismiss-btn:focus-visible and applies outline: 2px solid #fff; outline-offset: 2px.

### Line 1377

```text

```

Blank line separates stylesheet rules.

### Line 1378

```text
@media (max-width: 768px) {
```

Begins a responsive rule block that applies only when (max-width: 768px).

### Line 1379

```text
  .profile-header-btn { flex: 1 1 100%; max-width: none; }
```

Selects .profile-header-btn and applies flex: 1 1 100%; max-width: none.

### Line 1380

```text
  .profile-card { padding: 22px 18px; }
```

Selects .profile-card and applies padding: 22px 18px.

### Line 1381

```text
  .race-machine { padding: 14px 10px; }
```

Selects .race-machine and applies padding: 14px 10px.

### Line 1382

```text
  .race-mode-switch > span { flex: 1; padding: 8px 10px; }
```

Selects .race-mode-switch > span and applies flex: 1; padding: 8px 10px.

### Line 1383

```text
  .race-info-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
```

Selects .race-info-strip and applies grid-template-columns: repeat(2, minmax(0, 1fr)).

### Line 1384

```text
  .race-runner-list { grid-template-columns: 1fr; }
```

Selects .race-runner-list and applies grid-template-columns: 1fr.

### Line 1385

```text
  .race-stage, .race-betting-panel { padding: 10px; }
```

Selects .race-stage, .race-betting-panel and applies padding: 10px.

### Line 1386

```text
  .race-lane { grid-template-columns: 18px minmax(0, 1fr) 92px; gap: 5px; }
```

Selects .race-lane and applies grid-template-columns: 18px minmax(0, 1fr) 92px; gap: 5px.

### Line 1387

```text
  .race-lane-name { font-size: 0.63rem; }
```

Selects .race-lane-name and applies font-size: 0.63rem.

### Line 1388

```text
  .race-actions { flex-direction: column; }
```

Selects .race-actions and applies flex-direction: column.

### Line 1389

```text
  .race-actions button { width: 100%; min-height: 44px; }
```

Selects .race-actions button and applies width: 100%; min-height: 44px.

### Line 1390

```text
  .race-dashboard { flex-wrap: wrap; }
```

Selects .race-dashboard and applies flex-wrap: wrap.

### Line 1391

```text
  .race-result-notice { padding: 10px 12px; }
```

Selects .race-result-notice and applies padding: 10px 12px.

### Line 1392

```text
  .race-result-notice p { flex-basis: 100%; }
```

Selects .race-result-notice p and applies flex-basis: 100%.

### Line 1393

```text
  .race-result-actions { width: 100%; }
```

Selects .race-result-actions and applies width: 100%.

### Line 1394

```text
  .race-result-actions button { flex: 1 1 auto; }
```

Selects .race-result-actions button and applies flex: 1 1 auto.

### Line 1395

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1396

```text

```

Blank line separates stylesheet rules.

### Line 1397

```text
/* The intro is a viewport overlay and only runs after the save loader is dismissed. */
```

Comment: The intro is a viewport overlay and only runs after the save loader is dismissed..

### Line 1398

```text
.splash-modal.active-view {
```

Selects .splash-modal.active-view; the declarations inside control its matching elements.

### Line 1399

```text
  position: fixed;
```

Sets position: fixed (sets positioning scheme).

### Line 1400

```text
  inset: 0;
```

Sets inset: 0 (sets inset).

### Line 1401

```text
  z-index: 2000;
```

Sets z-index: 2000 (sets stacking order).

### Line 1402

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 1403

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 1404

```text
  justify-content: center;
```

Sets justify-content: center (distributes children on main axis).

### Line 1405

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 1406

```text
  gap: clamp(8px, 1.8vh, 18px);
```

Sets gap: clamp(8px, 1.8vh, 18px) (sets spacing between flex/grid children).

### Line 1407

```text
  overflow: hidden;
```

Sets overflow: hidden (controls clipping/scrolling).

### Line 1408

```text
  padding: clamp(16px, 4vw, 48px);
```

Sets padding: clamp(16px, 4vw, 48px) (adds inner spacing).

### Line 1409

```text
  background:
```

Sets background:  (paints the background).

### Line 1410

```text
    radial-gradient(ellipse at 50% 34%, rgba(105, 25, 125, 0.38), transparent 55%),
```

Continues the splash overlay background with a purple radial glow centered near 50% horizontal and 34% vertical, fading after 55%.

### Line 1411

```text
    linear-gradient(180deg, #100817 0%, #080510 100%);
```

Continues the splash overlay background with a vertical gradient from #100817 at the top to #080510 at the bottom.

### Line 1412

```text
  //animation: splash-intro 8.6s ease-in-out both;
```

Looks like a JavaScript-style comment rather than valid CSS; the proposed splash-intro animation is therefore disabled and has no CSS effect.

### Line 1413

```text
  object-fit: cover;
```

Sets object-fit: cover (fits replaced content within its box).

### Line 1414

```text
  /* Traces alpha transparency of the asset */
```

Comment: Traces alpha transparency of the asset.

### Line 1415

```text
  filter: drop-shadow(0 0 0px rgba(99, 102, 241, 0));
```

Sets filter: drop-shadow(0 0 0px rgba(99, 102, 241, 0)) (applies visual filter).

### Line 1416

```text
  animation: ambientGlow 7.5s ease-in-out alternate;
```

Sets animation: ambientGlow 7.5s ease-in-out alternate (runs a named CSS animation).

### Line 1417

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1418

```text

```

Blank line separates stylesheet rules.

### Line 1419

```text
.splash-logo {
```

Selects .splash-logo; the declarations inside control its matching elements.

### Line 1420

```text
  width: min(62vw, 46vh, 520px);
```

Sets width: min(62vw, 46vh, 520px) (sets used width).

### Line 1421

```text
  max-height: 46vh;
```

Sets max-height: 46vh (sets maximum height).

### Line 1422

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1423

```text

```

Blank line separates stylesheet rules.

### Line 1424

```text
@keyframes ambientGlow {
```

Defines animation timeline ambientGlow for changing properties over time.

### Line 1425

```text
  0% {
```

Selects 0%; the declarations inside control its matching elements.

### Line 1426

```text
    filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.3));
```

Sets filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.3)) (applies visual filter).

### Line 1427

```text
    transform: translateY(0);
```

Sets transform: translateY(0) (applies geometric transform).

### Line 1428

```text
    opacity: 1.0;
```

Sets opacity: 1.0 (sets transparency).

### Line 1429

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1430

```text
  73% {
```

Selects 73%; the declarations inside control its matching elements.

### Line 1431

```text
    opacity: 1.0;
```

Sets opacity: 1.0 (sets transparency).

### Line 1432

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1433

```text
  100% {
```

Selects 100%; the declarations inside control its matching elements.

### Line 1434

```text
    filter: drop-shadow(0 0 40px rgba(168, 85, 247, 0.6));
```

Sets filter: drop-shadow(0 0 40px rgba(168, 85, 247, 0.6)) (applies visual filter).

### Line 1435

```text
    transform: translateY(-5px); /* Smooth GPU-promoted layer lift */
```

Sets transform: translateY(-5px) (applies geometric transform).

### Line 1436

```text
    opacity: 0.0;
```

Sets opacity: 0.0 (sets transparency).

### Line 1437

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 1438

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1439

```text

```

Blank line separates stylesheet rules.

### Line 1440

```text
.splash-copy { text-align: center; }
```

Selects .splash-copy and applies text-align: center.

### Line 1441

```text
.splash-kicker {
```

Selects .splash-kicker; the declarations inside control its matching elements.

### Line 1442

```text
  color: #ffe17a;
```

Sets color: #ffe17a (sets text color).

### Line 1443

```text
  font-size: 0.68rem;
```

Sets font-size: 0.68rem (sets text size).

### Line 1444

```text
  font-weight: 900;
```

Sets font-weight: 900 (sets text weight).

### Line 1445

```text
  letter-spacing: 0.28em;
```

Sets letter-spacing: 0.28em (sets spacing between characters).

### Line 1446

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1447

```text
.splash-copy h1 {
```

Selects .splash-copy h1; the declarations inside control its matching elements.

### Line 1448

```text
  margin: 4px 0 6px;
```

Sets margin: 4px 0 6px (sets outer spacing).

### Line 1449

```text
  color: #ffd700;
```

Sets color: #ffd700 (sets text color).

### Line 1450

```text
  font-size: clamp(1.65rem, 5vw, 2.75rem);
```

Sets font-size: clamp(1.65rem, 5vw, 2.75rem) (sets text size).

### Line 1451

```text
  font-weight: 950;
```

Sets font-weight: 950 (sets text weight).

### Line 1452

```text
  letter-spacing: 0.08em;
```

Sets letter-spacing: 0.08em (sets spacing between characters).

### Line 1453

```text
  text-shadow: 0 2px 18px rgba(255, 190, 40, 0.3);
```

Sets text-shadow: 0 2px 18px rgba(255, 190, 40, 0.3) (adds shadow behind text).

### Line 1454

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1455

```text
.splash-tagline { color: #e7dff1; font-size: clamp(0.78rem, 2vw, 0.95rem); }
```

Selects .splash-tagline and applies color: #e7dff1; font-size: clamp(0.78rem, 2vw, 0.95rem).

### Line 1456

```text
.splash-disclaimer { margin-top: 8px; color: #a8a0b1; font-size: 0.75rem; }
```

Selects .splash-disclaimer and applies margin-top: 8px; color: #a8a0b1; font-size: 0.75rem.

### Line 1457

```text
.splash-skip {
```

Selects .splash-skip; the declarations inside control its matching elements.

### Line 1458

```text
  position: absolute;
```

Sets position: absolute (sets positioning scheme).

### Line 1459

```text
  right: max(16px, env(safe-area-inset-right));
```

Sets right: max(16px, env(safe-area-inset-right)) (sets right offset).

### Line 1460

```text
  bottom: max(16px, env(safe-area-inset-bottom));
```

Sets bottom: max(16px, env(safe-area-inset-bottom)) (sets bottom offset).

### Line 1461

```text
  min-height: 44px;
```

Sets min-height: 44px (sets minimum height).

### Line 1462

```text
  padding: 0 16px;
```

Sets padding: 0 16px (adds inner spacing).

### Line 1463

```text
  border: 1px solid rgba(255, 215, 0, 0.55);
```

Sets border: 1px solid rgba(255, 215, 0, 0.55) (sets border width/style/color).

### Line 1464

```text
  border-radius: 999px;
```

Sets border-radius: 999px (rounds corners).

### Line 1465

```text
  background: rgba(24, 18, 32, 0.88);
```

Sets background: rgba(24, 18, 32, 0.88) (paints the background).

### Line 1466

```text
  color: #f7edce;
```

Sets color: #f7edce (sets text color).

### Line 1467

```text
  font-size: 0.8rem;
```

Sets font-size: 0.8rem (sets text size).

### Line 1468

```text
  font-weight: 800;
```

Sets font-weight: 800 (sets text weight).

### Line 1469

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 1470

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1471

```text
.splash-skip:hover, .splash-skip:focus-visible {
```

Selects .splash-skip:hover, .splash-skip:focus-visible; the declarations inside control its matching elements.

### Line 1472

```text
  background: #332345;
```

Sets background: #332345 (paints the background).

### Line 1473

```text
  outline: 2px solid #ffd700;
```

Sets outline: 2px solid #ffd700 (draws focus/selection outline).

### Line 1474

```text
  outline-offset: 3px;
```

Sets outline-offset: 3px (moves outline away from edge).

### Line 1475

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1476

```text

```

Blank line separates stylesheet rules.

### Line 1477

```text
@keyframes splash-intro {
```

Defines animation timeline splash-intro for changing properties over time.

### Line 1478

```text
  0% { opacity: 0; transform: scale(0.97); }
```

Selects 0% and applies opacity: 0; transform: scale(0.97).

### Line 1479

```text
  12%, 76% { opacity: 1; transform: scale(1); }
```

Selects 12%, 76% and applies opacity: 1; transform: scale(1).

### Line 1480

```text
  100% { opacity: 0; transform: scale(1.10); visibility: hidden; }
```

Selects 100% and applies opacity: 0; transform: scale(1.10); visibility: hidden.

### Line 1481

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1482

```text

```

Blank line separates stylesheet rules.

### Line 1483

```text
@media (max-width: 560px) {
```

Begins a responsive rule block that applies only when (max-width: 560px).

### Line 1484

```text
  .splash-modal.active-view { gap: 10px; }
```

Selects .splash-modal.active-view and applies gap: 10px.

### Line 1485

```text
  .splash-logo { width: min(78vw, 48vh, 420px); max-height: 48vh; }
```

Selects .splash-logo and applies width: min(78vw, 48vh, 420px); max-height: 48vh.

### Line 1486

```text
  .splash-skip { right: max(12px, env(safe-area-inset-right)); bottom: max(12px, env(safe-area-inset-bottom)); }
```

Selects .splash-skip and applies right: max(12px, env(safe-area-inset-right)); bottom: max(12px, env(safe-area-inset-bottom)).

### Line 1487

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1488

```text

```

Blank line separates stylesheet rules.

### Line 1489

```text
@media (max-height: 560px) {
```

Begins a responsive rule block that applies only when (max-height: 560px).

### Line 1490

```text
  .splash-logo { width: min(42vh, 320px); max-height: 38vh; }
```

Selects .splash-logo and applies width: min(42vh, 320px); max-height: 38vh.

### Line 1491

```text
  .splash-modal.active-view { gap: 6px; padding: 12px; }
```

Selects .splash-modal.active-view and applies gap: 6px; padding: 12px.

### Line 1492

```text
  .splash-disclaimer { margin-top: 4px; }
```

Selects .splash-disclaimer and applies margin-top: 4px.

### Line 1493

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1494

```text

```

Blank line separates stylesheet rules.

### Line 1495

```text
@media (prefers-reduced-motion: reduce) {
```

Begins a responsive rule block that applies only when (prefers-reduced-motion: reduce).

### Line 1496

```text
  .splash-modal.active-view { animation-duration: 1ms; }
```

Selects .splash-modal.active-view and applies animation-duration: 1ms.

### Line 1497

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1498

```text

```

Blank line separates stylesheet rules.

### Line 1499

```text
/* Lobby services room */
```

Comment: Lobby services room.

### Line 1500

```text
.lobby-services-room {
```

Selects .lobby-services-room; the declarations inside control its matching elements.

### Line 1501

```text
  margin-top: 24px;
```

Sets margin-top: 24px (sets top outer spacing).

### Line 1502

```text
  padding: 22px;
```

Sets padding: 22px (adds inner spacing).

### Line 1503

```text
  border: 1px solid rgba(255, 215, 0, 0.42);
```

Sets border: 1px solid rgba(255, 215, 0, 0.42) (sets border width/style/color).

### Line 1504

```text
  border-radius: 18px;
```

Sets border-radius: 18px (rounds corners).

### Line 1505

```text
  background: linear-gradient(145deg, rgba(42, 29, 58, 0.96), rgba(19, 15, 29, 0.96));
```

Sets background: linear-gradient(145deg, rgba(42, 29, 58, 0.96), rgba(19, 15, 29, 0.96)) (paints the background).

### Line 1506

```text
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.24);
```

Sets box-shadow: 0 12px 30px rgba(0, 0, 0, 0.24) (adds outer/inset shadow).

### Line 1507

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1508

```text

```

Blank line separates stylesheet rules.

### Line 1509

```text
.lobby-services-heading {
```

Selects .lobby-services-heading; the declarations inside control its matching elements.

### Line 1510

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 1511

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 1512

```text
  justify-content: space-between;
```

Sets justify-content: space-between (distributes children on main axis).

### Line 1513

```text
  gap: 18px;
```

Sets gap: 18px (sets spacing between flex/grid children).

### Line 1514

```text
  margin-bottom: 16px;
```

Sets margin-bottom: 16px (sets bottom outer spacing).

### Line 1515

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1516

```text

```

Blank line separates stylesheet rules.

### Line 1517

```text
.lobby-room-kicker {
```

Selects .lobby-room-kicker; the declarations inside control its matching elements.

### Line 1518

```text
  margin-bottom: 4px;
```

Sets margin-bottom: 4px (sets bottom outer spacing).

### Line 1519

```text
  color: #c9b2e8;
```

Sets color: #c9b2e8 (sets text color).

### Line 1520

```text
  font-size: 0.65rem;
```

Sets font-size: 0.65rem (sets text size).

### Line 1521

```text
  font-weight: 900;
```

Sets font-weight: 900 (sets text weight).

### Line 1522

```text
  letter-spacing: 0.14em;
```

Sets letter-spacing: 0.14em (sets spacing between characters).

### Line 1523

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1524

```text

```

Blank line separates stylesheet rules.

### Line 1525

```text
.lobby-services-heading h3 {
```

Selects .lobby-services-heading h3; the declarations inside control its matching elements.

### Line 1526

```text
  color: var(--gold-primary);
```

Sets color: var(--gold-primary) (sets text color).

### Line 1527

```text
  font-size: 1.35rem;
```

Sets font-size: 1.35rem (sets text size).

### Line 1528

```text
  margin-bottom: 4px;
```

Sets margin-bottom: 4px (sets bottom outer spacing).

### Line 1529

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1530

```text

```

Blank line separates stylesheet rules.

### Line 1531

```text
.lobby-services-heading > div > p:last-child {
```

Selects .lobby-services-heading > div > p:last-child; the declarations inside control its matching elements.

### Line 1532

```text
  color: #c8c1d0;
```

Sets color: #c8c1d0 (sets text color).

### Line 1533

```text
  font-size: 0.82rem;
```

Sets font-size: 0.82rem (sets text size).

### Line 1534

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1535

```text

```

Blank line separates stylesheet rules.

### Line 1536

```text
.lobby-room-emblem {
```

Selects .lobby-room-emblem; the declarations inside control its matching elements.

### Line 1537

```text
  display: grid;
```

Sets display: grid (controls layout mode/visibility).

### Line 1538

```text
  min-width: 64px;
```

Sets min-width: 64px (sets minimum width).

### Line 1539

```text
  min-height: 64px;
```

Sets min-height: 64px (sets minimum height).

### Line 1540

```text
  place-items: center;
```

Sets place-items: center (centers/aligns grid items).

### Line 1541

```text
  border: 1px solid rgba(255, 215, 0, 0.3);
```

Sets border: 1px solid rgba(255, 215, 0, 0.3) (sets border width/style/color).

### Line 1542

```text
  border-radius: 16px;
```

Sets border-radius: 16px (rounds corners).

### Line 1543

```text
  background: rgba(13, 10, 20, 0.6);
```

Sets background: rgba(13, 10, 20, 0.6) (paints the background).

### Line 1544

```text
  font-size: 1.55rem;
```

Sets font-size: 1.55rem (sets text size).

### Line 1545

```text
  white-space: nowrap;
```

Sets white-space: nowrap (controls wrapping).

### Line 1546

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1547

```text

```

Blank line separates stylesheet rules.

### Line 1548

```text
.lobby-service-grid {
```

Selects .lobby-service-grid; the declarations inside control its matching elements.

### Line 1549

```text
  display: grid;
```

Sets display: grid (controls layout mode/visibility).

### Line 1550

```text
  grid-template-columns: repeat(2, minmax(0, 1fr));
```

Sets grid-template-columns: repeat(2, minmax(0, 1fr)) (defines grid columns).

### Line 1551

```text
  gap: 12px;
```

Sets gap: 12px (sets spacing between flex/grid children).

### Line 1552

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1553

```text

```

Blank line separates stylesheet rules.

### Line 1554

```text
.lobby-service-card {
```

Selects .lobby-service-card; the declarations inside control its matching elements.

### Line 1555

```text
  display: grid;
```

Sets display: grid (controls layout mode/visibility).

### Line 1556

```text
  grid-template-columns: 46px minmax(0, 1fr) auto;
```

Sets grid-template-columns: 46px minmax(0, 1fr) auto (defines grid columns).

### Line 1557

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 1558

```text
  gap: 12px;
```

Sets gap: 12px (sets spacing between flex/grid children).

### Line 1559

```text
  min-width: 0;
```

Sets min-width: 0 (sets minimum width).

### Line 1560

```text
  padding: 14px;
```

Sets padding: 14px (adds inner spacing).

### Line 1561

```text
  border: 1px solid #393143;
```

Sets border: 1px solid #393143 (sets border width/style/color).

### Line 1562

```text
  border-radius: 13px;
```

Sets border-radius: 13px (rounds corners).

### Line 1563

```text
  background: rgba(20, 18, 27, 0.88);
```

Sets background: rgba(20, 18, 27, 0.88) (paints the background).

### Line 1564

```text
  transition: border-color 0.18s ease, transform 0.18s ease;
```

Sets transition: border-color 0.18s ease, transform 0.18s ease (animates changes to listed properties).

### Line 1565

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1566

```text

```

Blank line separates stylesheet rules.

### Line 1567

```text
.lobby-service-card:hover {
```

Selects .lobby-service-card:hover; the declarations inside control its matching elements.

### Line 1568

```text
  transform: translateY(-2px);
```

Sets transform: translateY(-2px) (applies geometric transform).

### Line 1569

```text
  border-color: rgba(255, 215, 0, 0.5);
```

Sets border-color: rgba(255, 215, 0, 0.5) (sets border color).

### Line 1570

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1571

```text

```

Blank line separates stylesheet rules.

### Line 1572

```text
.lobby-service-icon {
```

Selects .lobby-service-icon; the declarations inside control its matching elements.

### Line 1573

```text
  display: grid;
```

Sets display: grid (controls layout mode/visibility).

### Line 1574

```text
  width: 46px;
```

Sets width: 46px (sets used width).

### Line 1575

```text
  height: 46px;
```

Sets height: 46px (sets used height).

### Line 1576

```text
  place-items: center;
```

Sets place-items: center (centers/aligns grid items).

### Line 1577

```text
  border: 1px solid #514465;
```

Sets border: 1px solid #514465 (sets border width/style/color).

### Line 1578

```text
  border-radius: 12px;
```

Sets border-radius: 12px (rounds corners).

### Line 1579

```text
  background: #292236;
```

Sets background: #292236 (paints the background).

### Line 1580

```text
  font-size: 1.45rem;
```

Sets font-size: 1.45rem (sets text size).

### Line 1581

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1582

```text

```

Blank line separates stylesheet rules.

### Line 1583

```text
.lobby-service-copy { min-width: 0; }
```

Selects .lobby-service-copy and applies min-width: 0.

### Line 1584

```text
.lobby-service-copy h4 { margin-bottom: 4px; color: #fff; font-size: 0.95rem; }
```

Selects .lobby-service-copy h4 and applies margin-bottom: 4px; color: #fff; font-size: 0.95rem.

### Line 1585

```text
.lobby-service-copy p { color: #b8b1c2; font-size: 0.75rem; line-height: 1.4; }
```

Selects .lobby-service-copy p and applies color: #b8b1c2; font-size: 0.75rem; line-height: 1.4.

### Line 1586

```text

```

Blank line separates stylesheet rules.

### Line 1587

```text
.lobby-service-btn {
```

Selects .lobby-service-btn; the declarations inside control its matching elements.

### Line 1588

```text
  min-height: 42px;
```

Sets min-height: 42px (sets minimum height).

### Line 1589

```text
  padding: 8px 12px;
```

Sets padding: 8px 12px (adds inner spacing).

### Line 1590

```text
  border-radius: 8px;
```

Sets border-radius: 8px (rounds corners).

### Line 1591

```text
  color: #fff;
```

Sets color: #fff (sets text color).

### Line 1592

```text
  font-size: 0.78rem;
```

Sets font-size: 0.78rem (sets text size).

### Line 1593

```text
  font-weight: 900;
```

Sets font-weight: 900 (sets text weight).

### Line 1594

```text
  white-space: nowrap;
```

Sets white-space: nowrap (controls wrapping).

### Line 1595

```text
  cursor: pointer;
```

Sets cursor: pointer (sets pointer cursor).

### Line 1596

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1597

```text

```

Blank line separates stylesheet rules.

### Line 1598

```text
.lobby-service-card .wheel-header-btn {
```

Selects .lobby-service-card .wheel-header-btn; the declarations inside control its matching elements.

### Line 1599

```text
  padding: 8px 12px;
```

Sets padding: 8px 12px (adds inner spacing).

### Line 1600

```text
  font-size: 0.78rem;
```

Sets font-size: 0.78rem (sets text size).

### Line 1601

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1602

```text

```

Blank line separates stylesheet rules.

### Line 1603

```text
.lobby-service-card .bank-btn {
```

Selects .lobby-service-card .bank-btn; the declarations inside control its matching elements.

### Line 1604

```text
  padding: 8px 12px;
```

Sets padding: 8px 12px (adds inner spacing).

### Line 1605

```text
  font-size: 0.78rem;
```

Sets font-size: 0.78rem (sets text size).

### Line 1606

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1607

```text

```

Blank line separates stylesheet rules.

### Line 1608

```text
.lobby-service-btn:hover { filter: brightness(1.12); }
```

Selects .lobby-service-btn:hover and applies filter: brightness(1.12).

### Line 1609

```text
.lobby-service-btn:focus-visible,
```

Sets .lobby-service-btn: focus-visible, (sets .lobby-service-btn).

### Line 1610

```text
.settings-reset-btn:focus-visible {
```

Selects .settings-reset-btn:focus-visible; the declarations inside control its matching elements.

### Line 1611

```text
  outline: 2px solid var(--gold-primary);
```

Sets outline: 2px solid var(--gold-primary) (draws focus/selection outline).

### Line 1612

```text
  outline-offset: 3px;
```

Sets outline-offset: 3px (moves outline away from edge).

### Line 1613

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1614

```text

```

Blank line separates stylesheet rules.

### Line 1615

```text
/* Keep reset in Settings visually distinct without changing its handler. */
```

Comment: Keep reset in Settings visually distinct without changing its handler..

### Line 1616

```text
.settings-reset-note {
```

Selects .settings-reset-note; the declarations inside control its matching elements.

### Line 1617

```text
  margin: -3px 0 14px;
```

Sets margin: -3px 0 14px (sets outer spacing).

### Line 1618

```text
  color: #bdb7c6;
```

Sets color: #bdb7c6 (sets text color).

### Line 1619

```text
  font-size: 0.8rem;
```

Sets font-size: 0.8rem (sets text size).

### Line 1620

```text
  line-height: 1.5;
```

Sets line-height: 1.5 (sets line height).

### Line 1621

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1622

```text

```

Blank line separates stylesheet rules.

### Line 1623

```text
.reset-data-btn.settings-reset-btn {
```

Selects .reset-data-btn.settings-reset-btn; the declarations inside control its matching elements.

### Line 1624

```text
  min-height: 42px;
```

Sets min-height: 42px (sets minimum height).

### Line 1625

```text
  padding: 9px 14px;
```

Sets padding: 9px 14px (adds inner spacing).

### Line 1626

```text
  border-color: #995050;
```

Sets border-color: #995050 (sets border color).

### Line 1627

```text
  background: #3a2222;
```

Sets background: #3a2222 (paints the background).

### Line 1628

```text
  color: #ffdada;
```

Sets color: #ffdada (sets text color).

### Line 1629

```text
  font-size: 0.84rem;
```

Sets font-size: 0.84rem (sets text size).

### Line 1630

```text
  font-weight: 800;
```

Sets font-weight: 800 (sets text weight).

### Line 1631

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1632

```text

```

Blank line separates stylesheet rules.

### Line 1633

```text
.reset-data-btn.settings-reset-btn:hover {
```

Selects .reset-data-btn.settings-reset-btn:hover; the declarations inside control its matching elements.

### Line 1634

```text
  background: #4d2c2c;
```

Sets background: #4d2c2c (paints the background).

### Line 1635

```text
  border-color: #d06c6c;
```

Sets border-color: #d06c6c (sets border color).

### Line 1636

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1637

```text

```

Blank line separates stylesheet rules.

### Line 1638

```text
#modal-settings .modal-card {
```

Selects #modal-settings .modal-card; the declarations inside control its matching elements.

### Line 1639

```text
  max-height: calc(100vh - 40px);
```

Sets max-height: calc(100vh - 40px) (sets maximum height).

### Line 1640

```text
  max-height: calc(100dvh - 40px);
```

Sets max-height: calc(100dvh - 40px) (sets maximum height).

### Line 1641

```text
  overflow-y: auto;
```

Sets overflow-y: auto (controls vertical overflow).

### Line 1642

```text
  overscroll-behavior: contain;
```

Sets overscroll-behavior: contain (controls scroll chaining).

### Line 1643

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1644

```text

```

Blank line separates stylesheet rules.

### Line 1645

```text
.data-row {
```

Selects .data-row; the declarations inside control its matching elements.

### Line 1646

```text
  display: flex;
```

Sets display: flex (controls layout mode/visibility).

### Line 1647

```text
  flex-direction: column;
```

Sets flex-direction: column (sets flex main-axis direction).

### Line 1648

```text
  text-align: center;
```

Sets text-align: center (aligns text).

### Line 1649

```text
  justify-content: center;
```

Sets justify-content: center (distributes children on main axis).

### Line 1650

```text
  align-items: center;
```

Sets align-items: center (aligns children on cross axis).

### Line 1651

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1652

```text

```

Blank line separates stylesheet rules.

### Line 1653

```text
/* Mobile overrides stack dense controls and shrink room padding without changing desktop structure. */
```

Comment: Mobile overrides stack dense controls and shrink room padding without changing desktop structure..

### Line 1654

```text
@media (max-width: 640px) {
```

Begins a responsive rule block that applies only when (max-width: 640px).

### Line 1655

```text
  .lobby-slot-room, .lobby-coin-room { padding: 16px; }
```

Selects .lobby-slot-room, .lobby-coin-room and applies padding: 16px.

### Line 1656

```text
  .lobby-slot-room-heading, .lobby-coin-room-heading { gap: 10px; }
```

Selects .lobby-slot-room-heading, .lobby-coin-room-heading and applies gap: 10px.

### Line 1657

```text
  .lobby-slot-room-heading h3, .lobby-coin-room-heading h3 { font-size: 1.15rem; }
```

Selects .lobby-slot-room-heading h3, .lobby-coin-room-heading h3 and applies font-size: 1.15rem.

### Line 1658

```text
  .lobby-services-room { padding: 16px; }
```

Selects .lobby-services-room and applies padding: 16px.

### Line 1659

```text
  .lobby-services-heading { gap: 10px; }
```

Selects .lobby-services-heading and applies gap: 10px.

### Line 1660

```text
  .lobby-services-heading h3 { font-size: 1.15rem; }
```

Selects .lobby-services-heading h3 and applies font-size: 1.15rem.

### Line 1661

```text
  .lobby-room-emblem { min-width: 52px; min-height: 52px; padding: 6px; font-size: 1.2rem; }
```

Selects .lobby-room-emblem and applies min-width: 52px; min-height: 52px; padding: 6px; font-size: 1.2rem.

### Line 1662

```text
  .lobby-service-grid { grid-template-columns: 1fr; }
```

Selects .lobby-service-grid and applies grid-template-columns: 1fr.

### Line 1663

```text
  .lobby-service-card { grid-template-columns: 42px minmax(0, 1fr); gap: 10px; padding: 12px; }
```

Selects .lobby-service-card and applies grid-template-columns: 42px minmax(0, 1fr); gap: 10px; padding: 12px.

### Line 1664

```text
  .lobby-service-icon { width: 42px; height: 42px; }
```

Selects .lobby-service-icon and applies width: 42px; height: 42px.

### Line 1665

```text
  .lobby-service-btn { grid-column: 1 / -1; width: 100%; }
```

Selects .lobby-service-btn and applies grid-column: 1 / -1; width: 100%.

### Line 1666

```text
  .reset-data-btn.settings-reset-btn { width: 100%; }
```

Selects .reset-data-btn.settings-reset-btn and applies width: 100%.

### Line 1667

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1668

```text

```

Blank line separates stylesheet rules.

### Line 1669

```text

```

Blank line separates stylesheet rules.

### Line 1670

```text
/* Reusable slot-template theme tokens */
```

Comment: Reusable slot-template theme tokens.

### Line 1671

```text
/* Catalog themes set these custom properties inline; the shared rules below consume them for each machine. */
```

Comment: Catalog themes set these custom properties inline; the shared rules below consume them for each machine..

### Line 1672

```text
.theme-slot-machine {
```

Selects .theme-slot-machine; the declarations inside control its matching elements.

### Line 1673

```text
  background-image: linear-gradient(145deg, var(--slot-machine-start, #2a2a35), var(--slot-machine-end, #141419)), var(--slot-background-image, none);
```

Sets background-image: linear-gradient(145deg, var(--slot-machine-start, #2a2a35), var(--slot-machine-end, #141419)), var(--slot-background-image, none) (paints one or more background images/gradients).

### Line 1674

```text
  background-size: cover;
```

Sets background-size: cover (sizes background images).

### Line 1675

```text
  border-color: var(--slot-accent, var(--gold-primary));
```

Sets border-color: var(--slot-accent, var(--gold-primary)) (sets border color).

### Line 1676

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1677

```text
.theme-slot-machine .header h1 { color: var(--slot-accent, var(--gold-primary)); }
```

Selects .theme-slot-machine .header h1 and applies color: var(--slot-accent, var(--gold-primary)).

### Line 1678

```text
.theme-slot-machine .reels-viewport,
```

Continues the selector grouping for both classic and five-reel reel viewports so they share themed frame colors.

### Line 1679

```text
.theme-slot-machine .reels-viewport-5reel {
```

Selects .theme-slot-machine .reels-viewport-5reel; the declarations inside control its matching elements.

### Line 1680

```text
  background: var(--slot-frame, #000);
```

Sets background: var(--slot-frame, #000) (paints the background).

### Line 1681

```text
  border-color: var(--slot-accent, #333);
```

Sets border-color: var(--slot-accent, #333) (sets border color).

### Line 1682

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1683

```text
.theme-slot-machine .reel,
```

Continues the selector grouping for classic and five-reel reels so both use the themed reel color.

### Line 1684

```text
.theme-slot-machine .reel-5reel { background: var(--slot-reel, #181820); }
```

Selects .theme-slot-machine .reel-5reel and applies background: var(--slot-reel, #181820).

### Line 1685

```text
.theme-slot-machine .symbol {
```

Selects .theme-slot-machine .symbol; the declarations inside control its matching elements.

### Line 1686

```text
  background: var(--slot-symbol, #1d1d26);
```

Sets background: var(--slot-symbol, #1d1d26) (paints the background).

### Line 1687

```text
  border-color: var(--slot-symbol-border, #2a2a38);
```

Sets border-color: var(--slot-symbol-border, #2a2a38) (sets border color).

### Line 1688

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1689

```text
.theme-slot-machine .symbol.highlight {
```

Selects .theme-slot-machine .symbol.highlight; the declarations inside control its matching elements.

### Line 1690

```text
  background: var(--slot-highlight, #3b3111);
```

Sets background: var(--slot-highlight, #3b3111) (paints the background).

### Line 1691

```text
  border: 2px solid var(--slot-accent, var(--gold-primary));
```

Sets border: 2px solid var(--slot-accent, var(--gold-primary)) (sets border width/style/color).

### Line 1692

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1693

```text
.theme-slot-machine .spin-btn {
```

Selects .theme-slot-machine .spin-btn; the declarations inside control its matching elements.

### Line 1694

```text
  background: linear-gradient(180deg, var(--slot-button-start, #ffd700), var(--slot-button-end, #b8860b));
```

Sets background: linear-gradient(180deg, var(--slot-button-start, #ffd700), var(--slot-button-end, #b8860b)) (paints the background).

### Line 1695

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1696

```text
.theme-slot-machine .btn-small { color: var(--slot-accent, var(--gold-primary)); border-color: var(--slot-accent, var(--gold-dark)); }
```

Selects .theme-slot-machine .btn-small and applies color: var(--slot-accent, var(--gold-primary)); border-color: var(--slot-accent, var(--gold-dark)).

### Line 1697

```text
.theme-slot-machine .max-btn { color: var(--slot-accent, #ff6b6b); border-color: var(--slot-accent, #ff4d4d); }
```

Selects .theme-slot-machine .max-btn and applies color: var(--slot-accent, #ff6b6b); border-color: var(--slot-accent, #ff4d4d).

### Line 1698

```text
.slot-theme-stakes { margin: 4px 0 0; color: var(--slot-accent, #ccc); text-align: center; font-size: 0.85rem; }
```

Selects .slot-theme-stakes and applies margin: 4px 0 0; color: var(--slot-accent, #ccc); text-align: center; font-size: 0.85rem.

### Line 1699

```text
.slot-stakes-note { margin: 0; color: var(--gold-primary); font-size: 0.9rem; font-weight: 700; }
```

Selects .slot-stakes-note and applies margin: 0; color: var(--gold-primary); font-size: 0.9rem; font-weight: 700.

### Line 1700

```text
.slot-symbol-image { width: 76%; height: 76%; object-fit: contain; }
```

Selects .slot-symbol-image and applies width: 76%; height: 76%; object-fit: contain.

### Line 1701

```text

```

Blank line separates stylesheet rules.

### Line 1702

```text
/* Local game additions: presentation only, never wager modifiers. */
```

Comment: Local game additions: presentation only, never wager modifiers..

### Line 1703

```text
.bet-controls { flex-wrap: wrap; }
```

Selects .bet-controls and applies flex-wrap: wrap.

### Line 1704

```text
.three-coin-stage { display: flex; justify-content: space-evenly; gap: 20px; padding: 42px 12px; perspective: 1000px; width: 100%; }
```

Selects .three-coin-stage and applies display: flex; justify-content: space-evenly; gap: 20px; padding: 42px 12px; perspective: 1000px; width: 100%.

### Line 1705

```text
.three-coin-stage .coin { width: 120px; height: 120px; flex: 0 0 120px; }
```

Selects .three-coin-stage .coin and applies width: 120px; height: 120px; flex: 0 0 120px.

### Line 1706

```text
.three-coin-stage .coin-face { font-size: 32px; }
```

Selects .three-coin-stage .coin-face and applies font-size: 32px.

### Line 1707

```text
.three-coin-choices { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin: 20px 0; width: 100%; }
```

Selects .three-coin-choices and applies display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin: 20px 0; width: 100%.

### Line 1708

```text
.three-coin-choices fieldset { border: 1px solid #807337; border-radius: 12px; padding: 10px; min-width: 0; text-align: center; }
```

Selects .three-coin-choices fieldset and applies border: 1px solid #807337; border-radius: 12px; padding: 10px; min-width: 0; text-align: center.

### Line 1709

```text
.three-coin-choices legend { padding: 0 6px; }
```

Selects .three-coin-choices legend and applies padding: 0 6px.

### Line 1710

```text
.three-coin-choices .choice-btn { width: 100%; margin: 4px 0; padding: 12px 4px; }
```

Selects .three-coin-choices .choice-btn and applies width: 100%; margin: 4px 0; padding: 12px 4px.

### Line 1711

```text
.game-rules-note, .slot-paytable, .slot-result-breakdown { line-height: 1.5; font-size: .95rem; }
```

Selects .game-rules-note, .slot-paytable, .slot-result-breakdown and applies line-height: 1.5; font-size: .95rem.

### Line 1712

```text
.slot-paytable, .slot-result-breakdown { padding: 14px; margin: 16px 0; border: 1px solid #75652e; border-radius: 12px; width: 100%; }
```

Selects .slot-paytable, .slot-result-breakdown and applies padding: 14px; margin: 16px 0; border: 1px solid #75652e; border-radius: 12px; width: 100%.

### Line 1713

```text
.slot-paytable table { width: 100%; border-collapse: collapse; }
```

Selects .slot-paytable table and applies width: 100%; border-collapse: collapse.

### Line 1714

```text
.slot-paytable th, .slot-paytable td { padding: 6px; text-align: left; }
```

Selects .slot-paytable th, .slot-paytable td and applies padding: 6px; text-align: left.

### Line 1715

```text
button:focus-visible, summary:focus-visible, select:focus-visible { outline: 3px solid #80dcff; outline-offset: 3px; }
```

Selects button:focus-visible, summary:focus-visible, select:focus-visible and applies outline: 3px solid #80dcff; outline-offset: 3px.

### Line 1716

```text
@media (max-width: 520px) {
```

Begins a responsive rule block that applies only when (max-width: 520px).

### Line 1717

```text
  .three-coin-stage { gap: 6px; padding: 26px 0; }
```

Selects .three-coin-stage and applies gap: 6px; padding: 26px 0.

### Line 1718

```text
  .three-coin-stage .coin { width: 78px; height: 78px; flex-basis: 78px; }
```

Selects .three-coin-stage .coin and applies width: 78px; height: 78px; flex-basis: 78px.

### Line 1719

```text
  .three-coin-stage .coin-face { font-size: 23px; }
```

Selects .three-coin-stage .coin-face and applies font-size: 23px.

### Line 1720

```text
  .three-coin-stage .coin-face span { font-size: 12px; }
```

Selects .three-coin-stage .coin-face span and applies font-size: 12px.

### Line 1721

```text
  .three-coin-choices { gap: 5px; }
```

Selects .three-coin-choices and applies gap: 5px.

### Line 1722

```text
  .three-coin-choices fieldset { padding: 5px; }
```

Selects .three-coin-choices fieldset and applies padding: 5px.

### Line 1723

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 1724

```text

```

Blank line separates stylesheet rules.

### Line 1725

```text
.accomplishments-panel { margin-top: 24px; padding: 20px; border: 1px solid #75652e; border-radius: 16px; background: var(--panel-bg); line-height: 1.6; }
```

Selects .accomplishments-panel and applies margin-top: 24px; padding: 20px; border: 1px solid #75652e; border-radius: 16px; background: var(--panel-bg); line-height: 1.6.

### Line 1726

```text
.accomplishments-panel h3 { color: var(--gold-primary); }
```

Selects .accomplishments-panel h3 and applies color: var(--gold-primary).

### Line 1727

```text
.accomplishments-list, .accomplishments-history { margin: 14px 0; }
```

Selects .accomplishments-list, .accomplishments-history and applies margin: 14px 0.

### Line 1728

```text
.accomplishments-history p { font-size: .85rem; color: #d2ced8; }
```

Selects .accomplishments-history p and applies font-size: .85rem; color: #d2ced8.

### Line 1729

```text
.accomplishments-select { margin-left: 8px; padding: 9px; max-width: 100%; border-radius: 8px; color: white; background: #252530; }
```

Selects .accomplishments-select and applies margin-left: 8px; padding: 9px; max-width: 100%; border-radius: 8px; color: white; background: #252530.

### Line 1730

```text
.cabinet-cosmetic-gold .slot-machine { box-shadow: 0 0 24px #b8860b88; }
```

Selects .cabinet-cosmetic-gold .slot-machine and applies box-shadow: 0 0 24px #b8860b88.

### Line 1731

```text
.cabinet-cosmetic-neon .slot-machine { box-shadow: 0 0 24px #00d2d388, 0 0 42px #e056fd55; }
```

Selects .cabinet-cosmetic-neon .slot-machine and applies box-shadow: 0 0 24px #00d2d388, 0 0 42px #e056fd55.

### Line 1732

```text
.cabinet-cosmetic-royal .slot-machine { outline: 3px solid #9c75d0; outline-offset: 4px; }
```

Selects .cabinet-cosmetic-royal .slot-machine and applies outline: 3px solid #9c75d0; outline-offset: 4px.

### Line 1733

```text
.cabinet-cosmetic-ruby .slot-machine { box-shadow: 0 0 28px #ed445f88; }
```

Selects .cabinet-cosmetic-ruby .slot-machine and applies box-shadow: 0 0 28px #ed445f88.

### Line 1734

```text
.cabinet-cosmetic-racing .slot-machine { box-shadow: 0 0 25px #44d96f77; }
```

Selects .cabinet-cosmetic-racing .slot-machine and applies box-shadow: 0 0 25px #44d96f77.

### Line 1735

```text
.cabinet-cosmetic-checkered .slot-machine { outline: 4px dashed #eee; outline-offset: 4px; }
```

Selects .cabinet-cosmetic-checkered .slot-machine and applies outline: 4px dashed #eee; outline-offset: 4px.

### Line 1736

```text
.cabinet-cosmetic-midnight .slot-machine { box-shadow: 0 0 28px #5578f788; }
```

Selects .cabinet-cosmetic-midnight .slot-machine and applies box-shadow: 0 0 28px #5578f788.

### Line 1737

```text

```

Blank line separates stylesheet rules.

### Line 1738

```text
.bet-controls { flex-wrap: wrap; }
```

Selects .bet-controls and applies flex-wrap: wrap.

### Line 1739

```text
.slot-paytable, .slot-result-breakdown { overflow-wrap: anywhere; }
```

Selects .slot-paytable, .slot-result-breakdown and applies overflow-wrap: anywhere.

### Line 1740

```text

```

Blank line separates stylesheet rules.

### Line 1741

```text
[data-slot-clear], #btn-bj-clear, #btn-coin-clear, #btn-three-coin-clear, #btn-race-clear { width: auto; min-width: 82px; height: auto; min-height: 30px; padding: 6px 10px; white-space: nowrap; font-size: .85rem; }
```

Selects [data-slot-clear], #btn-bj-clear, #btn-coin-clear, #btn-three-coin-clear, #btn-race-clear and applies width: auto; min-width: 82px; height: auto; min-height: 30px; padding: 6px 10px; white-space: nowrap; font-size: .85rem.
