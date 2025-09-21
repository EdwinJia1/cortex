/* ===========================================
   AI Explanation System - Core Module 🏆
   Three-tier Implementation: Prophet, Parameter Analyst, AI Oracle
   =========================================== */

/**
 * Level 1: Prophet Mode (Fallback Solution)
 * Preset explanation texts, zero API consumption, 100% reliable
 */
class ProphetMode {
    constructor() {
        this.baseExplanations = {
            // Rescue tools explanations
            'ladder': 'AI learned the strong association "ladder = climbing tool" from training data, this is the most direct rescue solution',
            'stairs': 'Stairs are similar to ladders, both related to vertical movement, AI easily makes this connection',
            'slide': 'A creative solution! AI understood the concept of "sliding down" and provided an interesting way to descend',
            'rope': 'Rope demonstrates AI\'s deep understanding of climbing tools, this is a practical rescue tool',

            // Shade tools explanations
            'umbrella': 'AI understands umbrellas can provide shade as well as rain protection, showing multifunctional tool recognition',
            'tree': 'AI connected natural shade concepts, demonstrating environmental understanding',
            'cloud': 'Clouds are natural sunshades, AI shows abstract understanding of natural phenomena',
            'hat': 'AI recognizes the practical function of hats, accurate understanding of everyday items',

            // Other common vocabulary
            'happy': 'AI learned to transform positive words into bright colors and joyful expressions',
            'beautiful': 'AI understands aesthetic concepts, choosing harmonious composition and colors',
            'creative': 'AI is inspired to seek unusual combinations and innovative elements'
        };
    }

    getExplanation(keyword) {
        return this.baseExplanations[keyword.toLowerCase()] ||
               `AI found relevant patterns for "${keyword}" in training data and generated corresponding visual representation`;
    }

    generateBasicExplanation(prompt, matchedKeywords) {
        const explanations = [];
        
        if (matchedKeywords.length > 0) {
            const keyword = matchedKeywords[0];
            explanations.push(`🎯 ${this.getExplanation(keyword)}`);
        }
        
        explanations.push('💡 This demonstrates how AI transforms text into visual concepts');
        
        return explanations;
    }
}

/**
 * Level 2: Parameter Analyst Mode (Core Winning Weapon)
 * Real-time parameter impact analysis, perfectly fits Parameter Lab concept
 */
class ParameterAnalyst {
    constructor() {
        this.prophetMode = new ProphetMode();
    }

    /**
     * Generate Smart Explanation - Core Innovation Point
     */
    generateSmartExplanation(prompt, creativity, style, styleWeight, matchedKeywords, levelId) {
        const explanations = [];
        
        // 1. Basic prompt explanation (inherits Level 1 functionality)
        if (matchedKeywords.length > 0) {
            const baseExp = this.prophetMode.getExplanation(matchedKeywords[0]);
            explanations.push(`🎯 ${baseExp}`);
        }

        // 2. Creativity parameter analysis (core innovation point)
        const creativityAnalysis = this.analyzeCreativity(creativity);
        if (creativityAnalysis) {
            explanations.push(creativityAnalysis);
        }

        // 3. Style weight analysis (advanced teaching)
        const styleAnalysis = this.analyzeStyle(style, styleWeight);
        if (styleAnalysis) {
            explanations.push(styleAnalysis);
        }

        // 4. Combination effect analysis (advanced cognition)
        const combinationAnalysis = this.analyzeCombination(creativity, style, styleWeight);
        if (combinationAnalysis) {
            explanations.push(combinationAnalysis);
        }

        // 5. Level-specific educational content
        const educationalInsight = this.getLevelSpecificInsight(levelId, creativity, style);
        if (educationalInsight) {
            explanations.push(educationalInsight);
        }
        
        // 6. Advanced AI Issue Detection and Education
        const aiIssues = this.detectAndExplainAIIssues(prompt, creativity, style, levelId);
        if (aiIssues.length > 0) {
            // Add warnings for detected issues
            aiIssues.forEach(issue => {
                explanations.push(`${issue.warning}\n💡 Learn: ${issue.education}`);
            });
        }
        
        // 7. Progressive AI Literacy Education (Critical Thinking)
        if (this.shouldShowAILimitations() || levelId === 3) { // Always show for hallucination demo level
            explanations.push(this.getAILimitationInsight(levelId));
        }
        
        return explanations;
    }

