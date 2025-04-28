import { DocumentInfo } from './DocumentInfo';
import { OtpInputForm } from './OTPInputForm';

interface OtpVerificationCardProps {
  title: string;
  description: string;
  currentOwnerEmail?: string;
  documentName?: string;
  otp: string;
  setOtp: (val: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
  onResend?: () => void;
  isResending?: boolean;
}

export function OTPVerificationCard({
  title,
  description,
  currentOwnerEmail,
  documentName,
  otp,
  setOtp,
  isLoading,
  onSubmit,
  onResend,
  isResending,
}: Readonly<OtpVerificationCardProps>) {
  return (
    <div className="bg-white p-16 rounded-xl w-full max-w-md text-center space-y-4">
      <p className="text-2xl font-extrabold text-primary-1">{title}</p>
      <p className="text-sm">{description}</p>

      <DocumentInfo
        currentOwnerEmail={currentOwnerEmail}
        documentName={documentName}
      />

      <OtpInputForm
        otp={otp}
        setOtp={setOtp}
        isLoading={isLoading}
        onSubmit={onSubmit}
        onResend={onResend}
        isResending={isResending}
      />
    </div>
  );
}
