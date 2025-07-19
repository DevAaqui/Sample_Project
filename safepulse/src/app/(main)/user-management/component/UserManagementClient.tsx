"use client";

import { useState } from "react";
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function UserManagementClient() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@safepulse.com",
      role: "Admin",
      department: "IT",
      status: "Active",
      lastLogin: "2024-01-15 14:30",
      permissions: ["Full Access", "User Management", "System Admin"],
      avatar: "JS",
      phone: "+1 (555) 123-4567",
      location: "New York",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@safepulse.com",
      role: "Manager",
      department: "Operations",
      status: "Active",
      lastLogin: "2024-01-15 13:45",
      permissions: ["Operations Access", "Reports", "User View"],
      avatar: "SJ",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles",
      joinDate: "2023-03-20",
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@safepulse.com",
      role: "Operator",
      department: "Safety",
      status: "Active",
      lastLogin: "2024-01-15 12:15",
      permissions: ["Safety Access", "Monitoring"],
      avatar: "MD",
      phone: "+1 (555) 345-6789",
      location: "Chicago",
      joinDate: "2023-06-10",
    },
    {
      id: 4,
      name: "Emily Wilson",
      email: "emily.wilson@safepulse.com",
      role: "Analyst",
      department: "Analytics",
      status: "Inactive",
      lastLogin: "2024-01-10 09:30",
      permissions: ["Analytics Access", "Reports"],
      avatar: "EW",
      phone: "+1 (555) 456-7890",
      location: "Boston",
      joinDate: "2023-08-15",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@safepulse.com",
      role: "Supervisor",
      department: "Operations",
      status: "Active",
      lastLogin: "2024-01-15 11:20",
      permissions: ["Operations Access", "Team Management", "Reports"],
      avatar: "DB",
      phone: "+1 (555) 567-8901",
      location: "Miami",
      joinDate: "2023-02-28",
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa.anderson@safepulse.com",
      role: "Technician",
      department: "Maintenance",
      status: "Active",
      lastLogin: "2024-01-15 10:45",
      permissions: ["Maintenance Access", "Equipment View"],
      avatar: "LA",
      phone: "+1 (555) 678-9012",
      location: "Seattle",
      joinDate: "2023-09-05",
    },
  ];

  const roles = [
    {
      id: 1,
      name: "Admin",
      description: "Full system access and user management",
      permissions: [
        "Full Access",
        "User Management",
        "System Admin",
        "Reports",
      ],
      userCount: 2,
      status: "Active",
    },
    {
      id: 2,
      name: "Manager",
      description: "Department management and reporting",
      permissions: [
        "Operations Access",
        "Reports",
        "User View",
        "Team Management",
      ],
      userCount: 3,
      status: "Active",
    },
    {
      id: 3,
      name: "Operator",
      description: "Daily operations and monitoring",
      permissions: ["Safety Access", "Monitoring", "Basic Reports"],
      userCount: 8,
      status: "Active",
    },
    {
      id: 4,
      name: "Analyst",
      description: "Data analysis and reporting",
      permissions: ["Analytics Access", "Reports", "Data Export"],
      userCount: 5,
      status: "Active",
    },
    {
      id: 5,
      name: "Technician",
      description: "Equipment maintenance and repair",
      permissions: ["Maintenance Access", "Equipment View", "Work Orders"],
      userCount: 12,
      status: "Active",
    },
  ];

  const stats = [
    {
      title: "Total Users",
      value: "156",
      change: "+8",
      changeType: "positive",
      icon: UserGroupIcon,
      color: "blue",
    },
    {
      title: "Active Users",
      value: "142",
      change: "+5",
      changeType: "positive",
      icon: CheckCircleIcon,
      color: "green",
    },
    {
      title: "New This Month",
      value: "12",
      change: "+3",
      changeType: "positive",
      icon: PlusIcon,
      color: "purple",
    },
    {
      title: "Avg Session Time",
      value: "4.2h",
      change: "+0.5h",
      changeType: "positive",
      icon: ClockIcon,
      color: "yellow",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800";
      case "Manager":
        return "bg-blue-100 text-blue-800";
      case "Supervisor":
        return "bg-purple-100 text-purple-800";
      case "Operator":
        return "bg-green-100 text-green-800";
      case "Analyst":
        return "bg-yellow-100 text-yellow-800";
      case "Technician":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return { bg: "bg-blue-100", text: "text-blue-600" };
      case "green":
        return { bg: "bg-green-100", text: "text-green-600" };
      case "yellow":
        return { bg: "bg-yellow-100", text: "text-yellow-600" };
      case "red":
        return { bg: "bg-red-100", text: "text-red-600" };
      case "purple":
        return { bg: "bg-purple-100", text: "text-purple-600" };
      case "orange":
        return { bg: "bg-orange-100", text: "text-orange-600" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-600" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">
          Manage users, roles, and access permissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const colorClasses = getColorClasses(stat.color);
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-center">
                <div className={`p-2 ${colorClasses.bg} rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${colorClasses.text}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="operator">Operator</option>
            <option value="analyst">Analyst</option>
            <option value="technician">Technician</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>

          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add User
          </button>

          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {user.avatar}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(() => {
                      const date = new Date(user.lastLogin);
                      if (isNaN(date.getTime())) return "Never";
                      const hours = date.getHours().toString().padStart(2, "0");
                      const minutes = date
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");
                      return `${hours}:${minutes}`;
                    })()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Roles Management */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Roles & Permissions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {role.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {role.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map((permission, index) => (
                        <span
                          key={index}
                          className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                        >
                          {permission}
                        </span>
                      ))}
                      {role.permissions.length > 3 && (
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          +{role.permissions.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {role.userCount} users
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        role.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {role.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Distribution by Role */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            User Distribution by Role
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Technicians</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full"
                    style={{ width: "35%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">35%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Operators</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">25%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Analysts</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: "20%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">20%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Managers</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "15%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">15%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Admins</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: "5%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Activity Trends */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            User Activity Trends (Last 7 Days)
          </h3>
          <div className="space-y-3">
            {[
              { day: "Monday", activeUsers: 142, newUsers: 3 },
              { day: "Tuesday", activeUsers: 138, newUsers: 2 },
              { day: "Wednesday", activeUsers: 145, newUsers: 4 },
              { day: "Thursday", activeUsers: 140, newUsers: 1 },
              { day: "Friday", activeUsers: 135, newUsers: 2 },
              { day: "Saturday", activeUsers: 120, newUsers: 0 },
              { day: "Sunday", activeUsers: 110, newUsers: 1 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.day}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-900">
                    {item.activeUsers} active
                  </span>
                  <span className="text-sm text-gray-500">
                    {item.newUsers} new
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
