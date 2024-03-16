import Image from "next/image"

export const EmptySearch = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src={"/assets/empty-search.svg"}
                alt="Empty"
                height={400}
                width={400}
            />
            <div className="-mt-10 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold mt-6">
                    No results found!
                </h2>
                <p className="text-muted-foreground text-sm mt-2">
                    Try search for something else.
                </p>
            </div>
        </div>
    )
}