#!/usr/bin/env node

/**
 * Flow - Terminal Animation
 * A mesmerizing flowing pattern animation for your terminal
 * 
 * This script creates smooth, flowing patterns using ASCII characters
 * and terminal colors. It supports multiple colors and brightness levels.
 */

// ============================================================================
// Imports and Initial Setup
// ============================================================================

import terminalKit from 'terminal-kit';
const term = terminalKit.terminal;

// Screen dimensions (updated on resize)
let width, height;

// ============================================================================
// Configuration and Constants
// ============================================================================

// Animation timing
const FLOW_SPEED = 0.03;  // Speed of pattern movement
const FRAME_TIME = 40;    // Milliseconds between frames

// Character sets for different brightness levels
const CHARS = {
    bright:  '    ....,,,,;;;;====####@@@@',  // Dense pattern
    normal:  '   ....,,,,;;;;====####@@@@',   // Standard pattern
    dim:     '  ....,,,;;;;===###@@'         // Light pattern
};

// Available colors with brightness variants
const COLORS = {
    white: {
        normal: (str) => term.white(str),
        bright: (str) => term.brightWhite(str),
        dim: (str) => term.white(str)
    },
    matrix: {
        normal: (str) => term.green(str),
        bright: (str) => term.brightGreen(str),
        dim: (str) => term.green(str)
    },
    cyan: {
        normal: (str) => term.cyan(str),
        bright: (str) => term.brightCyan(str),
        dim: (str) => term.cyan(str)
    },
    purple: {
        normal: (str) => term.magenta(str),
        bright: (str) => term.brightMagenta(str),
        dim: (str) => term.magenta(str)
    },
    blue: {
        normal: (str) => term.blue(str),
        bright: (str) => term.brightBlue(str),
        dim: (str) => term.blue(str)
    },
    red: {
        normal: (str) => term.red(str),
        bright: (str) => term.brightRed(str),
        dim: (str) => term.red(str)
    },
    yellow: {
        normal: (str) => term.yellow(str),
        bright: (str) => term.brightYellow(str),
        dim: (str) => term.yellow(str)
    }
};

// ============================================================================
// State Management
// ============================================================================

// Animation state
let time = 0;

// Current display settings
let currentColor = 'cyan';    // Default color
let brightness = 'normal';    // Default brightness
let secondColor = null;       // Optional second color for blending
let blendStyle = 'chars';     // Default blend style

// Blend style functions
const BLEND_STYLES = {
    // Original character-based blending
    chars: (char, value, x, y, t) => {
        if (!secondColor) return COLORS[currentColor][brightness];
        if ('.,:;'.includes(char)) {
            return COLORS[currentColor][brightness];
        } else if ('=#@'.includes(char)) {
            return COLORS[secondColor][brightness];
        } else {
            return COLORS[currentColor][brightness];
        }
    },
    
    // Flowing bands that follow the pattern
    bands: (char, value, x, y, t) => {
        if (!secondColor) return COLORS[currentColor][brightness];
        // Use the flow pattern to influence the bands
        const flowOffset = Math.sin((x + y) * 0.05 + t) * 0.3;
        const bandValue = Math.sin((x * 0.1) + flowOffset + t * 0.5) * 0.5 + 0.5;
        return bandValue > 0.5 ? COLORS[currentColor][brightness] : COLORS[secondColor][brightness];
    },
    
    // Diagonal waves
    waves: (char, value, x, y, t) => {
        if (!secondColor) return COLORS[currentColor][brightness];
        const waveValue = Math.sin((x + y) * 0.1 + t) * 0.5 + 0.5;
        return waveValue > 0.5 ? COLORS[currentColor][brightness] : COLORS[secondColor][brightness];
    },
    
    // Value-based (denser patterns get second color)
    value: (char, value, x, y, t) => {
        if (!secondColor) return COLORS[currentColor][brightness];
        return value > 0.5 ? COLORS[secondColor][brightness] : COLORS[currentColor][brightness];
    }
};

function getColorForChar(char, value, x, y, t) {
    const blendFn = BLEND_STYLES[blendStyle] || BLEND_STYLES.chars;
    return blendFn(char, value, x, y, t);
}

// ============================================================================
// Pattern Generation
// ============================================================================

/**
 * Generates a flowing pattern value for a given point and time
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} t - Current time value
 * @returns {number} Pattern value between 0 and 1
 */
