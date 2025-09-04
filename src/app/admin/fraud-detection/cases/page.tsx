import { Metadata } from 'next';
import CaseManagement from '@/components/admin/case-management';

export const metadata: Metadata = {
  title: 'Fraud Cases | Smart Hajj Admin Portal',
  description: 'Comprehensive fraud case management and investigation tracking',
};

export default function FraudCasesPage() {
  return (
    <div className="p-6 space-y-6">
      <CaseManagement />
    </div>
  );
}
