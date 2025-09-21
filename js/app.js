/* ===========================================
   Main Game Logic - Cortex: AI Parameter Lab
   Integrates all modules to provide complete game experience
   =========================================== */

// Game state management
let gameState = {
    currentLevel: 1,
    lastGeneratedImage: null,
    lastPrompt: '',
    lastCreativity: 50,
    lastStyle: null,
    lastStyleWeight: 0,
    lastMatchedKeywords: [],
    isGenerating: false,
    parametersUnlocked: false,
    highestUnlockedLevel: 1
};

// DOM element references
let elements = {};

/**
 * Initialize game after page load
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Cortex: AI Parameter Lab - Initializing...');
    
    initializeElements();
    initializeEventListeners();
    initializeSliders();
    initializeProgress();
    
    // Add a small delay to ensure all elements are ready
    setTimeout(() => {
        showLevelSelectScreen();
    }, 100);
    
    console.log('✅ Game initialization complete');
    
    // Initialize URL state based on current hash
    initializeUrlState();
});

/**
 * Initialize DOM element references
 */
function initializeElements() {
    elements = {
        // Level select screen elements
        levelSelectScreen: document.getElementById('level-select-screen'),
        levelGrid: document.getElementById('level-grid'),
        progressText: document.getElementById('progress-text'),
        resetProgressBtn: document.getElementById('reset-progress-btn'),
        audioToggleBtn: document.getElementById('audio-toggle-btn'),
        
        // Game screen elements
        gameScreen: document.getElementById('game-screen'),
        backToLevelsBtn: document.getElementById('back-to-levels-btn'),
        
        // Level information
        levelBadge: document.getElementById('level-badge'),
        problemText: document.getElementById('problem-text'),
        exampleHints: document.getElementById('example-hints'),
        hintChips: document.getElementById('hint-chips'),
        
        // Input controls - Support both modes
        promptInput: document.getElementById('prompt-input'),
        safeModeBtn: document.getElementById('safe-mode-btn'),
        freeModeBtn: document.getElementById('free-mode-btn'),
        freeTextInput: document.getElementById('free-text-input'),
        safePromptBuilder: document.getElementById('safe-prompt-builder'),
        coreElementsSelect: document.getElementById('core-elements-select'),
        solutionsToolsSelect: document.getElementById('solutions-tools-select'),
        actionsMethodsSelect: document.getElementById('actions-methods-select'),
        promptDisplay: document.getElementById('prompt-display'),
        generateBtn: document.getElementById('generate-btn'),
        
        // Parameter controls
        parametersCard: document.getElementById('parameters-card'),
        creativitySlider: document.getElementById('creativity-slider'),
        creativityValue: document.getElementById('creativity-value'),
        styleSlider: document.getElementById('style-slider'),
        styleValue: document.getElementById('style-value'),
        currentStyle: document.getElementById('current-style'),
        styleSelect: document.getElementById('style-select'),
        styleSelectionGroup: document.getElementById('style-selection-group'),
        creativityTarget: document.getElementById('creativity-target'),
        styleTarget: document.getElementById('style-target'),
        
        // Result display
        imageContainer: document.getElementById('image-container'),
        judgmentControls: document.getElementById('judgment-controls'),
        solvedButton: document.getElementById('solved-button'),
        notSolvedButton: document.getElementById('not-solved-button'),
        explanationControls: document.getElementById('explanation-controls'),
        whyButton: document.getElementById('why-button'),
        
        // Modal dialogs
        explanationPanel: document.getElementById('explanation-panel'),
        explanationText: document.getElementById('explanation-text'),
        closeExplanation: document.getElementById('close-explanation'),
        loadingOverlay: document.getElementById('loading-overlay'),
        successModal: document.getElementById('success-modal'),
        nextLevelBtn: document.getElementById('next-level-btn')
    };
    
    // Verify essential elements exist
    const missingElements = Object.keys(elements).filter(key => !elements[key]);
    if (missingElements.length > 0) {
        console.error('❌ Missing essential DOM elements:', missingElements);
        
        // Try to fix missing key elements
        if (!elements.levelSelectScreen) {
            console.log('🔧 Creating missing level-select-screen element');
            const levelSelectScreen = document.createElement('div');
            levelSelectScreen.id = 'level-select-screen';
            levelSelectScreen.className = 'level-select-screen';
            document.body.appendChild(levelSelectScreen);
            elements.levelSelectScreen = levelSelectScreen;
        }
        
        if (!elements.levelGrid) {
            console.log('🔧 Creating missing level-grid element');
            const levelGrid = document.createElement('div');
            levelGrid.id = 'level-grid';
            levelGrid.className = 'level-grid';
            if (elements.levelSelectScreen) {
                elements.levelSelectScreen.appendChild(levelGrid);
                elements.levelGrid = levelGrid;
            }
        }
    }
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    // Generate button click
    elements.generateBtn.addEventListener('click', handleGenerate);
    
    // Mode toggle buttons
    elements.safeModeBtn.addEventListener('click', () => switchInputMode('safe'));
    elements.freeModeBtn.addEventListener('click', () => switchInputMode('free'));
    
    // Free text input event listeners
    elements.promptInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !gameState.isGenerating) {
            handleGenerate();
        }
    });
    
    // Safe prompt builder event listeners
    elements.coreElementsSelect.addEventListener('change', updatePromptDisplay);
    elements.solutionsToolsSelect.addEventListener('change', updatePromptDisplay);
    elements.actionsMethodsSelect.addEventListener('change', updatePromptDisplay);
    
    // Why button click
    elements.whyButton.addEventListener('click', showExplanation);
    
    // Close explanation panel
    elements.closeExplanation.addEventListener('click', hideExplanation);
    elements.explanationPanel.addEventListener('click', (e) => {
        if (e.target === elements.explanationPanel) {
            hideExplanation();
        }
    });
    
    // Level select navigation buttons
    elements.backToLevelsBtn.addEventListener('click', () => {
        // Use browser history instead of direct function call
        history.back();
    });
    elements.resetProgressBtn.addEventListener('click', resetProgress);
    elements.audioToggleBtn.addEventListener('click', toggleAudio);
    
    // Browser history management
    window.addEventListener('popstate', handleHistoryNavigation);
    
    // Next level button - Modified to handle level progression
    elements.nextLevelBtn.addEventListener('click', handleLevelComplete);
    
    // Judgment buttons
    elements.solvedButton.addEventListener('click', handleProblemSolved);
    elements.notSolvedButton.addEventListener('click', handleProblemNotSolved);
    
    // ESC key closes modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideExplanation();
            hideSuccessModal();
        }
    });
    
    // Update target indicators on window resize
    window.addEventListener('resize', () => {
        if (gameState.currentLevel) {
            const level = getLevel(gameState.currentLevel);
            if (level) {
                setTimeout(() => updateParameterTargets(level), 100); // Small delay for layout
            }
        }
    });
}

/**
 * Initialize slider controls
 */
