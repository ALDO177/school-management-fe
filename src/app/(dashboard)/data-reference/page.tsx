'use client'

import React, { useContext, useRef } from "react";
import Card from "@components/card";
import { DashboardContext } from "@context/dashboard.context";
import Modal, { RefModalHandle } from "@components/modal";

// Dummy data for demonstration
const rolesData = [
    { id: 1, name: "Admin", description: "Full access to all system features" },
    { id: 2, name: "Manager", description: "Access to management features" },
    { id: 3, name: "User", description: "Basic access to system features" },
];

const permissionsData = [
    { id: 1, name: "Create User", description: "Permission to create new users" },
    { id: 2, name: "Edit User", description: "Permission to edit existing users" },
    { id: 3, name: "Delete User", description: "Permission to delete users" },
];

export default function DataReferencePage() {
    const { refModal } = useContext(DashboardContext);

    // Refs for modals
    const roleModalRef = useRef<RefModalHandle>(null);
    const permissionModalRef = useRef<RefModalHandle>(null);

    // Open modal for creating a new role
    const openCreateRoleModal = () => {
        if (refModal?.current) {
            refModal.current.options({
                cardclassName: "bg-white w-[30rem]",
                title: "Create New Role",
                content: (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Role Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter role name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter role description"
                                rows={3}
                            />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                            <button
                                onClick={() => refModal.current?.close()}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => refModal.current?.close()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Create Role
                            </button>
                        </div>
                    </div>
                ),
            });
            refModal.current.open();
        }
    };

    // Open modal for creating a new permission
    const openCreatePermissionModal = () => {
        if (refModal?.current) {
            refModal.current.options({
                cardclassName: "bg-white w-[30rem]",
                title: "Create New Permission",
                content: (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Permission Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter permission name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter permission description"
                                rows={3}
                            />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                            <button
                                onClick={() => refModal.current?.close()}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => refModal.current?.close()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Create Permission
                            </button>
                        </div>
                    </div>
                ),
            });
            refModal.current.open();
        }
    };

    // Open modal for editing a role
    const openEditRoleModal = (role: any) => {
        if (refModal?.current) {
            refModal.current.options({
                cardclassName: "bg-white w-[30rem]",
                title: `Edit Role: ${role.name}`,
                content: (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Role Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter role name"
                                defaultValue={role.name}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter role description"
                                rows={3}
                                defaultValue={role.description}
                            />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                            <button
                                onClick={() => refModal.current?.close()}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => refModal.current?.close()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Update Role
                            </button>
                        </div>
                    </div>
                ),
            });
            refModal.current.open();
        }
    };

    // Open modal for editing a permission
    const openEditPermissionModal = (permission: any) => {
        if (refModal?.current) {
            refModal.current.options({
                cardclassName: "bg-white w-[30rem]",
                title: `Edit Permission: ${permission.name}`,
                content: (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Permission Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter permission name"
                                defaultValue={permission.name}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter permission description"
                                rows={3}
                                defaultValue={permission.description}
                            />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                            <button
                                onClick={() => refModal.current?.close()}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => refModal.current?.close()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Update Permission
                            </button>
                        </div>
                    </div>
                ),
            });
            refModal.current.open();
        }
    };

    return (
        <div className="space-y-6">
            {/* Roles Card */}
            <Card
                className="shadow-md bg-white"
                headerTemplate={() => (
                    <div className="flex justify-between items-center px-4 py-3">
                        <h2 className="text-lg font-semibold">Roles</h2>
                        <button
                            onClick={openCreateRoleModal}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                            Add Role
                        </button>
                    </div>
                )}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {rolesData.map((role) => (
                        <div key={role.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
                                <button
                                    onClick={() => openEditRoleModal(role)}
                                    className="text-blue-600 hover:text-blue-900 text-sm"
                                >
                                    Edit
                                </button>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">{role.description}</p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Permissions Card */}
            <Card
                className="shadow-md bg-white"
                headerTemplate={() => (
                    <div className="flex justify-between items-center px-4 py-3">
                        <h2 className="text-lg font-semibold">Permissions</h2>
                        <button
                            onClick={openCreatePermissionModal}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                            Add Permission
                        </button>
                    </div>
                )}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {permissionsData.map((permission) => (
                        <div key={permission.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-medium text-gray-900">{permission.name}</h3>
                                <button
                                    onClick={() => openEditPermissionModal(permission)}
                                    className="text-blue-600 hover:text-blue-900 text-sm"
                                >
                                    Edit
                                </button>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">{permission.description}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}