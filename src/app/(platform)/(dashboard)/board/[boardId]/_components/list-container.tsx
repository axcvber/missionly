'use client'

import { ListWithCards } from '@/types'
import React, { useEffect, useState } from 'react'
import ListForm from './list-form'
import ListItem from './list-item'
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd'
import { useAction } from '@/hooks/use-action'
import { updateListOrder } from '@/actions/update-list-order'
import { useToast } from '@/components/ui/use-toast'
import { updateCardOrder } from '@/actions/update-card-order'

interface ListContainerProps {
  boardId: string
  data: ListWithCards[]
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data)
  const { toast } = useToast()

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      })
    },
  })

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      })
    },
  })

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result

    if (!destination) {
      return
    }

    //if dropped in th same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    //user moves a list
    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map((item, index) => ({
        ...item,
        order: index,
      }))

      setOrderedData(items)

      executeUpdateListOrder({
        boardId,
        items,
      })
    }

    //user moves a card
    if (type === 'card') {
      let newOrderedData = [...orderedData]

      const sourceList = newOrderedData.find((list) => list.id === source.droppableId)
      const destList = newOrderedData.find((list) => list.id === destination.droppableId)

      if (!sourceList || !destList) {
        return
      }

      //check if cards exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = []
      }

      //check if cards exists on the destList
      if (!destList.cards) {
        destList.cards = []
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(sourceList.cards, source.index, destination.index)

        reorderedCards.forEach((card, inx) => {
          card.order = inx
        })

        sourceList.cards = reorderedCards

        setOrderedData(newOrderedData)
        executeUpdateCardOrder({ boardId, items: reorderedCards })
      } else {
        ///remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1)

        //Assign the new listId to the moved card
        movedCard.listId = destination.droppableId

        //Add card to the destination list
        destList.cards.splice(destination.index, 0, movedCard)

        sourceList.cards.forEach((card, inx) => {
          card.order = inx
        })

        //Update the order for each card in the destination list
        destList.cards.forEach((card, inx) => {
          card.order = inx
        })

        setOrderedData(newOrderedData)
        executeUpdateCardOrder({ boardId, items: destList.cards })
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='lists' type='list' direction='horizontal'>
        {(provided) => (
          <ol {...provided.droppableProps} ref={provided.innerRef} className='flex w-full h-full'>
            {orderedData.map((list, inx) => {
              return <ListItem key={list.id} index={inx} data={list} />
            })}
            {provided.placeholder}
            <ListForm />
            <div className='flex-shrink-0 w-2' />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ListContainer
