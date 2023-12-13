import { Box, Button, Container, MenuItem, styled } from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { IoPersonOutline } from "react-icons/io5";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import acc from '../../assets/user.png'
import order from '../../assets/sent.png'
import { NavLink } from "components/nav-link";
import Link from "next/link";
import { FlexBox } from "components/flex-box";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import BazaarCard from "components/BazaarCard";
import Category from "components/icons/Category";
import { Paragraph } from "components/Typography";
import CategoryMenu from "components/categories/CategoryMenu";
import MegaMenu from "./MegaMenu";
import MegaMenu2 from "./MegaMenu2";
import useSettings from "hooks/useSettings";
import navbarNavigations from "data/navbarNavigations";
import { useState, useRef } from "react";
import { tr } from "date-fns/locale";
import Image from 'next/image'
// NavList props interface

// const common css style
const navLinkStyle = {
  cursor: "pointer",
  transition: "color 150ms ease-in-out",
  "&:hover": {
    color: "primary.main",
  },
  "&:last-child": {
    marginRight: 0,
  },
};

const accountInfo = [
  {id:1, img:{acc}, title:'My Account'},
  {id:2, img:{order}, title:'Orders'},
  {id:3, img:{order}, title:'Saved Items'},
];

// background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
// border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
// color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

// style components
const StyledNavLink = styled(NavLink)({
  ...navLinkStyle,
});
const ParentNav = styled(Box)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.primary.main,
    "& > .parent-nav-item": {
      display: "block",
    },
  },
}));
const ParentNavItem = styled(Box)(({ theme }) => ({
  top: 0,
  zIndex: 5,
  left: "100%",
  paddingLeft: 8,
  display: "none",
  position: "absolute",
  [theme.breakpoints.down(1640)]: {
    right: "100%",
    left: "auto",
    paddingRight: 8,
  },
}));
const NavBarWrapper = styled(BazaarCard)(({ theme, border }) => ({
  height: "60px",
  display: "block",
  borderRadius: "0px",
  position: "relative",
  ...(border && {
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  }),
  [theme.breakpoints.down(1150)]: {
    display: "none",
  },
}));
const InnerContainer = styled(Container)({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
const CategoryMenuButton = styled(Button)(({ theme }) => ({
  width: "278px",
  height: "40px",
  backgroundColor: theme.palette.grey[100],
}));
const ChildNavsWrapper = styled(Box)({
  zIndex: 5,
  left: "50%",
  top: "100%",
  display: "none",
  position: "absolute",
  transform: "translate(-50%, 0%)",
});

// ==========================================================

// ==========================================================

const Navbar = ({ navListOpen, hideCategories, elevation, border }) => {
  const [active, setActive] = useState(false);
  const { settings } = useSettings();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  const renderNestedNav = (list = [], isRoot = false) => {
    return list.map((nav) => {
      if (isRoot) {
        // show megamenu
        if (nav.megaMenu) {
          return (
            //@ts-ignore
            <MegaMenu key={nav.title} title={nav.title} menuList={nav.child} />
          );
        }

        // show megamenu with sub
        if (nav.megaMenuWithSub) {
          return (
            //@ts-ignore
            <MegaMenu2 key={nav.title} title={nav.title} menuList={nav.child} />
          );
        }
        if (nav.url) {
          return (
            <StyledNavLink href={nav.url} key={nav.title}>
              {nav.title}
            </StyledNavLink>
          );
        }
        if (nav.child) {
          return (
            <FlexBox
              key={nav.title}
              alignItems="center"
              position="relative"
              flexDirection="column"
              sx={{
                "&:hover": {
                  "& > .child-nav-item": {
                    display: "block",
                  },
                },
              }}
            >
              <FlexBox alignItems="flex-end" gap={0.3} sx={navLinkStyle}>
                {nav.title}{" "}
                <KeyboardArrowDown
                  sx={{
                    color: "grey.500",
                    fontSize: "1.1rem",
                  }}
                />
              </FlexBox>

              <ChildNavsWrapper className="child-nav-item">
                <BazaarCard
                  elevation={3}
                  sx={{
                    mt: 2.5,
                    py: 1,
                    minWidth: 200,
                  }}
                >
                  {renderNestedNav(nav.child)}
                </BazaarCard>
              </ChildNavsWrapper>
            </FlexBox>
          );
        }
      } else {
        if (nav.url) {
          return (
            <NavLink href={nav.url} key={nav.title}>
              <MenuItem>{nav.title}</MenuItem>
            </NavLink>
          );
        }
        if (nav.child) {
          return (
            <ParentNav position="relative" minWidth="230px" key={nav.title}>
              <MenuItem color="grey.700">
                <Box flex="1 1 0" component="span">
                  {nav.title}
                </Box>

                {settings.direction === "ltr" ? (
                  <ArrowRight fontSize="small" />
                ) : (
                  <ArrowLeft fontSize="small" />
                )}
              </MenuItem>

              <ParentNavItem className="parent-nav-item">
                <BazaarCard
                  sx={{
                    py: "0.5rem",
                    minWidth: "230px",
                  }}
                  elevation={3}
                >
                  {renderNestedNav(nav.child)}
                </BazaarCard>
              </ParentNavItem>
            </ParentNav>
          );
        }
      }
    });
  };

  const handleActive = () => {
    setActive(true);
  };
  return (
    <NavBarWrapper hoverEffect={false} elevation={elevation} border={border}>
      {!hideCategories ? (
        <InnerContainer>
          {/* Category megamenu */}
          <CategoryMenu open={navListOpen}>
            <CategoryMenuButton variant="text">
              <Category fontSize="small" />
              <Paragraph
                fontWeight="600"
                textAlign="left"
                flex="1 1 0"
                ml={1.25}
                color="grey.600"
              >
                Categories
              </Paragraph>
              {settings.direction === "ltr" ? (
                <ChevronRight className="dropdown-icon" fontSize="small" />
              ) : (
                <ChevronLeft className="dropdown-icon" fontSize="small" />
              )}
            </CategoryMenuButton>
          </CategoryMenu>

          {/* Horizontal menu */}
          {/* <FlexBox gap={4}>{renderNestedNav(navbarNavigations, true)}</FlexBox> */}
          {/* <FlexBox gap={4}>{renderNestedNav(navbarNavigations, true)}</FlexBox> */}
          <div className="flex justify-between pr-4 text-[15.6px]">
            <Link
              className={`font-medium hover:text-[#D23F57] transition-all duration-75 ${
                active && "text-red-500"
              }`}
              href="/"
            >
              Home
            </Link>
            <Link
              className="pl-9 font-medium hover:text-[#D23F57] transition-all duration-75"
              href=""
            >
              Phones & Telecommunications
            </Link>
            <Link
              className="pl-9 font-medium hover:text-[#D23F57] transition-all duration-75"
              href=""
            >
              SuperDeals
            </Link>
            <Link
              className="pl-9 font-medium hover:text-[#D23F57] transition-all duration-75"
              href="/product/search/shirt"
            >
              Men's Clothings
            </Link>
            <div className="relative cursor-pointer  pl-9 flex flex-row items-center space-x-1">
              <IoPersonOutline size={18} />
              <span
                onClick={handleDropdownOpen}
                className=" font-medium hover:text-[#D23F57] transition-all duration-75"
              >
                Account
              </span>
              <IoIosArrowDown />
            </div>

            {dropdownOpen && (
              <div className="flex w-[12rem] flex-col absolute rounded-md shadow-md border border-gray-100 bg-white right-40 p-3 top-14 z-10 ">
                <Link
                  href="/login"
                  className="bg-[#D23F57] text-white font-semibold text-sm rounded-sm text-center p-2.5 hover:bg-[#e32746] transition-all duration-75"
                >
                  SIGN IN
                </Link>
                <div className="mt-2">
                  <div className="">
                    {/* <IoPersonOutline size={18} />
                    <span className="">My Account</span> */}
                    {accountInfo.map(account => 
                    <main className="" key={account.id}>
                      <div>
                        <Image width={10} src={account.img} alt="" />
                        <span>{account.title}</span>
                      </div>

                    </main>)}
                  </div>
                </div>
              </div>
            )}

            <Link
              className="pl-9 font-medium hover:text-[#D23F57] transition-all duration-75"
              href="/vendor/dashboard"
            >
              Vendor Account
            </Link>
          </div>

          {}
        </InnerContainer>
      ) : (
        <InnerContainer
          sx={{
            justifyContent: "center",
          }}
        >
          <FlexBox gap={4}>{renderNestedNav(navbarNavigations, true)}</FlexBox>
        </InnerContainer>
      )}
    </NavBarWrapper>
  );
};

//  set default props data
Navbar.defaultProps = {
  elevation: 2,
  navListOpen: false,
  hideCategories: false,
};
export default Navbar;
