import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { useOrganization } from "@clerk/nextjs"
import Image from "next/image"
import { useMutation as useTanstackMutation } from "@tanstack/react-query"
import { useMutation as useConvexMutation } from "convex/react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export const EmptyBoards = () => {
    const router = useRouter()
    const { organization } = useOrganization()
    const create = useConvexMutation(api.board.create)

    const { mutate: createBoard, isPending } = useTanstackMutation({
        mutationFn: async () => {
            if (!organization) return

            return await create({
                title: "Untitled",
                orgId: organization.id
            })
            
        },
        onSuccess: ((boardId) => {
            toast.success("Board created!")
            router.push(`/board/${boardId}`)
        }),
        onError: () => toast.error("Failed to create board.")
    })

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src={"/assets/empty-boards.svg"}
                alt="Empty"
                height={400}
                width={400}
            />
            <div className="-mt-10 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold mt-6">
                    Create your first board!
                </h2>
                <p className="text-muted-foreground text-sm mt-2">
                    Start by creating a board for your organization.
                </p>
                <div className="mt-6">
                    <Button
                        size={"lg"}
                        disabled={isPending}
                        onClick={() => {
                            createBoard()
                        }}
                    >
                        Create board
                        {isPending && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}