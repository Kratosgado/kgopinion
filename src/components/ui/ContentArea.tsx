import { useState } from "react";
import { useDrop } from "react-dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface ComponentProps {
  content: string;
  onChange: (newContent: string) => void;
}

const ComponentTypes: Record<string, React.FC<ComponentProps>> = {
  "Heading 1": ({ content, onChange }) => (
    <Input
      type="text"
      placeholder="Heading 1"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      className="text-2xl font-bold mb-4"
    />
  ),
  "Heading 2": ({ content, onChange }) => (
    <Input
      type="text"
      placeholder="Heading 2"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      className="text-xl font-semibold mb-3"
    />
  ),
  Paragraph: ({ content, onChange }) => (
    <Textarea
      placeholder="Enter your paragraph text"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      className="mb-4"
    />
  ),
  Image: ({ content, onChange }) => (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Enter image URL"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="mb-2"
      />
      {content && (
        <Image src={content} alt="Preview" className="max-w-full h-auto" />
      )}
    </div>
  ),
  List: ({ content, onChange }) => (
    <Textarea
      placeholder="Enter list items, one per line"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      className="mb-4"
    />
  ),
  Quote: ({ content, onChange }) => (
    <Textarea
      placeholder="Enter quote text"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      className="mb-4 italic border-l-4 border-slate-500 pl-4"
    />
  ),
};

interface ContentAreaProps {
  components: string[];
}

interface ContentItem {
  content: string;
  left?: number;
  top?: number;
}

export function ContentArea({ components }: ContentAreaProps) {
  const [content, setContent] = useState<Record<string, ContentItem>>({});

  const [, drop] = useDrop({
    accept: "component",
    drop: (item: { id: string; left: number; top: number }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveComponent(item.id, left, top);
      }
      return undefined;
    },
  });

  const moveComponent = (id: string, left: number, top: number) => {
    setContent((prev) => ({
      ...prev,
      [id]: { ...prev[id], left, top },
    }));
  };

  const handleContentChange = (id: string, newContent: string) => {
    setContent((prev) => ({
      ...prev,
      [id]: { ...prev[id], content: newContent },
    }));
  };

  return (
    <div
      ref={drop}
      className="flex-1 p-8 overflow-y-auto bg-slate-100 text-slate-900"
    >
      <Input
        type="text"
        placeholder="Enter your blog post title"
        className="text-3xl font-bold mb-6 w-full"
      />
      {components.map((component, index) => {
        const Component = ComponentTypes[component];
        const id = `${component}-${index}`;
        const componentContent = content[id] || {};
        return (
          <div
            key={id}
            style={{
              position: "relative",
              left: componentContent.left,
              top: componentContent.top,
            }}
          >
            <Component
              content={componentContent.content || ""}
              onChange={(newContent) => handleContentChange(id, newContent)}
            />
          </div>
        );
      })}
    </div>
  );
}
