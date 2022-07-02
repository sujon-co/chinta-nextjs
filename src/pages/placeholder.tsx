import * as React from 'react';
import type { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';

const Page: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
    imageProps,
}) => {
    return <Image {...imageProps} placeholder="blur" alt="alternative" />;
};

export const getStaticProps = async () => {
    const { base64, img } = await getPlaiceholder('/projects/17.jpeg');

    return {
        props: {
            imageProps: {
                ...img,
                blurDataURL: base64,
            },
        },
    };
};

export default Page;
