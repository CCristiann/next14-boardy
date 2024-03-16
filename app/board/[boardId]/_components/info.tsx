"use client"

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useQuery } from 'convex/react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Hint } from '@/components/hint'
import { useRenameModal } from '@/store/use-rename-modal'
import { Actions } from '@/components/actions'
import { Menu } from 'lucide-react'

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

interface InfoProps {
  boardId: string
}

export const Info = ({
  boardId
}: InfoProps) => {
  const { isOpen, onClose, onOpen } = useRenameModal()

  const boardData = useQuery(api.board.get, {
    id: boardId as Id<"boards">
  })
  if (!boardData) return <InfoSkeleton />

  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      <Hint
        label='Go to boards'
        side='bottom'
        sideOffset={10}
      >
        <Button
          asChild
          variant={"board"}
          className='px-2'
        >
          <Link href="/">
            <Image
              alt='Boardy logo'
              src="/assets/logo.svg"
              height={40}
              width={40}
            />
            <span className={cn(
              "font-semibold text-xl ml-2 text-black",
              font.className
            )}>
              Boardy
            </span>
          </Link>
        </Button>
      </Hint>

      <Separator />

      <Hint
        label='Edit title'
        side='bottom'
        sideOffset={10}
      >
        <Button
          variant={"board"}
          className='text-base font-normal px-2'
          onClick={() => onOpen(boardData._id, boardData.title)}
        >
          {boardData.title}
        </Button>
      </Hint>

      <Separator />

      <Actions
      id={boardData._id}
      title={boardData.title}
      side='bottom'
      sideOffset={10}
      redirectToHomeOnDelete
      >
        <div>
          <Hint
          label='Main menu'
          side='bottom'
          sideOffset={10}
          >
            <Button 
            size={"icon"} 
            variant={"board"}
            >
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>

    </div>
  )
}

const Separator = () => (
  <div className='px-2 text-neutral-300'>
    |
  </div>
)

export const InfoSkeleton = () => {
  return (
    <div
      className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 w-[300px] flex items-center shadow-md'
    />
  )
}