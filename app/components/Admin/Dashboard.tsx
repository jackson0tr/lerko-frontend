import React, { FC, useState } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardWidgets from './DashboardWidgets';


type Props = {
    isDashboard?: boolean;
}

const Dashboard: FC<Props> = ({ isDashboard }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex h-screen">
            <div className="w-[85%]">
                <DashboardHeader open={open} setOpen={setOpen} />
                {
                    isDashboard && (
                        <DashboardWidgets open={open} />
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard;