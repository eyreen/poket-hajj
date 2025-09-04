import { Metadata } from 'next';
import FraudAIAnalytics from '@/components/admin/fraud-ai-analytics';

export const metadata: Metadata = {
  title: 'Behavioral Analysis | Smart Hajj Admin Portal',
  description: 'Advanced behavioral pattern analysis and biometric fraud detection',
};

export default function BehavioralAnalysisPage() {
  return (
    <div className="p-6 space-y-6">
      <FraudAIAnalytics />
    </div>
  );
}
