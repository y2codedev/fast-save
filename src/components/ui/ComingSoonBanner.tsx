'use client';

import { useState } from 'react';
import { Clock, Loader2, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ComingSoonBanner = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setSubscribed(true);
            setIsLoading(false);
            setEmail('');
        }, 1500);
    };

    return (
        <div className="flex items-center justify-center  ">
            <div className="relative w-full max-w-md p-8 mx-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
                <div className="absolute -top-4 -right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    COMING SOON
                </div>

                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900 rounded-full">
                        <Clock className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Exciting New Features Coming!
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300">
                        We're working hard to bring you enhanced download capabilities.
                        Get notified when we launch!
                    </p>

                    {!subscribed ? (
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70"
                            >
                                {isLoading ?
                                    <div className='flex items-center justify-center gap-2'>
                                      <Loader2 className="h-4 w-4 animate-spin" strokeWidth={3} />
                                        <span>Processing...</span>
                                    </div>
                                    : 'Notify Me'
                                }

                            </button>
                        </form>
                    ) : (
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg">
                            Thanks for subscribing! We'll notify you when we launch.
                        </div>
                    )}

                    <button
                        onClick={() => router.push('/')}
                        className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                        Continue to current version
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComingSoonBanner;