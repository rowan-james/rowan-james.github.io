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

const Project = ({ header, name, description, url } = {}) => {
    return <div className={styles.project}>
        <div className={styles['project-header']} data-augmented-ui="br-clip border">
            {header}
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
        url: repo.html_url,
        forks: repo.forks_count,
        stars: repo.stargazers_count
    }))
}

const tap = fn => x => {
    fn(x)
    return x
}

const Checkmark = () => <span className={styles.checkmark}>&#x2714;</span>

function Projects (props) {
    const [renderComplete, setRenderCompete] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [num1, setNum1] = useState(123)
    const [num2, setNum2] = useState(456)
    const [index, setIndex] = useState(0)
    const [projects, setProjects] = useLocalStorage('projects', [])
    const [displayedProjects, setDisplayedProjects] = useState([])
    const [projectsComplete, setProjectsComplete] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setNum1(rand.range(0, 999).toString().padStart(3, '0'))
            setNum2(rand.range(0, 999).toString().padStart(3, '0'))
        }, 50)

        if (projectsComplete) {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [projectsComplete])

    useEffect(() => {
        if (projects.length == 0) {
            getRepos('rowan-james')
                .then(reverse)
                .then(parseRepos)
                .then(setProjects)
                .then(() => setLoaded(true))
        } else {
            setLoaded(true)
        }

        setRenderCompete(true)
    }, [projects, setProjects])

    useEffect(() => {
        if (loaded) {
            if (index < projects.length) {
                setTimeout(() => {
                    setDisplayedProjects(displayedProjects.concat(projects[index]))
                    setIndex(index + 1)
                }, rand.range(300, 500))
            } else {
                setProjectsComplete(true)
            }
        }
    }, [loaded, projects, displayedProjects])

    return !renderComplete ? null : <div>
        <div className="flex flex-row align-center">
            {projectsComplete ? <Checkmark /> : <Spinner />}
            <p className={styles.header}>
                Searching for files... {projectsComplete ? 'COMPLETE' : ''}
            </p>
            <p className={clsx(styles.header, styles.counter)}>{num1} {num2}</p>
        </div>

        <div className={styles.separator} data-augmented-ui="border">&nbsp;</div>
        <div className={styles.projects}>
            {displayedProjects?.map(project => (
                <Card key={project.name}>
                    <Project
                        header={`f${project.forks} s${project.stars}`}
                        name={project.name}
                        description={project.description}
                        url={project.url}
                    />
                </Card>
            ))}
        </div>
    </div>
}

export default Projects

