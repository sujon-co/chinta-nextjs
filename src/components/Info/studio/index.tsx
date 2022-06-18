import { NextPage } from 'next';
import StudioItem from './StudioItem';

interface Props {}

const Studio: NextPage<Props> = () => {
    return (
        <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-5">
            {Array(9)
                .fill('_')
                .map((item, index) => (
                    <div className="" key={index}>
                        <StudioItem />
                    </div>
                ))}
        </div>
    );
};

export default Studio;
