import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import Icon from '@/Components/MiniComponent/Icon';
import ToastNotifier from '@/Components/Alerts/ToastNotifier';
import { toast } from 'react-toastify';
import Breadcrumb from '@/Components/MiniComponent/Breadcrumb';
import DeleteAlert from '@/Components/Alerts/DeleteAlert';
import Can from '@/Components/MiniComponent/Can';

export default function Index() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const fetchData = async (currentPage, perPage) => {
        setLoading(true);
        try {
            const response = await axios.get('/role-permissions/list', {
                params: { page: currentPage, per_page: perPage },
            });            
            const { data, total } = response.data;
            setData(data);
            setTotalRecords(total);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch account types!');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
    };

    useEffect(() => {
        fetchData(currentPage, perPage);
    }, [currentPage, perPage]);
    
    const columns = [
            {
                name: 'Name',
                selector: (row) => row.name,
                sortable: true,
                width: '10%',
            },
            {
                name: 'Permissions',
                selector: (row) => row.permissions.map((p) => p.name).join(' , '),
                sortable: false,
                wrap: true,
            },
            {
                name: 'Action',
                width: '10%',
                cell: (row) => (
                  <>
                    <Can permission="edit-role">
                        <Link
                        href={`/role-permissions/${row.uuid}/edit`}
                        className="btn btn-warning btn-sm me-2">
                        <Icon iconClass="bx bx-edit" />
                        </Link>
                    </Can>
                    <Can permission={'delete-role'}>
                        <DeleteAlert
                        url="/role-permissions"
                        id={row.uuid}
                        onDelete={() => fetchData(currentPage, perPage)}
                        />
                    </Can>
                  </>
                ),
            },
        ]
    return (
        <AuthenticatedLayout>
            <div className="page-wrapper">
                <div className="page-content">
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center justify-content-between mb-2">
                        <Breadcrumb breadcrumbFirst='User Roles' />
                        <Can permission="create-role">
                            <Link href={route('role-permissions.create')} className="btn btn-primary btn-sm">
                                <Icon iconClass="lni lni-circle-plus" />
                            </Link>
                        </Can>
                    </div>
                    <ToastNotifier />
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    pagination
                                    progressPending={loading}
                                    paginationServer
                                    paginationTotalRows={totalRecords}
                                    paginationPerPage={perPage}
                                    onChangePage={handlePageChange}
                                    onChangeRowsPerPage={handleRowsPerPageChange}
                                    highlightOnHover
                                    responsive
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
