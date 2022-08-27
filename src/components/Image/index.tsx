import Image from 'next/image';
import { FC } from 'react';
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
    layout: 'fixed' | 'fill' | 'intrinsic' | 'responsive' | 'raw';
    placeholder?: string;
    blurDataURL?: any;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
};

const MyImage: FC<MyImage> = ({
    src,
    alt,
    width,
    height,
    className,
    layout,
    objectFit,
}) => {
    return (
        <Image
            loader={myLoader}
            className={className}
            src={src}
            alt={alt}
            width={width}
            height={height}
            layout={layout}
            placeholder="blur"
            blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAAABKUlEQVR42u3RMQEAAAjDsE051jHBwZFKaJqJHlUgQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQICYAERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABAQIECACAkRAgAgIEAEBIiACAkRAgAgIEAEBIiACAkRAgOiyBW92ZAHvNWp5AAAAAElFTkSuQmCC"}
            objectFit={objectFit}
        />
    );
};
export default MyImage;