function getFlowPattern(x, y, t) {
    const scale = 0.08;
    
    // Combine multiple sine waves for a more complex flow
    const value = Math.sin((x + y) * scale + t) * 0.5 + 
                 Math.sin(x * scale - t * 1.2) * 0.3 +
                 Math.sin(y * scale + t * 0.8) * 0.2;
    
    return (value + 1) / 2; // Normalize to 0-1
}

function render() {
    const currentChars = CHARS[brightness];
    
    // Generate and render the pattern line by line
    term.moveTo(1, 1);
    for (let y = 0; y < height - 1; y++) {
        for (let x = 0; x < width; x++) {
            const value = getFlowPattern(x, y, time);
            const charIndex = Math.floor(value * (currentChars.length - 1));
            const char = currentChars[charIndex];
            
            // Get color based on the current blend style
            const colorFn = getColorForChar(char, value, x, y, time);
            colorFn(char);
        }
        term.nextLine();
    }
}

/**
 * Main animation loop
 */
function animate() {
    render();
    time += FLOW_SPEED;
    setTimeout(animate, FRAME_TIME);
}

// ============================================================================
// Command Line Interface
// ============================================================================

/**
 * Displays usage information
 */
function showUsage() {
    console.log('\nFlow - Terminal Animation');
    console.log('=======================\n');
    console.log('Usage:');
    console.log('  flow [color] [options]\n');
    console.log('Colors:');
    console.log('  white    - Flowing white/gray tones');
    console.log('  matrix   - Classic Matrix green flow');
    console.log('  cyan     - Default, smooth cyan flow');
    console.log('  purple   - Flowing magenta/purple');
    console.log('  blue     - Deep blue currents');
    console.log('  red      - Flowing red patterns');
    console.log('  yellow   - Warm yellow streams\n');
    console.log('Options:');
    console.log('  -b, --bright              Brighter color with denser pattern');
    console.log('  -d, --dim                 Standard color with lighter pattern');
    console.log('  --blend [color]           Blend with a second color');
    console.log('  --blend-style [style]     Choose blend style:');
    console.log('    chars   - Character-based blending (default)');
    console.log('    bands   - Vertical flowing bands');
    console.log('    waves   - Diagonal waves');
    console.log('    value   - Density-based blending\n');
    console.log('Examples:');
    console.log('  flow              # Default cyan flow');
    console.log('  flow matrix -b    # Dense bright green Matrix-style');
    console.log('  flow cyan --blend blue                  # Character-based cyan/blue blend');
    console.log('  flow purple --blend yellow --blend-style bands   # Purple/yellow bands');
    console.log('  flow red --blend blue --blend-style value       # Density-based red/blue\n');
    console.log('Controls:');
    console.log('  Ctrl+C    Exit the animation\n');
    console.log('Starting in 2 seconds...');
}

// Parse command line arguments
const args = process.argv.slice(2);

// Process arguments
args.forEach((arg, index) => {
    if (arg.startsWith('-')) {
        switch (arg.toLowerCase()) {
            case '-b':
            case '--bright':
                brightness = 'bright';
                break;
            case '-d':
            case '--dim':
                brightness = 'dim';
                break;
            case '--blend':
                // Check if next argument exists and is a valid color
                if (index + 1 < args.length && COLORS[args[index + 1].toLowerCase()]) {
                    secondColor = args[index + 1].toLowerCase();
                }
                break;
            case '--blend-style':
                // Check if next argument is a valid blend style
                if (index + 1 < args.length && BLEND_STYLES[args[index + 1].toLowerCase()]) {
                    blendStyle = args[index + 1].toLowerCase();
                }
                break;
        }
    } else if (COLORS[arg.toLowerCase()] && !secondColor) {
        currentColor = arg.toLowerCase();
    }
});

// ============================================================================
// Event Handlers
// ============================================================================

// Handle terminal resize
term.on('resize', (width_, height_) => {
    width = width_;
    height = height_;
    term.clear();
});

// Handle exit
process.on('SIGINT', () => {
    term.clear();
    term.showCursor();
    process.exit(0);
});

// ============================================================================
// Initialization
// ============================================================================

/**
 * Initialize and start the animation
 */
function init() {
    // Setup terminal
    term.hideCursor();
    term.clear();
    
    // Get initial dimensions
    width = term.width;
    height = term.height;
    
    // Show usage or start immediately
    if (args.length === 0) {
        showUsage();
        setTimeout(() => {
            term.clear();
            animate();
        }, 2000);
    } else {
        animate();
    }
}

// Start the animation
init(); 