import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import styles from '../styles/Projects.module.css'

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

const str = len => {
    return Array.from(Array(len), () => Math.floor(Math.random() * 36).toString(36)).join('')
}

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const Card = ({ children, ...props }) => {
    return <div className={styles.card} data-augmented-ui="tl-2-clip-x tr-round border" {...props}>{children}</div>
}

const Project = ({ name, description, url } = {}) => {
    return <div className={styles.project}>
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
    const [projects, setProjects] = useLocalStorage('projects', [])

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
        <p className={styles.header}>
            Files located
        </p>
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

