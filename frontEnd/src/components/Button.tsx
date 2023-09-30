
import style from './Button.module.css'
import React from 'react'

/**
 * Button component
 * Can add additional props to the button through:
 *  <Button {...props} />
 **/
export default function Button(
    props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
    return (
    <button className = {style.button} {...props} />
    )
}
