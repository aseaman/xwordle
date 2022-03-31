import { Component } from "solid-js";
import ThemeToggleButton from "./ThemeToggleButton";

type HeaderProps = {
  handleToggleTheme: (theme: "light" | "dark") => void;
  theme: string;
};
const Header: Component<HeaderProps> = (props) => (
  <header class="flex items-center justify-between pt-10 pb-5 border-b-2 border-black dark:border-gray-700">
    <div class="flex flex-1"></div>
    <div class="flex flex-1 justify-center">
      <h1 class="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
        xwordle
      </h1>
    </div>
    <div class="flex flex-1 justify-end">
      <ThemeToggleButton
        handleToggleTheme={props.handleToggleTheme}
        theme={props.theme}
      />
    </div>
  </header>
);

export default Header;
