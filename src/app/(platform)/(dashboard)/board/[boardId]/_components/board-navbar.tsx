import { Board } from '@prisma/client'
import React from 'react'
import BoardTitleForm from './board-title-form'
import BoardOptions from './board-options'
import BackButton from '@/components/back-button'

interface BoardNavbarProps {
  data: Board
}

const BoardNavbar = ({ data }: BoardNavbarProps) => {
  return (
    <div className='w-full h-14 z-50 sticky top-16 bg-black/50 backdrop-blur-sm flex items-center justify-between px-4 gap-x-4'>
      <BackButton />
      <BoardTitleForm data={data} />
      <BoardOptions id={data.id} />
    </div>
  )
}

export default BoardNavbar
