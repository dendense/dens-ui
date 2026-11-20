import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Navbar, NavbarActions, NavbarBrand, NavbarLink, NavbarLinks, NavbarMenu } from "@/components/ui/navbar"

const links = ["Product", "Pricing", "Docs"]

function Logo() {
  return <span className="grid size-7 place-content-center rounded-full bg-brand text-[13px] font-bold text-brand-foreground">L</span>
}

export default function NavbarDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4">
      <Navbar>
        <NavbarBrand href="#">
          <Logo /> Lumbung
        </NavbarBrand>
        <NavbarLinks>
          {links.map((l, i) => (
            <NavbarLink key={l} href="#" active={i === 0}>
              {l}
            </NavbarLink>
          ))}
        </NavbarLinks>
        <NavbarActions>
          <Button variant="ghost" className="hidden sm:inline-flex">Sign in</Button>
          <Button>Start free</Button>
          <NavbarMenu>
            {links.map((l) => (
              <DropdownMenuItem key={l}>{l}</DropdownMenuItem>
            ))}
          </NavbarMenu>
        </NavbarActions>
      </Navbar>
      <Navbar variant="ink">
        <NavbarBrand href="#">
          <Logo /> Lumbung
        </NavbarBrand>
        <NavbarLinks>
          {links.map((l, i) => (
            <NavbarLink key={l} href="#" active={i === 1}>
              {l}
            </NavbarLink>
          ))}
        </NavbarLinks>
        <NavbarActions>
          <Button className="bg-rail-foreground text-rail hover:bg-rail-foreground/90">Start free</Button>
          <NavbarMenu>
            {links.map((l) => (
              <DropdownMenuItem key={l}>{l}</DropdownMenuItem>
            ))}
          </NavbarMenu>
        </NavbarActions>
      </Navbar>
    </div>
  )
}
