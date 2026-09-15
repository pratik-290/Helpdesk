import { Menu } from "lucide-react";

function MobileMenuButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
    >
      <Menu size={22} />
    </button>
  );
}

export default MobileMenuButton;