    /**
     * Enhanced creativity parameter analysis with technical insights
     */
    analyzeCreativity(creativity) {
        const normalizedCreativity = creativity / 100;
        const analysis = {
            impact: '',
            technicalExplanation: '',
            visualPrediction: ''
        };
        
        if (normalizedCreativity >= 0.8) {
            analysis.impact = `🎨 Ultra-high creativity (${creativity}%) pushes AI to explore unexpected combinations!`;
            analysis.technicalExplanation = 'Temperature >1.6 samples from probability distribution tails, generating low-probability but novel outputs';
            analysis.visualPrediction = 'Expect: Unique compositions, surprising color combinations, abstract interpretations';
        } else if (normalizedCreativity >= 0.6) {
            analysis.impact = `🌟 High creativity (${creativity}%) encourages AI to explore more interesting visual expressions`;
            analysis.technicalExplanation = 'Moderate randomness adds variations on top of common patterns from training data';
            analysis.visualPrediction = 'Expect: Balanced mix of innovative and traditional elements';
        } else if (normalizedCreativity >= 0.4) {
            analysis.impact = `⚖️ Medium creativity (${creativity}%) balances innovation with stability`;
            analysis.technicalExplanation = 'AI mainly selects common patterns from training data with occasional small variations';
            analysis.visualPrediction = 'Expect: Predictable but well-crafted traditional representations';
        } else if (normalizedCreativity >= 0.2) {
            analysis.impact = `📏 Low creativity (${creativity}%) makes AI choose safer, more common representations`;
            analysis.technicalExplanation = 'AI strictly follows high-frequency patterns from training data';
            analysis.visualPrediction = 'Expect: Classic, conservative, high-quality standard outputs';
        } else {
            analysis.impact = `🔒 Minimal creativity (${creativity}%) restricts AI to most conservative content`;
            analysis.technicalExplanation = 'AI introduces almost no randomness, selecting highest probability outputs';
            analysis.visualPrediction = 'Expect: Cookie-cutter but technically perfect results';
        }
        
        return `${analysis.impact}\n💡 Technical: ${analysis.technicalExplanation}\n🔮 Prediction: ${analysis.visualPrediction}`;
    }

    /**
     * Enhanced style weight analysis with artistic insights
     */
    analyzeStyle(style, styleWeight) {
        if (!style) return null;
        
        const normalizedWeight = styleWeight / 100;
        let analysis = '';
        
        if (normalizedWeight >= 0.7) {
            analysis = `🎭 Strong style weight (${styleWeight}%) makes AI heavily imitate ${style}'s artistic characteristics`;
            analysis += `\n🎨 Technical: High style guidance dominates the generation process, overriding base content`;
            analysis += `\n🖼️ Result: Expect strong ${style} signature elements like brushstrokes, color palettes, composition patterns`;
        } else if (normalizedWeight >= 0.5) {
            analysis = `🖼️ Medium style weight (${styleWeight}%) blends ${style} elements with base content`;
            analysis += `\n⚖️ Technical: Balanced influence between content and style embeddings`;
            analysis += `\n🎨 Result: Recognizable ${style} influence while maintaining prompt clarity`;
        } else if (normalizedWeight >= 0.3) {
            analysis = `🎨 Light style influence (${styleWeight}%) subtly adds ${style} flavor`;
            analysis += `\n💫 Technical: Style acts as gentle guidance, not dominant force`;
            analysis += `\n✨ Result: Hints of ${style} in color choices or composition, but content-focused`;
        } else {
            analysis = `👻 Style weight too low (${styleWeight}%), ${style} influence barely visible`;
            analysis += `\n📝 Technical: Style embeddings have minimal impact on generation`;
            analysis += `\n🤷 Result: Standard generation with negligible artistic style`;
        }
        
        return analysis;
    }

