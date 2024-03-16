import { Hint } from "@/components/hint"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
    src?: string
    name?: string
    fallback?: string
    borderColor?: string
}

export const UserAvatar = ({
    src,
    name,
    fallback,
    borderColor
} : UserAvatarProps) => {
    return (
        <Hint label={name || "Anonymus"}>
            <Avatar 
            className="size-8 border-2"
            style={{ borderColor }}
            >
                <AvatarFallback className="text-xs font-semibold">
                    {fallback}
                </AvatarFallback>
                <AvatarImage src={src} />
            </Avatar>
        </Hint>
    )
}