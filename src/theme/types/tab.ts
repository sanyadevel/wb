export type TabColors = {
  icon: string;
  selectedIcon: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    tab: TabColors;
  }
  interface PaletteOptions {
    tab: TabColors;
  }
}
