import type { CatFact } from '../types/api-response.d.ts';

const API_CAT_URL = 'https://catfact.ninja/fact';
const GET_API_IMAGE_CAT_URL = (word: string) => `https://cataas.com/cat/says/${word}`;

export async function getCatFact(): Promise<CatFact> {
    const response = await fetch(API_CAT_URL);

    if (response.ok) {
        return (await response.json()) as Promise<CatFact>;
    }

    return Promise.reject(new Error('Error getting the cat fact'));
}

export async function getCatFactImage(word: string): Promise<string> {
    const response = await fetch(GET_API_IMAGE_CAT_URL(word));

    if (response.ok) {
        const blob = await response.blob();

        return URL.createObjectURL(blob);
    }

    throw new Error('Error getting the cat image');
}
