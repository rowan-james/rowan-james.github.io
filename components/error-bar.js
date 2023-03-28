import clsx from 'clsx'
import styles from '../styles/WarningBar.module.css'

function ErrorBar ({ className, children, ...props } = {}) {
    return <div
        className={clsx(className, styles.container)}
        data-augmented-ui="border"
        {...props}
    >
        {children || <>&nbsp;</>}
    </div >
}

export default ErrorBar
