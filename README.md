# KYC Onboarding Real-Time Communication (TypeScript)

This application demonstrates real-time communication between desktop and mobile devices during a KYC onboarding flow.

## Features

- Real-time messaging between desktop and mobile clients
- Firebase Realtime Database backend
- Responsive design for both desktop and mobile views
- Message timestamps and sender identification
- TypeScript for type safety
- Comprehensive unit tests

## Setup

1. Clone the repository
2. Create a Firebase project and set up Realtime Database
3. Add your Firebase config to `.env.local`
4. Install dependencies: `npm install`
5. Run the app: `npm start`
6. Run tests: `npm test`

## Testing

- Unit tests: `npm test`
- Test coverage: `npm run test:coverage`

## Tech Stack

- React 18 with TypeScript
- Firebase Realtime Database
- Material-UI
- React Router
- Jest & Testing Library
- date-fns for date formatting

## Example of .env.local

```
REACT_APP_FIREBASE_API_KEY={{ your-api-key }}
REACT_APP_FIREBASE_AUTH_DOMAIN={{ your-project.firebaseapp.com }}
REACT_APP_FIREBASE_DATABASE_URL={{ https://your-project.firebaseio.com }}
REACT_APP_FIREBASE_PROJECT_ID={{ your-project-id }}
REACT_APP_FIREBASE_STORAGE_BUCKET={{ your-project.appspot.com }}
REACT_APP_FIREBASE_MESSAGING_SENDER_ID={{ your-sender-id }}
REACT_APP_FIREBASE_APP_ID={{ your-app-id }}
```
