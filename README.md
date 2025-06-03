# Financial Management App

This is a **Financial Management** application built with [Next.js](https://nextjs.org), [Material-UI](https://mui.com/), and [React Router](https://reactrouter.com/). The app provides a clean and responsive interface for managing financial data, including dashboards, transactions, investments, and services.

## Features

- **Next.js**: Server-side rendering and optimized performance.
- **Material-UI**: Modern and accessible UI components.
- **React Router**: Client-side routing for seamless navigation.
- **ESLint**: Code linting with custom rules for clean and maintainable code.
- **TypeScript**: Strongly typed codebase for better developer experience.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v23 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/financial-management.git
cd financial-management
npm install
```

## Running the Development Server

To start the development server, run:

```bash
npm run dev
```
Open http://localhost:3000 in your browser to view the app.

## Building for Production
To build the app for production, run:

```bash
npm run build
```
The optimized production build will be output to the .next directory. You can then start the production server with:

```bash
npm run start
```
## Linting the Code
To check for linting issues, run:

```bash
npm run lint
```
To automatically fix linting issues, run:

```bash
npm run lint:fix
```
## Project Structure

Here’s an overview of the project structure:

```
financial-management/
├── src/
│   ├── __mocks__/          # Mock data for testing
│   ├── app/
│   │   ├── (dashboard)/    # Grouped routes for dashboard pages
│   │   │   ├── dashboard/  # Dashboard page
│   │   │   ├── investments/# Investments page
│   │   │   ├── services/   # Services page
│   │   │   └── transactions/# Transactions page
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication API
│   │   │   ├── logout/     # Logout API
│   │   │   ├── transaction/# Transaction API
│   │   │   └── user/       # User API
│   │   ├── commons/        # Common utilities and configurations (e.g., i18n)
│   │   ├── components/     # Reusable UI components
│   │   │   ├── home/       # Home page specific components
│   │   ├── contexts/       # React Contexts for global state management
│   │   ├── hooks/          # Custom React hooks
│   │   ├── styles/         # Theme and global styles (e.g., Material-UI theme, tokens)
│   │   ├── favicon.ico     # Favicon
│   │   ├── globals.css     # Global CSS styles
│   │   ├── layout.tsx      # Root layout for the application
│   │   ├── not-found.tsx   # Custom 404 page
│   │   └── page.tsx        # Main application page
│   ├── database/           # Local JSON database files
│   ├── stories/            # Storybook stories for UI components
│   │   └── decorators/     # Storybook decorators
│   ├── utils/              # Utility functions
│   └── middleware.ts       # Next.js middleware
├── public/                 # Static assets (e.g., images, fonts, SVG icons)
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore file
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── package-lock.json       # npm dependency lock file
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Project documentation
├── tsconfig.json           # TypeScript configuration
└── yarn.lock               # Yarn dependency lock file
```

## Storybook Commands

Storybook is used for developing and showcasing UI components in isolation.

To run Storybook in development mode:

```bash
npm run storybook
```

This will open Storybook in your browser at `http://localhost:6006`.

To build a static Storybook production bundle:

```bash
npm run build-storybook
```

The static build will be output to the `storybook-static` directory.

## Authors

- <img src="https://avatars.githubusercontent.com/u/132622525?v=4" width="24" height="24" alt="Fernando Gustavo Cortez" style="border-radius: 50%; vertical-align: middle;"> **Fernando Gustavo Cortez** - [https://github.com/FernandoGustavoCortez](https://github.com/FernandoGustavoCortez)

- <img src="https://avatars.githubusercontent.com/u/37480857?v=4" width="24" height="24" alt="Lucas Wenceslau" style="border-radius: 50%; vertical-align: middle;"> **Lucas Wenceslau** - [https://github.com/lucaswenceslau](https://github.com/lucaswenceslau)

- <img src="https://avatars.githubusercontent.com/u/71905861?v=4" width="24" height="24" alt="Osmar" style="border-radius: 50%; vertical-align: middle;"> **Osmar** - [https://github.com/MazFilho](https://github.com/MazFilho)

- <img src="https://avatars.githubusercontent.com/u/13469487?v=4" width="24" height="24" alt="Vittoria Zago" style="border-radius: 50%; vertical-align: middle;"> **Vittoria Zago** - [https://github.com/vittoriazago](https://github.com/vittoriazago)

