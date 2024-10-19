import { useEffect, useState } from 'react';
import styles from './speech.module.css';

export default function Speech() {
    const [start, setStart] = useState(false);
    let final = ''
    const { webkitSpeechRecognition }: any = window;
    const recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = function () {
        console.log('Listening...');
        setStart(true)
    };

    function Edit2() {
        console.log('Edit2');
        console.log(final)
    }

    recognition.onresult = function (event: any) {


        let interim_transcript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final += event.results[i][0].transcript;
                // setFinal(temp + event.results[i][0].transcript);
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }

        if (document.getElementById('transcript')) document.getElementById('transcript')!.innerHTML = final + interim_transcript;
    };

    return (<>

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
                                Edit2()
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
