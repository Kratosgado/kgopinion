"use client"

import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { PlusCircle, Type, Image, Video, Code, List } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Mock components for demonstration
const components = {
  text: ({ content, onChange }: { content: string; onChange: (value: string) => void }) => (
    <Textarea 
      value={content} 
      onChange={(e) => onChange(e.target.value)} 
      placeholder="Enter text here"
    />
  ),
  image: () => <div className="h-40 bg-muted flex items-center justify-center">Image Placeholder</div>,
  video: () => <div className="h-40 bg-muted flex items-center justify-center">Video Placeholder</div>,
  code: ({ content, onChange }: { content: string; onChange: (value: string) => void }) => (
    <Textarea 
      value={content} 
      onChange={(e) => onChange(e.target.value)} 
      placeholder="Enter code here"
      className="font-mono"
    />
  ),
  list: ({ content, onChange }: { content: string; onChange: (value: string) => void }) => (
    <Textarea 
      value={content} 
      onChange={(e) => onChange(e.target.value)} 
      placeholder="Enter list items, one per line"
    />
  ),
}

const widgetIcons = {
  text: Type,
  image: Image,
  video: Video,
  code: Code,
  list: List,
}

interface ContentItem {
  id: string;
  type: keyof typeof components;
  content: string;
}

export function AppAdminCreatePostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState<ContentItem[]>([])

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    if (result.source.droppableId === "sidebar" && result.destination.droppableId === "content") {
      const newItem: ContentItem = {
        id: `${result.draggableId}-${Date.now()}`,
        type: result.draggableId as keyof typeof components,
        content: "",
      }
      setContent([...content, newItem])
    } else if (result.source.droppableId === "content" && result.destination.droppableId === "content") {
      const items = Array.from(content)
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem)
      setContent(items)
    }
  }

  const updateComponentContent = (index: number, newContent: string) => {
    const updatedContent = [...content]
    updatedContent[index].content = newContent
    setContent(updatedContent)
  }

  return (
    <div className="flex h-screen bg-background">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Sidebar */}
        <div className="w-64 bg-muted p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Components</h2>
          <Droppable droppableId="sidebar" isDropDisabled={true}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {Object.keys(components).map((type, index) => (
                  <Draggable key={type} draggableId={type} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-background mb-2 p-2 rounded flex items-center"
                      >
                        {widgetIcons[type as keyof typeof widgetIcons] && React.createElement(widgetIcons[type as keyof typeof widgetIcons], { className: "mr-2 h-4 w-4" })}
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Input
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold mb-4"
          />
          <Droppable droppableId="content">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {content.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-muted p-4 rounded"
                      >
                        {React.createElement(components[item.type], {
                          content: item.content,
                          onChange: (newContent: string) => updateComponentContent(index, newContent),
                        })}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      {/* Publish button */}
      <div className="fixed bottom-4 right-4">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Publish Post
        </Button>
      </div>
    </div>
  )
}