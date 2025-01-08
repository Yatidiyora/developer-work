export interface SidebarConfig {
    label: string;
    onClick?: () => void;
    children?: {
        label: string;
        path: string;
        component: () => JSX.Element;
        onClick?: () => void;
        icon?: () => JSX.Element,
    }[];
    path?: string;
    component?: () => JSX.Element;
    icon?: () => JSX.Element,
};

export interface ToggleType {
    [key: string]: boolean;
};

export interface SidebarType {
    collapse: boolean;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
    config: SidebarConfig[];
    openDropdowns: ToggleType;
    toggleDropdown: (label: string) => void
};

