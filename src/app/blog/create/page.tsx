"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Sidebar } from "@/components/ui/Sidebar";
import { ContentArea } from "@/components/ui/ContentArea";
import { Toolbar } from "@/components/ui/Toolbar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function BlogPostCreator() {
  const [components, setComponents] = useState<string[]>([]);

  const addComponent = (component: string) => {
    setComponents([...components, component]);
  };

  const sidebar = "left";
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen">
        <Toolbar onAddComponent={addComponent}/>
        <div className="flex h-screen overflow-hidden">
          <div className="gap-2">
            
          </div>

          <ContentArea components={components} />
        </div>
      </div>
    </DndProvider>
  );
}
