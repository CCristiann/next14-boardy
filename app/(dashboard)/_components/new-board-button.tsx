"use client"

import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { useMutation as useTanstackMutation } from "@tanstack/react-query"
import { useMutation as useConvexMutation } from "convex/react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useOrganization } from "@clerk/nextjs"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"

interface NewBoardButtonProps {
    orgId: string
    disabled?: boolean
}

export const NewBoardButton = ({
    orgId,
    disabled
}: NewBoardButtonProps) => {
    const router = useRouter()
    const create = useConvexMutation(api.board.create)

    const { mutate: createBoard, isPending } = useTanstackMutation({
        mutationFn: async () => {
            if (!orgId) return

            return await create({
                title: "Untitled",
                orgId
            })
        },
        onSuccess: ((boardId) => {
            toast.success("Board created!")
            router.push(`/board/${boardId}`)
        }),
        onError: () => toast.error("Failed to create board.")
    })
    return (
        <button
            disabled={disabled || isPending}
            onClick={() => {
                createBoard()
            }}
            className={cn(
                "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
                disabled && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
            )}
        >
            {isPending ? (
                <Loader2 className="w-12 h-12 animate-spin text-white" />
            ) : (
                <>
                    <div />
                    <Plus className="h-12 w-12 text-white stroke-1" />
                    <p className="text-white text-xs font-light">
                        New board
                    </p>
                </>
            )}
        </button>
    )
}