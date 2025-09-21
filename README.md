# 🧠 Cortex: AI Parameter Lab

**Interactive Educational Game for AI Literacy**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-brightgreen)](https://edwinjia1.github.io/cortex)
[![GitHub](https://img.shields.io/github/license/EdwinJia1/cortex)](LICENSE)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Google Gemini](https://img.shields.io/badge/API-Google%20Gemini%202.5%20Flash-blue)](https://ai.google.dev/)

> Learn AI parameter effects through hands-on experimentation with real-time image generation

## 🎯 Project Overview

Cortex is an interactive educational game designed to teach AI literacy through practical experimentation. Players learn how different AI parameters affect model behavior by manipulating settings like temperature and creativity while observing real-time changes in AI-generated images.

### 🌟 Key Features

- **10 Educational Levels** - Progressive difficulty teaching different AI concepts
- **Real-time Image Generation** - Powered by Google Gemini 2.5 Flash Image API
- **Interactive Parameter Adjustment** - Visual sliders for temperature and creativity
- **Comprehensive Explanation System** - In-depth AI concept explanations
- **Safe Mode Tools** - Guided prompt building for beginners
- **Responsive Design** - Works seamlessly across all devices

## 🎮 How It Works

### Level System
- **Level 1-3**: Basic parameter understanding (temperature, creativity)
- **Level 4-6**: Advanced prompt engineering techniques
- **Level 7-9**: Complex AI behavior patterns
- **Level 10**: Master-level parameter optimization

### Learning Flow
1. **Observe** - Start with base scenarios
2. **Experiment** - Adjust AI parameters
3. **Compare** - See real-time results
4. **Learn** - Understand the underlying concepts
5. **Apply** - Use knowledge in new contexts

## 🚀 Quick Start

### Option 1: Play Online
Visit the [live demo](https://edwinjia1.github.io/cortex) to start playing immediately.

### Option 2: Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/EdwinJia1/cortex.git
   cd cortex
   ```

2. **Set up API key** (for full functionality)
   ```bash
   # Create your API key at https://aistudio.google.com/app/apikey
   # Edit js/api.js and replace YOUR_API_KEY with your actual key
   ```

3. **Serve locally**
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Using PHP
   php -S localhost:8000
   ```

4. **Open in browser**
   ```
   http://localhost:8000
   ```

## 🛠 Technical Architecture

### Core Technologies
- **Frontend**: Vanilla JavaScript, CSS Grid/Flexbox, HTML5
- **API**: Google Gemini 2.5 Flash Image Generation
- **Design**: Responsive, accessible, mobile-first approach

### Project Structure
```
cortex/
├── index.html              # Main application entry
├── style.css              # Comprehensive styling
├── js/
│   ├── app.js             # Core application logic
│   ├── api.js             # Google Gemini API integration
│   ├── levels.js          # Level definitions and mechanics
│   ├── explanation.js     # Educational content system
│   └── audio.js           # Audio feedback system
├── assets/
│   ├── images/            # Game graphics and icons
│   └── README.txt         # Asset documentation
└── docs/                  # Additional documentation
```

### Key Components

#### 1. Game Engine (`js/app.js`)
- Level management and progression
- UI state management
- Player interaction handling
- Progress tracking

#### 2. AI Integration (`js/api.js`)
- Google Gemini API wrapper
- Image generation pipeline
- Error handling and fallbacks
- Demo mode for development

#### 3. Educational System (`js/explanation.js`)
- Concept explanations
- Progressive disclosure
- Interactive learning elements
- Assessment feedback

#### 4. Level Design (`js/levels.js`)
- Structured learning progression
- Parameter constraints
- Success criteria
- Adaptive difficulty

## 🎨 Game Levels

| Level | Focus | Concept | Difficulty |
|-------|-------|---------|------------|
| 1 | Cat Rescue | Basic tool selection | ⭐ |
| 2 | Pet Care | Parameter sensitivity | ⭐ |
| 3 | Creativity Lab | Temperature effects | ⭐⭐ |
| 4 | Style Transfer | Creative parameter control | ⭐⭐ |
| 5 | Advanced Prompting | Complex instructions | ⭐⭐⭐ |
| 6 | Prompt Engineering | Optimization techniques | ⭐⭐⭐ |
| 7 | Parameter Mastery | Fine-tuning skills | ⭐⭐⭐⭐ |
| 8 | Creative Challenge | Open-ended creation | ⭐⭐⭐⭐ |
| 9 | Expert Mode | Advanced concepts | ⭐⭐⭐⭐⭐ |
| 10 | Master Class | Integration of all skills | ⭐⭐⭐⭐⭐ |

## 🔧 API Configuration

### Google Gemini Setup

1. **Get API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Enable Gemini API access

2. **Configure Application**
   ```javascript
   // In js/api.js
   const API_KEY = 'your-actual-api-key-here';
   const DEMO_MODE = false; // Set to true for demo without API
   ```

3. **Environment Variables** (Optional)
   ```bash
   # For production deployment
   GOOGLE_GEMINI_API_KEY=your-api-key
   ```

## 🎯 Educational Objectives

### Primary Learning Goals
- **AI Parameter Understanding**: How temperature affects randomness
- **Prompt Engineering**: Crafting effective instructions
- **Model Behavior**: Predicting AI responses
- **Creative Applications**: Using AI as a creative tool
- **Ethical Considerations**: Responsible AI usage

### Assessment Methods
- **Real-time Feedback**: Immediate results from parameter changes
- **Progressive Challenges**: Increasing complexity across levels
- **Explanation Integration**: Contextual learning moments
- **Self-reflection**: Player assessment of their understanding

## 🌐 Browser Compatibility

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |

### Required Features
- ES6+ JavaScript support
- CSS Grid and Flexbox
- Fetch API
- Canvas API (for image handling)

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Areas for Contribution
- **New Levels**: Design additional learning scenarios
- **Accessibility**: Improve screen reader support
- **Internationalization**: Add support for more languages
- **Performance**: Optimize image loading and rendering
- **Mobile Experience**: Enhance touch interactions

### Code Style
- Use ES6+ features
- Follow JSDoc conventions
- Maintain responsive design principles
- Ensure accessibility compliance

## 📊 Performance Metrics

### Load Times
- Initial page load: < 2s
- Level transition: < 500ms
- Image generation: 2-5s (API dependent)

### Optimization Features
- Lazy loading of images
- Efficient DOM manipulation
- Minimal external dependencies
- Progressive enhancement

## 🔒 Privacy & Security

### Data Handling
- **No Personal Data Collection**: Game progress stored locally
- **API Usage**: Only sends prompts to Gemini API as required
- **Local Storage**: User preferences and progress
- **No Tracking**: No analytics or user behavior tracking

### Security Measures
- Client-side input validation
- API key protection guidelines
- XSS prevention
- Safe content filtering

## 📚 Educational Research

This project is based on educational research in:
- **Constructivist Learning Theory**: Learning through experimentation
- **Interactive Visualization**: Immediate feedback loops
- **Gamification**: Motivation through progressive challenges
- **AI Literacy**: Understanding AI capabilities and limitations

### Research Citations
- Resnick, M. (2017). *Lifelong Kindergarten: Cultivating Creativity through Projects, Passion, Peers, and Play*
- Wing, J. M. (2006). Computational thinking. *Communications of the ACM*
- Long, D., & Magerko, B. (2020). What is AI literacy? *CHI Conference on Human Factors in Computing Systems*

## 📈 Future Roadmap

### Planned Features
- [ ] **Multiplayer Mode**: Collaborative learning experiences
- [ ] **Teacher Dashboard**: Classroom management tools
- [ ] **Custom Levels**: User-generated content
- [ ] **Advanced Analytics**: Learning progress tracking
- [ ] **Mobile App**: Native mobile applications
- [ ] **VR Support**: Immersive 3D learning environment

### Technical Improvements
- [ ] **Offline Mode**: Progressive Web App capabilities
- [ ] **Performance**: WebGL-accelerated rendering
- [ ] **Accessibility**: Enhanced screen reader support
- [ ] **Internationalization**: Multi-language support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google AI**: For providing the Gemini 2.5 Flash API
- **Educational Community**: For feedback and testing
- **Open Source Contributors**: For code improvements and bug fixes
- **Accessibility Advocates**: For ensuring inclusive design

## 📞 Contact & Support

- **Project Lead**: [Evan Lin](https://github.com/EdwinJia1)
- **Issues**: [GitHub Issues](https://github.com/EdwinJia1/cortex/issues)
- **Discussions**: [GitHub Discussions](https://github.com/EdwinJia1/cortex/discussions)

---

<div align="center">

**🧠 Built with passion for AI education**

[⭐ Star this project](https://github.com/EdwinJia1/cortex) | [🐛 Report Bug](https://github.com/EdwinJia1/cortex/issues) | [💡 Request Feature](https://github.com/EdwinJia1/cortex/issues)

</div>