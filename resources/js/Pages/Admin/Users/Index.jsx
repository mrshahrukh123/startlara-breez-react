import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import Icon from '@/Components/MiniComponent/Icon';
import ToastNotifier from '@/Components/Alerts/ToastNotifier';
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
            const response = await axios.get('/users/list', {
                params: { page: currentPage, per_page: perPage },
            });
            console.log(response.data);
            
            const { data, total } = response.data;
            setData(data);
            setTotalRecords(total);
        } catch (error) {
            console.error('Error fetching data:', error);
            // toast.error('Failed to fetch account types!');
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
                maxwidth: '15%',
            },
            {
                name: 'Email',
                selector: (row) => row.email,
            },
            {
                name: 'Role',
                selector: (row) => row.roles.map((role) => role.name),
            },
            // {
            //     name: 'Redirect URI',
            //     selector: (row) => row.redirect_uri,
            // },
            // {
            //     name: 'Status',
            //     width: '10%',
            //     cell: (row) => (
            //         row.status === 1 
            //         ? <span className="text-success">Active</span> 
            //         : <span className="text-danger">Inactive</span>
            //     ),
            // },
            {
                name: 'Action',
                maxwidth: '15%',
                cell: (row) => (
                  <>
                  {/* <Can permission="view-user">
                        <Link
                        href={`/account-types/${row.id}/edit`}
                        className="btn btn-info btn-sm me-2">
                            <Icon iconClass="lni lni-eye" />
                        </Link>
                    </Can> */}

                    <Can permission="edit-user">
                        <Link
                        href={`/account-types/${row.id}/edit`}
                        className="btn btn-warning btn-sm me-2">
                            <Icon iconClass="bx bx-edit" />
                        </Link>
                    </Can>
                    
                    <Can permission={'delete-user'}>
                        <DeleteAlert
                        url="/account-types" // Pass the URL of the resource
                        id={row.id}        // Pass the ID for deletion
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
                        <Breadcrumb breadcrumbFirst='Applications Credentials' />

                        <Can permission="create-account-type">
                            <Link href={route('account-types.create')} className="btn btn-primary btn-sm">
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
