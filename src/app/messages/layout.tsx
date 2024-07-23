import React from 'react'
import PropTypes from 'prop-types'

function layout({
  children,
}: {
  children: React.ReactNode;
} ) {
  return (
    {children}
  )
}

layout.propTypes = {}

export default layout
