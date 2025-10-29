import { NavLink } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  Bot,
  FileText,
  TestTube,
  History,
  Link,
  Sun,
  Moon,
  ArrowLeft,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Agentes", url: "/", icon: Bot },
  { title: "Prompts", url: "/prompts", icon: FileText },
  { title: "Testar Prompt", url: "/test", icon: TestTube },
  { title: "Histórico", url: "/history", icon: History },
  { title: "Vincular", url: "/link", icon: Link },
];

export function AppSidebar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Sidebar className="border-r border-border flex flex-col">
      <SidebarHeader className="border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">HGTX</h1>
            <p className="text-xs text-muted-foreground">PromptLab</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-3">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-foreground hover:bg-muted"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="border-t border-border p-4 space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-muted transition-colors"
        >
          {theme === "dark" ? (
            <>
              <Sun className="h-4 w-4" />
              <span>Tema Claro</span>
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" />
              <span>Tema Escuro</span>
            </>
          )}
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar</span>
        </button>
      </div>
    </Sidebar>
  );
}
