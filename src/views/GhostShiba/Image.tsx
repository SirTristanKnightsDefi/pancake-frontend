import React from 'react'
import styled from 'styled-components'

interface ImageProps {
  src: string
  alt: string
  originalLink?: string
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: 100%;
`

const StyledImage = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  transition: opacity 1s linear;
  height: 100%;
  object-fit: cover;
`

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  const previewImage = <StyledImage src={src} alt={alt} />

  return (
    <Container>
      {previewImage}
    </Container>
  )
}

export default Image
