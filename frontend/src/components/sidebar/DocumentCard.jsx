import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { FileText, MoreVertical, Trash2 } from "lucide-react";

export default function DocumentCard({
  title,
  chunks,
  status = "Indexed",
  onDelete,
}) {
  return (
    <div
      className="
        group relative rounded-lg border border-slate-200
        bg-white p-3
        transition-all duration-200
        hover:border-blue-300
        hover:shadow-sm
      "
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-10 w-10 items-center justify-center self-start rounded-lg bg-blue-100">
            <FileText size={20} className="text-blue-600" />
          </div>

          <div className="min-w-0 flex-1 pr-10 group-hover:pr-12 transition-all">
            <h3 className="truncate font-medium text-slate-800">{title}</h3>

            <p className="mt-1 text-xs text-slate-500">{chunks} chunks</p>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
              {status}
            </span>
          </div>
        </div>
        <Menu>
          <MenuButton
            className="
              absolute top-3 right-3
              flex h-8 w-8 items-center justify-center
              rounded-lg
              opacity-0
              transition-all duration-200
              group-hover:opacity-100
              hover:bg-slate-100
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
                  onClick={onDelete}
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
    </div>
  );
}