    /**
     * Enhanced parameter combination effect analysis with detailed insights
     */
    analyzeCombination(creativity, style, styleWeight) {
        const normalizedCreativity = creativity / 100;
        const normalizedStyle = styleWeight / 100;
        
        // Advanced combination matrix analysis
        const combinationProfile = this.getCombinationProfile(normalizedCreativity, normalizedStyle);
        
        if (!combinationProfile) return null;
        
        let analysis = `${combinationProfile.emoji} ${combinationProfile.description}`;
        analysis += `\n🧬 Synergy Effect: ${combinationProfile.synergy}`;
        analysis += `\n⚡ Expected Output: ${combinationProfile.expectedResult}`;
        analysis += `\n🎯 Pro Tip: ${combinationProfile.tip}`;
        
        return analysis;
    }
    
    /**
     * Get detailed combination profile for parameter interactions
     */
    getCombinationProfile(creativity, styleWeight) {
        // High Creativity + High Style (>0.7 both)
        if (creativity > 0.7 && styleWeight > 0.7) {
            return {
                emoji: '🚀',
                description: 'Ultra-Creative Artistic Fusion',
                synergy: 'Maximum unpredictability with strong artistic guidance',
                expectedResult: 'Highly unique interpretations with strong style signatures',
                tip: 'Perfect for experimental art, expect surprising but stylistically consistent results'
            };
        }
        
        // High Creativity + Low Style (<0.3)
        if (creativity > 0.7 && styleWeight < 0.3) {
            return {
                emoji: '🌪️',
                description: 'Pure Creative Chaos',
                synergy: 'Maximum freedom with minimal artistic constraints',
                expectedResult: 'Wild, unpredictable, completely original creations',
                tip: 'Great for brainstorming and breaking creative boundaries'
            };
        }
        
        // Low Creativity + High Style
        if (creativity < 0.3 && styleWeight > 0.7) {
            return {
                emoji: '🏛️',
                description: 'Classical Stylistic Adherence',
                synergy: 'Strong style guidance with conservative interpretation',
                expectedResult: 'Perfect style imitation with predictable compositions',
                tip: 'Ideal for studying and reproducing classic artistic styles'
            };
        }
        
        // Low Creativity + Low Style (both <0.3)
        if (creativity < 0.3 && styleWeight < 0.3) {
            return {
                emoji: '📐',
                description: 'Safe Standard Generation',
                synergy: 'Minimal risk, maximum predictability',
                expectedResult: 'High-quality but conventional results',
                tip: 'Best for professional, consistent, reliable outputs'
            };
        }
        
        // Balanced Moderate (both 0.4-0.6)
        if (creativity >= 0.4 && creativity <= 0.6 && styleWeight >= 0.4 && styleWeight <= 0.6) {
            return {
                emoji: '⚖️',
                description: 'Golden Balance Sweet Spot',
                synergy: 'Optimal balance between creativity and style control',
                expectedResult: 'Interesting variations with recognizable style elements',
                tip: 'Recommended for most use cases - reliable yet creative'
            };
        }
        
        // High disparity between parameters
        if (Math.abs(creativity - styleWeight) > 0.5) {
            const dominant = creativity > styleWeight ? 'creativity' : 'style';
            return {
                emoji: '🎭',
                description: `${dominant.charAt(0).toUpperCase() + dominant.slice(1)}-Dominant Hybrid`,
                synergy: `Strong ${dominant} influence with subtle ${dominant === 'creativity' ? 'style' : 'creative'} undertones`,
                expectedResult: `Results heavily influenced by ${dominant} parameter`,
                tip: `Consider ${dominant === 'creativity' ? 'increasing style weight' : 'boosting creativity'} for more balanced results`
            };
        }
        
        // Default moderate combination
        return {
            emoji: '🎨',
            description: 'Moderate Creative-Style Blend',
            synergy: 'Balanced interaction between creative exploration and style guidance',
            expectedResult: 'Consistent quality with moderate creative variations',
            tip: 'Adjust either parameter for more dramatic effects'
        };
    }

