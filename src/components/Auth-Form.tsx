'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUp, useSignIn } from '@clerk/nextjs';        // <-- import both
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'lucide-react';


import type { AuthenticateWithRedirectParams, ClerkAPIError } from '@clerk/types';


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';

type AuthFormProps = {
    type: 'signin' | 'signup';
};

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState<ClerkAPIError[]>();
    const [showPassword, setShowPassword] = useState(false);

    // Signup hook
    const {
        isLoaded: isSignUpLoaded,
        signUp,
        setActive: activateAfterSignUp
    } = useSignUp();

    // Signin hook
    const {
        isLoaded: isSignInLoaded,
        signIn,
        setActive: activateAfterSignIn
    } = useSignIn();

    // Wait for the correct hook to load
    if (type === 'signup' ? !isSignUpLoaded : !isSignInLoaded) {
        return null;
    }

    // 1️⃣ Sign‑up with email/password
    async function submit_signup(e: FormEvent) {
        e.preventDefault();

        if (!isSignUpLoaded) {
            return
        }
        try {
            await signUp.create({
                firstName: fullName.split(' ')[0] || '',
                lastName: fullName.split(' ')[1] || '',
                emailAddress,
                password,
            });
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setPendingVerification(true);
        } catch (err) {
            if (isClerkAPIResponseError(err)) setError(err.errors)
            console.error(JSON.stringify(err, null, 2))
        }
    }

    // 2️⃣ Sign‑in with email/password
    async function submit_signin(e: FormEvent) {
        e.preventDefault();
        if (!isSignInLoaded) {
            return
        }
        try {
            const attempt = await signIn.create({
                identifier: emailAddress,
                password,
            });
            if (attempt.status === 'complete') {
                // Activate the session & redirect
                await activateAfterSignIn({ session: attempt.createdSessionId });
                router.push('/v1');
            } else {
                console.log(attempt)
            }
        } catch (err) {
            if (isClerkAPIResponseError(err)) setError(err.errors)
            console.error(JSON.stringify(err, null, 2))
        }
    }

    // 3️⃣ Email‑code verification for Sign-up
    async function onPressVerify(e: FormEvent) {
        e.preventDefault();
        if (!isSignUpLoaded) {
            return
        }
        try {
            // Distinguish signUp vs. signIn under the hood:

            const result = await signUp.attemptEmailAddressVerification({ code })

            if (result.status === 'complete') {
                // Activate and route
                const sessionId = result.createdSessionId!;
                await activateAfterSignUp({ session: sessionId });
                router.push('/v1');

            } else {
                console.log(result);
            }
        } catch (err) {
            if (isClerkAPIResponseError(err)) setError(err.errors)
            console.error(JSON.stringify(err, null, 2))
        }
    }

    // 4️⃣ OAuth with Google (use correct hook per mode)
    const handleOAuth = () => {
        if (!isSignInLoaded || !isSignUpLoaded) {
            return
        }
        const opts: AuthenticateWithRedirectParams = {
            strategy: 'oauth_google',
            redirectUrl: (type === "signin" ? "/auth/signin/sso-callback" : "/auth/signup/sso-callback"),
            redirectUrlComplete: '/v1',
        };
        if (type === 'signup') {
            signUp.authenticateWithRedirect(opts);
        } else {
            signIn.authenticateWithRedirect(opts);
        }
    };

    return (
        <div className='flex justify-center items-center m-4 min-h-screen'>
            <Card className='w-full max-w-sm'>
                <CardHeader>
                    <CardTitle>
                        {pendingVerification
                            ? 'Verify your email'
                            : type === 'signup'
                                ? 'Create an account'
                                : 'Login to your account'}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    {!pendingVerification ? (
                        <form
                            onSubmit={type === 'signup' ? submit_signup : submit_signin}
                            className='space-y-4'
                        >
                            {type === 'signup' && (
                                <div>
                                    <Label className='mb-2 p-1' htmlFor='name'>Full Name</Label>
                                    <Input
                                        id='name'
                                        type='text'
                                        value={fullName}
                                        onChange={e => setFullName(e.target.value)}
                                        placeholder='John Doe'
                                        required
                                    />
                                </div>
                            )}

                            <div>
                                <Label className='mb-2 p-1' htmlFor='email'>Email</Label>
                                <Input
                                    id='email'
                                    type='email'
                                    value={emailAddress}
                                    onChange={e => setEmailAddress(e.target.value)}
                                    placeholder='you@example.com'
                                    required
                                />
                            </div>

                            <div>
                                <Label className='mb-2 p-1' htmlFor='password'>Password</Label>
                                <div className='relative'>
                                    <Input
                                        id='password'
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder='••••••••'
                                        required
                                    />
                                    <span
                                        className='absolute top-2 right-3 cursor-pointer'
                                        onClick={() => setShowPassword(v => !v)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </span>
                                </div>
                            </div>

                            {error && <p className='text-sm text-red-600'>{error[0].message}</p>}
                            <div id="clerk-captcha" />

                            <Button type='submit' className='w-full cursor-pointer'>
                                {type === 'signup' ? 'Sign Up' : 'Sign In'}
                            </Button>

                            <Button
                                type='button'
                                variant='outline'
                                className='w-full flex items-center gap-2 justify-center cursor-pointer'
                                onClick={handleOAuth}
                            >
                                <FcGoogle size={20} />
                                {type === 'signup'
                                    ? 'Sign up with Google'
                                    : 'Sign in with Google'}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={onPressVerify} className='space-y-4'>
                            <div>
                                <Label className='mb-2 p-1' htmlFor='code'>Verification Code</Label>
                                <Input
                                    id='code'
                                    type='text'
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                    placeholder='Enter code'
                                    required
                                />
                            </div>
                            {error && <p className='text-sm text-red-600'>{error[0].message}</p>}
                            <Button type='submit' className='w-full cursor-pointer'>
                                Verify Email
                            </Button>
                        </form>
                    )}
                </CardContent>

                <CardFooter className='text-center text-sm text-gray-500'>
                    {type === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <Link
                        href={type === 'signup' ? '/auth/signin' : '/auth/signup'}
                        className='ml-1 hover:cursor-pointer hover:underline'
                    >
                        {type === 'signup' ? 'Sign In' : 'Sign Up'}
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default AuthForm;
