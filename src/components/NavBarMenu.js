import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  CloseIcon, ArrowForwardIcon, AddIcon, Icon,
} from '@chakra-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EventBus from '../common/EventBus';
import { CgProfile } from 'react-icons/all';

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const handleClick = (e) =>{
    e.preventDefault();
    EventBus.dispatch("logout");
  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex flex={{ base: 1 }} justify={{ base: 'flex-start', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            <Link to={"/"}><Text as={'b'}>Wideoserwis.com</Text></Link>
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          {!isLoggedIn &&
          <Link   to="/log-in">
            <Button rightIcon={<ArrowForwardIcon />}
                    fontSize={'sm'}
                    fontWeight={400}
                    colorScheme='blue'>
              Log In
            </Button>
          </Link>
          }
          {
            isLoggedIn &&
            <Button rightIcon={<ArrowForwardIcon />}
                    fontSize={'sm'}
                    fontWeight={400}
                    colorScheme='blue'
                    id={'logoutButton'}
                    onClick={handleClick}
            >
              Log Out
            </Button>
          }
          {
            isLoggedIn &&
            <Link   to="/profile">
              <Button rightIcon={<Icon as={CgProfile} />}
                      fontSize={'sm'}
                      fontWeight={400}
                      colorScheme='green'>
                Profile
              </Button>
            </Link>
          }
          {
            !isLoggedIn &&
            <Link to="/register">
              <Button rightIcon={<AddIcon />} colorScheme='blue'
                      fontSize={'sm'}
                      fontWeight={400}
                      variant='outline'>
                Sign up
              </Button>
            </Link>
          }
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  // const linkColor = useColorModeValue('gray.600', 'gray.200');
  // const linkHoverColor = useColorModeValue('gray.800', 'white');
  // const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {/*{NAV_ITEMS.map((navItem) => (*/}
      {/*  <Box key={navItem.label}>*/}
      {/*    <Popover trigger={'hover'} placement={'bottom-start'}>*/}
      {/*      <PopoverTrigger>*/}
      {/*        <Link*/}
      {/*          p={2}*/}
      {/*          href={navItem.href ?? '#'}*/}
      {/*          fontSize={'sm'}*/}
      {/*          fontWeight={500}*/}
      {/*          color={linkColor}*/}
      {/*          _hover={{*/}
      {/*            textDecoration: 'none',*/}
      {/*            color: linkHoverColor,*/}
      {/*          }} to={"/"}>*/}
      {/*          {navItem.label}*/}

      {/*        </Link>*/}
      {/*      </PopoverTrigger>*/}

      {/*      {navItem.children && (*/}
      {/*        <PopoverContent*/}
      {/*          border={0}*/}
      {/*          boxShadow={'xl'}*/}
      {/*          bg={popoverContentBgColor}*/}
      {/*          p={4}*/}
      {/*          rounded={'xl'}*/}
      {/*          minW={'sm'}>*/}
      {/*          <Stack>*/}
      {/*            {navItem.children.map((child) => (*/}
      {/*              <DesktopSubNav key={child.label} {...child} />*/}
      {/*            ))}*/}
      {/*          </Stack>*/}
      {/*        </PopoverContent>*/}
      {/*      )}*/}
      {/*    </Popover>*/}
      {/*  </Box>*/}
      {/*))}*/}
    </Stack>
  );
};

// const DesktopSubNav = ({ label, href, subLabel }) => {
//   return (
//     <Link
//       href={href}
//       role={'group'}
//       display={'block'}
//       p={2}
//       rounded={'md'}
//       _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
//       <Stack direction={'row'} align={'center'}>
//         <Box>
//           <Text
//             transition={'all .3s ease'}
//             _groupHover={{ color: 'pink.400' }}
//             fontWeight={500}>
//             {label}
//           </Text>
//           <Text fontSize={'sm'}>{subLabel}</Text>
//         </Box>
//         <Flex
//           transition={'all .3s ease'}
//           transform={'translateX(-10px)'}
//           opacity={0}
//           _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
//           justify={'flex-end'}
//           align={'center'}
//           flex={1}>
//           <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
//         </Flex>
//       </Stack>
//     </Link>
//   );
// };

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {/*{NAV_ITEMS.map((navItem) => (*/}
      {/*  <MobileNavItem key={navItem.label} {...navItem} */}/>
      {/*))}*/}
    </Stack>
  );
};

// const MobileNavItem = ({ label, children, href }) => {
//   const { isOpen, onToggle } = useDisclosure();
//
//   return (
//     <Stack spacing={4} onClick={children && onToggle}>
//       <Flex
//         py={2}
//         as={Link}
//         href={href ?? '#'}
//         justify={'space-between'}
//         align={'center'}
//         _hover={{
//           textDecoration: 'none',
//         }}>
//         <Text
//           fontWeight={600}
//           color={useColorModeValue('gray.600', 'gray.200')}>
//           {label}
//         </Text>
//         {children && (
//           <Icon
//             as={ChevronDownIcon}
//             transition={'all .25s ease-in-out'}
//             transform={isOpen ? 'rotate(180deg)' : ''}
//             w={6}
//             h={6}
//           />
//         )}
//       </Flex>
//
//       <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
//         <Stack
//           mt={2}
//           pl={4}
//           borderLeft={1}
//           borderStyle={'solid'}
//           borderColor={useColorModeValue('gray.200', 'gray.700')}
//           align={'start'}>
//           {children &&
//             children.map((child) => (
//               <Link key={child.label} py={2} href={child.href}>
//                 {child.label}
//               </Link>
//             ))}
//         </Stack>
//       </Collapse>
//     </Stack>
//   );
// };

// const NAV_ITEMS: Array = [
  // {
  //   label: 'Inspiration',
  //   children: [
  //     {
  //       label: 'Explore Design Work',
  //       subLabel: 'Trending Design to inspire you',
  //       href: '#',
  //     },
  //     {
  //       label: 'New & Noteworthy',
  //       subLabel: 'Up-and-coming Designers',
  //       href: '#',
  //     },
  //   ],
  // },
  // {
  //   label: 'Find Work',
  //   children: [
  //     {
  //       label: 'Job Board',
  //       subLabel: 'Find your dream design job',
  //       href: '#',
  //     },
  //     {
  //       label: 'Freelance Projects',
  //       subLabel: 'An exclusive list for contract work',
  //       href: '#',
  //     },
  //   ],
  // },
  // {
  //   label: 'Learn Design',
  //   href: '#',
  // },
  // {
  //   label: 'Hire Designers',
  //   href: '#',
  // },
// ];

//
// <NavItem>
//   <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
// </NavItem>
// <NavItem>
//   <NavLink tag={Link} className="text-dark" to="/request">Request for Credit</NavLink>
// </NavItem>
// <NavItem>
//   <NavLink tag={Link} className="text-dark" to="/inquiries">Inquiries</NavLink>
// </NavItem>
// <NavItem>
//   <NavLink tag={Link} className="text-dark" to="/offers">Offers</NavLink>
// </NavItem>
//
//
// <Stack direction='row' spacing={4} marginLeft={5}>
//   <Link   to="/settings">
//     <Button leftIcon={<SettingsIcon />} colorScheme='pink' variant='solid'>
//       Settings
//     </Button>
//   </Link>
//
//   <Link   to="/log-in">
//     <Button rightIcon={<ArrowForwardIcon />} colorScheme='blue'>
//       Log In
//     </Button>
//   </Link>
//   <Link   to="/register">
//     <Button rightIcon={<AddIcon/>} colorScheme='blue' variant='outline'>
//       Sign up
//     </Button>
//   </Link>
//
// </Stack>