import Image from 'next/image';
import { FC } from 'react';
import { config } from 'src/config';

const myLoader = ({ src }: any) => {
  return `${config.imageUploadUrl}/${src}`;
};

interface MyImage {
  src: string;
  alt: string,
  width: number;
  height: number;
  className?: string;
  layout?: "fixed" | "fill" | "intrinsic" | "responsive" | "raw";
  placeholder?: string;
  blurDataURL?: any;
}
const MyImage: FC<MyImage> = ({ src, alt, width, height, className, layout, blurDataURL }) => {
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
      blurDataURL={blurDataURL}
    />
  );
};
export default MyImage;