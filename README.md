# Flow - Terminal Pattern Animation

A mesmerizing flowing pattern animation that creates beautiful, dynamic visuals in your terminal.

## Features

- Dynamic flowing patterns
- Multiple color options
- Different blend styles and effects
- Brightness controls
- Responsive to terminal size
- Smooth animations
- Customizable wave patterns

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

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

MIT License - feel free to use and modify as you like.

## Author

Created with ❤️ for terminal aesthetics.
