import {Link} from 'react-router-dom';
import {FC} from "react";
import './Breadcrumbs.css'

export interface BreadcrumbsProps {
    paths: Breadcrumb[]
}

export interface Breadcrumb {
    name: string
    to: string
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({paths}) => {

    return (
        <div className={'mx-5 my-2'}>
            <ul className="breadcrumbs">
                {paths.map((path, index) => (
                    <li key={index} className="breadcrumb-item" id={'path-name'}>
                        {index === paths.length - 1 ? (
                            path.name
                        ) : (
                            <Link to={path.to}>{path.name}</Link>
                        )}
                        {index !== paths.length - 1 && <span> </span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Breadcrumbs;
