import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import AdminLayout from 'src/components/AdminLayout';
import { NextPageWithLayout } from 'src/pages/_app';

interface IProps {}

const Sliders: NextPageWithLayout = ({}: IProps) => {
    return <h3>Sliders</h3>;
};

Sliders.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            hello: 'message',
        },
    };
};

export default Sliders;