    /**
     * Get level-specific educational insights
     */
    getLevelSpecificInsight(levelId, creativity, style) {
        const insights = {
            1: 'Great opening play—notice which rescue nouns actually moved the cat. Swap in a different tool next run and compare.',
            2: 'Vocabulary precision time: test one natural shade word versus one engineered solution and watch how the lighting shifts.',
            3: 'Impossible anatomy alert. Study how the AI improvises a third leg, then add supportive details if the pose feels unstable.',
            4: 'Context is king. Make sure every furniture or gadget you add reinforces “robots live here,” not humans.',
            5: 'Abstract joy without people—layer color, light, and motion words, then prune anything that dulls the energy.',
            6: 'You now control the imagination dial. Keep creativity around 40–60% and iterate adjectives to refine the dreamscape vibe.',
            7: style
                ? `Treat this as a studio session with ${style}. Push creativity past 70% and try contrasting metaphors for time.`
                : 'High-creativity sandbox: play with metaphors for time (rivers, galaxies, vintage clocks) and see which sticks.',
            8: 'Style weight unlocked—focus on props, lighting, and textures that scream “vintage” before you crank the dial further.',
            9: 'You’re remixing history. Balance Ada’s Victorian notes with neon tech flourishes, then tweak palette keywords for contrast.',
            10: 'Master tier reached! Combine Apollo motifs with geometric data patterns, then iterate on how clearly the story reads.'
        };
        
        return insights[levelId] || null;
    }

    /**
     * Enhanced AI limitation education with critical thinking development
     */
    getAILimitationInsight(levelId) {
        // Level-specific AI literacy education
        const levelSpecificInsights = {
            1: '🧠 First AI Lesson: AI doesn\'t "see" like humans - it recognizes patterns from millions of training images',
            2: '🔍 Vocabulary Bias: AI\'s word associations come from human-created data, which can contain cultural biases',
            3: '⚠️ AI Hallucination Demo: This impossible request shows AI doesn\'t understand physical reality - it just follows patterns',
            4: '🤖 Context Limitation: AI processes your prompt but doesn\'t truly understand the "why" behind your request',
            5: '🎭 Emotional Simulation: AI doesn\'t feel emotions - it learned visual patterns humans associate with feelings',
            6: '🎲 Randomness Reality: "Creativity" is actually controlled randomness in mathematical probability distributions',
            7: '📊 Parameter Truth: These sliders don\'t give AI actual artistic taste - they adjust statistical sampling methods',
            8: '🎨 Style Mimicry: AI doesn\'t understand art history - it recreates visual patterns it learned from art data',
            9: '🏗️ No True Understanding: Even with perfect results, AI doesn\'t comprehend architecture, physics, or aesthetics',
            10: '🎓 Final Truth: You\'ve learned to control AI parameters, but remember - the creative vision is still yours!'
        };
        
        // Advanced critical thinking prompts based on sophistication level
        const criticalThinkingPrompts = [
            '🧪 Experiment Question: What would happen if AI was only trained on art from one culture?',
            '💭 Think Deeper: If AI generates something beautiful, who deserves credit - the AI, programmer, or you?',
            '🔬 Data Detective: This AI was trained on human-created art. How might this affect its "creativity"?',
            '🌍 Bias Alert: AI training data reflects human society. What biases might show up in generated images?',
            '🎯 Reality Check: AI can create convincing but false information. How can you verify what\'s real?',
            '⚖️ Ethical Thinking: If AI can create art instantly, how might this impact human artists?',
            '🔮 Future Question: As AI gets more powerful, what skills will remain uniquely human?',
            '🧠 Meta-Cognition: You\'re learning about AI limitations - but do you know your own thinking limitations?'
        ];
        
        // Return level-specific insight if available, otherwise use progressive education
        if (levelSpecificInsights[levelId]) {
            return levelSpecificInsights[levelId];
        }
        
        // For advanced levels, include critical thinking prompts
        if (levelId >= 6) {
            const thinkingPrompt = criticalThinkingPrompts[Math.floor(Math.random() * criticalThinkingPrompts.length)];
            return thinkingPrompt;
        }
        
        // Foundational AI literacy concepts for early levels
        const foundationalInsights = [
            '📚 Foundation: AI learns from human-created data, inheriting both knowledge and limitations',
            '🎯 Key Insight: AI excels at pattern recognition but lacks true understanding or consciousness',
            '🔍 Critical Skill: Always question AI outputs - even impressive results can contain errors or biases',
            '⚖️ Balance Point: AI is a powerful tool that amplifies human creativity rather than replacing it',
            '🌟 Remember: Your judgment, creativity, and ethical thinking remain uniquely valuable'
        ];
        
        const randomIndex = Math.floor(Math.random() * foundationalInsights.length);
        return foundationalInsights[randomIndex];
    }
    
