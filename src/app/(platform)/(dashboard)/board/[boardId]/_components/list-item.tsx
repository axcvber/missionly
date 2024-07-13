'use client'

import { Draggable, Droppable } from '@hello-pangea/dnd'
import React, { ElementRef, useRef, useState } from 'react'
import { ListWithCards } from '@/types'
import ListHeader from './list-header'
import { CardForm } from './card-form'
import CardItem from './card-item'
import { cn } from '@/lib/utils'

interface ListItemProps {
  data: ListWithCards
  index: number
}

const ListItem = ({ data, index }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const textareaRef = useRef<ElementRef<'textarea'>>(null)

  const disableEditing = () => {
    setIsEditing(false)
  }

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li {...provided.draggableProps} ref={provided.innerRef} className='shrink-0 h-full w-[272px] mr-2 select-none'>
          <div {...provided.dragHandleProps} className='w-full rounded-md bg-accent shadow-md pb-2'>
            <ListHeader onAddCard={enableEditing} data={data} />
            <Droppable droppableId={data.id} type='card'>
              {(provided) => (
                <ol ref={provided.innerRef} {...provided.droppableProps} className={cn('mx-1 px-1 flex flex-col')}>
                  {data.cards.map((card, inx) => (
                    <CardItem key={card.id} index={inx} data={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>

            <CardForm
              listId={data.id}
              ref={textareaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  )
}

export default ListItem
