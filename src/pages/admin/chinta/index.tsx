import { ReactElement } from 'react';
import AdminLayout from 'src/components/AdminLayout';

interface IProps {}

const Dashboard = ({}: IProps) => {
    return <h3>Welcome to dashboard</h3>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Dashboard;
