import { db } from './firebase';
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    arrayUnion,
    serverTimestamp
} from 'firebase/firestore';

// Create or get user profile
export const createUserProfile = async (user) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        // Create new user profile with default mastery scores
        const defaultMastery = {
            'Sliding Window': 20,
            'Two Pointers': 20,
            'Dynamic Programming': 20,
            'Tree/Graph': 20,
            'Greedy': 20,
        };

        await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            masteryMap: defaultMastery,
            problemsAttempted: [],
            problemsSolved: [],
            interviewReadinessScore: 0,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
        });

        return { ...defaultMastery };
    } else {
        // Update last login
        await updateDoc(userRef, {
            lastLogin: serverTimestamp(),
        });

        return userSnap.data();
    }
};

// Get user profile
export const getUserProfile = async (userId) => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data();
    }
    return null;
};

// Update mastery map after problem completion
export const updateMasteryMap = async (userId, pattern, masteryChange) => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const currentMastery = userSnap.data().masteryMap || {};
        const currentScore = currentMastery[pattern] || 0;

        // Update the specific pattern score (max 100, min 0)
        const newScore = Math.max(0, Math.min(100, currentScore + masteryChange));

        await updateDoc(userRef, {
            [`masteryMap.${pattern}`]: newScore,
        });
    }
};

// Record problem attempt
export const recordProblemAttempt = async (userId, problemId, success, pattern) => {
    const userRef = doc(db, 'users', userId);

    const attemptData = {
        problemId,
        success,
        pattern,
        timestamp: new Date().toISOString(),
    };

    await updateDoc(userRef, {
        problemsAttempted: arrayUnion(attemptData),
    });

    // If successful, add to solved problems and increase mastery
    if (success) {
        await updateDoc(userRef, {
            problemsSolved: arrayUnion(problemId),
        });

        // Increase mastery for this pattern
        await updateMasteryMap(userId, pattern, 10);
    } else {
        // Slight decrease for failed attempts
        await updateMasteryMap(userId, pattern, -5);
    }
};

// Update interview readiness score
export const updateInterviewScore = async (userId, scoreChange) => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const currentScore = userSnap.data().interviewReadinessScore || 0;
        const newScore = Math.max(0, Math.min(100, currentScore + scoreChange));

        await updateDoc(userRef, {
            interviewReadinessScore: newScore,
        });
    }
};
