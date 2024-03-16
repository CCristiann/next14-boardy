"use client"

import { useMutation as useTanstackMutation } from "@tanstack/react-query";
import { useMutation as useConvexMutation } from "convex/react";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,

} from '@/components/ui/dropdown-menu'
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";
import { useRouter } from "next/navigation";

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"]
    id: string;
    title: string;
    redirectToHomeOnDelete?: boolean
}

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title,
    redirectToHomeOnDelete
}: ActionsProps) => {
    const router = useRouter()
    const { onOpen } = useRenameModal()
    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`
        )
            .then(() => toast.success("Link copied!"))
            .catch((err) => toast.error("Failed to copy link"))
    }

    const remove = useConvexMutation(api.board.remove)
    const { mutate: onDeleteBoard, isPending } = useTanstackMutation({
        mutationKey: ["delete-board"],
        mutationFn: async () => {
            await remove({
                id: id as any
            })
        },
        onSuccess: () => {
            toast.success("Board deleted")
            if(redirectToHomeOnDelete) router.push('/')
        },
        onError: () => toast.error("Failed to delete board")
    })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side={side}
                sideOffset={sideOffset}
                className="w-60"
                onClick={(e) => e.stopPropagation()}
            >

                <DropdownMenuItem
                    onClick={onCopyLink}
                    className="p-3 cursor-pointer"
                >
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy board link
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => onOpen(id, title)}
                    className="p-3 cursor-pointer"
                >
                    <Pencil className="h-4 w-4 mr-2" />
                    Rename
                </DropdownMenuItem>

                <ConfirmModal
                    header="Delete board?"
                    description="This will delete the board and all of its contents."
                    disabled={isPending}
                    onConfirm={onDeleteBoard}>
                    <Button
                        variant={"ghost"}
                        className="p-3 cursor-pointer text-sm w-full justify-start font-normal text-red-500 hover:text-red-500"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </ConfirmModal>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}