import clsx from "clsx";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { FileText, MoreVertical, Trash2 } from "lucide-react";

export default function ChatItem({ conversation, active, onClick, onDelete }) {
  return (
    <div
      className={clsx(
        "group relative flex items-center rounded-lg px-3 py-2",
        active
          ? "bg-zinc-800 text-white"
          : "text-zinc-400 hover:bg-zinc-900 hover:text-white",
      )}
    >
      <button onClick={onClick} className="flex-1 text-left">
        <p className="truncate text-sm font-medium">{conversation.title}</p>
      </button>

      <Menu>
        <MenuButton
  className="
    absolute right-2 top-1/2 -translate-y-1/2
    flex h-8 w-8 items-center justify-center
    rounded-lg
    opacity-0
    transition-all duration-200
    group-hover:opacity-100
    hover:bg-zinc-700
  "
>
          <MoreVertical size={18} />
        </MenuButton>

        <MenuItems
          anchor="bottom end"
          className="mt-2 w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-lg"
        >
          <MenuItem>
            {({ active }) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  active ? "bg-red-50 text-red-600" : ""
                }`}
              >
                <Trash2 size={16} />
                Delete
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
