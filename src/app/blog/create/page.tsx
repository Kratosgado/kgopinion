"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Sidebar } from "@/components/ui/Sidebar";
import { ContentArea } from "@/components/ui/ContentArea";

export default function BlogPostCreator() {
  const [components, setComponents] = useState<string[]>([]);

  const addComponent = (component: string) => {
    setComponents([...components, component]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar onAddComponent={addComponent} />
        <ContentArea components={components} />
      </div>
    </DndProvider>
  );
}
