"use client"

import Image from "next/image"
import Link from "next/link"
import { Overlay } from "./overlay"
import { useAuth } from "@clerk/nextjs"
import { formatDistanceToNow } from 'date-fns'
import { Footer } from "./footer"
import { Skeleton } from "@/components/ui/skeleton"
import { Actions } from "@/components/actions"
import { MoreHorizontal } from "lucide-react"

import { useMutation as useConvexMutation } from "convex/react"
import { useMutation as useTanstackMutation } from "@tanstack/react-query"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { Id } from "@/convex/_generated/dataModel"

interface BoardCardProps {
    id: string,
    title: string,
    authorId: string,
    authorName: string,
    createdAt: number,
    imageUrl: string
    orgId: string
    isFavorite: boolean
}
export const BoardCard = ({
    id,
    title,
    authorId,
    authorName,
    createdAt,
    imageUrl,
    orgId,
    isFavorite
}: BoardCardProps) => {
    const { userId } = useAuth()
    const authorLabel = userId === authorId ? "You" : authorName
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true
    })

    const favorite = useConvexMutation(api.board.favorite)
    const unfavorite = useConvexMutation(api.board.unfavorite)

    const { mutate: onFavorite, isPending: onFavoritePending } = useTanstackMutation({
        mutationKey: ["favorite-board"],
        mutationFn: async () => {
            await favorite({
                id: id as Id<"boards">,
                orgId
            })
        },
        onError: () => toast.error("Failed to favorite")
    })


    const { mutate: onUnfavorite, isPending: onUnfavoritePending } = useTanstackMutation({
        mutationKey: ["unfavorite-board"],
        mutationFn: async () => {
            await unfavorite({
                id: id as Id<"boards">,
            })
        },
        onError: () => toast.error("Failed to unfavorite")
    })

    const toggleFavorite = async () =>
        isFavorite ? onUnfavorite() : onFavorite()

    return (
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-50">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-fit"
                    />
                    <Overlay />
                    <Actions
                        id={id}
                        title={title}
                        side="right"
                    >
                        <button
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
                        >
                            <MoreHorizontal
                                className="text-white opacity-75 hover:opacity-100 transition-opacity"
                            />
                        </button>
                    </Actions>
                </div>
                <Footer
                    isFavorite={isFavorite}
                    title={title}
                    authorLabel={authorLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={toggleFavorite}
                    disabled={onFavoritePending || onUnfavoritePending}
                />
            </div>
        </Link>
    )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="aspect-[100/127] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full" />
        </div>
    )
}