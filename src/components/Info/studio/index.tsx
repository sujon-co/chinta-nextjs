import { NextPage } from 'next';
import StudioItem from './StudioItem';

interface Props {}

const Studio: NextPage<Props> = () => {
    return (
        <div className="row g-3">
            {Array(9)
                .fill('_')
                .map((item, index) => (
                    <div className="col-md-3" key={index}>
                        <StudioItem />
                    </div>
                ))}
        </div>
    );
};

export default Studio;
