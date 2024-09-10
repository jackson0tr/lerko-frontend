import React, { FC, useEffect, useState } from 'react';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useTheme } from 'next-themes';
import { useGetAllOrdersQuery } from '@/redux/features/orders/ordersApi';
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
import { format } from 'timeago.js';
import { AiOutlineMail } from 'react-icons/ai';
import Loader from '../../Loader/Loader';


type Props={
    isDashboard?:boolean;
}

const AllInvoices:FC<Props> = ({isDashboard}) => {
    const {theme,setTheme} = useTheme();
    const {isLoading,data} = useGetAllOrdersQuery({});
    const {data:coursesData} = useGetAllCoursesQuery({});
    const {data:usersData} = useGetAllUsersQuery({});
    const [orderData,setOrderData] = useState<any>([]);

    useEffect(()=> {
        if(data){
            const temp = data.orders.map((item:any)=> {
                const user = usersData?.users.find(
                    (user:any)=> user._id === item.userId
                )
                const course = coursesData?.courses.find(
                    (course:any)=> course._id === item.courseId
                )
                return{
                    ...item,
                    userName: user?.name,
                    userEmail: user?.email,
                    title: course?.name,
                    price:'$' + course?.price
                }
            })
            setOrderData(temp);
        }
    },[data,usersData,coursesData]);

    const columns:any=[
        {field: 'id', headerName: 'ID', flex: 0.3},
        {field: 'userName', headerName: 'اسم', flex: isDashboard ? 0.6 : 0.5},
        ...(isDashboard ? [] : [
            {field: 'userEmail', headerName: 'بريد إلكتروني', flex: 1},
            {field: 'title', headerName: 'عنوان الدورة', flex: 1},
        ]),
        {field: 'price', headerName: 'سعر', flex: 0.5},
        ...(isDashboard ? [{field: 'created_at', headerName: 'أنشئت في', flex: 0.5},] : [
            {field: ' ', headerName: 'بريد إلكتروني', flex: 0.2, renderCell: (params:any)=>{
                return(
                    <a href={`mailto:${params.row.userEmail}`}>
                        <AiOutlineMail className='dark:text-[#fff] text-[#333]' size={20}/>
                    </a>
                )
            }},
        ]),
    ]

    // statice data
    const rows:any=[
        {
            id: '123456789005',
            useName: 'exapmle',
            userEmail: 'example1@gmail.com',
            title: 'Example Course',
            price: '$500',
            created_at: '1 week ago'
        },
        {
            id: '123456789005',
            useName: 'exapmle',
            userEmail: 'example2@gmail.com',
            title: 'Example Course',
            price: '$500',
            created_at: '1 week ago'
        },
        {
            id: '123456789005',
            useName: 'exapmle',
            userEmail: 'example3@gmail.com',
            title: 'Example Course',
            price: '$500',
            created_at: '1 week ago'
        },
        {
            id: '123456789005',
            useName: 'exapmle',
            userEmail: 'example4@gmail.com',
            title: 'Example Course',
            price: '$500',
            created_at: '1 week ago'
        },
        {
            id: '123456789005',
            useName: 'exapmle',
            userEmail: 'example5@gmail.com',
            title: 'Example Course',
            price: '$500',
            created_at: '1 week ago'
        },
        {
            id: '123456789005',
            useName: 'exapmle',
            userEmail: 'example6@gmail.com',
            title: 'Example Course',
            price: '$500',
            created_at: '1 week ago'
        },
        {
            id: '123456789005',
            useName: 'exapmle',
            userEmail: 'example7@gmail.com',
            title: 'Example Course',
            price: '$500',
            created_at: '1 week ago'
        },
        {
            id: '123456789005',
            useName: 'exapmle',
            userEmail: 'example8@gmail.com',
            title: 'Example Course',
            price: '$500',
            created_at: '1 week ago'
        },
        {
            id: '123456789005',
            useName: 'exapmle',
            userEmail: 'example9@gmail.com',
            title: 'Example Course',
            price: '$500',
            created_at: '1 week ago'
        },
    ];

    // dynmic data
    // const rows:any=[];

    // orderData && orderData?.users?.last12Months?.forEach((item:any)=>{
    //     rows.push({id: item._id, userName: item.name, userEmail: item.email, title: item.title, price: item.price, created_at: format(item.createdAt)})
    // })

    // real one
    // orderData && orderData?.users?.last12Months?.forEach((item:any)=>{
    //     rows.push({id: item._id, userName: item.userName, userEmail: item.userEmail, title: item.title, price: item.price, created_at: format(item.createdAt)})
    // })

    return(
        <div className={!isDashboard ? 'mt-[120px]' : 'mt-0'}>
            {
                isLoading ? (
                    <Loader/>
                ) : (
                    <Box m={isDashboard ? '0' : '40px'}>
                        <Box m={isDashboard ? '0' : '40px 0 0 0'} height={isDashboard ? '35vh' : '90vh'} overflow={'hidden'} sx={{
                            '& .MuiDataGrid-root': {
                                border: 'none',
                                outline: 'none'
                            },
                            '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
                                color: theme === 'dark' ? '#fff' : '#333'
                            },
                            '& .MuiDataGrid-sortIcon': {
                                color: theme === 'dark' ? '#fff' : '#333'
                            },
                            '& .MuiDataGrid-row': {
                                color: theme === 'dark' ? '#fff' : '#333',
                                borderBottom: theme === 'dark' ? '1px solid #ffffff30 !important' : '1px solid #ccc !important'
                            },
                            '& .MuiTablePagination-root': {
                                color: theme === 'dark' ? '#fff' : '#333',
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom:   'none !important',
                            },
                            '& .name-column--cell': {
                                color: theme === 'dark' ? '#fff' : '#333',
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                borderBottom: 'none',
                                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
                                color: theme === 'dark' ? '#333' : '#333'
                            },
                            '& .MuiDataGrid-virtualScroller': {
                                backgroundColor: theme === 'dark' ? '#1FwA40' : '#F2F0F0',
                            },
                            '& .MuiDataGrid-footerContainer': {
                                borderTop: 'none',
                                color: theme === 'dark' ? '#fff' : '#333',
                                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
                            },
                            '& .MuiCheckbox-root': {
                                color: theme === 'dark' ? '#b7ebde !important' : '#333 !important',
                            },
                            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                                color: '#fff !important'
                            },
                        }}>
                            <DataGrid checkboxSelection={isDashboard ? false : true} rows={rows} columns={columns} 
                            // components={isDashboard ? {} : {Toolbar: GridToolbar}} 
                            />
                        </Box>
                    </Box>
                )
            }
        </div>
    )
}

export default AllInvoices;