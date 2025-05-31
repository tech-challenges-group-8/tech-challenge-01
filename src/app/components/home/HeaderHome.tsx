import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Image from "next/image";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';

import ButtonsConta from "./ButtonsConta";

export default function HeaderHome() {
    const [openMenu, setOpenMenu] = React.useState(false);

    const toggleDrawer = (newOpenMenu: boolean) => () => {
        setOpenMenu(newOpenMenu);
    };
    const DrawerList = (
        <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['Sobre', 'Serviços'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000', height: '96px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 'calc(100% - 40px)', maxWidth: '1200px', padding: { xs: '0 20px 0 0', sm: '0 20px' } }}>
                <Button onClick={toggleDrawer(true)} sx={{ display: { xs: 'block', sm: 'none' } }}><MenuIcon sx={{ color: '#47A138', fontSize: '32px' }}/></Button>
                <Drawer open={openMenu} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
                    <Box sx={{ display: { xs: 'block', sm: 'none', lg: 'block' } }}>
                        <Image
                            src="/logo.svg"
                            alt="Next.js logo"
                            width={146}
                            height={32}
                            priority
                        />
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block', lg: 'none' } }}>
                        <Image
                            src="/logo-tablet.png"
                            alt="Next.js logo"
                            width={26}
                            height={26}
                            priority
                        />
                    </Box>
                    <Box sx={{ fontSize: '16px', fontWeight: 'Semibold', color: '#47A138', cursor: 'pointer', display: { xs: 'none', sm: 'block', lg: 'block' } }}>Sobre</Box>
                    <Box sx={{ fontSize: '16px', fontWeight: 'Semibold', color: '#47A138', cursor: 'pointer', display: { xs: 'none', sm: 'block', lg: 'block' } }}>Serviços</Box>
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'block', lg: 'block' } }}>
                    <ButtonsConta />
                </Box>
            </Box>
        </Box>
    );
}