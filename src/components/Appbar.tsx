
import { ThemeSwitcher } from './ThemeSwitcher';

export function Appbar() {
  return (
    <div className="fixed right-4 top-4 flex items-center gap-4">
      <ThemeSwitcher />
    </div>
  );
}
