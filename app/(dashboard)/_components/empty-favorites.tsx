import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CreateOrganization } from "@clerk/nextjs"
import Image from "next/image"

export const EmptyFavorites = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src={"/assets/empty-favorites.svg"}
                alt="Empty"
                height={400}
                width={400}
            />
            <div className="-mt-10 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold mt-6">
                    No favorite boards!
                </h2>
                <p className="text-muted-foreground text-sm mt-2">
                    Try favorating a board.
                </p>
            </div>
        </div>
    )
}