# PrepWise 🎯

**AI-Powered Mock Interview Practice Platform**

PrepWise is a modern web application that helps job seekers practice interviews through AI-powered voice interactions. Get real-time feedback, improve your interview skills, and boost your confidence with personalized mock interviews tailored to your target role and tech stack.

![PrepWise Banner](public/logo.svg)

## ✨ Features

### 🎙️ Voice-Powered Interviews
- **Real-time voice interaction** with AI interviewer using Vapi
- **Natural conversation flow** with speech recognition and synthesis
- **Live transcript display** during interviews
- **Professional AI interviewer** with human-like responses

### 🧠 AI-Generated Content
- **Custom interview questions** generated based on role, level, and tech stack
- **Intelligent feedback analysis** using Google's Gemini AI
- **Comprehensive scoring** across multiple evaluation categories
- **Personalized improvement suggestions**

### 📊 Detailed Analytics
- **Performance scoring** (0-100) across key areas:
  - Communication Skills
  - Technical Knowledge
  - Problem Solving
  - Cultural Fit
  - Confidence & Clarity
- **Strengths identification** and areas for improvement
- **Interview history** tracking and progress monitoring

### 🔐 Secure Authentication
- **Firebase Authentication** integration
- **Secure session management** with HTTP-only cookies
- **User profile management** with personalized dashboards

### 🎨 Modern UI/UX
- **Responsive design** for all devices
- **Dark/Light theme support** with next-themes
- **Beautiful animations** and transitions
- **Accessible components** built with Radix UI

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and design system
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend & APIs
- **Next.js API Routes** - Server-side endpoints
- **Firebase Admin SDK** - Server-side Firebase operations
- **Google AI (Gemini)** - Interview generation and feedback analysis
- **Vapi** - Voice AI platform for conversations

### Database & Authentication
- **Firebase Firestore** - NoSQL database
- **Firebase Authentication** - User management
- **Firebase Admin** - Server-side authentication

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Zod** - Runtime type validation
- **React Hook Form** - Form management

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Firebase project** with Firestore and Authentication enabled
- **Google AI API key** for Gemini
- **Vapi account** for voice AI functionality

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/prepwise.git
   cd prepwise
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_CLIENT_EMAIL=your-firebase-service-account-email
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"

   # Vapi Configuration
   NEXT_PUBLIC_VAPI_PUBLIC_KEY=your-vapi-public-key
   NEXT_PUBLIC_VAPI_WORKFLOW_ID=your-vapi-workflow-id

   # Google AI Configuration
   GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key
   ```

4. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database
   - Enable Authentication (Email/Password)
   - Download service account key and add credentials to environment variables
   - Update `firebase/client.ts` with your Firebase config

5. **Set up Vapi**
   - Create an account at [Vapi](https://vapi.ai)
   - Create a workflow for interview generation
   - Get your public key and workflow ID

6. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
prepwise/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   │   ├── sign-in/       # Sign in page
│   │   └── sign-up/       # Sign up page
│   ├── (root)/            # Main application routes
│   │   ├── interview/     # Interview-related pages
│   │   └── page.tsx       # Homepage
│   ├── api/               # API routes
│   │   └── vapi/         # Vapi integration endpoints
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
│
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── button.tsx    # Button component
│   │   ├── form.tsx      # Form components
│   │   └── input.tsx     # Input component
│   ├── Agent.tsx         # Voice AI agent component
│   ├── AuthForm.tsx      # Authentication form
│   ├── InterviewCard.tsx # Interview display card
│   └── DisplayTechIcons.tsx # Technology icons
│
├── lib/                   # Utility libraries
│   ├── actions/          # Server actions
│   │   ├── auth.action.ts    # Authentication actions
│   │   └── general.action.ts # General server actions
│   ├── utils.ts          # Utility functions
│   └── vapi.sdk.ts       # Vapi SDK configuration
│
├── firebase/             # Firebase configuration
│   ├── admin.ts          # Firebase Admin SDK
│   └── client.ts         # Firebase Client SDK
│
├── types/                # TypeScript type definitions
│   ├── index.d.ts        # Main type definitions
│   └── vapi.d.ts         # Vapi-specific types
│
├── constants/            # Application constants
│   └── index.ts          # Configuration and constants
│
└── public/               # Static assets
    ├── covers/           # Interview cover images
    └── logo.svg          # Application logo
```

## 🎯 Usage

### Creating an Account
1. Navigate to `/sign-up` to create a new account
2. Provide your name, email, and password
3. Verify your email (if email verification is enabled)
4. Sign in with your credentials

### Starting an Interview
1. **Generate Questions**: Use the AI generator to create interview questions
   - Select your target role (e.g., "Frontend Developer")
   - Choose experience level (Junior, Mid, Senior)
   - Add relevant technologies
   - Specify interview type (Technical, Behavioral, Mixed)

2. **Conduct Interview**: 
   - Click "Start Interview" to begin voice interaction
   - Speak naturally with the AI interviewer
   - Answer questions as you would in a real interview
   - View live transcript during the conversation

3. **Receive Feedback**:
   - Get detailed performance analysis
   - Review scores across multiple categories
   - Read personalized improvement suggestions
   - Track your progress over time

### Reviewing Past Interviews
- Access your interview history from the dashboard
- Review detailed feedback and scores
- Track improvement over multiple sessions
- Compare performance across different roles and technologies

## 🔧 Configuration

### Firebase Setup
```typescript
// firebase/client.ts
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### Vapi Configuration
```typescript
// constants/index.ts
export const interviewer: CreateAssistantDTO = {
  name: "Interviewer",
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    // ... voice settings
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    // ... model configuration
  }
};
```

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

Run tests in watch mode:
```bash
npm run test:watch
# or
yarn test:watch
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
The application can be deployed on any platform that supports Next.js:
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

### Build for Production
```bash
npm run build
npm start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting with ESLint
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 API Documentation

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## 🔒 Security

- All authentication is handled through Firebase
- Session cookies are HTTP-only and secure
- Environment variables are properly configured
- Input validation using Zod schemas
- CORS protection on API routes

## 📞 Support

- **Documentation**: Check the [API Documentation](./API_DOCUMENTATION.md)
- **Issues**: Open an issue on GitHub
- **Email**: support@prepwise.com
- **Community**: Join our Discord server

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vapi** for providing excellent voice AI capabilities
- **Firebase** for robust backend infrastructure
- **Google AI** for powerful language model integration
- **Vercel** for seamless deployment platform
- **Radix UI** for accessible component primitives

---

<div align="center">

**Built with ❤️ by the PrepWise Team**

[Website](https://prepwise.com) • [Documentation](./API_DOCUMENTATION.md) • [Support](mailto:support@prepwise.com)

</div>



