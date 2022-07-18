import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import AdminLayout from 'src/components/Admin/AdminLayout';
import { NextPageWithLayout } from 'src/pages/_app';

interface IProps { }

const AddProject: NextPageWithLayout = ({ }: IProps) => {
    return <h3>AddProject</h3>;
};

AddProject.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            hello: 'message',
        },
    };
};

export default AddProject;
