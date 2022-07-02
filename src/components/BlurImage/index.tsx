import Image from 'next/image';
import { useState } from 'react';
import cn from 'clsx';

function BlurImage(props: any) {
    const [isLoading, setLoading] = useState(true);

    return (
        <Image
            {...props}
            alt={props.alt}
            className={cn(
                props.className,
                'duration-700 ease-in-out',
                isLoading ? 'grayscale  scale-110' : 'grayscale-0  scale-100'
            )}
            onLoadingComplete={() => setLoading(false)}
        />
    );
}

export default BlurImage;
