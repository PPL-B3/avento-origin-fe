import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface OtpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  otp: string;
  email: string;
}

export function OtpDialog({
  open,
  onOpenChange,
  otp,
  email,
}: Readonly<OtpDialogProps>) {
  if (!otp) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#001D3D] border-none text-white px-12 w-[90%] sm:w-[80%] md:w-[60%] max-w-md rounded-xl">
        <AlertDialogHeader className="gap-2">
          <AlertDialogTitle className="mt-4 text-2xl text-white text-center font-bold">
            Here is your OTP!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300 text-center md:text-xs">
            Ask <span className="font-semibold">{email}</span> to enter this
            OTP!
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div
          className="text-white text-3xl font-bold tracking-widest text-center mt-4"
          data-testid="otp-display"
        >
          {otp}
        </div>

        <div className="flex justify-center mt-4">
          <Button
            variant="default"
            onClick={() => onOpenChange(false)}
            className="w-3/5 text-md font-semibold rounded-lg"
          >
            Done
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
