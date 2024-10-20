import styles from './jobs.module.css'

export default function Jobs() {

    for (let i = 0; i <= 1000; i++) {
        setTimeout(() => {
            document.documentElement.style.setProperty('--load', i / 10 === 100 ? '100%' : `${i / 10 < 10 ? `0${i / 10}` : i / 10}${i % 10 === 0 ? '.0' : ''}%`)
            document.querySelector('#woot div')!.setAttribute('data-percent', i / 10 === 100 ? '100%' : `${i / 10 < 10 ? `0${i / 10}` : i / 10}${i % 10 === 0 ? '.0' : ''}%`)
        }, i * 20)
    }

    return (
        <>
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
        </>
    )
}