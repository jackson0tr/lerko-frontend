import React, {FC, useState} from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardWidgets from './DashboardWidgets';
import Header from '../Header';


type Props={
    isDashboard?:boolean;
}

const Dashboard:FC<Props> = ({isDashboard}) =>{
    const [open,setOpen] = useState(false);
    return(
        <div>
            <DashboardHeader open={open} setOpen={setOpen}/>
            {
                isDashboard && (
                    <DashboardWidgets open={open}/>
                )
            }
        </div>
    )
}

export default Dashboard;