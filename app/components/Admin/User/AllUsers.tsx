import React, { FC, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useTheme } from 'next-themes';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import Loader from '../../Loader/Loader';
import { format } from 'timeago.js'
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdatedUserRoleMutation } from '@/redux/features/user/userApi';
import { style } from '@/app/style/style';
import { toast } from 'react-hot-toast';


type Props = {
    isTeam?: boolean;
}

const AllUsers: FC<Props> = ({ isTeam }) => {
    const { theme, setTheme } = useTheme();
    const { isLoading, data, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
    const [active, setActive] = useState(false);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('admin');
    const [users,setUsers] = useState('');
    const [userType, setUserType] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setActive(false);
    }
    const [userId, setUserId] = useState('');
    const [updatedUserRole, { error: updatedError, isSuccess }] = useUpdatedUserRoleMutation();
    const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteUserMutation({});

    const handleDeleteUser = async () => {
        const id = userId;
        await deleteUser(id);
    }

    const handleSubmit = async (e: any) => {
        const id = userId;
        e.preventDefault();
        await updatedUserRole({id,role});
        setActive(false);
    }

    const handleChange = (e: any) => {
        setUserType(e.target.value);
    }
    // const handleChangeEmail = (e: any) => {
    //     setEmail(e.target.value);
    // }

    const handleChangeRole = (e: any) => {
        setUserId(e.target.value);
    }

    useEffect(() => {
        if (updatedError) {
            if ('data' in updatedError) {
                const errMessage = updatedError as any;
                toast.error(errMessage.data.message);
            }
        }
        if (isSuccess) {
            refetch();
            toast.success("تم تحديث دور المستخدم بنجاح");
            setActive(false);
        }
        if (deleteSuccess) {
            refetch();
            toast.success("تم حذف المستخدم بنجاح");
            setOpen(false);
        }
        if (deleteError) {
            if ('data' in deleteError) {
                const errMessage = deleteError as any;
                toast.error(errMessage.data.message);
            }
        }
    }, [updatedError, isSuccess, deleteSuccess, deleteError])

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'name', headerName: 'اسم', flex: 0.5 },
        { field: 'email', headerName: 'بريد', flex: 0.5 },
        { field: 'role', headerName: 'دور', flex: 0.5 },
        { field: 'courses', headerName: 'تم شراؤها', flex: 0.5 },
        { field: 'created_at', headerName: 'انضم في', flex: 0.5 },
        {
            field: ' ',
            headerName: 'حذف',
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button onClick={() => {
                            setOpen(true);
                            setUserId(params.row.id)
                        }} >
                            <AiOutlineDelete className='dark:text-[#fff] text-[#333]' size={20} />
                        </Button>
                    </>
                )
            }
        },
        {
            field: '  ',
            headerName: 'بريد',
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <a href={`mailto:${params.row.email}`}>
                            <AiOutlineMail className='dark:text-[#fff] text-[#333]' size={20} />
                        </a>
                    </>
                )
            }
        }
    ];

    const rows: any = [];

    if (isTeam) {
        const newData = data && data.users.filter((item: any) => item.role === 'admin');

        newData && newData.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                created_at: format(item.createdAt),
            })
        })
    } else {
        data && data.users.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                created_at: format(item.createdAt),
            })
        })
    }

    return (
        <div className="mt-[120px]">
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <Box m='20px'>
                        <div className="w-full flex justify-end ">
                            <div onClick={() => setActive(true)} className={`${style.button} !h-[35px] !w-[220px]`}>
                            إضافة عضو جديد
                            </div>
                        </div>
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
                                color: '#fff !important',
                            },
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
                                    <DialogTitle>تأكيد الحذف</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                        هل أنت متأكد أنك تريد حذف هذا المستخدم؟
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleDeleteUser} color='success' variant='contained'>
                                            حذف
                                        </Button>
                                        <Button onClick={handleClose} color='error' variant='contained'>
                                            غلق
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Dialog open={active} onClose={handleClose} fullWidth maxWidth='sm'>
                                    <DialogTitle>تغيير الدور</DialogTitle>
                                    <DialogContent>
                                        <Stack spacing={2} margin={2}>
                                            <form onSubmit={handleSubmit}>
                                                <FormControl fullWidth>
                                                    <Select id='user-type' value={userType} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'User Type' }}>
                                                        <MenuItem value=''>حدد نوع المستخدم</MenuItem>
                                                        <MenuItem value='admin'>مسؤل</MenuItem>
                                                        <MenuItem value='user'>مستخدم</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                {/* <TextField fullWidth id='email' label='Email' variant='outlined' value={email} onChange={handleChangeEmail} style={{ marginTop: '20px' }} /> */}
                                                <TextField fullWidth id='id' label='text' variant='outlined' value={userId} onChange={handleChangeRole} style={{ marginTop: '20px' }} />
                                                <DialogActions style={{justifyContent: 'space-between'}}>
                                                    <Button onClick={handleSubmit} type='submit' color='success' variant='contained'>
                                                        تأكيد
                                                    </Button>
                                                    <Button type='button' onClick={handleClose} color='error' variant='contained'>
                                                        غلق
                                                    </Button>
                                                </DialogActions>
                                            </form>
                                        </Stack>
                                    </DialogContent>

                                </Dialog>
                            </div>
                            <DataGrid checkboxSelection rows={rows} columns={columns} />
                        </Box>
                    </Box>
                )
            }
        </div>
    )
}

export default AllUsers;