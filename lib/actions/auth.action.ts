'use server';

import { auth, db } from "@/Firebase/admin";
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