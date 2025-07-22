"use client";

import { useState } from "react";
import { UserGroupIcon, MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

export default function GuestsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const guests = [
        {
            id: 1,
            name: "John Smith",
            age: 28,
            healthScore: 85,
            status: "Active",
            lastRide: "Roller Coaster A",
            timeSpent: "2h 15m",
        },
        {
            id: 2,
            name: "Sarah Johnson",
            age: 32,
            healthScore: 92,
            status: "Active",
            lastRide: "Ferris Wheel",
            timeSpent: "1h 45m",
        },
        {
            id: 3,
            name: "Mike Davis",
            age: 25,
            healthScore: 78,
            status: "Resting",
            lastRide: "Water Slide",
            timeSpent: "3h 20m",
        },
        {
            id: 4,
            name: "Emily Wilson",
            age: 19,
            healthScore: 88,
            status: "Active",
            lastRide: "Carousel",
            timeSpent: "1h 30m",
        },
        {
            id: 5,
            name: "David Brown",
            age: 35,
            healthScore: 95,
            status: "Active",
            lastRide: "Roller Coaster B",
            timeSpent: "2h 45m",
        },
    ];

    const filteredGuests = guests.filter(guest =>
        guest.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-800";
            case "Resting":
                return "bg-yellow-100 text-yellow-800";
            case "Inactive":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getHealthScoreColor = (score: number) => {
        if (score >= 90) return "text-green-600";
        if (score >= 80) return "text-yellow-600";
        return "text-red-600";
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Guest Management</h1>
                <p className="text-gray-600">Monitor and manage guest activities and health metrics</p>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search guests..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
                        Filter
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <UserGroupIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Guests</p>
                            <p className="text-2xl font-bold text-gray-900">1,247</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <UserGroupIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Active Guests</p>
                            <p className="text-2xl font-bold text-gray-900">892</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <UserGroupIcon className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Resting</p>
                            <p className="text-2xl font-bold text-gray-900">234</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <UserGroupIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Avg Health Score</p>
                            <p className="text-2xl font-bold text-gray-900">87.6</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Guests Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Guests</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Guest
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Age
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Health Score
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Last Ride
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Time Spent
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredGuests.map((guest) => (
                                <tr key={guest.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {guest.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {guest.age}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`text-sm font-medium ${getHealthScoreColor(guest.healthScore)}`}>
                                            {guest.healthScore}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(guest.status)}`}>
                                            {guest.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {guest.lastRide}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {guest.timeSpent}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
} 