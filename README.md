# Fitness Trainer Platform

A comprehensive web application that connects fitness trainers with their clients, enabling personalized meal planning and nutrition management.

## Overview

This platform allows fitness professionals to create accounts, manage their clients, and develop customized meal plans using a curated ingredient database. Trainers can sign up, add client accounts, build an ingredient library, and recommend personalized meals to their clients.

## Features

- **Trainer Accounts**: Secure signup and authentication for fitness professionals
- **Client Management**: Trainers can create client profiles
- **Ingredient Database**: Trainers can build and maintain their own ingredient library
- **Meal Creation**: Intuitive interface for creating meals from available ingredients
- **Meal Recommendations**: Tools for assigning custom meal plans to clients

## Tech Stack

- **Frontend**: React with TypeScript, built on Next.js framework
- **API Communication**: Axios for handling HTTP requests
- **Authentication**: JWT
- **Styling**: Ant Design
- **State Management**: Boxfusion Internal Providers

## Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- npm or yarn package manager

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/yourusername/fitness-trainer-platform.git
    cd fitness-trainer-platform

    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install

    ```

3.  Set up environment variables: Create a `.env.local` file in the root directory and add the following variables:

    ```
    NEXT_PUBLIC_API_URL=your_api_endpoint_base_url
    # Add any other required environment variables

    ```

4.  Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev

    ```

5.  Open [http://localhost:3000](http://localhost:3000/) in your browser to see the application

## Project Structure

```
fitness-trainer-platform/
├── components/         # Reusable React components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── models/             # TypeScript interfaces and types
├── pages/              # Next.js pages and API routes
├── public/             # Static assets
├── services/           # API services
├── styles/             # Global styles
└── utils/              # Utility functions

```

## API Integration

This application communicates with the following API endpoints:

- `POST /api/users/register` - Register a new trainer
- `POST /api/users/login` - Login to a trainer's profile
- `GET /api/users/current` - Get current user details
- `POST /api/client` - Create a client
- `POST /api/users/register/mobile` - Register a client
- `POST /api/users/login` - Login as a client
- `GET /api/food` - Ingredient database endpoints
- `GET /api/food/search/<search_term>` - filter food items by search term

- `POST /api/fooditems` - Create a food item

- `POST /api/mealplan` - Create a meal plan
- `GET  /api/mealplan/trainer/<trainer_id>` - Get a trainer's meal plans
- `GET /api/mealplan/client/<client_id>` - Get clients' meal plans
- `GET /api/mealplan/<plan_id>` - Get meal plan by id

## Development Roadmap

- [x] Initial project setup with Next.js and TypeScript
- [x] Trainer authentication and account management
- [x] Client profile creation and management
- [ ] Ingredient database implementation
- [ ] Meal creation functionality
- [ ] Meal recommendation system
- [ ] UI/UX improvements
- [ ] Performance optimizations
