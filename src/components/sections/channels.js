import React, { useEffect, useState }from 'react';
import { useMediaQuery } from 'react-responsive';
import { useWindowDimensions } from '../../utils/responsive';
import _ from 'lodash';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { 
        Row,
        Col,
        Modal,
        Badge
    } from 'antd';
import SpaceSuit from '../spaceSuit';
import Pane from '../pane';
import { getFriends } from '../../services/user';
import { modalFromLocation, stubFromSearch } from '../../utils/navigation';
import { getChatChannels } from '../../services/chat';
import { ToolOutlined } from '@ant-design/icons';
import ChannelActions from '../channelActions';
import ModalEditChannel from '../modalEditChannel';
import ModalCreateChannel from '../modalCreateChannel';
import { colors } from '../../constants/defaults';

const {primaryCyan, primaryIndigo, primaryMagenta, primaryColor } = colors;

const StyledP = styled.p`
    display:block;
    color: white;
    font-size: 2vh;
    line-height: 2.5vh;
    margin: 1vh 1.25vh;
    font-family: Roboto, sans-serif;
    font-weight: 100;
`;

const Notice = styled(Badge)`
  .ant-badge-count {
    background: #ff00a0;
    color: transparent;
    border: 0;
  }
  .ant-scroll-number-only {
      opacity: 0;
      color: #ff00a0;
      font-size: 1vh;
  }
`;

const Channel =  styled.div`
display:inline-block;
position: absolute;
z-index: 10;
text-align: left;
font-size: 2vh;
padding: 1vh;
margin: 0.5vh 0;
width: calc(100% - 60px);
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
color: ${primaryColor};
cursor: pointer;
&.pitch-mixin {
    --aug-inlay: initial;
    --aug-inlay-all: 3px;
    --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryCyan},  rgba(122, 4, 235, .5))  50% 50% / 100% 100%;
    --aug-border-all: 3px;
    --aug-border-bg: radial-gradient(${primaryMagenta}, ${primaryCyan}) 100% 100% / 100% 100%;
    color: ${primaryColor};
}
span {
    color: ${primaryColor};
    padding: 0;
    margin: 0;
    filter: drop-shadow(0 0 5px ${primaryColor});
    white-space: nowrap;
    & span {
        font-weight: 200;
        opacity: .5;
    }
}
`;

const Wrapper = styled.div`
    height: calc(${props => props.height}px - ${props => props.offset}px);
    margin: 0 auto;
    overflow: auto;
`;
const StyledCol = styled(Col)`
    ${StyledP} {
        cursor: ${props => props.locked ? 'inherit' : 'pointer'};
    }
`;



const MiniIconWrap = styled.div`
    position: relative;
    display: inline-block;
    transform: translateY(-1.75vh);
    margin: 0;
    min-width: 5vh;
    min-height: 5vh;
    font-size: 1.5vh;
    color: white;
    cursor: pointer;
    opacity: 1;
    &.pitch-mixin {
        --aug-inlay: initial;
        --aug-inlay-all: 4px;
        --aug-inlay-bg: radial-gradient(ellipse at top, ${primaryCyan}, rgba(122, 4, 235, 0))  20% 20% / 100% 100%;
        --aug-border-all: 1px;
        --aug-border-bg: radial-gradient(${primaryIndigo}, ${primaryCyan}) 100% 100% / 100% 100%;
        color: ${primaryCyan};
    }
    & svg {
        color: white;
        font-size: 3.5vh;
        margin-top: 0.75vh;
    }
`;


const StyledModal = styled(Modal)`
  .ant-modal-content {
    background:transparent;
    box-shadow: none;
    color: #fff;
  }
  .ant-modal-close-x {
    margin-top: -50px;
    color:#ff00a0;
    filter: drop-shadow(0 0 8px #ff00a0);
  }
  .ant-modal-footer {
    border: 0;
    padding: 0;
    filter: drop-shadow(0px 0px 5px #00b8ff);
    &:hover {
        filter: drop-shadow(0px 0px 10px #00b8ff);
    }
  }
  .ant-btn {
    clip-path: polygon(0% 15%, 15% 7%, 15% 0%, 85% 0%, 85% 7%, 100% 15%, 100% 85%, 85% 93%, 85% 100%, 15% 100%, 15% 93%, 0% 85%);
    color: #fff;
    background-color: #120458;
    border: 0;
    width: 20vh;
    }
    .ant-btn-primary {
        background-color: #00b8ff;
    }
    .ant-form-item-label {
        label {
            color: #fff;
            font-size: 3vh;
        }
    }
`;

export default function Channels({ location, recentChannels, }) {
    const userStub = <>Channels</>;
    const viewport = useWindowDimensions();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const totalOffset = isTabletOrMobile ? 236 : 276;
    const defaultModal = modalFromLocation(location);
    const [modal, setModal] = useState(defaultModal);
    const [channels, setChatChannels] = useState([]);
    const [contacts, setChatContacts] = useState([]);

    const closeModal = () => {
        setModal(null);
        navigate('/?p=channels');
    }

    const setProfileObjKey = objKey => {
        navigate(`/?p=channels&k=${objKey}#editChannel`);
    };
    const handleChannelChat = id => {
        navigate(`/?p=chat&c=${id}`);
    }

    const fetchChatChannels = async () => {
        const response = getChatChannels();
        return await response;
    };

    const fetchFriends = async () => {
        const response = getFriends();
        return await response;
    };

    useEffect(() => {
        fetchChatChannels().then(res => {
            const myChannels = _.filter(res.data, ['scope', 'group']);
            setChatChannels(myChannels);
        }).catch(err => {
            console.log('err', err);
        });
        fetchFriends().then(res => {
            const myContacts = res.data;
            setChatContacts(myContacts);
        }).catch(err => {
            console.log('err', err);
        });
        setModal(modalFromLocation(location));
      }, [location]);

const ChannelItem = (channel, index) => {
    return (
        <>
            <Channel
            className='pitch-mixin'
            data-augmented-ui="tr-round br-round bl-clip tl-round inlay"
            key={`channel${channel.id}`}
            onClick={_.partial(handleChannelChat, channel.id)}
            >
            <Notice
                count={recentChannels && recentChannels.indexOf(channel.id) !== -1 ? 1 : 0}
                size='small'
                offset={[10, 0]}
            >{channel.name}</Notice>
            </Channel>
            <MiniIconWrap
                className="pitch-mixin"
                data-augmented-ui="border all-hex"
                onClick={_.partial(setProfileObjKey, channel.id)}
            >
                <ToolOutlined />
            </MiniIconWrap>
        </>
    );
}

  return (
    <SpaceSuit>
        <Pane
            title={userStub}
            back={'/'}
            offset={isTabletOrMobile ? '128' : '160'}
            footer={<ChannelActions />}
        >
        <Row justify="space-between" align="middle">
            <StyledCol span={24}>
                <Wrapper offset={totalOffset} height={viewport.height}>
                {channels.map((channel, index) => { return (
                    ChannelItem(channel, index)
                )})}
                </Wrapper>
            </StyledCol>
        </Row>
        </Pane>
        <StyledModal
            title={null}
            visible={modal}
            closable={false}
            footer={null}
            onCancel={closeModal}
            bodyStyle={{padding:0, background:'transparent'}}
            width="75vh"
            >
            <Pane frameId={1}>
                {modal === 'editChannel' && <ModalEditChannel fieldKey={stubFromSearch(location, 'k')} myChannels={channels} myFriends={contacts} />}
                {modal === 'createChannel' && <ModalCreateChannel />}
            </Pane>
        </StyledModal>
    </SpaceSuit>
  )
}
