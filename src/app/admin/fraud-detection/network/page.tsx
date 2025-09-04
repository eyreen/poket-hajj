import { Metadata } from 'next';
import NetworkMonitoring from '@/components/admin/network-monitoring';

export const metadata: Metadata = {
  title: 'Network Analysis | Smart Hajj Admin Portal',
  description: 'Real-time transaction network analysis and coordinated fraud detection',
};

export default function NetworkAnalysisPage() {
  return (
    <div className="p-6 space-y-6">
      <NetworkMonitoring />
    </div>
  );
}
