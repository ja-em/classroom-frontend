import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogWrapper({
  onOpenChange,
  open,
  disabled,
  dialogTitle,
  children,
  className,
  triggerChildren,
}: {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  disabled?: boolean;
  dialogTitle?: string;
  children?: React.ReactNode;
  className?: string;
  triggerChildren?: React.ReactNode;
}) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger asChild disabled={disabled}>
        {triggerChildren}
      </DialogTrigger>
      <DialogContent
        className={className}
        onInteractOutside={(event: Event) => {
          if (disabled) {
            event.preventDefault();
          }
        }}
        disabled={disabled}
        aria-describedby={dialogTitle ?? "dialog"}
      >
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        {children}
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant={"secondary"}
            disabled={disabled}
            onClick={() => onOpenChange(false)}
          >
            cancel
          </Button>
          <Button type="submit" disabled={disabled}>
            confirm
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

DialogWrapper.Footer = function Footer({
  onOpenChange,
  disabled,
  onConfirm,
}: {
  onOpenChange: (open: boolean) => void;
  disabled?: boolean;
  onConfirm?: () => void;
}) {
  return (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      <Button
        type="button"
        variant={"secondary"}
        disabled={disabled}
        onClick={() => onOpenChange(false)}
      >
        cancel
      </Button>
      <Button
        type="submit"
        disabled={disabled}
        {...(onConfirm && { onClick: onConfirm })}
      >
        confirm
      </Button>
    </div>
  );
};