function initializeSliders() {
    // Creativity slider
    elements.creativitySlider.addEventListener('input', (e) => {
        const value = e.target.value;
        elements.creativityValue.textContent = value;
        elements.creativitySlider.setAttribute('aria-valuenow', value);
        gameState.lastCreativity = parseInt(value);
    });
    
    // Style weight slider
    elements.styleSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        elements.styleValue.textContent = value;
        elements.styleSlider.setAttribute('aria-valuenow', value);
        gameState.lastStyleWeight = parseInt(value);
    });
    
    // Style selection dropdown
    elements.styleSelect.addEventListener('change', (e) => {
        const selectedStyle = e.target.value;
        gameState.lastStyle = selectedStyle || null;
        elements.currentStyle.textContent = selectedStyle || 'None';
    });
}

/**
 * Load specified level
 */
function loadLevel(levelNumber) {
    console.log(`📖 Loading level ${levelNumber}`);
    
    const level = getLevel(levelNumber);
    if (!level) {
        console.error(`❌ Level ${levelNumber} does not exist`);
        showGameComplete();
        return;
    }
    
    // Update game state
    gameState.currentLevel = levelNumber;
    gameState.lastGeneratedImage = null;
    gameState.lastMatchedKeywords = [];
    
    // Update UI display
    elements.levelBadge.textContent = `Level ${levelNumber}`;
    elements.problemText.textContent = level.problem;
    
    // Reset both input modes
    elements.promptInput.value = '';
    elements.coreElementsSelect.value = '';
    elements.solutionsToolsSelect.value = '';
    elements.actionsMethodsSelect.value = '';
    
    // Populate dynamic vocabulary for Safe Mode
    populateSafeModeDropdowns(level);
    
    updatePromptDisplay();
    
    // Clear image display
    resetImageContainer();
    elements.explanationControls.style.display = 'none';
    
    // Check if parameter controls should be unlocked
    const shouldUnlock = shouldUnlockParameters(levelNumber);
    if (shouldUnlock && !gameState.parametersUnlocked) {
        unlockParameterControls(level);
    }
    elements.parametersCard.style.display = shouldUnlock ? 'block' : 'none';
    
    // Set style information and populate style dropdown
    updateStyleSelection(level);
    
    // Update target indicators for parameter requirements
    updateParameterTargets(level);
    
    if (level.style) {
        elements.currentStyle.textContent = level.style;
        gameState.lastStyle = level.style;
    } else {
        elements.currentStyle.textContent = 'None';
        gameState.lastStyle = null;
    }
    
    // Show educational focus
    showEducationalFocus(level);
    
    // Show example hints
    showExampleHints(level);
    
    console.log(`✅ Level ${levelNumber} loaded successfully`);

    // If a fixed base image is defined (e.g., Level 1), show it immediately.
    if (level.fixedBaseImage) {
        displayFixedBaseImage(level.fixedBaseImage);
    } else if (level.basePrompt) {
        // Otherwise, auto-generate a base image from prompt
        autoGenerateBaseImage(level);
    }
}

/**
 * Unlock parameter control panel
 */
function unlockParameterControls(level) {
    gameState.parametersUnlocked = true;
    
    // Add unlock animation
    elements.parametersCard.classList.add('pulse');
    setTimeout(() => {
        elements.parametersCard.classList.remove('pulse');
    }, 2000);
    
    // Show unlock notification
    showNotification('🎉 Parameter control panel unlocked! Now you can control AI creativity and style!', 'success');
}

/**
 * Update style selection dropdown based on level
 */
function updateStyleSelection(level) {
    if (!elements.styleSelect || !elements.styleSelectionGroup) return;
    
    // Clear existing options
    elements.styleSelect.innerHTML = '<option value="">No style</option>';
    
    // Check if this level has available styles
    if (level.availableStyles && level.availableStyles.length > 0) {
        // Show style selection dropdown
        elements.styleSelectionGroup.style.display = 'block';
        
        // Add available styles as options
        level.availableStyles.forEach(style => {
            const option = document.createElement('option');
            option.value = style;
            option.textContent = style.charAt(0).toUpperCase() + style.slice(1);
            elements.styleSelect.appendChild(option);
        });
        
        console.log(`🎨 Available styles for level ${level.id}:`, level.availableStyles);
    } else {
        // Hide style selection dropdown
        elements.styleSelectionGroup.style.display = 'none';
    }
    
    // Reset selection
    elements.styleSelect.value = '';
    gameState.lastStyle = null;
    elements.currentStyle.textContent = 'None';
}

/**
 * Show example hints as clickable chips
 */
function showExampleHints(level) {
    if (!elements.exampleHints || !elements.hintChips) return;
    
    // Clear existing chips
    elements.hintChips.innerHTML = '';
    
    // Check if level has solution keywords to use as hints
    if (level.solutionKeywords && level.solutionKeywords.length > 0) {
        // Show up to 4 example keywords as chips
        const exampleKeywords = level.solutionKeywords.slice(0, 4);
        
        exampleKeywords.forEach(keyword => {
            const chip = document.createElement('button');
            chip.className = 'hint-chip';
            chip.textContent = keyword;
            chip.setAttribute('data-keyword', keyword);
            
            // Add click handler to populate safe prompt builder
            chip.addEventListener('click', () => {
                handleHintChipClick(keyword);
                audioSystem.playClick(); // Play sound if audio system is available
            });
            
            elements.hintChips.appendChild(chip);
        });
        
        // Show the hints section
        elements.exampleHints.style.display = 'block';
        console.log(`💡 Showing example hints for level ${level.id}:`, exampleKeywords);
    } else {
        // Hide hints section if no keywords available
        elements.exampleHints.style.display = 'none';
    }
}

/**
 * Handle hint chip click - populate prompt builder
 */
function handleHintChipClick(keyword) {
    // Check which input mode is active
    const isSafeMode = elements.safeModeBtn.classList.contains('active');
    
    if (isSafeMode) {
        // Try to populate safe prompt builder
        populateSafePromptFromHint(keyword);
    } else {
        // For free text mode, just add to input
        const currentPrompt = elements.promptInput.value.trim();
        const newPrompt = currentPrompt ? `${currentPrompt} ${keyword}` : keyword;
        elements.promptInput.value = newPrompt;
        elements.promptInput.focus();
    }
    
    showNotification(`💡 Added "${keyword}" to your prompt!`, 'info', 2000);
}

/**
 * Populate safe prompt builder from hint keyword
 */
function populateSafePromptFromHint(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    
    // Get current level to access dynamic vocabulary
    const currentLevel = getLevel(gameState.currentLevel);
    if (!currentLevel || !currentLevel.safeModeOptions) {
        return;
    }
    
    const { coreElements, solutionsTools, actionsMethods } = currentLevel.safeModeOptions;
    
    // Try to find matching option in each category
    let found = false;
    
    // Check core elements
    for (const item of coreElements) {
        if (item.value.toLowerCase().includes(lowerKeyword) || item.text.toLowerCase().includes(lowerKeyword)) {
            elements.coreElementsSelect.value = item.value;
            found = true;
            break;
        }
    }
    
    // Check solutions/tools
    if (!found) {
        for (const item of solutionsTools) {
            if (item.value.toLowerCase().includes(lowerKeyword) || item.text.toLowerCase().includes(lowerKeyword)) {
                elements.solutionsToolsSelect.value = item.value;
                found = true;
                break;
            }
        }
    }
    
    // Check actions/methods
    if (!found) {
        for (const item of actionsMethods) {
            if (item.value.toLowerCase().includes(lowerKeyword) || item.text.toLowerCase().includes(lowerKeyword)) {
                elements.actionsMethodsSelect.value = item.value;
                found = true;
                break;
            }
        }
    }
    
    // Update the prompt display
    updatePromptDisplay();
}

