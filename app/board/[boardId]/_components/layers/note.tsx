import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils"
import { useMutation } from "@/liveblocks.config"
import { NoteLayer } from "@/types/canvas"
import { Kalam } from "next/font/google"
import React from "react"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"]
})

const calcFontSize = (width: number, height: number) => {
    const maxFontSize = 80
    const scaleFactor = 0.15
    const fontSizeBaseOnWidth = width * scaleFactor
    const fontSizeBaseOnHeight = height * scaleFactor

    return Math.min(fontSizeBaseOnHeight, fontSizeBaseOnWidth, maxFontSize)
}

interface NoteProps {
    id: string,
    layer: NoteLayer,
    onPointerDown: (e: React.PointerEvent, id: string) => void
    selectionColor?: string
}

export const Note = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}: NoteProps) => {
    const updateValue = useMutation((
        { storage },
        newValue: string
    ) => {
        const liveLayers = storage.get("layers")

        liveLayers.get(id)?.set("value", newValue)
    }, [])

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value)
    }

    return (
        <foreignObject
            x={layer.x}
            y={layer.y}
            width={layer.width}
            height={layer.height}
            onPointerDown={(e) => onPointerDown(e, id)}
            className="shadow-md drop-shadow-xl"
            style={{
                backgroundColor: layer.fill ? colorToCss(layer.fill) : "#000",
                outline: selectionColor ? `1px solid ${selectionColor}` : "none"
            }}
        >
            <ContentEditable
                html={layer.value || "Text"}
                onChange={handleContentChange}
                className={cn(
                    "h-full w-full flex items-center justify-center text-center outline-none leading-none",
                    font.className
                )}
                style={{
                    fontSize: calcFontSize(layer.width, layer.height),
                    color: layer.fill ? getContrastingTextColor(layer.fill) : "#000"
                }}
            />
        </foreignObject>
    )
}