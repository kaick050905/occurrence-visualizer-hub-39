
import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { BookOpen } from "lucide-react";

const MainNavigation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-end mb-2"
    >
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/relatorios">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Relatórios
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/dados-por-regiao">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dados por Região
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/sobre">
              <Button variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Sobre o Projeto
              </Button>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </motion.div>
  );
};

export default MainNavigation;
