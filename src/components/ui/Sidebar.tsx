import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heading1, Heading2, Image, List, Quote, TextIcon } from 'lucide-react'

const widgets = [
  { name: 'Heading 1', icon: Heading1 },
  { name: 'Heading 2', icon: Heading2 },
  { name: 'Paragraph', icon: TextIcon },
  { name: 'Image', icon: Image },
  { name: 'List', icon: List },
  { name: 'Quote', icon: Quote },
]

export function Sidebar({ onAddComponent }: { onAddComponent: (componentName: string) => void }) {
  return (
    <div className="w-64 bg-slate-800 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Components</h2>
      <div className="grid grid-cols-2 gap-2">
        {widgets.map((widget) => (
          <Card key={widget.name} className="bg-slate-700">
            <CardContent className="p-2">
              <Button
                variant="ghost"
                className="w-full h-full flex flex-col items-center justify-center"
                onClick={() => onAddComponent(widget.name)}
              >
                <widget.icon className="h-6 w-6 mb-1" />
                <span className="text-xs">{widget.name}</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}