# PrepWise API Documentation

## Overview

PrepWise is a Next.js application that provides AI-powered mock interview practice using voice interaction. The application integrates with Firebase for authentication and data storage, and uses Vapi for voice AI functionality and Google's Gemini AI for interview question generation and feedback analysis.

## Table of Contents

1. [Types and Interfaces](#types-and-interfaces)
2. [Components](#components)
3. [API Routes](#api-routes)
4. [Server Actions](#server-actions)
5. [Utility Functions](#utility-functions)
6. [Firebase Configuration](#firebase-configuration)
7. [Constants and Configuration](#constants-and-configuration)
8. [Usage Examples](#usage-examples)

## Types and Interfaces

### Core Data Types

#### `Interview`
Represents a mock interview session.

```typescript
interface Interview {
  id: string;
  role: string;              // Job role (e.g., "Frontend Developer")
  level: string;             // Experience level (e.g., "Junior", "Senior")
  questions: string[];       // Array of interview questions
  techstack: string[];       // Technologies used in the role
  createdAt: string;         // ISO timestamp
  userId: string;            // ID of the user who created the interview
  type: string;              // Interview type ("Technical", "Behavioral", "Mixed")
  finalized: boolean;        // Whether the interview is ready for use
}
```

#### `Feedback`
Represents AI-generated feedback for an interview performance.

```typescript
interface Feedback {
  id: string;
  interviewId: string;       // Reference to the interview
  totalScore: number;        // Overall score (0-100)
  categoryScores: Array<{
    name: string;            // Category name
    score: number;           // Score for this category (0-100)
    comment: string;         // Detailed feedback comment
  }>;
  strengths: string[];       // Array of identified strengths
  areasForImprovement: string[]; // Areas needing improvement
  finalAssessment: string;   // Overall assessment summary
  createdAt: string;         // ISO timestamp
}
```

#### `User`
Represents a user in the system.

```typescript
interface User {
  name: string;
  email: string;
  id: string;
}
```

### Component Props

#### `AgentProps`
Props for the voice AI agent component.

```typescript
interface AgentProps {
  userName: string;
  userId?: string;
  interviewId?: string;
  feedbackId?: string;
  type: "generate" | "interview";  // Component mode
  questions?: string[];             // Questions for interview mode
}
```

#### `InterviewCardProps`
Props for displaying interview cards.

```typescript
interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}
```

### Voice AI Types

#### `Message`
Union type for Vapi voice AI messages.

```typescript
type Message = TranscriptMessage | FunctionCallMessage | FunctionCallResultMessage;

interface TranscriptMessage extends BaseMessage {
  type: MessageTypeEnum.TRANSCRIPT;
  role: MessageRoleEnum;
  transcriptType: TranscriptMessageTypeEnum;
  transcript: string;
}
```

## Components

### `Agent`
**Location**: `components/Agent.tsx`

The main voice AI interaction component that handles interview sessions.

**Props**: `AgentProps`

**Features**:
- Voice call management with start/stop functionality
- Real-time transcript display
- Speech detection and visual feedback
- Automatic feedback generation after interview completion
- Support for both interview and question generation modes

**Usage**:
```tsx
<Agent
  userName="John Doe"
  userId="user123"
  interviewId="interview456"
  type="interview"
  questions={["Tell me about yourself", "What are your strengths?"]}
/>
```

**Methods**:
- `handleCall()`: Initiates a voice call session
- `handleDisconnect()`: Ends the current call
- Automatic event listeners for voice events (speech start/end, messages)

### `AuthForm`
**Location**: `components/AuthForm.tsx`

Authentication form component supporting both sign-in and sign-up.

**Props**: 
```typescript
{ type: "sign-in" | "sign-up" }
```

**Features**:
- Form validation using Zod schema
- Firebase authentication integration
- Responsive design with error handling
- Automatic redirect after successful authentication

**Usage**:
```tsx
<AuthForm type="sign-in" />
<AuthForm type="sign-up" />
```

### `InterviewCard`
**Location**: `components/InterviewCard.tsx`

Displays interview information in a card format.

**Props**: `InterviewCardProps`

**Features**:
- Displays interview role, type, and creation date
- Shows feedback score if available
- Technology stack icons
- Dynamic cover images
- Conditional button text based on completion status

**Usage**:
```tsx
<InterviewCard
  interviewId="123"
  userId="user456"
  role="Frontend Developer"
  type="Technical"
  techstack={["React", "TypeScript", "Next.js"]}
  createdAt="2024-03-15T10:00:00Z"
/>
```

### `DisplayTechIcons`
**Location**: `components/DisplayTechIcons.tsx`

Displays technology stack icons with tooltips.

**Props**: `TechIconProps`

**Features**:
- Fetches appropriate icons for technologies
- Displays up to 3 icons with overlap styling
- Tooltips showing technology names
- Fallback icons for unrecognized technologies

**Usage**:
```tsx
<DisplayTechIcons techStack={["React", "Node.js", "MongoDB"]} />
```

### UI Components

#### `Button`
**Location**: `components/ui/button.tsx`

Reusable button component with multiple variants.

**Props**:
```typescript
{
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}
```

**Usage**:
```tsx
<Button variant="default" size="lg">Click me</Button>
<Button variant="outline">Secondary action</Button>
```

#### `FormField`
**Location**: `components/FormField.tsx`

Form input component with label and validation support.

**Usage**:
```tsx
<FormField
  control={form.control}
  name="email"
  label="Email"
  placeholder="Enter your email"
  type="email"
/>
```

## API Routes

### `/api/vapi/generate`
**Location**: `app/api/vapi/generate/route.ts`

Generates interview questions using AI.

**Method**: `POST`

**Request Body**:
```typescript
{
  type: string;        // "Technical", "Behavioral", or "Mixed"
  role: string;        // Job role
  level: string;       // Experience level
  techstack: string;   // Comma-separated technologies
  amount: number;      // Number of questions to generate
  userid: string;      // User ID
}
```

**Response**:
```typescript
{
  success: boolean;
}
```

**Example**:
```javascript
const response = await fetch('/api/vapi/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'Technical',
    role: 'Frontend Developer',
    level: 'Junior',
    techstack: 'React,TypeScript,Next.js',
    amount: 5,
    userid: 'user123'
  })
});
```

## Server Actions

### Authentication Actions
**Location**: `lib/actions/auth.action.ts`

#### `signUp(params: SignUpParams)`
Creates a new user account.

**Parameters**:
```typescript
{
  uid: string;
  name: string;
  email: string;
  password: string;
}
```

**Returns**: `{ success: boolean; message: string }`

#### `signIn(params: SignInParams)`
Authenticates an existing user.

**Parameters**:
```typescript
{
  email: string;
  idToken: string;  // Firebase ID token
}
```

#### `getCurrentUser()`
Retrieves the currently authenticated user.

**Returns**: `Promise<User | null>`

#### `signOut()`
Signs out the current user by clearing session cookies.

**Usage**:
```typescript
import { signOut, getCurrentUser } from '@/lib/actions/auth.action';

// Get current user
const user = await getCurrentUser();

// Sign out
await signOut();
```

### General Actions
**Location**: `lib/actions/general.action.ts`

#### `createFeedback(params: CreateFeedbackParams)`
Generates AI feedback for an interview performance.

**Parameters**:
```typescript
{
  interviewId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;  // Optional for updates
}
```

**Returns**: `{ success: boolean; feedbackId?: string }`

#### `getInterviewById(id: string)`
Retrieves a specific interview by ID.

**Returns**: `Promise<Interview | null>`

#### `getFeedbackByInterviewId(params: GetFeedbackByInterviewIdParams)`
Gets feedback for a specific interview.

**Parameters**:
```typescript
{
  interviewId: string;
  userId: string;
}
```

**Returns**: `Promise<Feedback | null>`

#### `getLatestInterviews(params: GetLatestInterviewsParams)`
Retrieves recent interviews from other users.

**Parameters**:
```typescript
{
  userId: string;
  limit?: number;  // Default: 20
}
```

**Returns**: `Promise<Interview[] | null>`

#### `getInterviewsByUserId(userId: string)`
Gets all interviews for a specific user.

**Returns**: `Promise<Interview[] | null>`

**Usage**:
```typescript
import { createFeedback, getInterviewById } from '@/lib/actions/general.action';

// Create feedback
const result = await createFeedback({
  interviewId: 'interview123',
  userId: 'user456',
  transcript: [
    { role: 'user', content: 'I am experienced in React...' },
    { role: 'assistant', content: 'Tell me about a challenging project...' }
  ]
});

// Get interview
const interview = await getInterviewById('interview123');
```

## Utility Functions

### `lib/utils.ts`

#### `cn(...inputs: ClassValue[])`
Combines and merges CSS classes using clsx and tailwind-merge.

**Usage**:
```typescript
import { cn } from '@/lib/utils';

const buttonClass = cn(
  'base-class',
  isActive && 'active-class',
  'additional-class'
);
```

#### `getTechLogos(techArray: string[])`
Fetches technology logos from CDN with fallback support.

**Parameters**: `string[]` - Array of technology names

**Returns**: `Promise<{ tech: string; url: string }[]>`

**Usage**:
```typescript
import { getTechLogos } from '@/lib/utils';

const logos = await getTechLogos(['React', 'Node.js', 'MongoDB']);
// Returns: [
//   { tech: 'React', url: 'https://cdn.../react/react-original.svg' },
//   { tech: 'Node.js', url: 'https://cdn.../nodejs/nodejs-original.svg' },
//   ...
// ]
```

#### `getRandomInterviewCover()`
Returns a random interview cover image path.

**Returns**: `string`

**Usage**:
```typescript
import { getRandomInterviewCover } from '@/lib/utils';

const coverImage = getRandomInterviewCover();
// Returns: "/covers/amazon.png" (random)
```

## Firebase Configuration

### Admin SDK
**Location**: `firebase/admin.ts`

Server-side Firebase configuration for authentication and Firestore.

**Exports**:
- `auth`: Firebase Admin Auth instance
- `db`: Firestore Admin instance

**Environment Variables Required**:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

### Client SDK
**Location**: `firebase/client.ts`

Client-side Firebase configuration.

**Exports**:
- `auth`: Firebase Auth instance
- `db`: Firestore instance

## Constants and Configuration

### `constants/index.ts`

#### `mappings`
Technology name normalization mapping for icon fetching.

```typescript
const mappings = {
  "react.js": "react",
  "node.js": "nodejs",
  "next.js": "nextjs",
  // ... more mappings
};
```

#### `interviewer`
Vapi AI assistant configuration for conducting interviews.

**Properties**:
- `name`: "Interviewer"
- `voice`: 11Labs voice configuration
- `transcriber`: Deepgram configuration
- `model`: OpenAI GPT-4 configuration

#### `feedbackSchema`
Zod schema for validating AI-generated feedback.

**Structure**:
```typescript
{
  totalScore: number;
  categoryScores: [
    { name: "Communication Skills", score: number, comment: string },
    { name: "Technical Knowledge", score: number, comment: string },
    { name: "Problem Solving", score: number, comment: string },
    { name: "Cultural Fit", score: number, comment: string },
    { name: "Confidence and Clarity", score: number, comment: string }
  ];
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
}
```

#### `interviewCovers`
Array of available interview cover images.

## Usage Examples

### Complete Interview Flow

```typescript
// 1. Generate interview questions
const generateResponse = await fetch('/api/vapi/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'Technical',
    role: 'Frontend Developer',
    level: 'Junior',
    techstack: 'React,TypeScript',
    amount: 5,
    userid: 'user123'
  })
});

// 2. Conduct interview with Agent component
<Agent
  userName="John Doe"
  userId="user123"
  interviewId="generated-interview-id"
  type="interview"
  questions={generatedQuestions}
/>

// 3. Get feedback after interview
const feedback = await getFeedbackByInterviewId({
  interviewId: 'interview123',
  userId: 'user123'
});
```

### Authentication Flow

```typescript
// Sign up
const result = await signUp({
  uid: 'firebase-uid',
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123'
});

// Sign in
await signIn({
  email: 'john@example.com',
  idToken: 'firebase-id-token'
});

// Check current user
const user = await getCurrentUser();
```

### Display Interview Cards

```tsx
const interviews = await getInterviewsByUserId('user123');

{interviews?.map((interview) => (
  <InterviewCard
    key={interview.id}
    interviewId={interview.id}
    userId="user123"
    role={interview.role}
    type={interview.type}
    techstack={interview.techstack}
    createdAt={interview.createdAt}
  />
))}
```

## Error Handling

All server actions return objects with `success` boolean and optional `message` for error handling:

```typescript
const result = await signUp(params);
if (!result.success) {
  console.error(result.message);
  // Handle error
}
```

API routes return appropriate HTTP status codes and error messages:

```typescript
try {
  const response = await fetch('/api/vapi/generate', options);
  if (!response.ok) {
    throw new Error('Failed to generate interview');
  }
  const data = await response.json();
} catch (error) {
  console.error('Error:', error);
}
```

## Environment Variables

Required environment variables for the application:

```env
# Firebase Admin
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY=your-private-key

# Vapi
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your-vapi-public-key
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your-workflow-id

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key
```

This documentation covers all public APIs, functions, and components in the PrepWise application. Each section includes detailed descriptions, parameters, return types, and usage examples to help developers understand and implement the functionality effectively.