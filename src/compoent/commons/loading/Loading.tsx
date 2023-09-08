import React from 'react'
import { LoadingImg, LoadingText, Title, Wrapper } from './loading.styles'

export default function Loading() {
  return (
    <Wrapper>
      <Title className='a11y-hidden'>로딩중</Title>
      <LoadingImg src='/assets/spinner.gif' alt='Loading'/>
      <LoadingText>Loading...</LoadingText>
    </Wrapper>
  )
}
