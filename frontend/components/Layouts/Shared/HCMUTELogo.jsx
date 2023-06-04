import HCMUTE from '@/assets/images/logoHCMUTE.svg';
import LAMPSpace from '@/assets/images/logoLAMPSpace.png';
export default function HCMUTELogo() {
    return (
        <div className="logo d-flex">
            <img src={HCMUTE.src} alt="Logo HCMUTE" className='mr-2 rounded-circle' />
            <img src={LAMPSpace.src} alt="Logo LAMPSpace" className='rounded-circle' />
        </div>
    )
}
