'use client';

import { useEffect, useRef } from 'react';
import { HeartIcon, FireIcon, ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/outline';
import * as echarts from 'echarts';

interface HealthMetricsProps {
    className?: string;
}

const heartRateData = [
    { time: '09:00', hr: 72, status: 'normal' },
    { time: '10:00', hr: 85, status: 'normal' },
    { time: '11:00', hr: 95, status: 'elevated' },
    { time: '12:00', hr: 110, status: 'elevated' },
    { time: '13:00', hr: 125, status: 'high' },
    { time: '14:00', hr: 140, status: 'high' },
    { time: '15:00', hr: 155, status: 'critical' },
    { time: '16:00', hr: 135, status: 'high' },
    { time: '17:00', hr: 98, status: 'normal' },
];

const calorieData = [
    { time: '09:00', calories: 45 },
    { time: '10:00', calories: 120 },
    { time: '11:00', calories: 280 },
    { time: '12:00', calories: 450 },
    { time: '13:00', calories: 680 },
    { time: '14:00', calories: 920 },
    { time: '15:00', calories: 1150 },
    { time: '16:00', calories: 1380 },
    { time: '17:00', calories: 1520 },
];

export default function HealthMetrics({ className = '' }: HealthMetricsProps) {
    const heartRateChartRef = useRef<HTMLDivElement>(null);
    const calorieChartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (heartRateChartRef.current) {
            const chart = echarts.init(heartRateChartRef.current);

            const option = {
                grid: {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: heartRateData.map(item => item.time),
                    axisLine: { lineStyle: { color: '#E5E7EB' } },
                    axisLabel: { color: '#6B7280', fontSize: 10 }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { lineStyle: { color: '#E5E7EB' } },
                    axisLabel: { color: '#6B7280', fontSize: 10 },
                    splitLine: { lineStyle: { color: '#F3F4F6', type: 'dashed' } }
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderColor: '#E5E7EB',
                    textStyle: { color: '#374151' }
                },
                series: [{
                    data: heartRateData.map(item => item.hr),
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 6,
                    lineStyle: { color: '#EF4444', width: 3 },
                    itemStyle: { color: '#EF4444' },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(239, 68, 68, 0.2)' },
                                { offset: 1, color: 'rgba(239, 68, 68, 0.05)' }
                            ]
                        }
                    }
                }]
            };

            chart.setOption(option);

            const handleResize = () => chart.resize();
            window.addEventListener('resize', handleResize);

            return () => {
                chart.dispose();
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        if (calorieChartRef.current) {
            const chart = echarts.init(calorieChartRef.current);

            const option = {
                grid: {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: calorieData.map(item => item.time),
                    axisLine: { lineStyle: { color: '#E5E7EB' } },
                    axisLabel: { color: '#6B7280', fontSize: 10 }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { lineStyle: { color: '#E5E7EB' } },
                    axisLabel: { color: '#6B7280', fontSize: 10 },
                    splitLine: { lineStyle: { color: '#F3F4F6', type: 'dashed' } }
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderColor: '#E5E7EB',
                    textStyle: { color: '#374151' }
                },
                series: [{
                    data: calorieData.map(item => item.calories),
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 6,
                    lineStyle: { color: '#F97316', width: 3 },
                    itemStyle: { color: '#F97316' },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(249, 115, 22, 0.2)' },
                                { offset: 1, color: 'rgba(249, 115, 22, 0.05)' }
                            ]
                        }
                    }
                }]
            };

            chart.setOption(option);

            const handleResize = () => chart.resize();
            window.addEventListener('resize', handleResize);

            return () => {
                chart.dispose();
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    const getHeartRateColor = (hr: number) => {
        if (hr < 90) return '#10B981';
        if (hr < 120) return '#F59E0B';
        if (hr < 150) return '#F97316';
        return '#EF4444';
    };

    const getHeartRateStatus = (hr: number) => {
        if (hr < 90) return 'Normal';
        if (hr < 120) return 'Elevated';
        if (hr < 150) return 'High';
        return 'Critical';
    };

    const currentHR = heartRateData[heartRateData.length - 1].hr;
    const currentCalories = calorieData[calorieData.length - 1].calories;

    return (
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
            {/* Heart Rate Monitoring */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Real-time Heart Rate</h3>
                    <div className="flex items-center space-x-2">
                        <HeartIcon className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-gray-600">Live Monitoring</span>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div className="text-3xl font-bold" style={{ color: getHeartRateColor(currentHR) }}>
                            {currentHR} BPM
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                                {getHeartRateStatus(currentHR)}
                            </div>
                            <div className="text-xs text-gray-500">Current Status</div>
                        </div>
                    </div>
                </div>

                <div className="h-48" ref={heartRateChartRef}></div>

                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-sm font-medium text-gray-900">Resting</div>
                        <div className="text-xs text-gray-500">60-90 BPM</div>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">Active</div>
                        <div className="text-xs text-gray-500">90-120 BPM</div>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">High</div>
                        <div className="text-xs text-gray-500">120+ BPM</div>
                    </div>
                </div>
            </div>

            {/* Calorie Tracking */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Calorie Burn</h3>
                    <div className="flex items-center space-x-2">
                        <FireIcon className="w-5 h-5 text-orange-500" />
                        <span className="text-sm text-gray-600">Today's Activity</span>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div className="text-3xl font-bold text-orange-600">
                            {currentCalories} cal
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-medium text-green-600">+320 cal</div>
                            <div className="text-xs text-gray-500">vs yesterday</div>
                        </div>
                    </div>
                </div>

                <div className="h-48" ref={calorieChartRef}></div>

                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-sm font-medium text-gray-900">Walking</div>
                        <div className="text-xs text-gray-500">45%</div>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">Rides</div>
                        <div className="text-xs text-gray-500">35%</div>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">Other</div>
                        <div className="text-xs text-gray-500">20%</div>
                    </div>
                </div>
            </div>

            {/* Safety Alerts */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Safety Alerts</h3>
                    <div className="flex items-center space-x-2">
                        <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm text-gray-600">Active Monitoring</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        <div className="flex-1">
                            <div className="text-sm font-medium text-red-900">High Heart Rate Alert</div>
                            <div className="text-xs text-red-700">Guest ID: 2345 - HR: 155 BPM</div>
                        </div>
                        <ClockIcon className="w-4 h-4 text-red-500" />
                    </div>

                    <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                        <div className="flex-1">
                            <div className="text-sm font-medium text-yellow-900">Dehydration Warning</div>
                            <div className="text-xs text-yellow-700">Guest ID: 1892 - Low hydration levels</div>
                        </div>
                        <ClockIcon className="w-4 h-4 text-yellow-500" />
                    </div>

                    <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <div className="flex-1">
                            <div className="text-sm font-medium text-blue-900">Rest Recommendation</div>
                            <div className="text-xs text-blue-700">Guest ID: 3456 - High activity for 2 hours</div>
                        </div>
                        <ClockIcon className="w-4 h-4 text-blue-500" />
                    </div>
                </div>
            </div>

            {/* Ride Safety Status */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Ride Safety Status</h3>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">All Systems Operational</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-sm font-medium text-gray-900">Thunder Mountain</span>
                        </div>
                        <span className="text-xs text-green-700 font-medium">Safe</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                            <span className="text-sm font-medium text-gray-900">Space Coaster</span>
                        </div>
                        <span className="text-xs text-yellow-700 font-medium">Caution</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-sm font-medium text-gray-900">River Rapids</span>
                        </div>
                        <span className="text-xs text-green-700 font-medium">Safe</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                            <span className="text-sm font-medium text-gray-900">Extreme Drop</span>
                        </div>
                        <span className="text-xs text-red-700 font-medium">Restricted</span>
                    </div>
                </div>
            </div>
        </div>
    );
} 