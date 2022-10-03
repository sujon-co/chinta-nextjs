import cn from 'clsx';
import Image from 'next/image';
import { FC, memo, useState } from 'react';
import { config } from 'src/config';

const myLoader = ({ src }: any) => {
    return `${config.imageUploadUrl}${src}`;
};

type MyImage = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive' | 'raw';
    placeholder?: string;
    blurDataURL?: any;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    onClick?: () => void;
};

const MyImage: FC<MyImage> = ({ src, alt, width = 1000, height = 1000, className, layout, objectFit, onClick }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Image
            loader={myLoader}
            className={cn(
                className,
                // 'duration-700 ease-in-out',
                // isLoading ? 'grayscale  scale-110' : 'grayscale-0  scale-100'
            )}
            src={src}
            alt={alt}
            width={width}
            height={height}
            layout={layout}
            placeholder="blur"
            blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAAABKUlEQVR42u3RMQEAAAjDsE051jHBwZFKaJqJHlUgQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQICYAERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABAQIECACAkRAgAgIEAEBIiACAkRAgAgIEAEBIiACAkRAgOiyBW92ZAHvNWp5AAAAAElFTkSuQmCC"}
            objectFit={objectFit}
            onLoadingComplete={() => setIsLoading(false)}
            onClick={onClick}
        />
    );
};
export default memo(MyImage);