    /**
     * Advanced AI limitation detection and education
     */
    detectAndExplainAIIssues(prompt, creativity, style, levelId) {
        const issues = [];
        
        // Detect potential hallucination triggers
        if (this.detectHallucinationRisk(prompt)) {
            issues.push({
                type: 'hallucination',
                warning: '🚨 Hallucination Risk: This prompt might cause AI to generate physically impossible or nonsensical content',
                education: 'AI doesn\'t understand physical laws - it recreates visual patterns from training data'
            });
        }
        
        // Detect bias potential
        if (this.detectBiasRisk(prompt)) {
            issues.push({
                type: 'bias',
                warning: '⚖️ Bias Alert: This prompt might trigger cultural or demographic biases in AI training data',
                education: 'AI training data reflects human society\'s biases. Be aware of whose perspectives are represented'
            });
        }
        
        // Detect extreme parameter risks
        if (creativity > 90) {
            issues.push({
                type: 'extreme_creativity',
                warning: '🎲 Extreme Randomness: Very high creativity can produce completely unpredictable results',
                education: 'High temperature parameters make AI sample from unlikely possibilities - results may be nonsensical'
            });
        }
        
        return issues;
    }
    
    /**
     * Detect prompts that might trigger AI hallucinations
     */
    detectHallucinationRisk(prompt) {
        const hallucinationTriggers = [
            'impossible', 'paradox', 'contradiction', 'infinite', 'zero-dimensional',
            'transparent solid', 'liquid gas', 'dark light', 'silent noise',
            'three-legged', 'five-armed', 'backwards forward', 'inside-out'
        ];
        
        return hallucinationTriggers.some(trigger => 
            prompt.toLowerCase().includes(trigger.toLowerCase())
        );
    }
    