/**
 * Update parameter target indicators based on level requirements
 */
function updateParameterTargets(level) {
    if (!elements.creativityTarget || !elements.styleTarget) return;
    
    // Reset target indicators
    elements.creativityTarget.style.display = 'none';
    elements.styleTarget.style.display = 'none';
    
    if (!level.unlockParameters) return;
    
    // Show creativity target if required
    if (level.requiredCreativity) {
        const targetPercent = level.requiredCreativity * 100;
        const sliderWidth = elements.creativitySlider.offsetWidth;
        const targetPosition = (targetPercent / 100) * sliderWidth - 2; // -2px to center the indicator
        
        elements.creativityTarget.style.display = 'block';
        elements.creativityTarget.style.left = `${targetPosition}px`;
        elements.creativityTarget.title = `Target: ${Math.round(targetPercent)}%+`;
        
        console.log(`🎨 Creativity target set at ${Math.round(targetPercent)}%`);
    }
    
    // Show style weight target if required
    if (level.requiredStyleWeight) {
        const targetPercent = level.requiredStyleWeight * 100;
        const sliderWidth = elements.styleSlider.offsetWidth;
        const targetPosition = (targetPercent / 100) * sliderWidth - 2; // -2px to center the indicator
        
        elements.styleTarget.style.display = 'block';
        elements.styleTarget.style.left = `${targetPosition}px`;
        elements.styleTarget.title = `Target: ${Math.round(targetPercent)}%+`;
        
        console.log(`🎭 Style weight target set at ${Math.round(targetPercent)}%`);
    }
}

/**
 * Show educational focus
 */
function showEducationalFocus(level) {
    const focus = level.educationalFocus;
    if (focus) {
        showNotification(`📚 Educational focus: ${focus}`, 'info', 3000);
    }
}

/**
 * Switch between input modes
 */
function switchInputMode(mode) {
    if (mode === 'safe') {
        elements.safeModeBtn.classList.add('active');
        elements.freeModeBtn.classList.remove('active');
        elements.safePromptBuilder.style.display = 'block';
        elements.freeTextInput.style.display = 'none';
    } else {
        elements.freeModeBtn.classList.add('active');
        elements.safeModeBtn.classList.remove('active');
        elements.freeTextInput.style.display = 'block';
        elements.safePromptBuilder.style.display = 'none';
    }
}

/**
 * Populate Safe Mode dropdowns based on current level data
 * @param {Object} level - Current level data
 */
function populateSafeModeDropdowns(level) {
    if (!level.safeModeOptions) {
        console.log('No safe mode options found for this level');
        return;
    }

    const { coreElements, solutionsTools, actionsMethods } = level.safeModeOptions;

    // Helper function to populate a single dropdown
    const populateDropdown = (selectElement, items, defaultText) => {
        // Clear existing options
        selectElement.innerHTML = `<option value="">${defaultText}</option>`;
        
        // Add new options
        items.forEach(item => {
            const option = document.createElement('option');
            option.textContent = item.text;
            option.value = item.value;
            selectElement.appendChild(option);
        });
    };

    // Populate each dropdown
    populateDropdown(elements.coreElementsSelect, coreElements, 'Choose core element...');
    populateDropdown(elements.solutionsToolsSelect, solutionsTools, 'Choose solution...');
    populateDropdown(elements.actionsMethodsSelect, actionsMethods, 'Choose action...');
    
    console.log(`✅ Populated safe mode dropdowns for Level ${level.id}`);
}

/**
 * Update prompt display based on selected options
 */
function updatePromptDisplay() {
    const coreElement = elements.coreElementsSelect.value;
    const solutionTool = elements.solutionsToolsSelect.value;
    const actionMethod = elements.actionsMethodsSelect.value;
    
    let prompt = '';
    
    // Build prompt based on selected options
    if (actionMethod && solutionTool) {
        prompt = `${actionMethod} ${solutionTool}`;
        if (coreElement) {
            prompt += ` to help the ${coreElement}`;
        }
    } else if (solutionTool) {
        prompt = solutionTool;
        if (coreElement) {
            prompt += ` for the ${coreElement}`;
        }
    } else if (coreElement) {
        prompt = coreElement;
    }
    
    if (prompt) {
        elements.promptDisplay.textContent = prompt;
        elements.promptDisplay.className = 'prompt-display has-content';
    } else {
        elements.promptDisplay.textContent = 'Choose options to build your prompt...';
        elements.promptDisplay.className = 'prompt-display empty';
    }
}

/**
 * Get the current prompt from either input mode
 */
function getCurrentPrompt() {
    // Check which mode is active
    const isSafeMode = elements.safeModeBtn.classList.contains('active');
    
    if (isSafeMode) {
        // Get from safe prompt builder
        const coreElement = elements.coreElementsSelect.value;
        const solutionTool = elements.solutionsToolsSelect.value;
        const actionMethod = elements.actionsMethodsSelect.value;
        
        let prompt = '';
        
        // Build prompt based on selected options (same logic as updatePromptDisplay)
        if (actionMethod && solutionTool) {
            prompt = `${actionMethod} ${solutionTool}`;
            if (coreElement) {
                prompt += ` to help the ${coreElement}`;
            }
        } else if (solutionTool) {
            prompt = solutionTool;
            if (coreElement) {
                prompt += ` for the ${coreElement}`;
            }
        } else if (coreElement) {
            prompt = coreElement;
        }
        
        return prompt;
    } else {
        // Get from free text input
        return elements.promptInput.value.trim();
    }
}

/**
 * Handle image generation request - Updated for safe prompt builder
 */
async function handleGenerate() {
    const userPrompt = getCurrentPrompt();
    const level = getLevel(gameState.currentLevel);

    // Build final prompt: for levels with basePrompt (e.g., Level 1),
    // always include the base scene so additions like "加个梯子" keep the context
    // Special flow: Level with fixed base image (Level 1). Produce an edited image on top of base.
    if (level && level.fixedBaseImage) {
        if (!userPrompt) {
            showNotification('请输入要添加/修改的内容，例如：加个梯子', 'warning');
            return;
        }
        if (gameState.isGenerating) {
            console.log('⚠️ Generation in progress, ignoring duplicate request');
            return;
        }

        gameState.isGenerating = true;
        gameState.lastPrompt = userPrompt;
        showLoadingState();

        try {
            await generateLevel1AIEdit(userPrompt, level.fixedBaseImage);
        } catch (e) {
            console.error('❌ Level 1 AI edit failed:', e);
            handleGenerationFailure(e.message);
        } finally {
            hideLoadingState();
            gameState.isGenerating = false;
        }
        return; // Stop normal API flow
    }

    const prompt = (level && level.basePrompt)
        ? (userPrompt ? `${level.basePrompt}; ${userPrompt}` : level.basePrompt)
        : userPrompt;
    
    // Validate input
    if (!prompt) {
        const isSafeMode = elements.safeModeBtn.classList.contains('active');
        if (isSafeMode) {
            showNotification('Please select at least one option to generate an image!', 'warning');
            elements.coreElementsSelect.focus();
        } else {
            showNotification('Please enter a prompt!', 'warning');
            elements.promptInput.focus();
        }
        return;
    }
    
    if (gameState.isGenerating) {
        console.log('⚠️ Generation in progress, ignoring duplicate request');
        return;
    }
    
    // Start generation process
    gameState.isGenerating = true;
    gameState.lastPrompt = prompt;
    
    showLoadingState();
    
    try {
        // Prepare API parameters
        const creativity = gameState.lastCreativity;
        const temperature = creativity / 50.0; // Convert to 0-2.0 range
        const styledPrompt = getStyledPrompt(prompt, gameState.lastStyle, gameState.lastStyleWeight);
        
        console.log('🎨 Starting image generation:', { prompt: styledPrompt, temperature });
        
        // Call API to generate image
        const imageData = await generateImage(styledPrompt, temperature);
        
        if (imageData) {
            await handleGenerationSuccess(imageData, prompt);
        } else {
            handleGenerationFailure();
        }
        
    } catch (error) {
        console.error('❌ Error during image generation:', error);
        handleGenerationFailure(error.message);
    } finally {
        hideLoadingState();
        gameState.isGenerating = false;
    }
}

