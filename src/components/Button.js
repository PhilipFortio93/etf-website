import React from 'react'
import './Button.css';

export default class ClassName extends React.Component{
  render(){
    let {size,
      ...rest
    } = this.props
    return (
      <a
        className='custom-button'
        size={size ? size : 'lg'}
        {...rest}
        >
        {this.props.children}
      </a>
    )
  }
}
