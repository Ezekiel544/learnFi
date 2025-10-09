import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where, 
  updateDoc, 
  doc, 
  increment,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { User } from '../App';

// Generate a unique referral code
function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Add a new user to the waitlist
export async function addUserToWaitlist(
  name: string, 
  email: string, 
  password: string, 
  referredBy?: string
): Promise<User> {
  try {
    const referralCode = generateReferralCode();
    
    const userData = {
      name,
      email,
      password, // Note: In production, hash this password before storing
      referralCode,
      referredBy: referredBy || null,
      referralCount: 0,
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'waitlist'), userData);
    
    // If user was referred by someone, increment their referral count
    if (referredBy) {
      await incrementReferralCount(referredBy);
    }

    const newUser: User = {
      id: docRef.id,
      name,
      email,
      referralCode,
      referredBy,
      referralCount: 0,
      createdAt: new Date()
    };

    return newUser;
  } catch (error) {
    console.error('Error adding user to waitlist:', error);
    throw new Error('Failed to join waitlist. Please try again.');
  }
}

// Increment referral count for a user
async function incrementReferralCount(referralCode: string): Promise<void> {
  try {
    const q = query(
      collection(db, 'waitlist'), 
      where('referralCode', '==', referralCode)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, 'waitlist', userDoc.id), {
        referralCount: increment(1)
      });
    }
  } catch (error) {
    console.error('Error incrementing referral count:', error);
  }
}

// Get leaderboard data (top users by referral count)
export async function getLeaderboard(): Promise<User[]> {
  try {
    const q = query(
      collection(db, 'waitlist'), 
      orderBy('referralCount', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    const users: User[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
      referralCode: doc.data().referralCode,
      referredBy: doc.data().referredBy,
      referralCount: doc.data().referralCount,
      createdAt: doc.data().createdAt?.toDate() || new Date()
    }));

    return users;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw new Error('Failed to load leaderboard. Please try again.');
  }
}

// Check if email already exists
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'waitlist'), 
      where('email', '==', email)
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking email:', error);
    return false;
  }
}

// Validate referral code
export async function validateReferralCode(referralCode: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'waitlist'), 
      where('referralCode', '==', referralCode)
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error validating referral code:', error);
    return false;
  }
}