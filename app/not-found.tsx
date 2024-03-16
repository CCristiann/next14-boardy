import { Lamp } from '@/components/lamp-effect/lamp'
import React from 'react'

const NotFoundPage = () => {
  return (
    <section className='w-screen h-screen fixed top-0'>
      <Lamp title="404 :/" description="Page not found"/>
    </section>
  )
}

export default NotFoundPage