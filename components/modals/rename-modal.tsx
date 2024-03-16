"use client"

import { useMutation as useTanstackMutation } from "@tanstack/react-query"
import { useMutation as useConvexMutation } from "convex/react"
import { FormEventHandler, useEffect, useState } from "react"
import { useRenameModal } from "@/store/use-rename-modal"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export const RenameModal = () => {
    const {
        isOpen,
        onClose,
        initialValues
    } = useRenameModal()

    const [title, setTitle] = useState(initialValues.title)

    useEffect(() => {
        setTitle(initialValues.title)
    }, [initialValues.title])


    const patch = useConvexMutation(api.board.update)
    const { mutate: onRenameBoard, isPending } = useTanstackMutation({
        mutationKey: ["rename-board"],
        mutationFn: async () => {
            await patch({
                id: initialValues.id as any,
                title
            })
        },
        onSuccess: () => {
            toast.success("Board renamed!"),
                onClose()
        },
        onError: (err) => toast.error("Failed to rename board")
    })

    const onSubmit: FormEventHandler<HTMLFormElement> = (
        e
    ) => {
        e.preventDefault()
        onRenameBoard()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger>

            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit board title</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>
                <form
                    onSubmit={onSubmit}
                    className="space-y-4"
                >
                    <Input
                        disabled={isPending}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Board title"
                    />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant={"outline"}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            Save
                            {isPending && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}