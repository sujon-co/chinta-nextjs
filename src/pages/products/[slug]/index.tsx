import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

interface Props {}

const ProductDetails: NextPage<Props> = () => {
    return (
        <div>
            <div className="container">
                <h3>Details page</h3>
            </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: {
                    slug: 'slug',
                },
            },
        ],
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {},
    };
};

export default ProductDetails;
