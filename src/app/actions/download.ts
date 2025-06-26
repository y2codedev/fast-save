'use server';

import { ReelResultProps } from "@/constants/types";

export async function downloadVideo(formData: FormData): Promise<ReelResultProps> {

    try {

        const url = formData.get('url') as string;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/download`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
            cache:"no-store"
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || 'Failed to process video.');
        }

        return await response.json();

    } catch (error) {
        if (error instanceof Error) throw error;
        throw new Error('Something went wrong.');
    }
}