/**
 * Handle generation success
 */
async function handleGenerationSuccess(imageData, originalPrompt) {
    console.log('✅ Image generation successful');
    
    // Save generation result
    gameState.lastGeneratedImage = imageData;
    gameState.lastPrompt = originalPrompt;
    
    // Display image
    displayGeneratedImage(imageData);
    
    // Prepare explanation data (can always view explanation)
    await prepareExplanation(originalPrompt, []);
    
    // Show judgment buttons and why button
    elements.judgmentControls.style.display = 'block';
    elements.explanationControls.style.display = 'block';
}

/**
 * Handle generation failure
 */
function handleGenerationFailure(errorMessage) {
    console.error('❌ Image generation failed');
    
    resetImageContainer();
    elements.explanationControls.style.display = 'none';
    
    const message = errorMessage || 'Image generation failed, please check network connection and API configuration';
    showNotification(`Generation failed: ${message}`, 'error');
}

/**
 * Show a fixed base image in the result area
 */
function displayFixedBaseImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Base scene';
    // Reuse the same responsive style as generated images
    img.className = 'generated-image';

    // Make the container square to match 1024x1024 base
    elements.imageContainer.style.aspectRatio = '1 / 1';
    elements.imageContainer.style.height = 'auto';

    elements.imageContainer.innerHTML = '';
    elements.imageContainer.appendChild(img);

    // Hide judgment/explanation until user modifies
    elements.judgmentControls.style.display = 'none';
    elements.explanationControls.style.display = 'none';
}

/**
 * Parse Level 1 actions from user prompt
 */
function parseLevel1ActionsFromPrompt(prompt) {
    const p = (prompt || '').toLowerCase();
    const actions = [];
    const matchedKeywords = [];

    // Ladder
    if (/(梯子|云梯|ladder|\badd\b.*ladder|put\s+(a|the)?\s*ladder|加个梯子|放个梯子|放梯子|加梯子)/.test(p)) {
        actions.push({ type: 'ladder' });
        matchedKeywords.push('ladder');
    }

    // You can extend here: rope/slide etc.

    return { actions, matchedKeywords };
}

/**
 * Render composite (base + overlays) for Level 1 and show as result
 */
async function generateLevel1AIEdit(userPrompt, baseSrc) {
    // Build a concise edit instruction; keep the image stable and just add the requested item
    const instruction = `Add ${userPrompt} to help the cat get down from the tree. If the addition helps the cat reach the ground (like a ladder, slide, or stairs), show the cat safely on the ground looking happy. If not, keep the cat in the tree. Keep the cartoon style and clear composition.`;

    // Convert base image URL to base64
    let base64;
    let mimeType = 'image/png';
    try {
        const baseImage = await loadImageUrlAsBase64(baseSrc);
        base64 = baseImage.base64;
        if (baseImage.mimeType) mimeType = baseImage.mimeType;

        if (mimeType === 'image/svg+xml') {
            base64 = await convertImageUrlToPngBase64(baseSrc);
            mimeType = 'image/png';
        }
    } catch (e) {
        console.warn('⚠️ loadImageUrlAsBase64 failed, falling back to canvas method:', e);
        base64 = await convertImageUrlToPngBase64(baseSrc);
        mimeType = 'image/png';
    }

    const creativity = gameState.lastCreativity;
    const temperature = creativity / 50.0;

    // Call Gemini image edit API
    const edited = await generateImageEdit(base64, instruction, temperature, mimeType);
    if (!edited) throw new Error('No edited image returned');

    // Show result and explanation
    await handleGenerationSuccess(edited, userPrompt);

    // Try to provide keyword-based explanation, e.g., ladder
    const { matchedKeywords } = parseLevel1ActionsFromPrompt(userPrompt);
    try {
        await prepareExplanation(userPrompt, matchedKeywords);
    } catch (e) {
        console.warn('⚠️ Explanation preparation failed:', e);
    }
}

/** Load image helper */
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load base image: ' + src));
        img.src = src;
    });
}

async function convertImageUrlToPngBase64(src) {
    const img = await loadImage(src);
    const canvas = document.createElement('canvas');
    canvas.width = img.width; canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/png').split(',')[1];
}

/**
 * Draw a simple ladder leaning against the branch on the right
 */
function drawLadder(ctx, W, H) {
    // Relative positions tuned for a typical 1024x1024 base
    const x1 = W * 0.72; // bottom near trunk
    const y1 = H * 0.92;
    const x2 = W * 0.62; // top near branch
    const y2 = H * 0.52;

    // Determine ladder vector
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;

    const width = Math.max(6, W * 0.01); // ladder rail thickness
    const railGap = Math.max(30, W * 0.05);
    const rungStep = Math.max(24, H * 0.035);

    // Perpendicular unit vector for rail separation
    const px = -uy;
    const py = ux;

    // Rail endpoints
    const leftStartX = x1 + px * (railGap / 2);
    const leftStartY = y1 + py * (railGap / 2);
    const leftEndX = x2 + px * (railGap / 2);
    const leftEndY = y2 + py * (railGap / 2);

    const rightStartX = x1 - px * (railGap / 2);
    const rightStartY = y1 - py * (railGap / 2);
    const rightEndX = x2 - px * (railGap / 2);
    const rightEndY = y2 - py * (railGap / 2);

    ctx.lineCap = 'round';
    ctx.strokeStyle = '#c07f2a'; // wood color
    ctx.fillStyle = '#e2a654';
    ctx.lineWidth = width;

    // Draw rails
    ctx.beginPath();
    ctx.moveTo(leftStartX, leftStartY);
    ctx.lineTo(leftEndX, leftEndY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rightStartX, rightStartY);
    ctx.lineTo(rightEndX, rightEndY);
    ctx.stroke();

    // Draw rungs along the ladder from bottom to top
    const rungCount = Math.floor(len / rungStep);
    for (let i = 1; i < rungCount; i++) {
        const t = i / rungCount;
        const cx = x1 + dx * t;
        const cy = y1 + dy * t;

        const rungHalf = railGap * 0.5 * 0.95;
        ctx.lineWidth = Math.max(4, width * 0.8);
        ctx.beginPath();
        ctx.moveTo(cx + px * rungHalf, cy + py * rungHalf);
        ctx.lineTo(cx - px * rungHalf, cy - py * rungHalf);
        ctx.stroke();
    }
}

