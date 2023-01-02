import { mainColor } from 'config';

function ZipCodeDash() {
    const style = { display: 'flex', width: '10px', height: '1px', background: mainColor, marginTop: '4px', marginLeft: '16px' };
    return <span style={style}></span>;
}

export default ZipCodeDash;
