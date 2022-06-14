import { NextPage } from 'next';
import Image from 'next/image';

const Preloader: NextPage = () => {
    return (
        <div className="window-preloader">
            <div className="preloader">
                <Image
                    src="/preload.gif"
                    layout="fixed"
                    alt="brand preloader"
                    height={160}
                    width={140}
                />
            </div>
        </div>
    );
};

export default Preloader;
