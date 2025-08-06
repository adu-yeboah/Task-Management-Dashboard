# Task Management System (TMS)
A modern, responsive task management application built with React and TypeScript, designed to help users create, manage, and track tasks efficiently. The system integrates secure authentication, intuitive task management, and a clean dashboard for a seamless user experience across all devices.

# Key Features
User Authentication
Task Management
CRUD Operations


# Technologies Used
Frontend

React (v18+): Component-based UI framework.
TypeScript: Static typing for enhanced code reliability.
React Hook Form: Simplified form management and validation.
Zod: Schema validation for forms and API responses.
TanStack Query (React Query): Asynchronous state management and data fetching.
Tailwind CSS: Utility-first CSS for responsive and modern styling.
React Router: Client-side routing with protected routes.
React Icons: Lightweight icon library for UI enhancement.

Backend (Mocked)

DummyJSON: Public mock API for /todos (tasks) and /auth/login (authentication).
Axios: Promise-based HTTP client for API requests.

Installation

Clone the Repository:
``` bash
 clone https://github.com/yourusername/task-management-system.git
```
``` bash
cd task-management-system``
```

Install Dependencies:
``` bash  
  npm install
```

Configure Environment Variables:
Create a .env file in the root directory with the following:
``` bash
VITE_BASE_URL=https://dummyjson.com
```

Run the Development Server:
bashnpm run dev
The app will be available at http://localhost:3000.

# login Access
username: 
``` bash 
emily
```
password:
``` bash
emilyspass
```

# Project Structure
src/

├── components/   --- # Reusable UI components 

├── context/  ---  # React context for shared state (themeContext)

├── hooks/    ---       # Custom React hooks (useAuth, useTasks)

├── lib/      ---       # External library configurations (Axios, etc.)

├── pages/      ---     # Page components (Login, Dashboard, etc.)

├── routes/    ---      # Route definitions for React Router

├── redux/      ---     # Redux slices and store configuration

├── services/   ---     # API service functions

├── types/      ---     # TypeScript type definitions

├── utils/    ---       # Utility/helper functions

├── App.tsx     ---     # Main App component

└── main.tsx       ---  # Entry point

# Key Design Decisions
Modular Architecture: Separated concerns with dedicated folders for components, services, and state management to ensure scalability.

API Integration: Used TanStack Query for efficient data fetching, with Axios for HTTP requests to the DummyJSON API.

State Management: Implemented Redux Toolkit for global state (authSlice for user data, filterSlice for task filters).

Form Handling: Leveraged React Hook Form with Zod for robust form validation and user-friendly error messages.

Protected Routes: Used React Router to restrict dashboard access to authenticated users, redirecting others to the login page.

Field Mapping: Mapped form fields (title, status) to DummyJSON’s todo and completed fields; description stored client-side due to API limitations.