/**
 * Auto-generate the base scene for levels that define basePrompt
 * Used to realize: entering Level 1 -> AI's Creative Result shows base cat-in-tree
 */
async function autoGenerateBaseImage(level) {
    // Guard against parallel generations
    if (gameState.isGenerating) return;

    try {
        gameState.isGenerating = true;
        gameState.lastPrompt = level.basePrompt;
        showLoadingState();

        // Prepare API params, reuse creativity/style from current sliders
        const creativity = gameState.lastCreativity;
        const temperature = creativity / 50.0; // 0–2.0
        const styledPrompt = getStyledPrompt(level.basePrompt, gameState.lastStyle, gameState.lastStyleWeight);

        console.log('🎨 Auto-generating base scene:', { prompt: styledPrompt, temperature });

        const imageData = await generateImage(styledPrompt, temperature);

        if (imageData) {
            await handleGenerationSuccess(imageData, level.basePrompt);
        } else {
            handleGenerationFailure();
        }
    } catch (err) {
        console.error('❌ Auto-generation failed:', err);
        handleGenerationFailure(err.message);
    } finally {
        hideLoadingState();
        gameState.isGenerating = false;
    }
}

/**
 * Display generated image
 */
function displayGeneratedImage(imageData) {
    const img = document.createElement('img');
    
    // Check if SVG data (demo mode) - Based on Base64 prefix
    const prefix = imageData.slice(0, 16);
    if (/^PHN2Zy/i.test(prefix) || /^PD94bWwg/i.test(prefix)) {
        // SVG data (like btoa('<svg ...>') -> 'PHN2Zy...')
        img.src = `data:image/svg+xml;base64,${imageData}`;
    } else if (/^iVBORw0KGgo/i.test(prefix)) {
        // PNG header
        img.src = `data:image/png;base64,${imageData}`;
    } else if (/^\/9j\//.test(prefix)) {
        // JPEG header
        img.src = `data:image/jpeg;base64,${imageData}`;
    } else {
        // Default to PNG
        img.src = `data:image/png;base64,${imageData}`;
    }
    
    img.alt = 'Generated image';
    img.className = 'generated-image';
    img.onload = () => {
        console.log('🖼️ Image display successful');
    };
    img.onerror = () => {
        console.error('❌ Image display failed');
        // Try displaying as SVG
        img.src = `data:image/svg+xml;base64,${imageData}`;
    };
    
    // Reset any Level-1 square override so other images use default height
    elements.imageContainer.style.aspectRatio = '';
    elements.imageContainer.style.height = '';
    elements.imageContainer.innerHTML = '';
    elements.imageContainer.appendChild(img);
}

/**
 * 重置图像容器
 */
function resetImageContainer() {
    elements.imageContainer.innerHTML = `
        <div class="placeholder-image">
            <span class="placeholder-text">Click "Summon AI Magic" to start creating!</span>
        </div>
    `;
    
    // 隐藏判断按钮
    elements.judgmentControls.style.display = 'none';
}

/**
 * 检查过关条件
 */
function checkWinCondition(prompt, level) {
    const lowercasePrompt = prompt.toLowerCase();
    const matchedKeywords = [];
    
    // 检查关键词匹配
    for (const keyword of level.solutionKeywords) {
        if (lowercasePrompt.includes(keyword.toLowerCase())) {
            matchedKeywords.push(keyword);
        }
    }
    
    let passed = matchedKeywords.length > 0;
    
    // 检查参数要求
    if (passed && level.requiredCreativity !== undefined) {
        const normalizedCreativity = gameState.lastCreativity / 100;
        const requiredCreativity = level.requiredCreativity;
        
        if (normalizedCreativity < requiredCreativity) {
            passed = false;
            console.log(`❌ 创意度不足: ${normalizedCreativity} < ${requiredCreativity}`);
        }
    }
    
    if (passed && level.requiredStyleWeight !== undefined) {
        const normalizedStyleWeight = gameState.lastStyleWeight / 100;
        const requiredStyleWeight = level.requiredStyleWeight;
        
        if (normalizedStyleWeight < requiredStyleWeight) {
            passed = false;
            console.log(`❌ 风格权重不足: ${normalizedStyleWeight} < ${requiredStyleWeight}`);
        }
    }
    
    return {
        passed,
        matchedKeywords,
        hasKeywordMatch: matchedKeywords.length > 0
    };
}

/**
 * 获取带风格的提示词
 */
function getStyledPrompt(basePrompt, style, weight) {
    if (!style || weight === 0) {
        return basePrompt;
    }
    
    const normalizedWeight = weight / 100;
    
    if (normalizedWeight < 0.1) {
        return basePrompt;
    } else if (normalizedWeight < 0.5) {
        return `${basePrompt}, in the style of ${style}`;
    } else if (normalizedWeight < 0.8) {
        return `${basePrompt}, painted in the distinct, expressive style of ${style}`;
    } else {
        return `Masterpiece, best quality, ${basePrompt}, perfectly capturing the dramatic and emotional style of ${style}`;
    }
}

/**
 * 准备解释数据
 */
async function prepareExplanation(prompt, matchedKeywords) {
    try {
        const mode = explanationSystem.getRecommendedMode(gameState.currentLevel, gameState.parametersUnlocked);
        
        const explanations = await explanationSystem.generateExplanation(
            prompt,
            gameState.lastCreativity,
            gameState.lastStyle,
            gameState.lastStyleWeight,
            matchedKeywords,
            gameState.currentLevel,
            mode
        );
        
        // 将解释数据存储到按钮上，供showExplanation使用
        elements.whyButton.explanationData = explanations;
        
        // 更新参数可视化（如果存在）
        if (typeof parameterVisualizer !== 'undefined') {
            parameterVisualizer.updateVisualization(
                gameState.lastCreativity,
                gameState.lastStyle,
                gameState.lastStyleWeight
            );
        }
        
        // 添加到参数历史记录（如果存在）
        if (typeof parameterHistory !== 'undefined') {
            parameterHistory.addToHistory(
                prompt,
                gameState.lastCreativity,
                gameState.lastStyle,
                gameState.lastStyleWeight,
                'Generated successfully'
            );
        }
        
    } catch (error) {
        console.error('❌ 准备解释失败:', error);
        elements.whyButton.explanationData = ['Explanation generation failed, but your creation is great!'];
    }
}

/**
 * Enhanced explanation panel display with better formatting and accessibility
 */
function showExplanation() {
    const explanations = elements.whyButton.explanationData || ['No explanation data available'];
    
    // Enhanced formatting with categories and styling
    const explanationHTML = explanations
        .map((exp, index) => {
            // Detect explanation type for better styling
            const type = detectExplanationType(exp);
            const categoryIcon = getCategoryIcon(type);
            const categoryClass = `explanation-${type}`;
            
            return `<div class="explanation-item ${categoryClass}" data-index="${index}">
                        <div class="explanation-header">
                            <span class="category-icon">${categoryIcon}</span>
                            <span class="category-name">${getCategoryName(type)}</span>
                        </div>
                        <div class="explanation-content-text">${formatExplanationText(exp)}</div>
                    </div>`;
        })
        .join('');
    
    elements.explanationText.innerHTML = explanationHTML;
    elements.explanationPanel.style.display = 'flex';
    
    // Focus management for accessibility
    trapFocusInModal(elements.explanationPanel);
    
    // Focus the close button initially
    setTimeout(() => {
        const closeButton = elements.explanationPanel.querySelector('#close-explanation');
        if (closeButton) {
            closeButton.focus();
        }
    }, 100);
    
    // Animate each explanation item
    setTimeout(() => {
        const explanationItems = elements.explanationPanel.querySelectorAll('.explanation-item');
        explanationItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 150); // Stagger animation
        });
        
        elements.explanationPanel.querySelector('.explanation-content').style.transform = 'scale(1)';
    }, 10);
}

