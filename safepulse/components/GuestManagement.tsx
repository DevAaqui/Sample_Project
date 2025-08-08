'use client';

import { UserIcon, HeartIcon, MapPinIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface Guest {
    id: string;
    name: string;
    age: number;
    heartRate: number;
    location: string;
    lastActivity: string;
    status: 'safe' | 'caution' | 'restricted';
    ridesCompleted: number;
    caloriesBurned: number;
    hydrationLevel: number;
}

const sampleGuests: Guest[] = [
    {
        id: '2345',
        name: 'Sarah Johnson',
        age: 28,
        heartRate: 155,
        location: 'Thunder Mountain',
        lastActivity: '2 min ago',
        status: 'restricted',
        ridesCompleted: 8,
        caloriesBurned: 1250,
        hydrationLevel: 65
    },
    {
        id: '1892',
        name: 'Mike Chen',
        age: 35,
        heartRate: 92,
        location: 'Food Court',
        lastActivity: '5 min ago',
        status: 'safe',
        ridesCompleted: 12,
        caloriesBurned: 890,
        hydrationLevel: 45
    },
    {
        id: '3456',
        name: 'Emma Davis',
        age: 22,
        heartRate: 118,
        location: 'Space Coaster',
        lastActivity: '1 min ago',
        status: 'caution',
        ridesCompleted: 15,
        caloriesBurned: 1680,
        hydrationLevel: 78
    },
    {
        id: '4567',
        name: 'David Wilson',
        age: 42,
        heartRate: 85,
        location: 'River Rapids',
        lastActivity: '3 min ago',
        status: 'safe',
        ridesCompleted: 6,
        caloriesBurned: 720,
        hydrationLevel: 82
    },
    {
        id: '5678',
        name: 'Lisa Rodriguez',
        age: 31,
        heartRate: 105,
        location: 'Extreme Drop',
        lastActivity: '4 min ago',
        status: 'caution',
        ridesCompleted: 10,
        caloriesBurned: 1100,
        hydrationLevel: 58
    }
];

export default function GuestManagement() {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'safe':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'caution':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'restricted':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getHeartRateColor = (hr: number) => {
        if (hr < 90) return 'text-green-600';
        if (hr < 120) return 'text-yellow-600';
        if (hr < 150) return 'text-orange-600';
        return 'text-red-600';
    };

    const getHydrationColor = (level: number) => {
        if (level >= 70) return 'text-blue-600';
        if (level >= 50) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Active Guests</h3>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">Safe: 2</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">Caution: 2</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">Restricted: 1</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Guest
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Health Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Activity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ride Access
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sampleGuests.map((guest) => (
                            <tr key={guest.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                            <UserIcon className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                                            <div className="text-sm text-gray-500">ID: {guest.id} • Age: {guest.age}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <HeartIcon className="w-4 h-4 text-red-500" />
                                            <span className={`text-sm font-medium ${getHeartRateColor(guest.heartRate)}`}>
                                                {guest.heartRate} BPM
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span className={`text-sm ${getHydrationColor(guest.hydrationLevel)}`}>
                                                {guest.hydrationLevel}% Hydrated
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <MapPinIcon className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-900">{guest.location}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <ClockIcon className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-900">{guest.lastActivity}</span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {guest.ridesCompleted} rides • {guest.caloriesBurned} cal
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(guest.status)}`}>
                                            {guest.status === 'safe' && <CheckCircleIcon className="w-3 h-3 mr-1" />}
                                            {guest.status === 'restricted' && <XCircleIcon className="w-3 h-3 mr-1" />}
                                            {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Showing {sampleGuests.length} of {sampleGuests.length} active guests
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                            Previous
                        </button>
                        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                            1
                        </button>
                        <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 