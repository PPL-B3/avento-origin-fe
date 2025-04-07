import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useState } from 'react';

export function TransferRequestModule() {
  // const { qr_code } = useParams<{
  //   qr_code: string;
  // }>();

  // const router = useRouter();
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dummy data sementara
  const DOCUMENT_OWNER = 'j****lia@gmail.com';
  const DOCUMENT_NAME = 'Akte Kelahiran';

  const handleSubmit = async () => {
    // TODO: implement API call to verify OTP
    setIsSubmitting(true);
  };

  return (
    <section
      data-testid="transfer-request-module"
      className="pb-20 max-md:px-5 min-h-screen w-full flex items-center justify-center flex-col bg-primary-1 md:pt-28 md:px-20 pt-28"
    >
      <div className="bg-white p-16 rounded-xl w-full max-w-md text-center space-y-4">
        <p className="text-2xl font-extrabold text-primary-1">
          Transfer Request
        </p>
        <p className="text-sm">A transfer request has been sent to you</p>

        <div>
          <p className="text-xs">
            From: <span className="font-semibold">{DOCUMENT_OWNER}</span>
          </p>
          <p className="text-xs">
            Document Name:{' '}
            <span className="font-semibold">{DOCUMENT_NAME}</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 w-full ">
          <p className="text-primary-1 font-bold">Enter OTP:</p>
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
              <InputOTPGroup className="gap-2">
                {Array.from({ length: 6 }, (_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="h-14 w-12 text-2xl bg-secondary-1 rounded-md"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            type="submit"
            variant="default"
            className="w-full"
            onClick={handleSubmit}
            disabled={otp.length !== 6 || isSubmitting}
          >
            {isSubmitting ? 'Verifying...' : 'Verify'}
          </Button>
        </div>
      </div>
    </section>
  );
}
