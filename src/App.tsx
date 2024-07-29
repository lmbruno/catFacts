import { getCatFact, getCatFactImage } from './services/catFactServices';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [fact, setFact] = useState<string>();
    const [factImage, setFactImage] = useState<string>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        getCatFact()
            .then((newFact) => {
                setFact(newFact.fact);
            })
            .catch((error: unknown) => {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    console.log('unexpected error', error);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!fact) return;
        const primeraPalabra = fact.split(' ', 1)[0];
        getCatFactImage(primeraPalabra)
            .then((catImage) => {
                setFactImage(catImage);
            })
            .catch((error: unknown) => {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    console.log('unexpected error', error);
                }
            });
    }, [fact]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <main className="app">
                <article>
                    {fact && <p>{fact}</p>}
                    {factImage && (
                        <img
                            src={`${factImage}`}
                            alt={`image of a cat with the word the first word of the catfact`}
                        />
                    )}
                </article>
            </main>
        </>
    );
}

export default App;
