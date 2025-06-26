'use server';

import { ReelResultProps } from "@/constants/types";

export async function downloadVideo(formData: FormData): Promise<ReelResultProps> {

    try {

        const url = formData.get('url') as string;

        const response = await fetch(`http://localhost:3000/api/download`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
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
