import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import styles from '../styles/Projects.module.css'
import * as rand from '../util/rand.js'
import Spinner from './spinner'

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

const str = len => {
    return Array.from(Array(len), () => Math.floor(Math.random() * 36).toString(36)).join('')
}

const Card = ({ children, ...props }) => {
    return <div className={styles.card} data-augmented-ui="tl-2-clip-x tr-clip border" {...props}>{children}</div>
}

const Project = ({ name, description, url } = {}) => {
    return <div className={styles.project}>
        <div className={styles['project-header']}
            style={{
            }}
            data-augmented-ui="br-clip border"
        >
            File
        </div>
        <a href={url}>
            <p className={styles.title}>{name}</p>
            <p className={styles.description}>{description}</p>
        </a>
    </div>
}

const API = 'https://api.github.com'
const getRepoUrl = user => `${API}/users/${user}/repos`

const getRepos = user => fetch(getRepoUrl(user)).then(res => res.json())

const reverse = arr => arr.reverse()

const parseRepos = repos => {
    return repos.map(repo => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url
    }))
}

const tap = fn => x => {
    fn(x)
    return x
}

function Projects (props) {
    const [renderComplete, setRenderCompete] = useState(false)
    const [num1, setNum1] = useState(123)
    const [num2, setNum2] = useState(456)
    const [projects, setProjects] = useLocalStorage('projects', [])

    useEffect(() => {
        const interval = setInterval(() =>{
            setNum1(rand.range(0, 999).toString().padStart(3, '0'))
            setNum2(rand.range(0, 999).toString().padStart(3, '0'))
        }, 50)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (projects.length == 0) {
            getRepos('rowan-james')
                .then(reverse)
                .then(parseRepos)
                .then(setProjects)
        }

        setRenderCompete(true)
    }, [projects, setProjects])

    return !renderComplete ? null : <div>
        <div className="flex flex-row align-center">
            <Spinner />
            <p className={styles.header}>
                Searching for files...
            </p>
            <p className={clsx(styles.header, styles.counter)}>{num1} {num2}</p>
        </div>

        <div className={styles.separator} data-augmented-ui="border">&nbsp;</div>
        <div className={styles.projects}>
            {projects?.map(project => (
                <Card key={project.name}>
                    <Project name={project.name} description={project.description} url={project.url} />
                </Card>
            ))}
        </div>
    </div>
}

export default Projects

