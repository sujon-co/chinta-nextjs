import { NextPage } from 'next';
import { IStudio } from 'server/interface';
import StudioItem from './StudioItem';


interface Props {
    studios: IStudio[];
}

const Studio: NextPage<Props> = ({ studios }) => {
    return (
        <div className="row g-3 row-cols-2 row-cols-md-3  row-cols-lg-4 row-cols-xl-5">
            {studios?.map((studio, index) => (
                <div className="" key={(studio._id, index)}>
                    <StudioItem studio={studio} />
                </div>
            ))}
        </div>
    );
};

export default Studio;
