import React from 'react'
import { FormProject } from '../components/FormProject'

export const ProjectAdd = () => {
    return (
        <>
            <h1 className='text-center text-4xl font-black'>Crear proyecto</h1>
            <div className='mt-10 flex justify-center'>
                <FormProject/>
            </div>
        </>
    )
}