    /**
     * Detect prompts that might trigger training data biases
     */
    detectBiasRisk(prompt) {
        const biasKeywords = [
            'professional', 'leader', 'doctor', 'engineer', 'pilot',
            'beautiful', 'attractive', 'normal', 'typical', 'standard',
            'family', 'wedding', 'home', 'neighborhood'
        ];
        
        return biasKeywords.some(keyword => 
            prompt.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    /**
     * Decide whether to show AI limitations education (30% probability)
     */
    shouldShowAILimitations() {
        return Math.random() > 0.7;
    }
}

/**
 * Level 3: AI Whisperer Mode (Easter Egg Feature)
 * Let AI explain its own creative process
 */
class AIWhisperer {
    constructor() {
        this.parameterAnalyst = new ParameterAnalyst();
    }

    /**
     * Generate AI self-explanation (requires additional API calls)
     */
    async generateAIExplanation(prompt, temperature, style, imageData) {
        try {
            const explanationPrompt = this.buildExplanationPrompt(prompt, temperature, style);
            
            // Here should call text generation API (like Gemini Pro)
            // const aiExplanation = await generateText(explanationPrompt);

            // Temporarily return mock AI explanation
            const mockAIExplanation = this.generateMockAIExplanation(prompt, temperature, style);
            
            return [
                `🤖 AI's Self-Analysis: ${mockAIExplanation}`,
                `🎭 This is AI attempting to explain its own creative process, but remember AI doesn't truly "understand" what it's doing`,
                `🔬 This "AI meta-cognition" demonstrates interesting characteristics of machine learning`
            ];
        } catch (error) {
            console.error('AI self-explanation failed:', error);
            // Downgrade to parameter analyst mode
            return this.parameterAnalyst.generateSmartExplanation(prompt, temperature * 50, style, 50, [], 0);
        }
    }

    buildExplanationPrompt(prompt, temperature, style) {
        return `As an AI image generation assistant, please briefly explain in one sentence:
        Based on the prompt "${prompt}", creativity level ${temperature}${style ? `, style "${style}"` : ''},
        how would you generate an image and why would you make such choices?
        Answer should be suitable for 13-16 year old students to understand.`;
    }

    generateMockAIExplanation(prompt, temperature, style) {
        const explanations = [
            `I analyzed the concept "${prompt}" and found the most relevant visual patterns from training data`,
            `Based on ${temperature > 1 ? 'high' : 'low'} creativity settings, I ${temperature > 1 ? 'boldly explored' : 'conservatively chose'} various possible representations`,
            `I tried to transform text concepts into concrete visual elements, this is what I do best`,
            `Through neural network calculations, I found the image representation that best matches training data patterns`
        ];
        
        const baseExp = explanations[Math.floor(Math.random() * explanations.length)];
        
        if (style) {
            return `${baseExp}, while incorporating my "memory" of ${style} artistic style`;
        }
        
        return baseExp;
    }
}

/**
 * Unified explanation system manager
 */
class ExplanationSystem {
    constructor() {
        this.prophetMode = new ProphetMode();
        this.parameterAnalyst = new ParameterAnalyst();
        this.aiWhisperer = new AIWhisperer();
    }

    /**
     * Generate the most suitable explanation based on level and parameters
     */
    async generateExplanation(prompt, creativity, style, styleWeight, matchedKeywords, levelId, mode = 'smart') {
        try {
            switch (mode) {
                case 'prophet':
                    return this.prophetMode.generateBasicExplanation(prompt, matchedKeywords);
                
                case 'smart':
                case 'parameter':
                    return this.parameterAnalyst.generateSmartExplanation(
                        prompt, creativity, style, styleWeight, matchedKeywords, levelId
                    );
                
                case 'ai':
                    return await this.aiWhisperer.generateAIExplanation(
                        prompt, creativity / 50, style, null
                    );
                
                default:
                    return this.parameterAnalyst.generateSmartExplanation(
                        prompt, creativity, style, styleWeight, matchedKeywords, levelId
                    );
            }
        } catch (error) {
            console.error('Explanation generation failed:', error);
            // Downgrade to prophet mode
            return this.prophetMode.generateBasicExplanation(prompt, matchedKeywords);
        }
    }

    /**
     * Automatically select the best explanation mode based on level
     */
    getRecommendedMode(levelId, hasParameters) {
        if (levelId <= 5) {
            return 'prophet'; // Basic levels use prophet mode
        } else if (levelId <= 10 && hasParameters) {
            return 'smart'; // Parameter levels use smart analysis
        } else {
            return 'ai'; // Advanced levels can try AI whisperer
        }
    }

    /**
     * Detect potential AI issues (for educational purposes)
     */
    detectPotentialIssues(imageResult, prompt) {
        // Simulate detection logic, can add more complex detection in actual implementation
        const issueKeywords = ['three leg', 'impossible', 'unrealistic', 'wrong'];
        const hasIssueKeyword = issueKeywords.some(keyword => 
            prompt.toLowerCase().includes(keyword.toLowerCase())
        );
        
        return hasIssueKeyword || Math.random() > 0.7; // 30% probability of having "issues" for teaching purposes
    }
}

// Create global explanation system instance
const explanationSystem = new ExplanationSystem();

/**
 * Real-time Parameter Visualization Manager
 */
class ParameterVisualizer {
    constructor() {
        this.elements = {};
        this.initializeElements();
    }
    
    initializeElements() {
        this.elements = {
            creativityBar: document.getElementById('creativity-impact-bar'),
            creativityValue: document.getElementById('creativity-impact-value'),
            styleBar: document.getElementById('style-impact-bar'),
            styleValue: document.getElementById('style-impact-value'),
            randomnessBar: document.getElementById('randomness-bar'),
            randomnessValue: document.getElementById('randomness-value')
        };
    }
    
    /**
     * Update visualization bars with current parameter values
     */
    updateVisualization(creativity, style, styleWeight) {
        if (!this.elements.creativityBar) {
            this.initializeElements(); // Retry initialization if elements not found
        }
        
        try {
            // Update creativity visualization
            this.updateCreativityBar(creativity);
            
            // Update style visualization
            this.updateStyleBar(styleWeight, style);
            
            // Update randomness indicator
            this.updateRandomnessBar(creativity);
            
            // Add visual feedback
            this.addUpdateAnimation();
            
        } catch (error) {
            console.warn('Parameter visualization update failed:', error);
        }
    }
    
    updateCreativityBar(creativity) {
        const percentage = Math.max(0, Math.min(100, creativity));
        const fillPercentage = `${percentage}%`;
        
        if (this.elements.creativityBar) {
            this.elements.creativityBar.style.setProperty('--fill-percentage', fillPercentage);
        }
        
        if (this.elements.creativityValue) {
            this.elements.creativityValue.textContent = `${percentage}%`;
        }
    }
    
    updateStyleBar(styleWeight, style) {
        const percentage = Math.max(0, Math.min(100, styleWeight || 0));
        const fillPercentage = `${percentage}%`;
        
        if (this.elements.styleBar) {
            this.elements.styleBar.style.setProperty('--fill-percentage', fillPercentage);
        }
        
        if (this.elements.styleValue) {
            if (style && percentage > 0) {
                this.elements.styleValue.textContent = `${percentage}% (${style})`;
            } else {
                this.elements.styleValue.textContent = 'None';
            }
        }
    }
    
    updateRandomnessBar(creativity) {
        const normalizedCreativity = creativity / 100;
        let randomnessLevel = '';
        let fillPercentage = '0%';
        
        if (normalizedCreativity >= 0.8) {
            randomnessLevel = 'Very High';
            fillPercentage = '90%';
        } else if (normalizedCreativity >= 0.6) {
            randomnessLevel = 'High';
            fillPercentage = '70%';
        } else if (normalizedCreativity >= 0.4) {
            randomnessLevel = 'Medium';
            fillPercentage = '50%';
        } else if (normalizedCreativity >= 0.2) {
            randomnessLevel = 'Low';
            fillPercentage = '30%';
        } else {
            randomnessLevel = 'Minimal';
            fillPercentage = '10%';
        }
        
        if (this.elements.randomnessBar) {
            this.elements.randomnessBar.style.setProperty('--fill-percentage', fillPercentage);
        }
        
        if (this.elements.randomnessValue) {
            this.elements.randomnessValue.textContent = randomnessLevel;
        }
    }
    
    addUpdateAnimation() {
        // Add temporary animation class to show update
        Object.values(this.elements).forEach(element => {
            if (element && element.classList) {
                element.classList.add('updating');
                setTimeout(() => {
                    element.classList.remove('updating');
                }, 300);
            }
        });
    }
}

// Create global parameter visualizer instance
const parameterVisualizer = new ParameterVisualizer();

/**
 * Parameter History Manager for comparison and learning
 */
class ParameterHistoryManager {
    constructor() {
        this.history = [];
        this.maxHistory = 10; // Keep last 10 generations
        this.elements = {};
        this.initializeElements();
        this.initializeEventListeners();
    }
    
    initializeElements() {
        this.elements = {
            historySection: document.getElementById('parameter-history'),
            showHistoryBtn: document.getElementById('show-history-btn'),
            clearHistoryBtn: document.getElementById('clear-history-btn'),
            historyTimeline: document.getElementById('history-timeline')
        };
    }
    
    initializeEventListeners() {
        if (this.elements.showHistoryBtn) {
            this.elements.showHistoryBtn.addEventListener('click', () => {
                this.toggleHistoryDisplay();
            });
        }
        
        if (this.elements.clearHistoryBtn) {
            this.elements.clearHistoryBtn.addEventListener('click', () => {
                this.clearHistory();
            });
        }
    }
    
    /**
     * Add a new parameter combination to history
     */
    addToHistory(prompt, creativity, style, styleWeight, result) {
        const historyEntry = {
            timestamp: Date.now(),
            prompt: prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''),
            creativity,
            style,
            styleWeight,
            result: result || 'Generated',
            id: this.generateId()
        };
        
        this.history.unshift(historyEntry);
        
        // Keep only the most recent entries
        if (this.history.length > this.maxHistory) {
            this.history = this.history.slice(0, this.maxHistory);
        }
        
        // Update UI if history is visible
        if (this.elements.historySection && this.elements.historySection.style.display !== 'none') {
            this.updateHistoryDisplay();
        }
        
        // Show history section if we have enough entries
        if (this.history.length >= 2 && this.elements.historySection) {
            this.elements.historySection.style.display = 'block';
        }
    }
    
    /**
     * Toggle history display
     */
    toggleHistoryDisplay() {
        if (!this.elements.historyTimeline) return;
        
        const isVisible = this.elements.historyTimeline.style.display !== 'none';
        
        if (isVisible) {
            this.elements.historyTimeline.style.display = 'none';
            this.elements.showHistoryBtn.textContent = 'Show History';
        } else {
            this.updateHistoryDisplay();
            this.elements.historyTimeline.style.display = 'block';
            this.elements.showHistoryBtn.textContent = 'Hide History';
        }
    }
    
    /**
     * Update the history timeline display
     */
    updateHistoryDisplay() {
        if (!this.elements.historyTimeline || this.history.length === 0) return;
        
        const historyHTML = this.history
            .map((entry, index) => this.createHistoryEntryHTML(entry, index))
            .join('');
        
        this.elements.historyTimeline.innerHTML = historyHTML;
        
        // Add comparison insights
        if (this.history.length >= 2) {
            const comparisonHTML = this.generateComparisonInsights();
            this.elements.historyTimeline.innerHTML += comparisonHTML;
        }
    }
    
    /**
     * Create HTML for a single history entry
     */
    createHistoryEntryHTML(entry, index) {
        const timeAgo = this.getTimeAgo(entry.timestamp);
        const creativityClass = this.getCreativityClass(entry.creativity);
        const styleInfo = entry.style ? `${entry.style} (${entry.styleWeight}%)` : 'None';
        
        return `
            <div class="history-entry ${index === 0 ? 'current' : ''}" data-id="${entry.id}">
                <div class="history-header">
                    <span class="history-time">${timeAgo}</span>
                    <span class="history-prompt">"${entry.prompt}"</span>
                </div>
                <div class="history-params">
                    <div class="param-chip creativity ${creativityClass}">
                        🎨 ${entry.creativity}%
                    </div>
                    <div class="param-chip style ${entry.styleWeight > 0 ? 'active' : 'inactive'}">
                        🎭 ${styleInfo}
                    </div>
                </div>
                ${index === 0 ? '<div class="current-indicator">Current</div>' : ''}
            </div>
        `;
    }
    
    /**
     * Generate insights comparing recent parameter combinations
     */
    generateComparisonInsights() {
        if (this.history.length < 2) return '';
        
        const current = this.history[0];
        const previous = this.history[1];
        
        const creativityDiff = current.creativity - previous.creativity;
        const styleWeightDiff = current.styleWeight - previous.styleWeight;
        
        let insights = ['<div class="comparison-insights">'];
        insights.push('<h6 class="comparison-title">🔍 Parameter Comparison Insights</h6>');
        
        // Creativity comparison
        if (Math.abs(creativityDiff) > 10) {
            const direction = creativityDiff > 0 ? 'increased' : 'decreased';
            const effect = creativityDiff > 0 ? 'more unpredictable' : 'more conservative';
            insights.push(`<p>🎨 Creativity ${direction} by ${Math.abs(creativityDiff)}% - expect ${effect} results</p>`);
        }
        
        // Style comparison
        if (Math.abs(styleWeightDiff) > 10) {
            const direction = styleWeightDiff > 0 ? 'stronger' : 'weaker';
            insights.push(`<p>🎭 Style influence became ${direction} by ${Math.abs(styleWeightDiff)}%</p>`);
        }
        
        // Combined effect
        if (Math.abs(creativityDiff) > 20 && Math.abs(styleWeightDiff) > 20) {
            insights.push(`<p>⚡ Major parameter shift detected - results may be dramatically different!</p>`);
        }
        
        insights.push('</div>');
        return insights.join('');
    }
    
    /**
     * Clear all history
     */
    clearHistory() {
        this.history = [];
        if (this.elements.historyTimeline) {
            this.elements.historyTimeline.innerHTML = '<p class="no-history">No history available</p>';
        }
        if (this.elements.historySection) {
            this.elements.historySection.style.display = 'none';
        }
    }
    
    /**
     * Helper methods
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    getTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        
        if (minutes < 1) return 'Just now';
        if (minutes === 1) return '1 min ago';
        if (minutes < 60) return `${minutes} mins ago`;
        
        const hours = Math.floor(minutes / 60);
        if (hours === 1) return '1 hour ago';
        return `${hours} hours ago`;
    }
    
    getCreativityClass(creativity) {
        if (creativity >= 80) return 'very-high';
        if (creativity >= 60) return 'high';
        if (creativity >= 40) return 'medium';
        if (creativity >= 20) return 'low';
        return 'very-low';
    }
}

// Create global parameter history manager instance
const parameterHistory = new ParameterHistoryManager();

// Export all classes and instances
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ProphetMode,
        ParameterAnalyst,
        AIWhisperer,
        ExplanationSystem,
        explanationSystem
    };
}
