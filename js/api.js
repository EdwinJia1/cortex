/* ===========================================
   API Module - Google Gemini Image Generation (Final Correct Version)
   =========================================== */

// --- Configuration ---
// 🚨 SECURITY NOTE: For production, move API key to environment variables or backend proxy
// For development/demo: you can set your API key here or use demo mode
const DEMO_MODE = false; // Set to true to use demo mode without real API calls
const API_KEY = 'AIzaSyCVc1IaUGKb_EGlLdCONCOZ5WDcMi0Mr0w'; // Your actual API key
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent';


/**
 * Direct call to Google AI to generate an image (text-to-image)
 * @param {string} prompt - User input prompt
 * @param {number} temperature - Creativity parameter (0.0 - 2.0)
 * @returns {Promise<string|null>} - Base64 encoded image data or null
 */
async function generateImage(prompt, temperature = 1.0) {
    // 1. Validate input
    if (!prompt) {
        console.error('❌ Prompt cannot be empty');
        showErrorMessage('Please enter a prompt!');
        return null;
    }
    
    // Demo mode: Generate placeholder image but preserve all explanation systems
    if (DEMO_MODE || !API_KEY || API_KEY.includes('YOUR_API_KEY')) {
        console.log(`🎨 Demo Mode: Generating placeholder for "${prompt}" with creativity ${temperature}...`);
        return await generateDemoImage(prompt, temperature);
    }

    console.log(`🎨 Requesting Google AI image generation...`, { prompt, temperature });

    try {
        // 2. Build API request
        const headers = {
            'Content-Type': 'application/json',
            'x-goog-api-key': API_KEY,
        };

        const body = {
            contents: [{
                parts: [ { text: `Create a picture: ${prompt}` } ]
            }],
            generationConfig: { temperature: Math.min(temperature, 2.0) }
        };

        // 3. Send fetch request
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        // 4. Handle response
        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ API request failed:', errorData);
            throw new Error(errorData.error.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Image generation successful:', data);

        // 5. Return Base64 image data
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
            // Find image data
            for (const part of data.candidates[0].content.parts) {
                if (part.inlineData && part.inlineData.data) {
                    console.log('✅ Found image data, size:', part.inlineData.data.length, 'characters');
                    return part.inlineData.data;
                }
            }
            throw new Error('No image data found in API response');
        } else {
            throw new Error('API response format error, missing candidates data');
        }

    } catch (error) {
        console.error("❌ Error occurred while calling API:", error);
        showErrorMessage(`Generation failed: ${error.message}`);
        return null;
    }
}

/**
 * Image-to-Image: Edit a base image using a textual instruction.
 * @param {string} baseImageBase64 - Base64 (no data URL prefix) of the source image
 * @param {string} prompt - Edit instruction, e.g., "add a ladder".
 * @param {number} temperature - 0.0-2.0
 * @param {string} mimeType - e.g., 'image/png'
 * @returns {Promise<string|null>} - Base64 encoded edited image
 */
async function generateImageEdit(baseImageBase64, prompt, temperature = 1.0, mimeType = 'image/png') {
    if (!baseImageBase64) {
        console.error('❌ Base image data required for image edit');
        showErrorMessage('Missing base image for edit');
        return null;
    }

    if (DEMO_MODE || !API_KEY || API_KEY.includes('YOUR_API_KEY')) {
        console.log(`🎨 Demo Mode: Returning base image (no real edit) for prompt: ${prompt}`);
        return baseImageBase64;
    }

    try {
        const headers = {
            'Content-Type': 'application/json',
            'x-goog-api-key': API_KEY,
        };

        const body = {
            contents: [{
                parts: [
                    { inlineData: { mimeType, data: baseImageBase64 } },
                    { text: `Edit this image based on the following instruction: ${prompt}. Keep core content and composition; maintain the original cartoon style; output a 1024x1024 image.` }
                ]
            }],
            generationConfig: { temperature: Math.min(temperature, 2.0) }
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('❌ API image-edit request failed:', errorData);
            throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts) {
            for (const part of data.candidates[0].content.parts) {
                if (part.inlineData?.data) return part.inlineData.data;
            }
        }
        throw new Error('No edited image data found in API response');
    } catch (error) {
        console.error('❌ Error during image edit:', error);
        showErrorMessage(`Edit failed: ${error.message}`);
        return null;
    }
}

/**
 * Helper: Load an image URL and return base64 + mime type (no prefix)
 */
