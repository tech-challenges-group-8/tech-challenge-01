import { Box, Typography } from "@mui/material";
import Image from "next/image";
import ButtonsConta from "./ButtonsConta";

export default function BodyHome() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', background: 'linear-gradient(180deg, #004D61 0%, #FFFFFF 100%)', paddingBottom: '100px' }}>
            <Box
                sx={{
                    display: { xs: 'flex', sm: 'flex', md: 'flex' },
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    width: '100%',
                    maxWidth: '1200px',
                    padding: '20px',
                }}
            >
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap', gap: '40px' }}>
                    <Typography component="p" sx={{ fontSize: { xs: '25px', sm: '28px' }, lineHeight: { xs: '29px', sm: '32px' }, fontWeight: { xs: 'bold', sm: '600' }, color: '#000000', maxWidth: '434px', width: '100%', textAlign: { xs: 'center', lg: 'left' } }}>
                        Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!
                    </Typography>
                    <Box
                        sx={{
                            width: '90%',
                            maxWidth: '660px',
                            position: 'relative',
                            aspectRatio: '660 / 410',
                        }}
                    >
                        <Image
                            src="/home/body-banner.svg"
                            alt="banner"
                            fill
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </Box>

                </Box>
                <Box sx={{ display: { xs: 'block', sm: 'none', lg: 'none' }, margin: '20px 0' }}>
                    <ButtonsConta />
                </Box>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '40px 10px' }}>
                    <Typography component="p" sx={{ fontSize: { xs: '20px', sm: '25px' }, lineHeight: { xs: '24px', sm: '29px' }, fontWeight: 'bold', color: '#000000', width: '100%', textAlign: 'center' }}>
                        Vantagens do nosso banco:
                    </Typography>
                    <Box sx={{ width: '100%', maxWidth: '282px', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '15px', textAlign: 'center' }}>
                        <Image
                            src="/home/icone-presente.svg"
                            alt="vantagem-1"
                            width={73}
                            height={56}
                            priority
                        />
                        <Typography component="p" sx={{ fontSize: '20px', lineHeight: '24px', fontWeight: 'bold', color: '#47A138', width: '100%' }}>
                            Conta e cartão gratuitos
                        </Typography>
                        <Typography component="p" sx={{ fontSize: '16', lineHeight: '20px', fontWeight: '400', color: '#767676', maxWidth: '434px', width: '100%', padding: '0 5px' }}>
                            Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.
                        </Typography>
                    </Box>
                    <Box sx={{ width: '100%', maxWidth: '282px', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '15px', textAlign: 'center' }}>
                        <Image
                            src="/home/icone-presente.svg"
                            alt="vantagem-1"
                            width={73}
                            height={56}
                            priority
                        />
                        <Typography component="p" sx={{ fontSize: '20px', lineHeight: '24px', fontWeight: 'bold', color: '#47A138', width: '100%' }}>
                            Saques sem custo
                        </Typography>
                        <Typography component="p" sx={{ fontSize: '16', lineHeight: '20px', fontWeight: '400', color: '#767676', maxWidth: '434px', width: '100%', padding: '0 5px' }}>
                            Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.
                        </Typography>
                    </Box>
                    <Box sx={{ width: '100%', maxWidth: '282px', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '15px', textAlign: 'center' }}>
                        <Image
                            src="/home/icone-presente.svg"
                            alt="vantagem-1"
                            width={73}
                            height={56}
                            priority
                        />
                        <Typography component="p" sx={{ fontSize: '20px', lineHeight: '24px', fontWeight: 'bold', color: '#47A138', width: '100%' }}>
                            Programa de pontos
                        </Typography>
                        <Typography component="p" sx={{ fontSize: '16', lineHeight: '20px', fontWeight: '400', color: '#767676', maxWidth: '434px', width: '100%', padding: '0 5px' }}>
                            Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!
                        </Typography>
                    </Box>
                    <Box sx={{ width: '100%', maxWidth: '282px', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '15px', textAlign: 'center' }}>
                        <Image
                            src="/home/icone-presente.svg"
                            alt="vantagem-1"
                            width={73}
                            height={56}
                            priority
                        />
                        <Typography component="p" sx={{ fontSize: '20px', lineHeight: '24px', fontWeight: 'bold', color: '#47A138', width: '100%' }}>
                            Seguro Dispositivos
                        </Typography>
                        <Typography component="p" sx={{ fontSize: '16', lineHeight: '20px', fontWeight: '400', color: '#767676', maxWidth: '434px', width: '100%', padding: '0 5px' }}>
                            Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.
                        </Typography>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}
