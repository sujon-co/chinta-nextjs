import axios, { AxiosResponse } from 'axios';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

export interface IProduct {
    _id: string;
    title: string;
    url: string;
}

interface Props {
    products: IProduct[];
}

const Products: NextPage<Props> = ({ products }) => {
    return (
        <div className="container">
            {products.map((product) => (
                <div key={product._id} className="mb-2">
                    <Link
                        href="/products/[slug]"
                        as={`/products/${product.url}`}
                    >
                        <a> {product.title} </a>
                    </Link>
                </div>
            ))}
        </div>
    );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//     return {
//         paths: [
//             { params: {} }
//         ],
//         fallback: true,
//         revalidated

//     }
// }

export const getStaticProps: GetStaticProps = async (context) => {
    const { data } = await axios.get<AxiosResponse>(
        'https://dynobd-ecommerce.herokuapp.com/api/products'
    );
    return {
        props: {
            products: data,
        },
        revalidate: 60,
    };
};

export default Products;
