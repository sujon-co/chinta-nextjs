import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import AdminLayout from 'src/components/AdminLayout';
import { NextPageWithLayout } from 'src/pages/_app';

interface IProps {}

const Projects: NextPageWithLayout = ({}: IProps) => {
    return <h3>Projects</h3>;
};

Projects.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            hello: 'message',
        },
    };
};

export default Projects;
