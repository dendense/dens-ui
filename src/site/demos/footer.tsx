import { Footer, FooterBottom, FooterBrand, FooterColumn, FooterColumns, FooterLink, FooterTop } from "@/components/ui/footer"

export default function FooterDemo() {
  return (
    <Footer className="w-full max-w-3xl">
      <FooterTop>
        <FooterBrand>
          <span className="text-[17px] font-bold tracking-[-0.02em]">Lumbung</span>
          <p className="text-sm leading-relaxed text-muted-foreground">Every workflow, one calm console.</p>
        </FooterBrand>
        <FooterColumns className="sm:grid-cols-3">
          <FooterColumn title="Product">
            <FooterLink href="#">Overview</FooterLink>
            <FooterLink href="#">Changelog</FooterLink>
          </FooterColumn>
          <FooterColumn title="Resources">
            <FooterLink href="#">Documentation</FooterLink>
            <FooterLink href="#">Status</FooterLink>
          </FooterColumn>
          <FooterColumn title="Company">
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterColumn>
        </FooterColumns>
      </FooterTop>
      <FooterBottom>
        <span>© 2026 Lumbung</span>
        <span>Privacy · Terms</span>
      </FooterBottom>
    </Footer>
  )
}
