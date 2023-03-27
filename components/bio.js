import clsx from 'clsx'
import Image from 'next/image'
import styles from '../styles/Bio.module.css'

function Bio ({ name, title, icon, resume, className, ...props } = {}) {
    return <div className={clsx(className, "flex flex-column")}>
        <p className={styles.header}>USER INFO</p>
        <div className="flex flex-row">
            <div className={styles['icon-container']}>
                <div className={clsx(styles.arc, styles['arc-start'])} />
                <div className={clsx(styles['arc-2'], styles['arc-start-2'])} />
                <div className={styles['icon-wrapper']} data-augmented-ui="all-hex-alt border">
                    <Image alt="User icon" width="100" height="100" src={icon} className={styles.icon} />
                </div>
            </div>
            <div className={styles['name-container']}>
                <p className={styles.name}>{name}</p>
                <p className={styles.title}>{title}</p>
                <p className={styles.resume}><a href="resume.pdf" download>Download report</a></p>
            </div>
        </div>
    </div>
}

export default Bio
