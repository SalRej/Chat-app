import { Popper, Fade, Paper, IconButton } from '@mui/material'
import React, { type Dispatch, type SetStateAction } from 'react'
import icons from '../../constants/icons'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  anchorEl: any
  handleIconMessageClick: (iconName: string) => any
}
const IconsHolder = ({ open, anchorEl, handleIconMessageClick, setOpen }: Props): JSX.Element => {
  return (
    <Popper open={open} anchorEl={anchorEl} placement='top-end' transition>
        {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{ p: 1 }}>
                {
                    Object.keys(icons).map((iconName: any) => {
                      const IconComponent = icons[iconName].component
                      const IconProps = icons[iconName].props
                      console.log(IconProps)
                      return (
                        <IconButton key={iconName} onClick={() => { setOpen(false); handleIconMessageClick(iconName) }}>
                            <IconComponent {...IconProps} />
                        </IconButton>
                      )
                    })
                }
                </Paper>
            </Fade>
        )}
    </Popper>
  )
}

export default IconsHolder
