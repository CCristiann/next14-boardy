import { cn, colorToCss } from "@/lib/utils"
import { useMutation } from "@/liveblocks.config"
import { TextLayer } from "@/types/canvas"
import { Kalam } from "next/font/google"
import React from "react"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"]
})

const calcFontSize = (width: number, height: number) => {
    const maxFontSize = 80
    const scaleFactor = 0.5
    const fontSizeBaseOnWidth = width * scaleFactor
    const fontSizeBaseOnHeight = height * scaleFactor

    return Math.min(fontSizeBaseOnHeight, fontSizeBaseOnWidth, maxFontSize)
}

interface TextProps {
    id: string,
    layer: TextLayer,
    onPointerDown: (e: React.PointerEvent, id: string) => void
    selectionColor?: string
}

export const Text = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}: TextProps) => {
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
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : "none"
            }}
        >
            <ContentEditable
                html={layer.value || "Text"}
                onChange={handleContentChange}
                className={cn(
                    "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none leading-none",
                    font.className
                )}
                style={{
                    fontSize: calcFontSize(layer.width, layer.height),
                    color: layer.fill ? colorToCss(layer.fill) : "#000"
                }}
            />
        </foreignObject>
    )
}