async function loadImageUrlAsBase64(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load image: ${url}`);
    const blob = await res.blob();
    const arrayBuffer = await blob.arrayBuffer();
    let binary = '';
    const bytes = new Uint8Array(arrayBuffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);

    const base64 = btoa(binary);
    const headerMime = res.headers.get('Content-Type') || '';
    const candidateMime = blob.type || headerMime;
    const mimeType = candidateMime ? candidateMime.split(';')[0].trim() : 'image/png';

    return { base64, mimeType };
}


/**
 * Show a temporary error message to the user
 * @param {string} message - Message to display
 */
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: #ff4757; color: white;
        padding: 16px 24px; border-radius: 8px; border: 2px solid #000;
        box-shadow: 4px 4px 0px #000; font-weight: 600; z-index: 1002;
        animation: slideInRight 0.3s ease-out;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 3500);
}

/**
 * Generate demo placeholder image with educational value intact
 * This preserves the full explanation system while providing competition-safe demo
 */
async function generateDemoImage(prompt, temperature) {
    // Simulate realistic API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Create educational SVG based on prompt and parameters
    const creativity = Math.round(temperature * 50);
    const svg = createEducationalSVG(prompt, creativity);
    
    // Return base64 encoded SVG
    return btoa(svg);
}

/**
 * Create educational SVG that demonstrates parameter effects
 */
function createEducationalSVG(prompt, creativity) {
    const colors = getPromptColors(prompt, creativity);
    const shapes = getCreativityShapes(creativity);
    const complexity = Math.min(creativity + 20, 100);
    
    return `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:0.8" />
                <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:0.6" />
            </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="400" height="400" fill="url(#grad1)" />
        
        <!-- Main subject representation -->
        <circle cx="200" cy="200" r="${50 + complexity/2}" fill="${colors.accent}" opacity="0.8" />
        
        <!-- Creativity-based decorative elements -->
        ${shapes}
        
        <!-- Parameter indicator -->
        <text x="10" y="30" font-family="Arial" font-size="14" fill="#333">
            "${prompt}" - Creativity: ${creativity}%
        </text>
        
        <!-- Educational watermark -->
        <text x="10" y="390" font-family="Arial" font-size="12" fill="#666" opacity="0.7">
            🎓 AI Parameter Learning Demo
        </text>
    </svg>`;
}

/**
 * Get colors based on prompt content
 */
function getPromptColors(prompt, creativity) {
    const lowerPrompt = prompt.toLowerCase();
    
    // Keyword-based color selection with creativity variation
    const baseColors = {
        primary: '#19A488',
        secondary: '#FECB2E', 
        accent: '#FFD1E6'
    };
    
    // Modify colors based on creativity level
    if (creativity > 70) {
        baseColors.primary = '#ff6b6b';
        baseColors.accent = '#4834d4';
    } else if (creativity < 30) {
        baseColors.primary = '#747d8c';
        baseColors.secondary = '#a4b0be';
    }
    
    // Context-aware color adjustments
    if (lowerPrompt.includes('sun') || lowerPrompt.includes('bright')) {
        baseColors.primary = '#feca57';
    } else if (lowerPrompt.includes('tree') || lowerPrompt.includes('nature')) {
        baseColors.primary = '#26de81';
    } else if (lowerPrompt.includes('cat') || lowerPrompt.includes('animal')) {
        baseColors.accent = '#fd79a8';
    }
    
    return baseColors;
}

/**
 * Generate shapes based on creativity level
 */
function getCreativityShapes(creativity) {
    let shapes = '';
    const shapeCount = Math.floor(creativity / 20) + 1;
    
    for (let i = 0; i < shapeCount; i++) {
        const x = 50 + (i * 80);
        const y = 50 + (i * 60);
        const size = 20 + creativity / 5;
        
        if (creativity > 60) {
            // High creativity - abstract shapes
            shapes += `<polygon points="${x},${y} ${x+size},${y+size/2} ${x+size/2},${y+size}" 
                       fill="#fff" opacity="0.3" transform="rotate(${i*45} ${x} ${y})" />`;
        } else if (creativity > 30) {
            // Medium creativity - geometric shapes
            shapes += `<rect x="${x}" y="${y}" width="${size}" height="${size}" 
                       fill="#fff" opacity="0.4" rx="5" />`;
        } else {
            // Low creativity - simple circles
            shapes += `<circle cx="${x}" cy="${y}" r="${size/2}" fill="#fff" opacity="0.3" />`;
        }
    }
    
    return shapes;
}

// Show API status after page load
document.addEventListener('DOMContentLoaded', () => {
    const statusDiv = document.createElement('div');
    statusDiv.id = 'api-status';
    statusDiv.style.cssText = `
        position: fixed; bottom: 20px; left: 20px; padding: 8px 16px;
        border-radius: 20px; font-size: 0.9rem; font-weight: 600;
        z-index: 1000; border: 2px solid #000;
    `;
    if (DEMO_MODE) {
        statusDiv.textContent = '🎓 Competition Demo Mode - Safe & Educational';
        statusDiv.style.background = '#2ed573';
    } else if (!API_KEY || API_KEY.includes('YOUR_API_KEY')) {
        statusDiv.textContent = '⚠️ API key not configured';
        statusDiv.style.background = '#feca57';
    } else {
        statusDiv.textContent = '🤖 Gemini API Connected';
        statusDiv.style.background = '#2ed573';
    }
    document.body.appendChild(statusDiv);
});
