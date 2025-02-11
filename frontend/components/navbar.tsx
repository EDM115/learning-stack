import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { nunitoSans } from "@/utils/fonts"

import Link from "next/link"
import React from "react"

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="group">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className={`line-clamp-2 text-sm leading-snug group-hover:text-muted-foreground ${nunitoSans.variable} font-[family-name:var(--font-nunitoSans)]`}>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const monProfil: { title: string; href: string; description: string }[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Accédez à votre tableau de bord pour visualiser vos progrès."
  },
  {
    title: "Mes séances",
    href: "/sessions",
    description: "Consultez vos séances d'entraînement."
  },
  {
    title: "Mes objectifs",
    href: "/goals",
    description: "Définissez vos objectifs et suivez vos progrès."
  },
  {
    title: "Ma nutrition",
    href: "/nutrition",
    description: "Gérez votre alimentation pour atteindre vos objectifs."
  }
]

export default function Navbar() {
  return (
    <div className="flex justify-center w-full mb-8">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              href="/"
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Accueil
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Mon profil</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 grid-cols-1">
                {monProfil.map((optionProfil) => (
                  <ListItem
                    key={optionProfil.title}
                    title={optionProfil.title}
                    href={optionProfil.href}
                  >
                    {optionProfil.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/login"
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Connexion
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
