import { useEffect, useState } from 'react';
import Process from './Process';
import styles from './speech.module.css';

export default function Speech() {
    const [start, setStart] = useState(false);
    const [job, setJob] = useState(false);
    let final = ''
    const { webkitSpeechRecognition }: any = window;
    const recognition = new webkitSpeechRecognition();
    let keywords = ['hello', 'bye', 'goodbye', 'good', 'bad', 'yes', 'no', 'maybe', 'ok', 'fine', 'great', 'awesome', 'cool', 'nice', 'bad', 'terrible', 'horrible', 'sad', 'happy', 'angry', 'mad', 'upset', 'excited', 'bored', 'tired', 'sleepy', 'hungry', 'thirsty', 'hot', 'cold', 'sick', 'ill', 'healthy', 'well', 'better', 'worse', 'best', 'worst', 'beautiful', 'ugly', 'pretty', 'handsome', 'cute', 'smart', 'intelligent', 'dumb', 'stupid', 'clever', 'wise', 'silly', 'funny', 'serious', 'calm', 'relaxed', 'nervous', 'anxious', 'scared', 'afraid', 'frightened', 'shy', 'brave', 'courageous', 'proud', 'ashamed', 'guilty', 'embarrassed', 'confident', 'humble', 'modest', 'jealous', 'envious', 'greedy', 'generous', 'selfish', 'selfless', 'kind', 'mean', 'rude', 'polite', 'respectful', 'disrespectful', 'honest', 'dishonest', 'loyal', 'unloyal', 'faithful', 'unfaithful', 'trustworthy', 'untrustworthy', 'reliable', 'unreliable', 'responsible', 'irresponsible', 'mature', 'immature', 'patient', 'impatient', 'tolerant', 'intolerant', 'forgiving', 'unforgiving', 'understanding', 'misunderstanding', 'sympathetic', 'unsympathetic', 'empathetic', 'unempathetic', 'compassionate', 'uncompassionate', 'caring', 'uncaring', 'loving', 'unloving', 'affectionate', 'unaffectionate', 'passionate', 'unpassionate', 'romantic', 'unromantic', 'sensual', 'unsensual', 'sexual', 'asexual', 'aromantic', 'unaromantic', 'platonic', 'unplatonic', 'friendly', 'unfriendly', 'social', 'antisocial', 'introverted', 'extroverted', 'ambiverted', 'shy', 'outgoing', 'talkative', 'quiet', 'silent', 'loud', 'noisy', 'chatty', 'gossipy', 'nosy', 'curious', 'inquisitive', 'interested', 'bored', 'boring', 'exciting', 'excited', 'fun', 'funny', 'hilarious', 'entertaining', 'entertained', 'bored', 'boring', 'interested', 'interesting']

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = function () {
        console.log('Listening...');
        setStart(true)
    };

    function runE2() {
        const list: string[] = []
        document.getElementById('transcript')?.innerHTML.match(/\<b\>.*\<\/b\>/g)?.forEach((word: string) => {
            list.includes(word.slice(3, -4)) ? null : list.push(word.slice(3, -4))
        })
        fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ list })
        })
        setJob(true)
    }

    recognition.onresult = function (event: any) {


        let interim_transcript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final += event.results[i][0].transcript;
                final = final.split(' ').map((word: string) => keywords.includes((word.toLowerCase().match(/[A-z]*/g) as any)?.[0]) ? `<b>${word}</b>` : word).join(' ');
            } else {
                interim_transcript += event.results[i][0].transcript;
                interim_transcript = interim_transcript.split(' ').map((word: string) => keywords.includes((word.toLowerCase().match(/[A-z]*/g) as any)?.[0]) ? `<b>${word}</b>` : word).join(' ');
            }
        }

        if (document.getElementById('transcript')) document.getElementById('transcript')!.innerHTML = `${final} ${interim_transcript}`
    };

    recognition.onend = function () {
        console.log('Stopped listening');
    };

    window.onkeyup = (e) => {
        if (e.key === 'Escape' && job) {
            setJob(false)
        }
    }

    return (<>
        {job && <Process />}
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed' }}>
            <main style={{
                background: 'rgba(255, 255, 255, 0.3)',
                WebkitBackdropFilter: 'blur(10px)',
                color: '#fefefe',
                width: '70vw',
                height: '70vh',
                borderRadius: '10px',
                boxShadow: '7px 7px 20px 10px rgba(0, 0, 0, 0.5)',
                outline: '3px solid rgba(255, 255, 255, 1)',
                backdropFilter: 'blur(10px)',
                flexDirection: 'column',
                display: start ? 'block' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div className={styles.speech}>
                    <div className={styles.start}
                        style={{
                            width: 'max-content',
                            height: 'max-content',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%',
                            position: 'absolute',
                            padding: '10px',
                            background: start ? 'rgba(67, 181, 129, 1)' : 'rgba(255, 255, 255, 0.5)',
                            boxShadow: start ? 'none' : '3px 3px 20px 3px rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(10px)',
                            outline: start ? '6px solid rgba(255, 255, 255, 1)' : '4px solid rgba(255, 255, 255, 1)',
                            transform: start ? 'scale(0.5) translate(-50%, -50%)' : 'translate(-50%, -50%)',
                            top: start ? 'calc(100% - 30px)' : '50%',
                            left: 'calc(50% - 10px)',
                        }}
                        onClick={(e) => {
                            if (start) {
                                runE2()
                            }
                            recognition[!start ? 'start' : 'stop']();
                        }}>
                        <img src="./mic.png" alt="mic" style={{
                            filter: start ? 'invert(1)' : 'invert(0)',
                        }} />
                    </div>
                    {start && <p id="transcript"><i>Listening...</i></p>}
                    {/* <p style={{ display: start ? 'block' : 'none' }}></p> */}
                </div>
            </main>
        </div>
    </>);
}
