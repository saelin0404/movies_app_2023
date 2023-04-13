import React from 'react'
import styled from 'styled-components'

function Footer() {
  return (
    <Footercontainer>
      <FooterContent>
        <FooterLinkContainer>
          <FooterLinktitle>넷플릭스 코리아</FooterLinktitle>
          <FooterLinkContent>
            <FooterLink href ="httpa://help.netflix.com/ko/node/412">넷플릭스 소개</FooterLink>
            <FooterLink href ="httpa://help.netflix.com/ko/node/412">고객센터</FooterLink>
            <FooterLink href ="httpa://help.netflix.com/ko/node/412">미디어 센터</FooterLink>
            <FooterLink href ="httpa://help.netflix.com/ko/node/412">이용약관</FooterLink>
          </FooterLinkContent>
          <FooterDescContainer>
            <FooterDescRight>
              NetFlix Rights Reserved.
            </FooterDescRight>
          </FooterDescContainer>
        </FooterLinkContainer>
      </FooterContent>
    </Footercontainer>
  )
}

const Footercontainer = styled.div`
display:flex;
justify-content: center;
padding:40px 0;
box-sizing:border-box;
widht:100%
position:reltive;
a-index:100;

@media (max-width:768px){
  padding:20px 20px 30px;
}
`
const FooterContent = styled.div``

const FooterLinkContainer =styled.div`
  width:500px

  @media(max-width:786px){
    width:100%
  }`

const FooterLinktitle = styled.p`
  color:gray;
  font-size:17px;
  text-align: center;
  `
const FooterLinkContent =styled.div`
display:flex;
justify-conten:space-between;
flex-wrap:wrap;
margin-top:35px;
@media(max-width:786px){
  margin-top:26px;
}`

const FooterLink = styled.a`
color:gray;
font-size:14px;
width:110px;
margin-bottom:21px;
text-decoration:none;
&:hover{
  text-decoration:nuder-line;
}
@media(max-width:786px){
  margin-top:16px;
}`

const FooterDescContainer =styled.div`
margin-top:30px;
@media(max-width:786px){
  margin-top:20px;
}`

const FooterDescRight =styled.p`
color:#fff;
text-align: center;
font-size:14px
@media(max-width:786px){
  margin-top:20px;
}`
export default Footer