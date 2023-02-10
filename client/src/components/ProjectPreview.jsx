import React from "react";
import { Link } from "react-router-dom";

export const ProjectPreview = ({name, _id, client}) => {
    return (
        <div className='border-b p-3 flex justify-between'>
            <p>{ name } <span className='text-sm text-gray-500 uppercase'>{ `| ${client}` }</span></p>
            <Link to={`/projects/${_id}`} className="uppercase text-sm text-gray-400 hover:text-gray-800 font-bold">Ver proyecto</Link>
        </div>
    );
};