import ImageLogo from '../../assets/Logo.png'
import Image from 'next/image'

import { HeaderTop } from './styles'

export function Header() {
  return (
    <HeaderTop>
      <Image src={ImageLogo} width={200} alt="Logo todo" />
    </HeaderTop>
  )
}
