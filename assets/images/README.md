# Base Images for Cortex

This folder contains the fixed base images for each level to reduce API costs.

## Current Images

### Level 1: Cat Stuck in Tree
- **File**: `level1_base.svg` (placeholder)
- **Recommended**: `level1_base.png` (1024x1024)
- **Description**: A cute cartoon cat stuck high up on a tree branch, needing rescue

## How to Replace Placeholder Images

1. **Generate the ideal base image using AI:**
   - Use the prompt: "A little cat stuck high up on a tree branch, wide shot, clear scene, daylight, cartoon style, colorful, 1024x1024"
   - Generate using your preferred AI image generator
   - Save as PNG format

2. **Replace the placeholder:**
   - Save the generated image as `level1_base.png` in this folder
   - The game will automatically use PNG over SVG if available

3. **Update levels.js if needed:**
   - The game is already configured to use `assets/images/level1_base.png`
   - If you use a different filename, update the `fixedBaseImage` property in `js/levels.js`

## Benefits

- **Cost Savings**: No API calls when loading levels
- **Consistency**: Same base scene every time
- **Performance**: Instant loading of base images
- **Reliability**: No dependency on external APIs for basic functionality

## Future Levels

Add more base images for other levels that need fixed scenes:
- `level2_base.png`: Bright sunny park scene
- `level3_base.png`: Simple three-legged cat scene
- etc.
