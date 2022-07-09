import { NextPage } from 'next';

interface Props {}

const Dashboard: NextPage<Props> = () => {
    return (
        <div className="dashboard">
            <h3>Welcome to dashboard</h3>
        </div>
    );
};

export default Dashboard;
