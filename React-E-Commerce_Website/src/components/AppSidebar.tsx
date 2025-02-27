
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
} from "../components/ui/sidebar";
import { Home, ShoppingCart, User, LogIn, Package, Edit } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
    { title: "Home", url: "/", icon: Home },
    {
        title: "Products", url: "/products", icon: Package, submenu: [
            { title: "Modify Product", url: "/products/modify", icon: Edit }
        ]
    },
    { title: "Cart", url: "/cart", icon: ShoppingCart },
    { title: "User", url: "/user", icon: User },
    { title: "Login", url: "/login", icon: LogIn },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="flex justify-between items-center p-4"></SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-bold text-lg mb-5">Navigations</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url} className="flex items-center gap-2">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    {item.submenu && (
                                        <SidebarMenu className="ml-4">
                                            {item.submenu.map(sub => (
                                                <SidebarMenuItem key={sub.title}>
                                                    <SidebarMenuButton asChild>
                                                        <Link to={sub.url} className="flex items-center gap-2">
                                                            <sub.icon />
                                                            <span>{sub.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenu>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}