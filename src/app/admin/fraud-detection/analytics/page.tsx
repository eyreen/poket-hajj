import { Metadata } from 'next';
import FraudAIAnalytics from '@/components/admin/fraud-ai-analytics';

export const metadata: Metadata = {
  title: 'AI Analytics | Smart Hajj Admin Portal',
  description: 'AI model performance monitoring and fraud detection analytics',
};

export default function AIAnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <FraudAIAnalytics />
    </div>
  );
}
