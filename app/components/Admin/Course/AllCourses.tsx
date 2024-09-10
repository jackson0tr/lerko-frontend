import React, { FC, useEffect, useState } from 'react';
import {DataGrid} from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useGetAllCoursesQuery, useDeleteCourseMutation } from '@/redux/features/courses/coursesApi';
import Loader from '../../Loader/Loader';
import {format} from 'timeago.js' 
import { style } from '@/app/style/style';
import { toast } from 'react-hot-toast';
import Link from 'next/link';


type Props={

}

const AllCourses:FC<Props> = () => {
    const {theme, setTheme} = useTheme();
    const [open, setOpen] = useState(false);
    const [courseId, setCourseId] = useState(false);
    const {isLoading,data, refetch}:any = useGetAllCoursesQuery({},{refetchOnMountOrArgChange: true});
    const [deleteCourse,{isSuccess,error}] = useDeleteCourseMutation({});
    const handleClose = () => {
        setOpen(false);
    }
    const handleDelete = async() => {
        const id= courseId;
        await deleteCourse(id);
    }
    const locale = 'ar';
    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.5},
        {field: 'title', headerName: 'اسم الكورس', flex: 1},
        {field: 'ratings', headerName: 'تقيمات', flex: 0.5},
        {field: 'purchased', headerName: 'تم شراؤها', flex: 0.5},
        {field: 'created_at', headerName: 'تم انشائها', flex: 0.5},
        {
            field: '  ',
            headerName: 'تعديل',
            flex: 0.2,
            renderCell: (params:any)=>{
                return(
                    <>
                        <Link href={`/${locale}/admin/edit-course/${params.row.id}`}>
                            <AiOutlineEdit className='dark:text-[#fff] text-[#333]' size={20} />
                        </Link>
                    </>
                )
            }
        },
        {
            field: ' ',
            headerName: 'حذف',
            flex: 0.2,
            renderCell: (params:any)=>{
                return(
                    <>
                        <Button onClick={()=> {
                                setOpen(!open);
                                setCourseId(params.row.id)
                            }} >
                            <AiOutlineDelete className='dark:text-[#fff] text-[#333]' size={20} />
                        </Button>
                    </>
                )
            }
        }
    ];

    const rows:any = [];

    {
        data && data.courses.forEach((item:any) => {
            rows.push({
                id:item._id,
                title:item.title,
                ratings:item.ratings,
                purchased:item.purchased,
                created_at:format(item.createdAt),
            })
        })
    }

    useEffect(()=>{
        if(isSuccess){
            refetch();
            setOpen(false);
            toast.success("تم حذف الكورس بنجاح");
        }
        if(error){
            if('data' in error){
                const errMessage = error as any;
                toast.error(errMessage.data.message);
            }
        }
    },[isSuccess,error])

    return(
        <div className="mt-[120px]">
            {
                isLoading ? (
                    <Loader/>
                ):(
                    <Box m='20px'>
                <Box m='40px 0 0 0' height='80vh' sx={{
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
                        borderBottom: theme === 'dark' ? '1px solid #ffffff30 !important' : '1px solid #ccc !important',
                    },
                    '& .MuiTablePagination-root': {
                        color: theme === 'dark' ? '#fff' : '#333',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none'
                    },
                    '& .name-column--cell': {
                        color: theme === 'dark' ? '#fff' : '#333',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        borderBottom: 'none',
                        color: theme === 'dark' ? '#333' : '#333',
                        backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC'
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: theme === 'dark' ? '#1F2A40' : '#F2F0F0'
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
                        borderTop: 'none',
                        color: theme === 'dark' ? '#fff' : '#333',
                    },
                    '& .MuiCheckbox-root': {
                        color: theme === 'dark' ? '#b7ebde !important' : '#333 !important',
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color:  '#fff !important',
                    },
                }}>
                    <DataGrid checkboxSelection rows={rows} columns={columns}/>
                </Box>
                <div style={{ textAlign: 'center' }}>
                                <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
                                    <DialogTitle>تأكيد الحذف</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            هل انت متأكد علي حذف الفديو
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions style={{justifyContent: 'space-between'}}>
                                        <Button type='submit' onClick={handleDelete} color='success' variant='contained'>
                                            حذف
                                        </Button>
                                        <Button type='button' onClick={handleClose} color='error' variant='contained'>
                                            الغاء
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                {/* {
                    open && (
                        <Modal open={open} onClose={()=>setOpen(!open)} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
                            <Box className='absolute top-[50%] left-[50%] -translate-x-1/2 '>
                                <h1 className={style.title}>
                                    Are you sure you want to delete this course ?
                                </h1>
                                <div className="flex w-full items-center justify-between mb-6">
                                    <div onClick={()=>setOpen(!open)} className={`${style.button} !w-[120px] h-[30px] bg-[#57c7a3] `}>
                                        Cancel
                                    </div>
                                    <div onClick={handleDelete} className={`${style.button} !w-[120px] h-[30px] bg-[#d63f] `}>
                                        Delete
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    )
                } */}
            </Box>
                )
            }
        </div>
    )
}

export default AllCourses;