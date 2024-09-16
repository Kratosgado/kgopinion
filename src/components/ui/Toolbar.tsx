import { Copy, Redo, Undo, Delete, Save, View, Send, Plus } from "lucide-react";
import { Button } from "./button";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Sidebar } from "./Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export const Toolbar = ({
  onAddComponent,
}: {
  onAddComponent: (component: string) => void;
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-slate-500">
      <div className="flex items-center space-x-4">
        <Button variant="secondary">
          <Undo />
        </Button>
        <Button variant="secondary">
          <Redo />
        </Button>
        <Button variant="secondary">
          <Copy />
        </Button>
        <Button variant="secondary">
          <Delete />
        </Button>
        <Sheet key={"left"}>
          <SheetTrigger>
            <Button variant="secondary">
              <Plus /> Add Component
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <Sidebar onAddComponent={onAddComponent} />
          </SheetContent>
        </Sheet>
      </div>
      <div className="space-x-2">
        <Button variant="secondary">
          <View /> Preview
        </Button>
        <Button variant="secondary">
          <Save /> Save
        </Button>
        <Button variant="secondary">
          <Send /> Publish
        </Button>
        {/* <Avatar>
          <AvatarImage src="https://avatars.dicebear.com/api/avataaars/john-doe.svg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar> */}
      </div>
    </div>
  );
};
