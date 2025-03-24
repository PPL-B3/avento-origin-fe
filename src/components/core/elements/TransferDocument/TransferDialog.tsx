import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface TransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
  onSubmit: () => void;
}

export function TransferDialog({
  open,
  onOpenChange,
  email,
  setEmail,
  onSubmit,
}: Readonly<TransferDialogProps>) {
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#001D3D] text-white px-12 w-[90%] sm:w-[80%] md:w-[60%] max-w-md">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-white text-center">
            Transfer Form
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Please enter the email address to transfer this document
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 font-medium text-xs">
          <label>
            Email
            <Input
              type="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background text-black rounded-lg"
            />
          </label>
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="default"
            onClick={() => {
              if (isValidEmail(email)) {
                onSubmit();
              }
            }}
            disabled={!isValidEmail(email)}
            className="w-3/5 text-md font-semibold rounded-lg"
          >
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
