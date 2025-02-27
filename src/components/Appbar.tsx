import { ThemeSwitcher } from './ThemeSwitcher';

export function Appbar() {
  return (
    <div className="fixed p-2 right-4 top-4 left-4 flex items-center justify-between">
      <img
        src="CA.svg"
        alt="Icon"
        className="h-16 "
      />
      <div>
      <ThemeSwitcher />
      </div>
      
    </div>
  );
}
