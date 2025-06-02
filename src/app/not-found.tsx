"use client";

import { ThemeProvider } from '@emotion/react';
import { Box, Typography, Button, CssBaseline } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import FooterHome from './components/home/FooterHome';
import HeaderHome from './components/home/HeaderHome';
import theme from './styles/theme';


export default function NotFound() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HeaderHome />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                textAlign="center"
                padding={"20px 20px 100px 20px"}
                sx={{ background: 'linear-gradient(180deg, #004D61 0%, #FFFFFF 100%)' }}
            >
                <Typography component="p" sx={{ fontSize: '25px', lineHeight: '29px', fontWeight: 'bold', color: '#000000', marginBottom: '20px' }}>
                    Ops! Não encontramos a página... 
                </Typography>
                <Typography component="p" sx={{ fontSize: '16px', lineHeight: '20px', fontWeight: '400', color: '#000000' }}>
                    E olha que exploramos o universo procurando por ela!
                </Typography>
                <Typography component="p" sx={{ fontSize: '16px', lineHeight: '20px', fontWeight: '400', color: '#000000' }}>
                    Que tal voltar e tentar novamente?
                </Typography>
                <Button component={Link} href="/" sx={{ margin: '30px 0px', width: '144px', height: '48px', borderRadius: '8px', backgroundColor: '#FF5031', color: '#FFFFFF', fontWeight: 'bold', fontSize: '16px', border: '2px solid #FF5031', textTransform: 'none' }}>
                    Voltar ao início
                </Button>
                <Box
                    sx={{
                        width: '90%',
                        maxWidth: '470px',
                        position: 'relative',
                        aspectRatio: '470 / 354',
                    }}
                >
                    <Image
                        src="/ilustracao-404.svg"
                        alt="banner"
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                    />
                </Box>
            </Box>
            <FooterHome />
        </ThemeProvider>
    );
}
