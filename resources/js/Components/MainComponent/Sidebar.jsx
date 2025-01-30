import React from 'react'
import { Link, usePage } from '@inertiajs/react';
import Icon from '@/Components/MiniComponent/Icon';
import Image from '@/Components/MiniComponent/Image';
import Can from '@/Components/MiniComponent/Can';

export default function Sidebar() {
  return (
    <div>
        <div className="sidebar-wrapper" data-simplebar="true">
                <div className="sidebar-header">
                    <div>
                        <Image src="/assets/images/logo-icon.png" imageClass="logo-icon" alt="logo icon" />
                    </div>
                    <div>
                        <h4 className="logo-text">Xocial Hub</h4>
                    </div>
                    <div className="toggle-icon ms-auto">
                        <Icon iconClass="bx bx-arrow-to-left" />
                    </div>
                </div>
                <ul className="metismenu" id="menu">
                    <li>
                        <Link href={route('dashboard')}>
                            <div className="parent-icon">
                                <Icon iconClass="bx bx-home-alt" iconStyle={{ fontSize: '25px' }} />
                            </div>
                            <div className="menu-title">Dashboard</div>
                        </Link>
                    </li>

                    <Can permission={'list-user'}>
                        <li>
                            <Link href={ route('users.index') }>
                                <div className="parent-icon">
                                    <Icon iconClass="lni lni-users" iconStyle={{ fontSize: '25px' }} />
                                </div>
                                <div className="menu-title">Users</div>
                            </Link>
                        </li>
                    </Can>

                    <Can permission={'list-account-type'}>
                        <li>
                            <Link href={ route('account-types.index') }>
                                <div className="parent-icon">
                                    <Icon iconClass="bx bx-lock" iconStyle={{ fontSize: '25px' }} />
                                </div>
                                <div className="menu-title">Apps Credentials</div>
                            </Link>
                        </li>
                    </Can>

                    <Can permission={'list-role'}>
                        <li>
                            <Link href={ route('role-permissions.index') }>
                                <div className="parent-icon">
                                    <Icon iconClass="bx bx-block" iconStyle={{ fontSize: '25px' }} />
                                </div>
                                <div className="menu-title">Role & Permissions</div>
                            </Link>
                        </li>
                    </Can>
{/* 
                    <li>
                        <Link href={route('article.create')}>
                            <div className="parent-icon"><i className="lni lni-write"></i>
                            </div>
                            <div className="menu-title">Artical Publish</div>
                        </Link>
                    </li>

                    <li>
                        <Link href={route('social.accounts.sync')}>
                            <div className="parent-icon"><i className="bx bx-sync"></i>
                            </div>
                            <div className="menu-title">Sync Accounts</div>
                        </Link>
                    </li>

                    <li>
                        <a href="#">
                            <div className="parent-icon"><i className="lni lni-users"></i>
                            </div>
                            <div className="menu-title">Users</div>
                        </a>
                    </li>

                    <li>
                    <Link href={route('credentials.list')}>
                            <div className="parent-icon"><i className="bx bx-lock"></i>
                            </div>
                            <div className="menu-title">Credentials</div>
                        </Link>
                    </li> */}
                </ul>
            </div>
    </div>
  )
}
