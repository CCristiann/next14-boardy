"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"

interface ConfirmModalProps {
    children: React.ReactNode
    onConfirm: () => void
    disabled?: boolean
    header: string
    description?: string
}

export const ConfirmModal = ({
    children,
    onConfirm,
    description,
    disabled,
    header
}: ConfirmModalProps) => {

    const handleConfirm = () => {
        onConfirm()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="w-full">
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{header}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        disabled={disabled}
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}