"use client";

const footerSections = {
  Features: ["Location Tracking", "Emergency Contacts", "AI Assistant"],
  Support: ["Help Center", "Contact Us", "Privacy Policy"],
  Legal: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
};

export default function HeroFooter() {
  return (
    <footer id="policy" className="border-t border-black/10 bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="mb-6 flex items-center gap-3">
              <img src="/logo.svg" alt="Emergen Logo" className="h-12 w-12 object-contain" />
            </div>
            <p className="max-w-xs text-neutral-600">
              Building a safer world through connection and intelligent assistance.
            </p>
          </div>
          {Object.entries(footerSections).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-black">
                {title}
              </h4>
              <ul className="space-y-4 text-neutral-600">
                {items.map((item) => (
                  <li
                    key={item}
                    className="cursor-pointer transition-colors hover:text-red-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 border-t border-black/10 pt-10 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} Emergen. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
