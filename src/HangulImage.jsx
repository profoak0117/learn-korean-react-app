import giyeoklogo from './assets/giyeok.jpg'
import './HangulImage.css'

function HangulImage({hangulCharacter}) {
    return(
        <>
          <label className="hangulLabel">
          {hangulCharacter}
          </label>
        </>
    )
}

export default HangulImage