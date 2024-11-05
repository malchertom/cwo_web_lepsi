import './WebBy.css';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function WebBy() {
    const [copySucc, setCopySucc] = useState<boolean>(false);

    const CopyToClipboard = (): void => {
        navigator.clipboard.writeText("joseph.susik@gmail.com");
        setCopySucc(true);
        setTimeout(() => {
            setCopySucc(false);
        }, 1500); // No need for quotes around 1500 as it's a number
    };

    return (
        <section className="WebBy">
            <p>Web by: Josef Susík</p>

            <div className="CopyToClipboard">
                <Tooltip
                    className="TooltipCopy"
                    title={copySucc ? `Zkopírováno ${'\u2713'}` : "Kliknutím zkopírujte."}
                    slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, -67],
                                    },
                                },
                            ],
                        },
                    }}
                >
                    {/* Wrap <p> and <ContentCopyIcon> in a <div> */}
                    <div onClick={CopyToClipboard} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <p>joseph.susik@gmail.com </p>
                        <ContentCopyIcon className="CopyIcon" fontSize="medium" />
                        <p></p>
                    </div>
                </Tooltip>
            </div>
        </section>
    );
}

export default WebBy;
