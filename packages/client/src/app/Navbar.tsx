import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Button, AppBar, Toolbar, InputBase, Box } from '@mui/material'
import { Search } from '@mui/icons-material'

interface NavLinkProps {
    to: string
    children: React.ReactNode
}

const Navbar = () => {
    const NavLink = ({ to, children }: NavLinkProps) => (
        <Button
            component={RouterLink}
            sx={{
                color: 'inherit',
            }}
            to={to}
        >
            {children}
        </Button>
    )

    return (
        <nav>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        sx={theme => ({
                            flexGrow: 1,
                            display: 'none',
                            [theme.breakpoints.up('sm')]: {
                                display: 'block',
                            },
                        })}
                        variant="h6"
                        noWrap
                    >
                        Exteractive
                    </Typography>
                    <NavLink to="/">Stories</NavLink>
                    <Box
                        sx={theme => ({
                            position: 'relative',
                            borderRadius: theme.shape.borderRadius,
                            marginLeft: 0,
                            width: '100%',
                            [theme.breakpoints.up('sm')]: {
                                marginLeft: theme.spacing(1),
                                width: 'auto',
                            },
                        })}
                    >
                        <Box
                            sx={theme => ({
                                padding: theme.spacing(0, 2),
                                height: '100%',
                                position: 'absolute',
                                pointerEvents: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            })}
                        >
                            <Search />
                        </Box>
                        <InputBase
                            placeholder="Search…"
                            sx={theme => ({
                                padding: theme.spacing(1, 1, 1, 0),
                                // vertical padding + font size from searchIcon
                                paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
                                transition: theme.transitions.create('width'),
                                width: '100%',
                                [theme.breakpoints.up('sm')]: {
                                    width: '12ch',
                                    '&:focus': {
                                        width: '20ch',
                                    },
                                },
                            })}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        </nav>
    )
}

export default Navbar
