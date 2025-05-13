'use server';

import { auth, db } from "@/Firebase/admin";
import { Session } from "inspector/promises";
import { cookies } from "next/headers";

const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  // Create session cookie
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000, // milliseconds
  });

  // Set cookie in the browser
  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function signUp(params: SignUpParams){
    const {uid, name, email} = params;

    try{
        const userRecords = await db.collection('users').doc(uid).get();
        if(userRecords.exists){
            return{
                success: false,
                message: 'user already exists, Sign in instead'
            }
        }

        await db.collection('users').doc(uid).set({
            name, email
        })

        return{
            success: true,
            message: 'account created'
        }

    } catch(e: any){
        console.error('error creating a user', e);

        if( e.code === 'auth/email-already-exists'){
            return{
                success: false,
                message: 'This email is already in use.'
            }
        }

        return{
            success: false,
            message: 'Failed to create.'
        }
    }

}

export async function signIn(params: SignInParams) {
    const {email, idToken} = params;
    try{
        const userRecords = await auth.getUserByEmail(email);

        if(!userRecords){
            return{
                success: false,
                message: 'user does not exist, create an account instead?'
            }
        }

        await setSessionCookie(idToken);

    } catch(e){
        console.log(e);

        return{
            success: false,
            message: 'Failed to login'

        }
    }    
}

export async function getCurrentuser(): Promise<User |null> {
    const cookieStore= await cookies();

    const sessionCookie = cookieStore.get('session')?.value;

    if(!sessionCookie) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    
        // get user info from db
        const userRecord = await db
          .collection("users")
          .doc(decodedClaims.uid)
          .get();
        if (!userRecord.exists) return null;
    
        return {
          ...userRecord.data(),
          id: userRecord.id,
        } as User;
      } catch (error) {
        console.log(error);
    
        // Invalid or expired session
        return null;
      }
    }
    
    // Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentuser();
  return !!user;
    
}