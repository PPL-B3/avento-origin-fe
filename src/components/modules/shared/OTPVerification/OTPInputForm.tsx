import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

interface OtpInputFormProps {
  otp: string;
  setOtp: (value: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
  onResend?: () => void;
  isResending?: boolean;
  responseMessage?: string;
}

export function OtpInputForm({
  otp,
  setOtp,
  isLoading,
  onSubmit,
  onResend,
  isResending,
  responseMessage,
}: Readonly<OtpInputFormProps>) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col items-center gap-4 w-full"
    >
      <p className="text-primary-1 font-bold">Enter OTP:</p>
      <div className="flex justify-center">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
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

      {responseMessage ? (
        <p className="text-xs text-primary-1">{responseMessage}</p>
      ) : (
        onResend && (
          <div className="flex items-center gap-1">
            <p className="text-xs text-primary-1">Didn&apos;t get the code? </p>
            <button
              type="button"
              className="text-xs text-primary-1 underline"
              onClick={onResend}
              disabled={isResending}
            >
              {isResending ? 'Resending...' : 'Resend OTP'}
            </button>
          </div>
        )
      )}

      <Button
        type="submit"
        variant="default"
        className="w-full"
        disabled={otp.length !== 6 || isLoading}
      >
        {isLoading ? 'Verifying...' : 'Verify'}
      </Button>
    </form>
  );
}
