import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { nunitoSans } from "@/utils/fonts"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  const router = useRouter()
  const isActive = router.pathname === href

  return (
    <li className="group">
      <NavigationMenuLink
        asChild
        className={className}
      >
        {isActive ? (
          <span
            ref={ref}
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-accent text-accent-foreground"
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p
              className={`line-clamp-2 text-sm leading-snug group-hover:text-muted-foreground ${nunitoSans.variable} font-[family-name:var(--font-nunitoSans)]`}
            >
              {children}
            </p>
          </span>
        ) : (
          <Link
            ref={ref}
            href={href ?? ""}
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p
              className={`line-clamp-2 text-sm leading-snug group-hover:text-muted-foreground ${nunitoSans.variable} font-[family-name:var(--font-nunitoSans)]`}
            >
              {children}
            </p>
          </Link>
        )}
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const monProfil: { title: string; href: string; description: string }[] = [
  {
    title: "Dashboard",
    href: "/me/dashboard",
    description: "Accédez à votre tableau de bord pour visualiser vos progrès."
  },
  {
    title: "Mes séances",
    href: "/me/sessions",
    description: "Consultez vos séances d'entraînement."
  },
  {
    title: "Mes objectifs",
    href: "/me/goals",
    description: "Définissez vos objectifs et suivez vos progrès."
  },
  {
    title: "Ma nutrition",
    href: "/me/nutrition",
    description: "Gérez votre alimentation pour atteindre vos objectifs."
  }
]

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Clair
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Sombre
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Système
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Navbar() {
  const router = useRouter()
  const currentPage = router.pathname
  const selectedClasses =
    navigationMenuTriggerStyle() + " bg-accent text-accent-foreground"

  return (
    <div className="flex justify-center w-full mb-8">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              href={currentPage === "/" ? "" : "/"}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={currentPage === "/" ? selectedClasses : navigationMenuTriggerStyle()}>
                Accueil
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={
                currentPage.includes("/me")
                  ? selectedClasses
                  : navigationMenuTriggerStyle()
              }
            >
              Mon profil
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 grid-cols-1">
                {monProfil.map((optionProfil) => (
                  <ListItem
                    key={optionProfil.title}
                    title={optionProfil.title}
                    href={optionProfil.href}
                    className={
                      currentPage === optionProfil.href
                        ? "bg-accent text-accent-foreground"
                        : ""
                    }
                  >
                    {optionProfil.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href={currentPage === "/login" ? "" : "/login"}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={currentPage === "/login" ? selectedClasses : navigationMenuTriggerStyle()}>
                Connexion
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        {/* <ModeToggle /> */}
      </NavigationMenu>
    </div>
  )
}
