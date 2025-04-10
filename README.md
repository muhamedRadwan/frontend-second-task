# Quiz Application

A modern quiz application built with React, TypeScript, and Vite. This application allows users to take interactive quizzes with multiple-choice questions.

## Features

- Interactive quiz interface
- Multiple-choice questions
- Real-time score tracking
- Responsive design
- Fallback questions if API is unavailable
- Beautiful UI with Tailwind CSS and shadcn-ui

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn-ui
- Zustand (State Management)

## Getting Started

### Prerequisites

- Node.js & npm installed

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
```

2. Navigate to the project directory:
```sh
cd <PROJECT_NAME>
```

3. Install dependencies:
```sh
npm install
```

4. Start the development server:
```sh
npm run dev
```

## Project Structure

- `src/components/` - Contains reusable UI components
- `src/pages/` - Contains page components
- `src/lib/` - Contains store and utility functions
- `src/hooks/` - Contains custom React hooks
- `public/` - Contains static assets

## API Integration

The application fetches quiz questions from an external API endpoint:
```
https://s3.vclasses.net/dev-alsamerre/quiz
```

If the API is unavailable, the application uses a set of default questions about Egypt.

## Development

You can edit this project in several ways:

1. **Local Development**
   - Clone the repository
   - Make changes using your preferred IDE
   - Push changes to the repository

2. **GitHub**
   - Edit files directly on GitHub
   - Use GitHub Codespaces for online development

## Deployment

To deploy this project:
1. Build the project:
```sh
npm run build
```
2. Deploy the contents of the `dist` folder to your preferred hosting service.


