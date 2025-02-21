# Flow - Terminal Screensaver

A mesmerizing flowing pattern animation that creates beautiful, dynamic visuals in your terminal.

## Examples

Here are some examples of what Flow can create:

### Default Flow
Simple, smooth cyan pattern:
```bash
flow
```
![Default Flow](gifs/blue.gif)

### Bright Purple Flow
Dense pattern with bright purple:
```bash
flow purple -b
```
![Bright Purple](gifs/purple.gif)

### Color Blending
Red and blue density-based blend:
```bash
flow red --blend blue --blend-style value
```
![Color Blend](gifs/bluered.gif)

### Matrix with Extra Waves
Complex Matrix-style pattern with maximum wave complexity:
```bash
flow matrix --waves 3
```
![Matrix Complex](gifs/matrix.gif)

## Features

- Dynamic flowing patterns
- Multiple color options
- Different blend styles and effects
- Brightness controls
- Responsive to terminal size
- Smooth animations
- Customizable wave patterns
- Adjustable animation speed

## Installation

To install Flow globally on your system, run:

```bash
npm install -g .
```

## Usage

Run the animation with default settings:
```bash
flow
```

### Color Options

Choose from several beautiful color schemes:
- `white` - Flowing white/gray tones
- `matrix` - Classic Matrix green flow
- `cyan` - Default, smooth cyan flow
- `purple` - Flowing magenta/purple
- `blue` - Deep blue currents
- `red` - Flowing red patterns
- `yellow` - Warm yellow streams

Example:
```bash
flow matrix    # Run with Matrix green
flow blue      # Run with blue colors
```

### Brightness Controls

Adjust the pattern density and brightness:
- `-b, --bright` - Brighter color with denser pattern
- `-d, --dim` - Standard color with lighter pattern

Example:
```bash
flow purple -b    # Bright purple with dense pattern
flow yellow -d    # Dim yellow with light pattern
```

### Blend Styles

When using two colors, choose how they blend:
- `chars` - Character-based blending (default)
- `waves` - Flowing diagonal waves
- `bands` - Animated flowing bands
- `value` - Density-based color selection

Example:
```bash
flow cyan --blend blue                  # Default character-based blend
flow purple --blend yellow --blend-style waves   # Diagonal wave pattern
flow red --blend blue --blend-style value       # Density-based coloring
```

### Wave Patterns

Add complexity to the animation with additional wave patterns:
```bash
flow cyan --waves 1    # Add one extra wave
flow blue --waves 2    # Add two extra waves
flow purple --waves 3  # Maximum complexity with all waves
```

Each wave adds its own unique movement:
- Wave 1: Diagonal crossing pattern for dynamic movement
- Wave 2: Horizontal drift for flow variation
- Wave 3: Vertical sweep for extra complexity

Combine with other options:
```bash
flow cyan --waves 2 --blend blue    # Complex pattern with color blending
flow matrix --waves 3 -b           # Maximum complexity with bright mode
```

### Speed Control

Adjust the animation speed to create different effects:
```bash
flow cyan --speed 0.5     # Slower, more relaxing flow
flow matrix --speed 2     # Faster, more energetic pattern
```

The speed can be set from 0.1 (very slow) to 5 (very fast), with 1 being the default speed.

Combine with other features:
```bash
flow blue --waves 2 --speed 0.7    # Complex pattern at a gentle pace
flow matrix --speed 3 -b           # Fast-paced bright Matrix effect
```

## Controls

- `Ctrl+C` - Exit the animation
- Terminal will automatically adjust to window resizing

## Requirements

- Node.js 14.0.0 or higher
- Terminal with color support
- Unix-like environment (Linux, macOS, WSL)

## Technical Details

Flow uses ASCII characters and terminal colors to create smooth, flowing patterns. The animation is generated using mathematical sine waves combined with character density mapping to create a fluid-like effect.

The pattern density varies with brightness:
- Bright mode: Dense character pattern
- Normal mode: Standard pattern
- Dim mode: Light, sparse pattern

## Acknowledgments

Flow was inspired by [pipes.sh](https://github.com/pipeseroni/pipes.sh), the classic animated pipes terminal screensaver. While pipes.sh creates engaging pipe-based patterns, Flow takes a different approach with fluid, wave-based animations while maintaining the same spirit of terminal-based visual art.

