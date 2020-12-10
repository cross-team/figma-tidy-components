import * as React from 'react';
import Tooltip from '@bit/reactstrap.reactstrap.tooltip';
import Icon from '../assets/info-circle';

const InfoTooltip = ({alt, id, description}) => {
    const [show, setShow] = React.useState(false);

    // setTimeout(() => {
    //     setShow(true);
    // }, 100);

    return (
        <>
            <Icon id={`${id}-icon`} alt={`${alt} Tooltip`} enter={() => setShow(true)} leave={() => setShow(false)} />
            <Tooltip placement="right" target={`${id}-icon`} isOpen={show}>
                {description}
            </Tooltip>
        </>
    );
};

export default InfoTooltip;
