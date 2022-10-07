import cn from 'clsx';
import Image from 'next/image';
// import gifImage from "public/preload.gif";
import gifImage from "public/preloader2.gif";
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
    layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive';
    placeholder?: string;
    blurDataURL?: any;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    onClick?: () => void;
    preloader?: boolean;
    preloaderSize?: 'xlSmall' | 'small' | 'normal' | 'large';
};

const MyImage: FC<MyImage> = ({ src, alt, width = 1000, height = 1000, className, layout, objectFit, onClick, preloader = true, preloaderSize = 'normal' }) => {
    const [isLoading, setIsLoading] = useState(true);

    // handler image height and width base on preloaderSize
    const handlePreloaderSize = () => {
        switch (preloaderSize) {
            case 'xlSmall':
                return { width: 40, height: 45 };
            case 'small':
                return { width: 80, height: 85 };
            case 'normal':
                return { width: 120, height: 135 };
            case 'large':
                return { width: 140, height: 160 };
            default:
                return { width: 80, height: 90 };
        }
    };

    return (
        <div className="next-image">
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
                placeholder="empty"
                blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAAABKUlEQVR42u3RMQEAAAjDsE051jHBwZFKaJqJHlUgQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQICYAERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABERAgAgIEAEBIiBABAQIECACAkRAgAgIEAEBIiACAkRAgAgIEAEBIiACAkRAgOiyBW92ZAHvNWp5AAAAAElFTkSuQmCC"}
                objectFit={objectFit}
                onLoadingComplete={() => setIsLoading(false)}
                onClick={onClick}
            />
            {preloader && isLoading && (
                <div className="next-image-overlay">
                    <Image
                        src={gifImage}
                        layout="fixed"
                        alt="brand preloader"
                        {...handlePreloaderSize()}
                    />
                </div>
            )}
        </div>
    );
};
export default memo(MyImage);
