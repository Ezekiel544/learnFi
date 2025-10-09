# Firebase Setup Instructions

## Prerequisites

Before setting up Firebase for your LearnFi application, make sure you have:

1. A Google account
2. Access to the [Firebase Console](https://console.firebase.google.com/)

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter your project name (e.g., "learnfi-waitlist")
4. Configure Google Analytics (optional but recommended)
5. Click "Create project"

## Step 2: Set up Firestore Database

1. In your Firebase project dashboard, click on "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (you can configure security rules later)
4. Select a location for your database
5. Click "Done"

## Step 3: Get Your Firebase Configuration

1. In the Firebase Console, click on the gear icon next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" and click on the web icon `</>`
4. Register your app with a nickname (e.g., "LearnFi Web App")
5. Copy the Firebase configuration object

## Step 4: Configure Your Application

1. Open the file `/config/firebase.ts` in your project
2. Replace the placeholder values with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

## Step 5: Set up Firestore Security Rules

1. In the Firebase Console, go to "Firestore Database"
2. Click on the "Rules" tab
3. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to waitlist collection
    match /waitlist/{document} {
      allow read, write: if true;
    }
  }
}
```

**Note:** These are basic rules for development. For production, implement proper security rules.

## Step 6: Install Firebase Dependencies

The application uses Firebase v9+ which should be automatically installed. If you need to install it manually:

```bash
npm install firebase
```

## Features Included

The Firebase integration includes:

- **User Registration**: Add users to waitlist with name, email, and password
- **Referral System**: Track referral codes and increment referrer counts
- **Leaderboard**: Real-time leaderboard based on referral counts
- **Email Validation**: Check for duplicate email addresses
- **Error Handling**: Graceful fallbacks if Firebase is unavailable

## Database Structure

The app creates a `waitlist` collection with documents containing:

```typescript
{
  name: string,
  email: string,
  password: string, // Note: Hash this in production
  referralCode: string,
  referredBy: string | null,
  referralCount: number,
  createdAt: Timestamp
}
```

## Security Considerations

- **Passwords**: The current implementation stores passwords in plain text. For production, implement proper password hashing
- **Firestore Rules**: Update security rules for production use
- **API Keys**: Keep your Firebase API keys secure and consider using environment variables
- **User Privacy**: Ensure compliance with privacy regulations in your region

## Testing

1. Start your application
2. Try joining the waitlist with a test email
3. Check the Firestore console to see if data is being saved
4. Test the referral system by using URL parameters like `?ref=TESTCODE`
5. Verify the leaderboard updates correctly

## Troubleshooting

- **Firebase not connecting**: Check your configuration values
- **CORS errors**: Make sure your domain is authorized in Firebase settings
- **Data not saving**: Check Firestore security rules and network connectivity
- **Referral codes not working**: Verify the referral validation logic

## Production Checklist

Before deploying to production:

- [ ] Update Firestore security rules
- [ ] Implement password hashing
- [ ] Set up proper error logging
- [ ] Configure backup strategies
- [ ] Add monitoring and analytics
- [ ] Test referral system thoroughly
- [ ] Implement rate limiting for signups