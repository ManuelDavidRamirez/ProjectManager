import React, { useContext } from 'react'
import ProjectsContext from '../context/ProjectsProvider'

export const useProjects = () => {
    return useContext(ProjectsContext)
}