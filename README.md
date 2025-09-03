# CropCare - Smart Farming Platform

A comprehensive farming platform providing crop advisory, soil health monitoring, weather insights, and market price information.

## Features

- 🌱 **Crop Advisory**: Get personalized crop recommendations
- 🌍 **Soil Health Monitoring**: Track and analyze soil conditions
- 🌤️ **Weather Insights**: Real-time weather data and forecasts
- 💰 **Market Prices**: Stay updated with current market trends
- 🐛 **Pest Detection**: Identify and manage crop pests
- 💬 **AI Chatbot**: Get instant farming advice
- 🌐 **Multi-language Support**: Available in multiple languages
- 🎨 **Modern UI**: Beautiful, responsive design with dark/light themes

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Shadcn/ui + Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context + TanStack Query
- **AI Integration**: Google Gemini API
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abhinav21110/Crop-Advisory.git
cd Crop-Advisory
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_WEATHER_API_KEY=your_weather_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Building for Production

### Local Build
```bash
npm run build
```

### GitHub Pages Build
```bash
npm run build:gh-pages
```

## Deployment

This project supports deployment to both GitHub Pages and Vercel.

### GitHub Pages (Recommended)

Already configured with a workflow at `.github/workflows/gh-pages.yml`.

Steps:
1. Ensure repo name is `Crop-Advisory` (matches base path).
2. Push to `main`.
3. In GitHub → Settings → Pages, set Source to "GitHub Actions". The workflow builds with `VITE_BASE=/Crop-Advisory/` and publishes `dist`.

Local build for Pages:
```bash
npm run build:gh-pages
```
Artifacts are in `dist/`. A `public/404.html` is included for SPA routing.

Production URL: `https://abhinav21110.github.io/Crop-Advisory/`

### Vercel

Steps:
1. Import the repo in Vercel.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Environment variable (optional): none required; base is `/` by default.

`vercel.json` includes SPA rewrites so deep links resolve to `index.html`.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts for state management
├── data/              # Static data and sample data
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
├── services/          # API services and external integrations
└── assets/            # Images and static assets
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI chatbot | Yes |
| `VITE_WEATHER_API_KEY` | Weather API key for weather data | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/abhinav21110/Crop-Advisory/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS framework
- [Google Gemini](https://ai.google.dev/) for AI capabilities
- [React](https://react.dev/) for the amazing framework
