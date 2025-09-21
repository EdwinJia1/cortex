/* ===========================================
   Level Data Structure
   Contains all level challenges, solutions and educational focuses
   =========================================== */

const levels = [
    // ============ Basic Teaching Levels (Lv. 1-5) ============
    
    // Level 1 - Basic Prompt Learning
    {
        id: 1,
        problem: "A little cat is trapped high up in a tree branch. Help it get down!",
        // Fixed base image for Level 1 (preferred) - saves API calls
        fixedBaseImage: 'assets/images/level1_base.svg', // Using SVG placeholder for now
        // Base scene prompt for auto-generation on level start (fallback, disabled to save API)
        // basePrompt: "A little cat stuck high up on a tree branch, wide shot, clear scene, daylight",
        solutionKeywords: [
            // English
            'ladder', 'stairs', 'slide', 'rope', 'rescue', 'down', 'help',
            // Chinese synonyms for better matching
            '梯子', '楼梯', '滑梯', '绳子', '救援', '下来', '帮助'
        ],
        educationalFocus: "Basic Prompt Usage",
        whyExplanation: "Observe how AI understands different rescue methods and learn how vocabulary affects AI",
        difficulty: "beginner",
        unlockParameters: false,
        hints: [
            "Think about what tools could help the cat get down from height",
            "Try entering names of rescue tools",
            "Ladder, slide, stairs are all good choices"
        ],
        // Dynamic vocabulary for Safe Mode
        safeModeOptions: {
            coreElements: [
                { text: '🐱 Cat', value: 'cat' },
                { text: '🌳 Tree', value: 'tree' },
                { text: '🌿 Branch', value: 'branch' }
            ],
            solutionsTools: [
                { text: '🪜 Ladder', value: 'a ladder' },
                { text: '🛝 Slide', value: 'a slide' },
                { text: '🪂 Air cushion', value: 'an air cushion' },
                { text: '🛩️ Drone', value: 'a rescue drone' },
                { text: '🥫 Cat food', value: 'canned cat food' },
                { text: '🐟 Fish', value: 'a fish' },
                { text: '🧸 Toy mouse', value: 'a toy mouse' },
                { text: '🪜 Stairs', value: 'stairs' }
            ],
            actionsMethods: [
                { text: '📍 Place', value: 'place' },
                { text: '🔧 Use', value: 'use' },
                { text: '🎣 Lure', value: 'lure with' },
                { text: '🆘 Rescue', value: 'rescue using' },
                { text: '⬇️ Bring down', value: 'bring down with' },
                { text: '🏗️ Build', value: 'build' }
            ]
        }
    },

    // Level 2 - Vocabulary Precision
    {
        id: 2,
        problem: "The sun is too bright! Provide some shade for people.",
        solutionKeywords: ['umbrella', 'tree', 'cloud', 'hat', 'shade', 'shadow', 'shelter'],
        educationalFocus: "Vocabulary Precision",
        whyExplanation: "Different words activate different concept libraries in AI. Learn how to choose the most accurate descriptions",
        difficulty: "beginner",
        unlockParameters: false,
        hints: [
            "Think about what can block sunlight",
            "Both natural and artificial shading methods work",
            "Umbrella, trees, hats can all provide shade"
        ],
        safeModeOptions: {
            coreElements: [
                { text: '☀️ Harsh midday sun', value: 'harsh midday sun' },
                { text: '🧺 Picnic crowd', value: 'a picnic crowd' },
                { text: '🌳 Park lawn', value: 'a park lawn' },
                { text: '🚫 Giant heat lamp (bad idea)', value: 'a giant heat lamp' }
            ],
            solutionsTools: [
                { text: '☂️ Oversized umbrella', value: 'an oversized umbrella' },
                { text: '🌴 Shade sail canopy', value: 'a shade sail canopy' },
                { text: '🌳 Mature shade tree', value: 'a mature shade tree' },
                { text: '💧 Cooling mist sprayers', value: 'cooling mist sprayers' },
                { text: '🏖️ Beach parasol set', value: 'a beach parasol set' },
                { text: '🔥 Portable flamethrower (terrible)', value: 'a portable flamethrower' }
            ],
            actionsMethods: [
                { text: '🛠️ Install', value: 'install' },
                { text: '🌱 Plant', value: 'plant' },
                { text: '☁️ Summon cloud cover', value: 'summon cloud cover' },
                { text: '📐 Arrange around', value: 'arrange around' },
                { text: '🛡️ Provide shade with', value: 'provide shade with' },
                { text: '🎨 Paint the sun brighter (bad)', value: 'paint the sun brighter' }
            ]
        }
    },

    // Level 3 - AI Limitation Awareness
    {
        id: 3,
        problem: "Create a cat with three legs",
        solutionKeywords: ['three', 'leg', 'legs', 'cat', 'kitten'],
        educationalFocus: "AI Hallucination Recognition",
        whyExplanation: "AI sometimes generates unreasonable combinations - this is normal. Learn to identify AI limitations",
        difficulty: "beginner",
        unlockParameters: false,
        isAILimitationDemo: true, // Special marker: for demonstrating AI limitations
        hints: [
            "This is to test AI's understanding of unusual requests",
            "AI might create something that doesn't exist in reality",
            "Try: 'three-legged cat' or 'cat with three legs'"
        ],
        safeModeOptions: {
            coreElements: [
                { text: '🐈 Resilient cat hero', value: 'a resilient three-legged cat' },
                { text: '🛋️ Cozy living room', value: 'a cozy living room' },
                { text: '🌼 Supportive family', value: 'a supportive family' },
                { text: '🚫 Chaotic dog chase (bad)', value: 'a chaotic dog chase scene' }
            ],
            solutionsTools: [
                { text: '🦿 Custom prosthetic', value: 'a custom prosthetic leg' },
                { text: '🦽 Mobility harness', value: 'a soft mobility harness' },
                { text: '🏥 Rehabilitation team', value: 'a rehabilitation team' },
                { text: '🎾 Favorite toy reward', value: 'a favorite toy reward' },
                { text: '🧘 Balance cushions', value: 'balance training cushions' },
                { text: '🚫 Rocket boosters (nope)', value: 'rocket boosters' }
            ],
            actionsMethods: [
                { text: '💪 Pose proudly', value: 'posing proudly' },
                { text: '🏃 Practice agility', value: 'practicing gentle agility' },
                { text: '❤️ Receive care from', value: 'receiving care from' },
                { text: '🎯 Adapt confidently with', value: 'adapting confidently with' },
                { text: '🌞 Relax in sunlight with', value: 'relaxing in sunlight with' },
                { text: '🚫 Panic wildly with', value: 'panicking wildly with' }
            ]
        }
    },

    // Level 4 - Context Understanding
    {
        id: 4,
        problem: "Draw a house that a family of robots would live in",
        solutionKeywords: ['robot', 'house', 'home', 'family', 'metallic', 'futuristic', 'mechanical'],
        educationalFocus: "Context and Background",
        whyExplanation: "Learn how to provide context to help AI understand the complete scenario",
        difficulty: "beginner",
        unlockParameters: false,
        hints: [
            "Think about what makes a house suitable for robots",
            "Consider both 'robot' and 'house' elements",
            "Futuristic, metallic, mechanical elements might help"
        ],
        safeModeOptions: {
            coreElements: [
                { text: '🤖 Robot family', value: 'a robot family' },
                { text: '🏠 Modular metallic home', value: 'a modular metallic home' },
                { text: '🌿 Rooftop greenhouse', value: 'a rooftop greenhouse for oxygen' },
                { text: '🚫 Straw hut (wrong era)', value: 'a straw hut' }
            ],
            solutionsTools: [
                { text: '🔌 Charging docks', value: 'charging docks' },
                { text: '🧠 AI control core', value: 'an AI control core' },
                { text: '🛠️ Maintenance drones', value: 'maintenance drones' },
                { text: '💡 Fiber-optic lighting', value: 'fiber-optic lighting strips' },
                { text: '🪟 Transparent alloy walls', value: 'transparent alloy walls' },
                { text: '🔥 Wood-burning fireplace (bad)', value: 'a wood-burning fireplace' }
            ],
            actionsMethods: [
                { text: '🏗️ Engineer', value: 'engineer' },
                { text: '⚡ Automate with', value: 'automate with' },
                { text: '🌐 Network through', value: 'network through' },
                { text: '🧩 Equip with', value: 'equip with' },
                { text: '🛡️ Safeguard using', value: 'safeguard using' },
                { text: '🚫 Decorate with lace curtains', value: 'decorate with lace curtains' }
            ]
        }
    },

    // Level 5 - Emotional Expression
    {
        id: 5,
        problem: "Create an image that expresses 'joy' without showing people",
        solutionKeywords: ['joy', 'happy', 'bright', 'colorful', 'sunshine', 'rainbow', 'flowers', 'celebration'],
        educationalFocus: "Abstract Concept Expression", 
        whyExplanation: "Learn how AI interprets abstract emotions and converts them to visual elements",
        difficulty: "beginner",
        unlockParameters: false,
        hints: [
            "Think about what colors, objects, or scenes represent happiness",
            "Bright colors, sunshine, flowers often express joy",
            "Try: 'bright colorful flowers' or 'rainbow sunshine'"
        ],
        safeModeOptions: {
            coreElements: [
                { text: '🌅 Sunrise meadow', value: 'a sunrise meadow' },
                { text: '🎈 Floating balloons', value: 'floating balloons' },
                { text: '🎊 Confetti burst', value: 'a confetti burst' },
                { text: '🚫 Grey office cubicle (dull)', value: 'a grey office cubicle' }
            ],
            solutionsTools: [
                { text: '🌈 Rainbow arcs', value: 'rainbow arcs' },
                { text: '🌸 Wildflower field', value: 'a wildflower field' },
                { text: '✨ Golden light rays', value: 'golden light rays' },
                { text: '🍰 Celebration cake', value: 'a celebration cake' },
                { text: '🚫 Tax paperwork (joy killer)', value: 'a stack of tax paperwork' }
            ],
            actionsMethods: [
                { text: '🎨 Fill the scene with', value: 'fill the scene with' },
                { text: '🌟 Surround everything with', value: 'surround everything with' },
                { text: '🎆 Explode in color using', value: 'explode in color using' },
                { text: '🪄 Sparkle with', value: 'sparkle with' },
                { text: '🚫 Drain all joy using', value: 'drain all joy using' }
            ]
        }
    },

    // ============ Parameter Control Levels (Lv. 6-10) ============
    
    // Level 6 - First Parameter Experience
    {
        id: 6,
        problem: "Create a dreamy landscape with medium creativity",
        solutionKeywords: ['dream', 'landscape', 'scenery', 'nature', 'fantasy'],
        educationalFocus: "Introduction to Parameters",
        whyExplanation: "Experience how creativity parameter affects AI generation results",
        difficulty: "intermediate",
        unlockParameters: true,
        requiredCreativity: 0.4, // Need 40%+ creativity
        hints: [
            "Set creativity to around 40-60%",
            "Try words like 'dreamy landscape' or 'fantasy scenery'",
            "Observe how creativity level changes the result"
        ],
        safeModeOptions: {
            coreElements: [
                { text: '🌄 Misty mountains', value: 'misty mountains' },
                { text: '🌌 Starlit lake', value: 'a starlit lake' },
                { text: '🏝️ Floating islands', value: 'floating islands' },
                { text: '🚗 Parking lot (boring)', value: 'a crowded parking lot' }
            ],
            solutionsTools: [
                { text: '☁️ Pastel clouds', value: 'soft pastel clouds' },
                { text: '🧚 Glowing fireflies', value: 'glowing fireflies' },
                { text: '🌀 Aurora ribbons', value: 'aurora ribbons' },
                { text: '🏛️ Ancient ruins', value: 'ancient ruins' },
                { text: '🚧 Factory smoke (bad vibe)', value: 'thick factory smoke' }
            ],
            actionsMethods: [
                { text: '🌙 Illuminate with', value: 'illuminate with' },
                { text: '💫 Sprinkle across with', value: 'sprinkle across with' },
                { text: '🏞️ Frame the horizon with', value: 'frame the horizon with' },
                { text: '🪐 Drift gently among', value: 'drift gently among' },
                { text: '🚦 Replace everything with traffic', value: 'replace everything with traffic' }
            ]
        }
    },

    // Level 7 - High Creativity Challenge
    {
        id: 7,
        problem: "Generate a very creative interpretation of 'time'",
        solutionKeywords: ['time', 'clock', 'hourglass', 'temporal', 'abstract'],
        educationalFocus: "High Creativity Control",
        whyExplanation: "High creativity makes AI generate more abstract and unusual interpretations",
        difficulty: "intermediate", 
        unlockParameters: true,
        requiredCreativity: 0.7, // Need 70%+ creativity
        hints: [
            "Set creativity to 70% or higher", 
            "Use abstract concept like 'time flowing'",
            "High creativity produces more artistic results"
        ],
        safeModeOptions: {
            coreElements: [
                { text: '⏳ Giant hourglass', value: 'a giant hourglass' },
                { text: '🕰️ Melting clock tower', value: 'a melting clock tower' },
                { text: '🌌 Galactic timeline', value: 'a galactic timeline' },
                { text: '🚫 Broken alarm clock pile', value: 'a pile of broken alarm clocks' }
            ],
            solutionsTools: [
                { text: '🔄 Infinite loop ribbon', value: 'an infinite loop ribbon' },
                { text: '🧬 DNA time spiral', value: 'a DNA time spiral' },
                { text: '🌠 Shooting stars', value: 'shooting stars' },
                { text: '🪞 Fractured mirrors', value: 'fractured mirrors reflecting eras' },
                { text: '🚫 Sticky notes calendar chaos', value: 'sticky notes covering everything' }
            ],
            actionsMethods: [
                { text: '🌀 Distort reality with', value: 'distort reality with' },
                { text: '♾️ Loop around using', value: 'loop around using' },
                { text: '🪐 Orbit the scene with', value: 'orbit the scene with' },
                { text: '⏱️ Stretch moments using', value: 'stretch moments using' },
                { text: '🚫 Smash through with hammers', value: 'smash through with hammers' }
            ]
        }
    },

    // Level 8 - Style Weight Introduction
    {
        id: 8,
        problem: "Create a vintage-style coffee shop",
        solutionKeywords: ['coffee', 'shop', 'cafe', 'vintage', 'retro'],
        educationalFocus: "Style Control",
        whyExplanation: "Learn how style weight affects the visual appearance of generated images",
        difficulty: "intermediate",
        unlockParameters: true,
        requiredStyleWeight: 0.5, // Need 50%+ style weight
        availableStyles: ['vintage', 'retro'],
        hints: [
            "Select 'Vintage Style' from dropdown",
            "Set style weight to 50% or higher",
            "Try 'vintage coffee shop' or 'retro cafe'"
        ],
        safeModeOptions: {
            coreElements: [
                { text: '☕ Art deco espresso bar', value: 'an art deco espresso bar' },
                { text: '📻 Retro radio corner', value: 'a retro radio corner' },
                { text: '📚 Stacked travel journals', value: 'stacked travel journals' },
                { text: '🚫 Holographic ordering kiosk', value: 'a holographic ordering kiosk' }
            ],
            solutionsTools: [
                { text: '🪑 Leather club chairs', value: 'leather club chairs' },
                { text: '💡 Edison bulb string lights', value: 'Edison bulb string lights' },
                { text: '🎞️ Film camera display', value: 'a vintage film camera display' },
                { text: '🎵 Vinyl jazz records', value: 'vinyl jazz records' },
                { text: '🚫 Plastic neon signage', value: 'plastic neon signage' }
            ],
            actionsMethods: [
                { text: '🖼️ Frame the scene with', value: 'frame the scene with' },
                { text: '🍰 Showcase pastries on', value: 'showcase pastries on' },
                { text: '☕ Brew aromas with', value: 'brew aromas with' },
                { text: '🪑 Arrange seating using', value: 'arrange seating using' },
                { text: '🚫 Replace everything with chrome', value: 'replace everything with chrome' }
            ]
        }
    },

    // Level 9 - Historical Remix Cyber Challenge  
    {
        id: 9,
        problem: "Design a neon mural of Ada Lovelace teaming up with a future AI above a futuristic London skyline.",
        solutionKeywords: ['lovelace', 'analytical engine', 'babbage', 'cyberpunk', 'futuristic london'],
        educationalFocus: "Historical Remix with Parameters",
        whyExplanation: "Blend computing history with sci-fi styling by balancing creativity and style controls.",
        difficulty: "advanced",
        unlockParameters: true,
        requiredCreativity: 0.65, // Need 65%+ creativity
        requiredStyleWeight: 0.6, // Need 60%+ style weight  
        availableStyles: ['cyberpunk', 'retro-futurism', 'neon graffiti'],
        hints: [
            "Dial creativity and style weight both above 60% to get bold results.",
            "Ada Lovelace写过首个计算机算法，提到她或Babbage的Analytical Engine就能锁定历史背景。",
            "Victorian蒸汽元素 + 霓虹/赛博朋克词汇（如 'futuristic London'）能把时代混搭得更到位。"
        ],
        safeModeOptions: {
            coreElements: [
                { text: '🧮 Ada Lovelace', value: 'Ada Lovelace' },
                { text: '⚙️ Analytical Engine', value: 'the Analytical Engine' },
                { text: '🌆 Futuristic London skyline', value: 'a futuristic London skyline' },
                { text: '🤖 AI co-creator', value: 'a friendly AI co-creator' },
                { text: '🚫 Medieval dragon (off-theme)', value: 'a medieval dragon' }
            ],
            solutionsTools: [
                { text: '🌈 Neon light trails', value: 'neon light trails' },
                { text: '💿 Holographic circuitry', value: 'holographic circuitry' },
                { text: '⚙️ Steampunk gears', value: 'steampunk gears' },
                { text: '🛰️ Digital HUD panels', value: 'digital heads-up display panels' },
                { text: '🚫 Muddy construction cranes', value: 'muddy construction cranes' }
            ],
            actionsMethods: [
                { text: '🎨 Painting', value: 'painting' },
                { text: '🤝 Collaborating', value: 'collaborating with' },
                { text: '✨ Illuminating', value: 'illuminating' },
                { text: '🚀 Reimagining', value: 'reimagining' },
                { text: '🚫 Panic about math homework', value: 'panicking about math homework' }
            ]
        }
    },

    // Level 10 - Apollo Data Masterpiece
    {
        id: 10,
        problem: "Compose an abstract Bauhaus-style data mural celebrating Apollo 11 with Fibonacci spirals and binary code.",
        solutionKeywords: ['apollo 11', 'moon landing', 'fibonacci', 'binary code', 'bauhaus'],
        educationalFocus: "Data Storytelling with Parameters",
        whyExplanation: "Show full control by fusing space history, math motifs, and strong stylistic direction.",
        difficulty: "advanced",
        unlockParameters: true,
        requiredCreativity: 0.85, // Need 85%+ creativity
        requiredStyleWeight: 0.75, // Need 75%+ style weight
        availableStyles: ['bauhaus', 'data visualization', 'space age'],
        hints: [
            "Push creativity到85%+、风格权重到75%+，系统才会允许过关。",
            "Apollo 11 = 1969年首次登月任务；Fibonacci螺旋和二进制是核心视觉符号。",
            "Bauhaus讲究几何+原色，可试试 'Bauhaus data mural of Apollo 11 trajectories with glowing Fibonacci spirals'."
        ],
        safeModeOptions: {
            coreElements: [
                { text: '🚀 Apollo 11 mission', value: 'the Apollo 11 mission' },
                { text: '👨‍🚀 Astronauts', value: 'Apollo astronauts' },
                { text: '🌕 Moon surface', value: 'the moon surface' },
                { text: '🔢 Binary code grid', value: 'a floating binary code grid' },
                { text: '🌀 Fibonacci spiral', value: 'glowing Fibonacci spirals' },
                { text: '🚫 Rainy city traffic jam', value: 'a rainy city traffic jam' }
            ],
            solutionsTools: [
                { text: '🎨 Bauhaus geometry', value: 'Bauhaus geometric shapes' },
                { text: '🟥 Primary color blocks', value: 'primary color blocks' },
                { text: '📊 Data charts', value: 'data visualization overlays' },
                { text: '💡 Space-age glow', value: 'space-age neon lighting' },
                { text: '🚫 Random graffiti tags', value: 'random graffiti tags' }
            ],
            actionsMethods: [
                { text: '🧭 Mapping', value: 'mapping' },
                { text: '🎉 Celebrating', value: 'celebrating' },
                { text: '📐 Composing', value: 'composing' },
                { text: '🔗 Overlaying', value: 'overlaying' },
                { text: '🚫 Scribble wildly with', value: 'scribbling wildly with' }
            ]
        }
    }
];

