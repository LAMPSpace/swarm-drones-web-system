import HCMUTE from '@/assets/images/logoHCMUTE.svg';
import LAMPSpace from '@/assets/images/logoLAMPSpace.png';
import {Image} from "react-bootstrap";
export default function HCMUTELogo() {
    return (
        <div className="logo d-flex">
            <Image src={HCMUTE.src} alt="Logo HCMUTE" className='mr-2 rounded-circle' />
            <Image src={LAMPSpace.src} alt="Logo LAMPSpace" className='rounded-circle' />
        </div>
    )
}
