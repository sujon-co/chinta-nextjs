import Link from 'next/link';
import { useEffect, useState } from "react";
import { IProject } from "server/interface";
import MyImage from "../Image";
import { status } from "../Projects";

interface gridProps {
    item: status;
    height: number;
}
const GridItem = ({ item, height }: gridProps) => {
    const [width, setWidth] = useState(0);
    const [length, setLength] = useState(0);


    useEffect(() => {
        const _length = item.data.length;
        setLength(_length);
    }, [item.data.length]);

    useEffect(() => {
        const column = Math.ceil(length / 8);
        const width = column * 60 + (column * 10);
        setWidth(width);
    }, [length]);


    return (
        <div className="grids-item" >
            <ul className='grids-list' style={{ width, height: (height - 50) }}>
                {item.data.map((project: IProject, index: number) => (
                    <li className='grids-list-item' key={index}>
                        <Link as={`/projects/${project._id}`} href="/projects/[slug]" key={index + 1}>
                            <a className='grids-list-item-link'>
                                <MyImage
                                    src={project.gallery[project.topImage - 1]}
                                    alt='project'
                                    width={60}
                                    height={50}
                                    layout='fixed'
                                    objectFit="cover"
                                    preloader={false}
                                />
                                <div className="grids-list-item-link-title"> {project.name} </div>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="status-title"> {item.name} </div>
        </div>
    );
};

export default GridItem;