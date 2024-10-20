import styles from './jobs.module.css'
import { useState } from "react";
import Jobs from './Jobs'
import { Counter } from './Counter'

export default function Process({
    objectId,
}: {
    objectId: string;
}) {

    let [objectID, setObjectID] = useState<string>(objectId);

    let [show, setShow] = useState(false)
    for (let i = 0; i <= 100; i++) {
        setTimeout(() => {
            document.documentElement.style.setProperty('--load', `${i < 10 ? `0${i}` : i}%`)
            if (document.querySelector('#woot div')) document.querySelector('#woot div')!.setAttribute('data-percent', `${i < 10 ? `0${i}` : i}%`)
            if (i === 100) {
                setShow(true)
            }
        }, i * 10)
    }

    return (
        <>
            {!show ? <>

                <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', zIndex: 200 }} className={styles.jobs}>
                    <main style={{
                        WebkitBackdropFilter: 'blur(10px)',
                        color: '#fefefe',
                        width: '80vw',
                        backdropFilter: 'blur(15px)',
                        height: '80vh',
                        borderRadius: '10px',
                        flexDirection: 'column',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        <div className={styles.load} id='woot'>
                            <div data-percent="0.0%"></div>
                        </div>
                    </main>
                </div>
            </> : <>
                <Jobs objectId={objectId} />
            </>}
        </>
    )
}