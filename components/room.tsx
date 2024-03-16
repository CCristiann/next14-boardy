"use client"

import React from 'react'
import { ClientSideSuspense } from '@liveblocks/react'

import { RoomProvider } from '@/liveblocks.config'
import { LiveList, LiveMap, LiveObject } from '@liveblocks/client'

import { Layer } from '@/types/canvas'

export const Room = ({
    roomId,
    children,
    fallback
}: {
    roomId: string
    children: React.ReactNode
    fallback: NonNullable<React.ReactNode> | null
}) => {
    return (
        <RoomProvider
            id={roomId}
            initialPresence={{
                cursor: null,
                selection: [],
                pencilDraft: null,
                penColor: null
            }}
            initialStorage={{
                layers: new LiveMap<string, LiveObject<Layer>>(),
                layerIds: new LiveList()
            }}
        >
            <ClientSideSuspense fallback={fallback}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    )
}