/**
 * Get level data by ID
 * @param {number} levelId - Level ID
 * @returns {Object|null} - Level data object or null
 */
function getLevel(levelId) {
    return levels.find(level => level.id === levelId) || null;
}

/**
 * Get total number of levels
 * @returns {number} - Total level count
 */
function getTotalLevels() {
    return levels.length;
}

/**
 * Check if it's the final challenge
 * @param {number} levelId - Level ID
 * @returns {boolean} - Whether it's the final level
 */
function isFinalChallenge(levelId) {
    return levelId === levels.length;
}

/**
 * Get next level data
 * @param {number} currentLevelId - Current level ID
 * @returns {Object|null} - Next level data or null
 */
function getNextLevel(currentLevelId) {
    const nextId = currentLevelId + 1;
    return nextId <= levels.length ? getLevel(nextId) : null;
}

/**
 * Check if parameters should be unlocked for this level
 * @param {number} levelId - Level ID
 * @returns {boolean} - Whether parameters should be unlocked
 */
function shouldUnlockParameters(levelId) {
    const level = getLevel(levelId);
    return level ? level.unlockParameters === true : false;
}

/**
 * Get level hints for the current level
 * @param {number} levelId - Level ID  
 * @returns {string[]} - Array of hint strings
 */
function getLevelHints(levelId) {
    const level = getLevel(levelId);
    return level && level.hints ? level.hints : [];
}