/**
 * Detect the type of explanation for better categorization
 */
function detectExplanationType(explanation) {
    const text = explanation.toLowerCase();
    
    if (text.includes('creativity') || text.includes('temperature')) return 'creativity';
    if (text.includes('style') || text.includes('artistic')) return 'style';
    if (text.includes('synergy') || text.includes('combination')) return 'combination';
    if (text.includes('warning') || text.includes('risk') || text.includes('hallucination')) return 'warning';
    if (text.includes('bias') || text.includes('limitation') || text.includes('critical')) return 'education';
    if (text.includes('technical') || text.includes('parameter')) return 'technical';
    if (text.includes('prediction') || text.includes('expect')) return 'prediction';
    
    return 'general';
}

/**
 * Get category icon based on explanation type
 */
function getCategoryIcon(type) {
    const icons = {
        'creativity': '🎨',
        'style': '🎭',
        'combination': '⚡',
        'warning': '⚠️',
        'education': '🎓',
        'technical': '🔧',
        'prediction': '🔮',
        'general': '💡'
    };
    return icons[type] || '💡';
}

/**
 * Get readable category name
 */
function getCategoryName(type) {
    const names = {
        'creativity': 'Creativity Analysis',
        'style': 'Style Analysis',
        'combination': 'Parameter Synergy',
        'warning': 'AI Limitation Warning',
        'education': 'AI Literacy Education',
        'technical': 'Technical Insight',
        'prediction': 'Result Prediction',
        'general': 'General Analysis'
    };
    return names[type] || 'Analysis';
}

/**
 * Format explanation text with better line breaks and emphasis
 */
function formatExplanationText(text) {
    return text
        .replace(/\n/g, '<br>')
        .replace(/💡 Technical:/g, '<strong>💡 Technical:</strong>')
        .replace(/🔮 Prediction:/g, '<strong>🔮 Prediction:</strong>')
        .replace(/🧬 Synergy Effect:/g, '<strong>🧬 Synergy Effect:</strong>')
        .replace(/⚡ Expected Output:/g, '<strong>⚡ Expected Output:</strong>')
        .replace(/🎯 Pro Tip:/g, '<strong>🎯 Pro Tip:</strong>')
        .replace(/💡 Learn:/g, '<strong>💡 Learn:</strong>');
}

/**
 * Focus trap utility for modal accessibility
 */
function trapFocusInModal(modalElement) {
    const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    function handleTabKey(e) {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    }
    
    // Store the handler so we can remove it later
    modalElement.focusTrapHandler = handleTabKey;
    document.addEventListener('keydown', handleTabKey);
}

/**
 * Remove focus trap when modal is closed
 */
function removeFocusTrap(modalElement) {
    if (modalElement.focusTrapHandler) {
        document.removeEventListener('keydown', modalElement.focusTrapHandler);
        delete modalElement.focusTrapHandler;
    }
}

/**
 * Hide explanation panel
 */
function hideExplanation() {
    removeFocusTrap(elements.explanationPanel);
    elements.explanationPanel.style.display = 'none';
    // Return focus to the why button
    elements.whyButton.focus();
}

/**
 * 显示成功模态框
 */
function showSuccessModal(level) {
    const successTitle = elements.successModal.querySelector('.success-title');
    const successText = elements.successModal.querySelector('.success-text');
    
    if (isFinalChallenge(level.id)) {
        successTitle.textContent = '🏆 Congratulations!';
        successText.textContent = 'You have mastered the art of AI parameter control!';
        elements.nextLevelBtn.textContent = 'View Results';
    } else {
        successTitle.textContent = '🎉 Level Complete!';
        successText.textContent = `You have mastered ${level.educationalFocus}!`;
        elements.nextLevelBtn.textContent = 'Next Level';
    }
    
    elements.successModal.style.display = 'flex';
}

/**
 * 隐藏成功模态框
 */
function hideSuccessModal() {
    elements.successModal.style.display = 'none';
}

/**
 * 显示失败提示
 */
function showFailureHint(level) {
    const hints = getLevelHints(level.id);
    if (hints.length > 0) {
        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        showNotification(`💡 Hint: ${randomHint}`, 'info', 4000);
    } else {
        showNotification('Try other prompts!', 'info');
    }
}

/**
 * 显示游戏完成界面
 */
function showGameComplete() {
    elements.problemText.textContent = '🎊 Congratulations on completing all levels! You have mastered Cortex!';
    elements.generateBtn.textContent = '🏆 Game Complete';
    elements.generateBtn.disabled = true;
    
    showNotification('🏆 Game Complete! You have mastered all AI parameter control techniques!', 'success', 5000);
}

/**
 * 显示加载状态
 */
function showLoadingState() {
    elements.loadingOverlay.style.display = 'flex';
    elements.generateBtn.disabled = true;
    elements.generateBtn.textContent = '✨ Magic in Progress...';
}

/**
 * 隐藏加载状态
 */
function hideLoadingState() {
    elements.loadingOverlay.style.display = 'none';
    elements.generateBtn.disabled = false;
    elements.generateBtn.textContent = '✨ Summon AI Magic';
}

/**
 * 通用通知显示函数
 */
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        border: 2px solid #000;
        box-shadow: 4px 4px 0px #000;
        font-weight: 600;
        font-size: 1rem;
        z-index: 1003;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // 根据类型设置颜色
    const colors = {
        'success': { bg: '#2ed573', color: '#000' },
        'error': { bg: '#ff4757', color: '#fff' },
        'warning': { bg: '#feca57', color: '#000' },
        'info': { bg: '#5352ed', color: '#fff' }
    };
    
    const colorScheme = colors[type] || colors.info;
    notification.style.background = colorScheme.bg;
    notification.style.color = colorScheme.color;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 自动移除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, duration);
    
    // 添加点击关闭
    notification.addEventListener('click', () => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    });
}

/**
 * 处理玩家判断"问题已解决"
 */
function handleProblemSolved() {
    console.log('✅ 玩家判断问题已解决');
    
    // 隐藏判断按钮
    elements.judgmentControls.style.display = 'none';
    
    // 获取当前关卡
    const level = getLevel(gameState.currentLevel);
    
    // 对于参数控制关卡，仍然需要检查参数要求
    if (level.unlockParameters) {
        const parameterCheckResult = checkParameterRequirements(level);
        if (!parameterCheckResult.passed) {
            // 参数不符合要求，给出提示
            showParameterHint(parameterCheckResult.message);
            // 重新显示判断按钮
            elements.judgmentControls.style.display = 'block';
            return;
        }
    }
    
    // 显示成功模态框
    setTimeout(() => {
        showSuccessModal(level);
    }, 500);
}

/**
 * Handle player judgment 'problem not solved'
 */
