import { useState } from "react";
import {
  Search,
  ChevronDown,
  Home,
  Menu,
  User,
  Target,
  Building2,
  BarChart3,
  Volume2,
  Lock,
  Diamond,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import imgLogo from "../../../assets/images/index/logoSIn.png";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const topMenuItems = [
    { icon: <User className="h-4 w-4" />, label: "Segmento 1", href: "#" },
    { icon: <Target className="h-4 w-4" />, label: "Segmento 2", href: "#" },
    { icon: <Building2 className="h-4 w-4" />, label: "Segmento 3", href: "#" },
  ];

  const secondaryMenuItems = [
    { icon: <Home className="h-4 w-4" />, label: "Inicio", href: "#" },
    {
      icon: <span className="text-sm">📝</span>,
      label: "Scripts",
      href: "#/checklist",
    },
    {
      icon: <span className="text-sm">💳</span>,
      label: "Estudio de mercado",
      href: "#",
      hasDropdown: true,
      dropdownKey: "tarjeta",
      dropdownItems: [
        { label: "Opción 1", href: "#" },
        { label: "Opción 2", href: "#" },
      ],
    },
    {
      icon: <span className="text-sm">📊</span>,
      label: "Argumentario",
      href: "#",
      hasDropdown: true,
      dropdownKey: "creditos",
      dropdownItems: [
        { label: "Opción 1", href: "#" },
        { label: "Opción 2", href: "#" },
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Top navbar */}
      <div className="bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="hidden md:flex items-center space-x-6">
              {topMenuItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  asChild
                  className="text-background hover:bg-secondary hover:text-foreground h-8 px-2"
                >
                  <a
                    href={item.href}
                    className="flex items-center text-sm font-medium"
                  >
                    <span className="mr-1">{item.icon}</span> {item.label}
                  </a>
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                asChild
                className="text-white hover:bg-secondary hover:text-white h-8 px-2"
              >
                <a href="#" className="flex items-center text-sm font-medium">
                  <User className="h-4 w-4 mr-1" /> ADMIN
                </a>
              </Button>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-secondary h-8 w-8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-secondary h-8 w-8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-secondary h-8 w-8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-secondary h-8 w-8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary navbar */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden mr-2 text-gray-700"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="py-4">
                    <div className="space-y-1">
                      {secondaryMenuItems.map((item, index) => (
                        <div key={index}>
                          {item.hasDropdown ? (
                            <>
                              <Button
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() =>
                                  toggleDropdown(`m-${item.dropdownKey}`)
                                }
                              >
                                <span className="mr-2">{item.icon}</span>
                                {item.label}
                                <ChevronDown className="ml-auto h-4 w-4" />
                              </Button>
                              {activeDropdown === `m-${item.dropdownKey}` && (
                                <div className="pl-6 space-y-1 mt-1">
                                  {item.dropdownItems?.map(
                                    (subItem, subIndex) => (
                                      <Button
                                        key={subIndex}
                                        variant="ghost"
                                        asChild
                                        className="w-full justify-start"
                                      >
                                        <a href={subItem.href}>
                                          {subItem.label}
                                        </a>
                                      </Button>
                                    )
                                  )}
                                </div>
                              )}
                            </>
                          ) : (
                            <Button
                              variant="ghost"
                              asChild
                              className="w-full justify-start"
                            >
                              <a href={item.href}>
                                <span className="mr-2">{item.icon}</span>
                                {item.label}
                              </a>
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-1">
                      {topMenuItems.map((item, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          asChild
                          className="w-full justify-start"
                        >
                          <a href={item.href}>
                            <span className="mr-2">{item.icon}</span>
                            {item.label}
                          </a>
                        </Button>
                      ))}
                      <Button
                        variant="ghost"
                        asChild
                        className="w-full justify-start"
                      >
                        <a href="#">
                          <User className="mr-2 h-4 w-4" />
                          ADMIN
                        </a>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="hidden md:flex items-center space-x-1">
                {secondaryMenuItems.map((item, index) => (
                  <div key={index}>
                    {item.hasDropdown ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700"
                          >
                            <span className="mr-1">{item.icon}</span>{" "}
                            {item.label}{" "}
                            <ChevronDown className="ml-1 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          {item.dropdownItems?.map((subItem, subIndex) => (
                            <DropdownMenuItem key={subIndex} asChild>
                              <a href={subItem.href}>{subItem.label}</a>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Button
                        variant="ghost"
                        asChild
                        className="px-3 py-2 text-sm font-medium text-gray-700"
                      >
                        <a href={item.href} className="flex items-center">
                          <span className="mr-1">{item.icon}</span> {item.label}
                        </a>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative flex items-center">
                <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 bg-white">
                  <Input
                    type="text"
                    placeholder="Buscar..."
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-7 text-sm w-40"
                  />
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  <figure className="w-20 ">
                    <img src={imgLogo} alt="logo" />
                  </figure>

                  <div className="ml-4 relative">
                    <h2 className="text-primary text-xl font-bold">
                      Web Training
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
