# src/css/animation-reference.css

[Exact copy](../../../original/src/css/animation-reference.css)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
.splash-container {
```

Selects .splash-container; the declarations inside control its matching elements.

### Line 2

```text
  position: relative;
```

Sets position: relative (sets positioning scheme).

### Line 3

```text
  background: #0d0d11;
```

Sets background: #0d0d11 (paints the background).

### Line 4

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 5

```text

```

Blank line separates stylesheet rules.

### Line 6

```text
.splash-image {
```

Selects .splash-image; the declarations inside control its matching elements.

### Line 7

```text
  width: 100%;
```

Sets width: 100% (sets used width).

### Line 8

```text
  height: 100vh;
```

Sets height: 100vh (sets used height).

### Line 9

```text
  object-fit: cover;
```

Sets object-fit: cover (fits replaced content within its box).

### Line 10

```text
  /* Traces alpha transparency of the asset */
```

Comment: Traces alpha transparency of the asset.

### Line 11

```text
  filter: drop-shadow(0 0 0px rgba(99, 102, 241, 0)); 
```

Sets filter: drop-shadow(0 0 0px rgba(99, 102, 241, 0)) (applies visual filter).

### Line 12

```text
  animation: ambientGlow 3s ease-in-out infinite alternate;
```

Sets animation: ambientGlow 3s ease-in-out infinite alternate (runs a named CSS animation).

### Line 13

```text
}
```

Closes the current CSS rule or responsive/animation block.

### Line 14

```text

```

Blank line separates stylesheet rules.

### Line 15

```text
@keyframes ambientGlow {
```

Defines animation timeline ambientGlow for changing properties over time.

### Line 16

```text
  0% {
```

Selects 0%; the declarations inside control its matching elements.

### Line 17

```text
    filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.3));
```

Sets filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.3)) (applies visual filter).

### Line 18

```text
    transform: translateY(0);
```

Sets transform: translateY(0) (applies geometric transform).

### Line 19

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 20

```text
  100% {
```

Selects 100%; the declarations inside control its matching elements.

### Line 21

```text
    filter: drop-shadow(0 0 40px rgba(168, 85, 247, 0.6));
```

Sets filter: drop-shadow(0 0 40px rgba(168, 85, 247, 0.6)) (applies visual filter).

### Line 22

```text
    transform: translateY(-5px); /* Smooth GPU-promoted layer lift */
```

Sets transform: translateY(-5px) (applies geometric transform).

### Line 23

```text
  }
```

Closes the current CSS rule or responsive/animation block.

### Line 24

```text
}
```

Closes the current CSS rule or responsive/animation block.