function handleProblemNotSolved() {
    console.log('❌ Player judgment: problem not solved');
    
    // Hide judgment buttons
    elements.judgmentControls.style.display = 'none';
    
    // Get current level and provide intelligent hints
    const level = getLevel(gameState.currentLevel);
    const currentPrompt = gameState.lastPrompt;
    
    // Provide intelligent hint based on level and current attempt
    provideIntelligentHint(level, currentPrompt);
    
    // Reactivate input, allow player to try again
    elements.promptInput.disabled = false;
    elements.generateBtn.disabled = false;
    elements.promptInput.focus();
}

/**
 * Provide intelligent hints based on level requirements and current attempt
 */
function provideIntelligentHint(level, currentPrompt) {
    if (!level) return;
    
    const prompt = currentPrompt.toLowerCase();
    const hints = [];
    
    // Check if any solution keywords were used
    const matchedKeywords = level.solutionKeywords.filter(keyword => 
        prompt.includes(keyword.toLowerCase())
    );
    
    if (matchedKeywords.length === 0) {
        // No solution keywords found - suggest some
        const suggestedKeywords = level.solutionKeywords.slice(0, 2);
        hints.push(`💡 Try including words like "${suggestedKeywords.join('" or "')}" in your prompt`);
    }
    
    // Check parameter requirements if this is a parameter level
    if (level.unlockParameters) {
        if (level.requiredCreativity && gameState.lastCreativity / 100 < level.requiredCreativity) {
            const requiredPercent = Math.round(level.requiredCreativity * 100);
            hints.push(`🎨 Increase creativity to at least ${requiredPercent}% for this challenge`);
        }
        
        if (level.requiredStyleWeight && gameState.lastStyleWeight / 100 < level.requiredStyleWeight) {
            const requiredPercent = Math.round(level.requiredStyleWeight * 100);
            hints.push(`🎭 Increase style weight to at least ${requiredPercent}% and select a style`);
        }
        
        if (level.availableStyles && level.availableStyles.length > 0 && !gameState.lastStyle) {
            hints.push(`🎨 Select an art style from the dropdown: ${level.availableStyles.join(', ')}`);
        }
    }
    
    // Level-specific hints
    if (level.hints && level.hints.length > 0) {
        const randomHint = level.hints[Math.floor(Math.random() * level.hints.length)];
        hints.push(`💭 Hint: ${randomHint}`);
    }
    
    // Show the most relevant hint
    if (hints.length > 0) {
        const selectedHint = hints[0]; // Show the first (most important) hint
        showNotification(selectedHint, 'info', 5000);
        
        // Log all available hints for debugging
        console.log('🤖 Available hints for this level:', hints);
    } else {
        // Fallback encouragement
        showNotification("Try a different approach! Think creatively about how to solve this challenge.", 'info', 4000);
    }
}

/**
 * 检查参数要求（仅用于参数控制关卡）
 */
function checkParameterRequirements(level) {
    if (!level.requiredCreativity && !level.requiredStyleWeight) {
        return { passed: true };
    }
    
    const currentCreativity = gameState.lastCreativity / 100;
    const currentStyleWeight = gameState.lastStyleWeight / 100;
    
    // 检查创意度要求
    if (level.requiredCreativity && currentCreativity < level.requiredCreativity) {
        return { 
            passed: false, 
            message: `Creativity level too low! Set it to ${Math.round(level.requiredCreativity * 100)}% or higher.`
        };
    }
    
    // 检查风格权重要求
    if (level.requiredStyleWeight && currentStyleWeight < level.requiredStyleWeight) {
        return { 
            passed: false, 
            message: `Style weight too low! Set it to ${Math.round(level.requiredStyleWeight * 100)}% or higher.`
        };
    }
    
    return { passed: true };
}

/**
 * 显示参数提示
 */
function showParameterHint(message) {
    showNotification(message, 'warning', 5000);
}

// ============ Level Selection System Functions ============

/**
 * Initialize progress from localStorage
 */
function initializeProgress() {
    try {
        const savedProgress = localStorage.getItem('promptMasterProgress');
        // TEMPORARY: Unlock all levels for testing
        gameState.highestUnlockedLevel = getTotalLevels();
        console.log('📊 All levels unlocked for testing:', gameState.highestUnlockedLevel);
    } catch (error) {
        console.warn('⚠️ localStorage not available, using default progress');
        gameState.highestUnlockedLevel = getTotalLevels(); // Unlock all levels
    }
}

/**
 * Save progress to localStorage
 */
function saveProgress() {
    try {
        localStorage.setItem('promptMasterProgress', gameState.highestUnlockedLevel.toString());
        console.log('💾 Progress saved:', gameState.highestUnlockedLevel);
    } catch (error) {
        console.warn('⚠️ Failed to save progress:', error);
    }
}

/**
 * Show level select screen
 */
function showLevelSelectScreen() {
    console.log('🎮 Showing level select screen');
    
    // Clear URL hash and add to history for proper back button support
    if (window.location.hash !== '') {
        const newState = { screen: 'levelSelect' };
        const newTitle = 'Cortex - Level Select';
        const newUrl = window.location.pathname; // Remove hash
        history.pushState(newState, newTitle, newUrl);
    }
    
    // Verify essential functions and elements are available
    if (typeof getLevel !== 'function' || typeof getTotalLevels !== 'function') {
        console.error('❌ Level functions not available! Retrying in 500ms...');
        setTimeout(showLevelSelectScreen, 500);
        return;
    }
    
    if (!elements.levelSelectScreen || !elements.levelGrid) {
        console.error('❌ Essential DOM elements not found!');
        return;
    }
    
    // Update progress display
    updateProgressDisplay();
    
    // Generate level cards
    generateLevelCards();
    
    // Show level select screen, hide game screen
    elements.levelSelectScreen.style.display = 'block';
    elements.gameScreen.style.display = 'none';
    
    // Show reset button only in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        elements.resetProgressBtn.style.display = 'block';
    }
}

/**
 * Update progress display text
 */
function updateProgressDisplay() {
    const totalLevels = getTotalLevels();
    const completedLevels = gameState.highestUnlockedLevel - 1;
    
    if (completedLevels === 0) {
        elements.progressText.textContent = 'Choose your level - Start your AI learning journey!';
    } else if (completedLevels === totalLevels) {
        elements.progressText.textContent = '🎉 All levels completed! You have mastered Cortex!';
    } else {
        elements.progressText.textContent = `Progress: ${completedLevels}/${totalLevels} levels completed`;
    }
}

/**
 * Generate level cards dynamically
 */
