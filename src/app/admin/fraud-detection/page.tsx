import { Metadata } from 'next';
import FraudDetectionCenter from '@/components/admin/fraud-detection-center';

export const metadata: Metadata = {
  title: 'Fraud Detection & Prevention | Smart Hajj Admin Portal',
  description: 'Advanced AI-powered fraud detection and prevention system for Tabung Haji operations',
};

export default function FraudDetectionPage() {
  return (
    <div className="p-6 space-y-6">
      <FraudDetectionCenter />
    </div>
  );
}