function generateLevelCards() {
    const levelGrid = elements.levelGrid;
    if (!levelGrid) {
        console.error('❌ Level grid element not found!');
        return;
    }
    
    levelGrid.innerHTML = ''; // Clear existing cards
    
    const totalLevels = getTotalLevels();
    if (!totalLevels || totalLevels === 0) {
        console.error('❌ No levels found!');
        levelGrid.innerHTML = '<p>No levels available</p>';
        return;
    }
    
    console.log(`🎮 Generating ${totalLevels} level cards`);
    
    for (let levelId = 1; levelId <= totalLevels; levelId++) {
        const level = getLevel(levelId);
        if (!level) {
            console.error(`❌ Level ${levelId} not found!`);
            continue;
        }
        
        const levelCard = document.createElement('div');
        levelCard.className = 'level-card';
        levelCard.dataset.levelId = levelId;
        
        // Determine level status and styling
        if (levelId < gameState.highestUnlockedLevel) {
            // Completed level
            levelCard.classList.add('completed');
            levelCard.innerHTML = `
                <div class="level-icon">⭐</div>
                <div class="level-number">Level ${levelId}</div>
                <div class="level-title">${getLevelTitle(level)}</div>
            `;
            levelCard.onclick = () => {
                audioSystem.playClick();
                startGameAtLevel(levelId);
            };
            levelCard.onmouseenter = () => audioSystem.playHover();
            
        } else if (levelId === gameState.highestUnlockedLevel) {
            // Current unlocked level
            levelCard.classList.add('unlocked');
            levelCard.innerHTML = `
                <div class="level-icon">▶️</div>
                <div class="level-number">Level ${levelId}</div>
                <div class="level-title">${getLevelTitle(level)}</div>
            `;
            levelCard.onclick = () => {
                audioSystem.playClick();
                startGameAtLevel(levelId);
            };
            levelCard.onmouseenter = () => audioSystem.playHover();
            
        } else {
            // Locked level
            levelCard.classList.add('locked');
            levelCard.innerHTML = `
                <div class="level-icon">🔒</div>
                <div class="level-number">Level ${levelId}</div>
                <div class="level-title">Locked</div>
            `;
        }
        
        levelGrid.appendChild(levelCard);
    }
}

/**
 * Get a short title for level display
 */
function getLevelTitle(level) {
    if (!level || !level.problem) {
        console.error('❌ Invalid level data:', level);
        return 'Invalid Level';
    }
    
    const problem = level.problem;
    if (problem.length > 35) {
        return problem.substring(0, 32) + '...';
    }
    return problem;
}

/**
 * Start game at specific level
 */
function startGameAtLevel(levelNumber) {
    console.log(`🎮 Starting game at level ${levelNumber}`);
    
    // Add to browser history for proper back button support
    const newState = { screen: 'game', level: levelNumber };
    const newTitle = `Cortex - Level ${levelNumber}`;
    const newUrl = `#level=${levelNumber}`;
    
    // Only push state if the URL is different from current
    if (window.location.hash !== newUrl) {
        history.pushState(newState, newTitle, newUrl);
    }
    
    // Show game screen, hide level select screen
    elements.levelSelectScreen.style.display = 'none';
    elements.gameScreen.style.display = 'block';
    
    // Load the specific level
    loadLevel(levelNumber);
}

/**
 * Handle level completion and progress advancement
 */
function handleLevelComplete() {
    console.log('🎉 Level completed!');
    
    hideSuccessModal();
    
    // Play level complete sound
    audioSystem.playLevelComplete();
    
    // If current level is the highest unlocked, unlock next level
    if (gameState.currentLevel === gameState.highestUnlockedLevel) {
        gameState.highestUnlockedLevel = Math.min(gameState.currentLevel + 1, getTotalLevels() + 1);
        saveProgress();
        
        // Play unlock sound for new level
        if (gameState.highestUnlockedLevel <= getTotalLevels()) {
            setTimeout(() => audioSystem.playUnlock(), 500);
        }
    }
    
    // Return to level select screen
    setTimeout(() => showLevelSelectScreen(), 1000);
}

/**
 * Reset progress (development only)
 */
function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        gameState.highestUnlockedLevel = 1;
        saveProgress();
        showLevelSelectScreen();
        showNotification('🔄 Progress reset successfully!', 'info');
    }
}

/**
 * Toggle audio on/off
 */
function toggleAudio() {
    const enabled = audioSystem.toggle();
    updateAudioToggleButton(enabled);
    audioSystem.playClick(); // Test sound
}

/**
 * Update audio toggle button appearance
 */
function updateAudioToggleButton(enabled) {
    if (enabled) {
        elements.audioToggleBtn.textContent = '🔊 Sound: ON';
        elements.audioToggleBtn.classList.remove('disabled');
    } else {
        elements.audioToggleBtn.textContent = '🔇 Sound: OFF';
        elements.audioToggleBtn.classList.add('disabled');
    }
}

// 调试工具 (仅在开发环境使用)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugGame = {
        gameState,
        loadLevel: (level) => loadLevel(level),
        unlockParameters: () => unlockParameterControls(getLevel(gameState.currentLevel)),
        testExplanation: () => showExplanation(),
        completeLevel: () => {
            const level = getLevel(gameState.currentLevel);
            gameState.lastMatchedKeywords = [level.solutionKeywords[0]];
            showSuccessModal(level);
        }
    };
    console.log('🔧 调试工具已启用，使用 window.debugGame 访问');
}

// ===================================
// HISTORY API MANAGEMENT
// ===================================

/**
 * Initialize URL state based on current hash
 */
function initializeUrlState() {
    const hash = window.location.hash;
    if (hash.startsWith('#level=')) {
        const levelNumber = parseInt(hash.replace('#level=', ''));
        if (levelNumber && levelNumber >= 1 && levelNumber <= getTotalLevels()) {
            // Delay to ensure DOM is ready
            setTimeout(() => {
                startGameAtLevel(levelNumber);
            }, 200);
            return;
        }
    }
    // Default: show level select screen
    // This will be called automatically in the main initialization
}

/**
 * Handle browser history navigation (back/forward buttons)
 */
function handleHistoryNavigation(event) {
    console.log('🔙 Browser navigation detected:', event.state);
    
    const hash = window.location.hash;
    
    if (!hash || hash === '#') {
        // No hash means we should show level select screen
        showLevelSelectScreenWithoutHistory();
    } else if (hash.startsWith('#level=')) {
        const levelNumber = parseInt(hash.replace('#level=', ''));
        if (levelNumber && levelNumber >= 1 && levelNumber <= getTotalLevels()) {
            startGameAtLevelWithoutHistory(levelNumber);
        } else {
            // Invalid level, go back to level select
            showLevelSelectScreenWithoutHistory();
        }
    }
}

/**
 * Show level select screen without adding to history
 */
function showLevelSelectScreenWithoutHistory() {
    console.log('🎮 Showing level select screen (no history change)');
    
    // Same logic as showLevelSelectScreen but without history manipulation
    if (typeof getLevel !== 'function' || typeof getTotalLevels !== 'function') {
        console.error('❌ Level functions not available! Retrying in 500ms...');
        setTimeout(showLevelSelectScreenWithoutHistory, 500);
        return;
    }
    
    if (!elements.levelSelectScreen || !elements.levelGrid) {
        console.error('❌ Essential DOM elements not found!');
        return;
    }
    
    // Update progress display
    updateProgressDisplay();
    
    // Generate level cards
    generateLevelCards();
    
    // Show level select screen, hide game screen
    elements.levelSelectScreen.style.display = 'block';
    elements.gameScreen.style.display = 'none';
    
    // Show reset button only in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        elements.resetProgressBtn.style.display = 'block';
    }
}

/**
 * Start game at level without adding to history
 */
function startGameAtLevelWithoutHistory(levelNumber) {
    console.log(`🎮 Starting game at level ${levelNumber} (no history change)`);
    
    // Show game screen, hide level select screen
    elements.levelSelectScreen.style.display = 'none';
    elements.gameScreen.style.display = 'block';
    
    // Load the specific level
    loadLevel(levelNumber);
}
